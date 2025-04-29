import Phaser from 'phaser'
import { CharacterBase } from '@classes/character-base'
import { Shotgun } from '@classes/shotgun'
import { BulletConstructor, BulletI } from './types'

class Bullet extends Phaser.GameObjects.Rectangle implements BulletI {
    damage: number
    speed: number
    sender: CharacterBase | null
    shotgun: Shotgun
    lifetime: number

    constructor(constructor: BulletConstructor) {
        const { scene, x, y, width, height, speed, damage, sender, lifetime, shotgun } = constructor
        super(scene, x, y, width, height)
        this.speed = speed
        this.damage = damage
        this.sender = sender
        this.lifetime = lifetime
        this.shotgun = shotgun
        this.init()
    }

    static generate(scene: Phaser.Scene, shotgun: Shotgun, sender: CharacterBase) {
        return new Bullet({
            scene,
            sender,
            shotgun,
            x: shotgun.x,
            y: shotgun.y,
            speed: 500,
            width: 10,
            height: 10,
            damage: 10,
            lifetime: 2000,
        })
    }

    private init() {
        this.setupPhysics()
        this.scene.events.on('update', this.onUpdate)
    }

    private onUpdate() {
        if (!this.body) return

        const body = this.body as Phaser.Physics.Arcade.Body

        if ((body && body.left) || body.bottom || body.top || body.right) {
            this.setAlive(false)
        }
    }

    private setupPhysics() {
        this.scene.add.existing(this)
        this.scene.physics.add.existing<Bullet>(this)

        const bodyThis = this.body as Phaser.Physics.Arcade.Body
        this.setAlive(true)
        bodyThis.setAllowGravity(false)
    }

    fly() {
        const bodyThis = this.body as Phaser.Physics.Arcade.Body
        const { bulletVelocityX, bulletVelocityY } = this.calculateVelocity()

        bodyThis.setVelocity(bulletVelocityX, bulletVelocityY)
        this.setAngle()

        this.scene.time.delayedCall(this.shotgun.fireRate, () => {
            this.setAlive(false)
        })
    }

    private calculateVelocity() {
        if (!this.sender) {
            return {
                bulletVelocityX: 0,
                bulletVelocityY: 0,
            }
        }

        const dx = this.sender.positionMouse.x - this.sender.x
        const dy = this.sender.positionMouse.y - this.sender.y

        const distance = Phaser.Math.Distance.Between(
            this.sender.x,
            this.sender.y,
            this.sender.positionMouse.x,
            this.sender.positionMouse.y
        )

        const directionX = dx / distance
        const directionY = dy / distance

        const bulletVelocityX = directionX * this.speed
        const bulletVelocityY = directionY * this.speed

        return {
            bulletVelocityX,
            bulletVelocityY,
        }
    }

    private setAlive(alive: boolean) {
        this.setActive(alive)
        this.setVisible(alive)
        const bodyThis = this.body as Phaser.Physics.Arcade.Body
        bodyThis.enable = alive
    }
}

export default Bullet
