import Phaser from 'phaser'
import { EnemyConstructor } from './types'
import { Health } from '@classes/health'

class Enemy extends Phaser.Physics.Arcade.Sprite {
    private velocityDirection: 1 | -1 = 1
    health: Health

    private startPatrolX: number
    private distancePatrol: number = 40
    private directoryPatrol: 1 | -1 = 1
    private positionPatrol: 'left' | 'right' = 'right'

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

        this.visionZone = this.scene.add.zone(this.x, this.y, this.widthZone, this.height)
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
        console.log(this.positionPatrol)
        const x =
            this.positionPatrol === 'right'
                ? this.x + this.width + this.widthZone / 2
                : this.x - this.widthZone / 2 - this.width
        this.visionZone.setPosition(x, this.y)
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

        if (!alive) {
            this.health.destroyHealthBar()
        }
    }
}

export default Enemy
