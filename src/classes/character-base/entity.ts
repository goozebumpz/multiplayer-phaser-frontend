import Phaser from 'phaser'
import { getRelativePositionPoints } from '@utils/getAngle.ts'
import { AttackRectangle } from '@classes/attack-rectangle'
import Health from '@classes/health/entity.ts'
import { ControlCharacterHandler } from '@classes/control-character-handler'
import { Shotgun } from '@classes/shotgun'
import { CharacterBaseConstructor } from './types.ts'

class CharacterBase extends Phaser.Physics.Arcade.Sprite {
    private readonly speed = 300
    private bodyThis: Phaser.Physics.Arcade.Body
    private maxCountJumps = 2
    private currentCountJumps = 0
    private heightJump = 400
    private attackRectangle: AttackRectangle
    private animationKeys: { idle: string; move: string }
    private controlHandler: ControlCharacterHandler
    private shotgun: Shotgun | null = null
    isJumping = false
    isCrouching = false
    private readonly dodgeDistanceX = 20
    positionMouse: Phaser.Math.Vector2 = new Phaser.Math.Vector2(0, 0)
    isAttacking = false
    aim: Phaser.GameObjects.Text
    enemies: CharacterBase[] = []
    health: Health
    attackDamage: number = 20

    constructor(constructorParams: CharacterBaseConstructor) {
        const { scene, x, y, animations, frame } = constructorParams
        super(scene, x, y, animations.idle, frame)
        this.animationKeys = animations
        this.init()
        this.health = new Health({ scene, target: this, health: 200 })
    }

    public move() {
        this.run()
        this.crouching()
        this.jump()
        this.synchronizeFlip()
        this.health.attachToTarget()
        this.shotgun?.attachToPerson()
    }

    public setGun(gun: Shotgun) {
        this.shotgun = gun
    }

    private init() {
        this.createPhysics()
        this.createAttackRectangle()
        this.createControl()
        this.createAnimations()
    }

    private createControl() {
        this.controlHandler = new ControlCharacterHandler({ scene: this.scene })
        this.aim = this.scene.add.text(this.positionMouse.x, this.positionMouse.y, '+')
        this.scene.input.setDefaultCursor('none')
        this.scene.input.on('pointerdown', this.attack, this)
        this.scene.input.on('pointermove', (event: PointerEvent) => {
            this.positionMouse.set(event.x, event.y)
            this.aim.setPosition(event.x, event.y)
        })

        this.setInteractive()
    }

    private createPhysics() {
        this.scene.add.existing(this)
        this.scene.physics.add.existing<CharacterBase>(this, false)
        this.bodyThis = this.body as Phaser.Physics.Arcade.Body
        this.bodyThis.setCollideWorldBounds(true)
    }

    private createAttackRectangle() {
        this.attackRectangle = new AttackRectangle({
            scene: this.scene,
            target: this,
            height: 20,
            width: 20,
        })
    }

    private synchronizeFlip() {
        this.setFlipX(getRelativePositionPoints({ x: this.x }, { x: this.positionMouse.x }))
    }

    private run() {
        this.bodyThis.setVelocityX(0)

        if (this.controlHandler.keys.moveRight.isDown) {
            this.dodge(1)
            const speedLocal = this.isCrouching ? this.speed / 2 : this.speed
            this.bodyThis.setVelocityX(speedLocal)
            this.setFlipX(false)
            this.anims.play('run', true)
        } else if (this.controlHandler.keys.moveLeft.isDown) {
            this.dodge(-1)
            const speedLocal = this.isCrouching ? this.speed / 2 : this.speed
            this.bodyThis.setVelocityX(-speedLocal)
            this.setFlipX(true)
            this.anims.play('run', true)
        } else {
            this.anims.play('idle', true)
        }
    }

    private crouching() {
        const thisBody = this.body as Phaser.Physics.Arcade.Body

        if (Phaser.Input.Keyboard.JustUp(this.controlHandler.keys.crouch)) {
            this.setPosition(this.x, this.y - 1)
        }

        if (this.controlHandler.keys.crouch.isDown) {
            this.isCrouching = true
            this.setScale(0.7)
            thisBody.setOffset(0, 1)
        } else {
            this.isCrouching = false
            this.setScale(1)
            thisBody.setOffset(0, 0)
        }
    }

    private jump() {
        if (Phaser.Input.Keyboard.JustDown(this.controlHandler.keys.jump)) {
            if (
                this.isJumping &&
                this.currentCountJumps > 0 &&
                this.currentCountJumps < this.maxCountJumps
            ) {
                this.bodyThis.setVelocityY(-this.heightJump / (this.currentCountJumps + 1))
                this.currentCountJumps++
            } else if (!this.isJumping) {
                this.isJumping = true
                this.currentCountJumps = 1
                this.bodyThis.touching.down = false
                this.bodyThis.setVelocityY(-this.heightJump)
            }
        } else if (this.bodyThis.touching.down && this.isJumping) {
            this.currentCountJumps = 0
            this.isJumping = false
        }
    }

    private dodge(direction: number) {
        const { jerk } = this.controlHandler.keys
        if (Phaser.Input.Keyboard.JustDown(jerk)) {
            this.setX(this.x + this.dodgeDistanceX * direction)
        }
    }

    private attack() {
        if (this.shotgun) {
            this.shotgun.shoot()
            return
        }

        if (this.isAttacking) return
        this.attackRectangle.activate(this.positionMouse)
        this.isAttacking = true

        this.enemies.forEach((enemy) => {
            const isColliding = this.scene.physics.overlap(this.attackRectangle, enemy)

            if (isColliding) {
                enemy.health.minus(this.attackDamage)
            }
        })

        this.scene.time.delayedCall(10, () => {
            this.isAttacking = false
            this.attackRectangle.deactivate()
        })
    }

    private createAnimations() {
        const { idle, move } = this.animationKeys

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames(idle, {
                prefix: 'idle',
                start: 1,
                end: 4,
            }),
            frameRate: 10,
            repeat: -1,
        })

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames(move, {
                prefix: 'run',
                start: 1,
                end: 9,
            }),
            frameRate: 20,
            repeat: -1,
        })
    }
}

export default CharacterBase
