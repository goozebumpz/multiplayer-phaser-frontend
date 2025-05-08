// import { CharacterBase } from '@classes/character-base'
import { EnemyConstructor } from './types'

class Enemy extends Phaser.Physics.Arcade.Sprite {
    private visionZone: Phaser.GameObjects.Zone
    private visionRadius: number = 20
    private velocityDirection: 1 | -1 = 1

    constructor(params: EnemyConstructor) {
        const { scene, x, y, texture } = params
        super(scene, x, y, texture)
        this.init()
    }

    init() {
        this.scene.add.existing<Enemy>(this)
        this.scene.physics.add.existing<Enemy>(this)
        const bodyEnemy = this.body as Phaser.Physics.Arcade.Body
        bodyEnemy.setCollideWorldBounds(true)

        this.visionZone = this.scene.add.zone(
            this.x,
            this.y,
            this.visionRadius * 2,
            this.visionRadius * 2
        )
        this.scene.physics.add.existing(this.visionZone)
        const bodyZone = this.visionZone.body as Phaser.Physics.Arcade.Body
        bodyZone.setCircle(this.visionRadius)
        bodyZone.setAllowGravity(false)
    }

    update() {
        this.observe()
    }

    private observe() {
        this.setVelocityX(this.velocityDirection * 30)
    }
}

export default Enemy
