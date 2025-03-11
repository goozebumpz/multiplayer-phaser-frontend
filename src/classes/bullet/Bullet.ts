import Phaser from 'phaser'
import { CharacterBase } from '@classes/character-base'

interface BulletConstructorT {
    scene: Phaser.Scene
    x: number
    y: number
    width: number
    height: number
    speed: number
    damage: number
    sender: CharacterBase | null
}

interface BulletI {
    fly: () => void
}

class Bullet extends Phaser.GameObjects.Rectangle implements BulletI {
    damage: number
    speed: number
    sender: CharacterBase | null

    constructor(constructor: BulletConstructorT) {
        const { scene, x, y, width, height, speed, damage, sender } = constructor
        super(scene, x, y, width, height)
        this.speed = speed
        this.damage = damage
        this.sender = sender
        this.init()
    }

    private init() {
        this.setupPhysics()
    }

    private setupPhysics() {
        this.scene.add.existing(this)
        this.scene.physics.add.existing<Bullet>(this)
        const bodyThis = this.body as Phaser.Physics.Arcade.Body
        bodyThis.setEnable(true)
    }

    fly() {
        const bodyThis = this.body as Phaser.Physics.Arcade.Body
        bodyThis.setVelocityX(this.speed)
    }

    remove() {
        const thisBody = this.body as Phaser.Physics.Arcade.Body
        thisBody.setEnable(false)
    }
}

export default Bullet
