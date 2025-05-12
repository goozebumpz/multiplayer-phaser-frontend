// import { CharacterBase } from '@classes/character-base'
import { EnemyConstructor } from './types'
import { Health } from '@classes/health'
import Phaser from 'phaser'

class Enemy extends Phaser.Physics.Arcade.Sprite {
    private velocityDirection: 1 | -1 = 1
    health: Health

    // Patrol properties
    private startPatrolX: number
    private distancePatrol: number = 150
    private directoryPatrol: 1 | -1 = 1
    private positionPatrol: 'left' | 'right' = 'right'

    // Detect character properties
    private visionZone: Phaser.GameObjects.Zone
    private widthZone: number

    constructor(params: EnemyConstructor) {
        const { scene, x, y, texture, widthZone } = params
        super(scene, x, y, texture)
        this.startPatrolX = x
        this.widthZone = widthZone
        this.init()
    }

    init() {
        this.scene.add.existing<Enemy>(this)
        this.scene.physics.add.existing<Enemy>(this)
        const bodyEnemy = this.body as Phaser.Physics.Arcade.Body
        bodyEnemy.setCollideWorldBounds(true)
        this.health = new Health({
            scene: this.scene,
            target: this,
            health: 100,
        })

        this.visionZone = this.scene.add.zone(this.x, this.y, this.widthZone, this.widthZone)
        this.scene.physics.add.existing(this.visionZone)
        const bodyZone = this.visionZone.body as Phaser.Physics.Arcade.Body
        // bodyZone.setCircle(this.visionRadius)
        bodyZone.setAllowGravity(false)
    }

    update() {
        this.health.attachToTarget()
        this.patrol()
    }

    private synchronizeVisionZone() {
        // const x = this.positionPatrol === 'right' ? 20 + this.width : this.x - 20
        this.visionZone.setPosition(this.x, this.y)
    }

    private patrol() {
        this.synchronizeVisionZone()
        const distanceTargeting = Math.abs(this.x - this.startPatrolX) >= this.distancePatrol

        if (distanceTargeting && this.positionPatrol === 'right') {
            this.directoryPatrol = -1
            this.startPatrolX = this.x
            this.positionPatrol = 'left'
        } else if (distanceTargeting && this.positionPatrol === 'left') {
            this.directoryPatrol = 1
            this.startPatrolX = this.x
            this.positionPatrol = 'right'
        }

        this.setVelocityX(this.velocityDirection * this.directoryPatrol * 40)
    }

    public setAlive(alive: boolean) {
        this.setActive(alive)
        this.setVisible(alive)
        const bodyThis = this.body as Phaser.Physics.Arcade.Body
        bodyThis.enable = alive
    }
}

export default Enemy
