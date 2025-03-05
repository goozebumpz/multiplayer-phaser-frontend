import Phaser from 'phaser'
import { getAngle, getRelativePositionPoints } from '../../utils/getAngle'
import { CharacterBaseConstructor } from './types.ts'

type PersonActions = 'moveLeft' | 'moveRight' | 'crouch' | 'jerk' | 'jump'

class CharacterBase extends Phaser.Physics.Arcade.Sprite {
    private speed = 300
    private bodyThis: Phaser.Physics.Arcade.Body
    private maxCountJumps = 2
    private currentCountJumps = 0
    private heightJump = 400
    private keys: Record<PersonActions, Phaser.Input.Keyboard.Key>
    private attackRectangle: Phaser.GameObjects.Rectangle | null
    private animationKeys: { idle: string; move: string }
    isJumping = false
    jumpButton: Phaser.Input.Keyboard.Key
    isCrouching = false
    dodgeDistanceX = 100
    positionMouse: { x: number; y: number } = { x: 0, y: 0 }
    isAttacking = false
    aim: Phaser.GameObjects.Text
    // animation: Animation
    enemies: CharacterBase[] = []

    constructor(params: CharacterBaseConstructor) {
        const { scene, x, y, animations, frame } = params
        super(scene, x, y, animations.idle, frame)
        this.animationKeys = animations
        this.init()
    }

    private init() {
        this.createPhysics()
        this.createControl()
        this.createAnimations()
    }

    public move() {
        this.run()
        this.crouching()
        this.jump()
    }

    private createControl() {
        this.jumpButton = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.keys = this.scene.input.keyboard?.addKeys({
            moveLeft: Phaser.Input.Keyboard.KeyCodes.A,
            moveRight: Phaser.Input.Keyboard.KeyCodes.D,
            crouch: Phaser.Input.Keyboard.KeyCodes.S,
            jerk: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
        }) as Record<PersonActions, Phaser.Input.Keyboard.Key>

        this.aim = this.scene.add.text(this.positionMouse.x, this.positionMouse.y, '+')

        this.scene.input.setDefaultCursor('none')
        this.scene.input.on('pointerdown', this.attack, this)
        this.scene.input.on('pointermove', (event: PointerEvent) => {
            this.positionMouse = { x: event.x, y: event.y }
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

    private run() {
        this.bodyThis.setVelocityX(0)

        if (this.keys.moveRight.isDown) {
            this.dodge(1)
            const speedLocal = this.isCrouching ? this.speed / 2 : this.speed
            this.bodyThis.setVelocityX(speedLocal)
            this.setFlipX(false)
            this.anims.play('run', true)
        } else if (this.keys.moveLeft.isDown) {
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

        if (this.keys.crouch.isDown) {
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
        if (Phaser.Input.Keyboard.JustDown(this.keys.jump)) {
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
        if (Phaser.Input.Keyboard.JustDown(this.keys.jerk)) {
            this.setX(this.x + this.dodgeDistanceX * direction)
        }
    }

    private attack() {
        if (this.isAttacking) return

        const widthAttackRectangle = 50
        const firstIsFurther = getRelativePositionPoints(
            { x: this.x, y: this.y },
            { x: this.positionMouse.x, y: this.positionMouse.y }
        )

        const positionAttackX = firstIsFurther
            ? this.x - this.width / 2 - widthAttackRectangle / 2
            : this.x + this.width / 2 + widthAttackRectangle / 2

        this.attackRectangle = new Phaser.GameObjects.Rectangle(
            this.scene,
            positionAttackX,
            this.y - this.height / 2,
            widthAttackRectangle,
            20
        )

        getAngle({ x: this.x, y: this.y }, { x: this.positionMouse.x, y: this.positionMouse.y })

        this.scene.physics.add.existing(this.attackRectangle, false)
        this.isAttacking = true
        const bodyAttackRectangle = this.attackRectangle.body as Phaser.Physics.Arcade.Body

        bodyAttackRectangle.setAllowGravity(false)
        const timeout = setTimeout(() => {
            if (this.attackRectangle) {
                this.attackRectangle.destroy()
                this.attackRectangle = null
                clearTimeout(timeout)
                this.isAttacking = false
            }
        }, 100)
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
