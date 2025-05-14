import Phaser from 'phaser'
import { HealthConstructor } from './types.ts'

class Health {
    scene: Phaser.Scene
    health: number
    maxHealth: number
    healthBar: Phaser.GameObjects.Rectangle | null = null
    backgroundBar: Phaser.GameObjects.Rectangle | null = null
    target: Phaser.Physics.Arcade.Sprite

    constructor(data: HealthConstructor) {
        const { scene, health, target } = data
        this.scene = scene
        this.health = health
        this.maxHealth = health
        this.target = target
        this.generateBar()
    }

    public minus(damage: number, onEndHealth?: () => void) {
        if (this.health - damage <= 0) {
            this.health = 0
            onEndHealth?.()
            return
        }
        this.health -= damage
    }

    public plus(health: number) {
        if (this.health + health >= this.maxHealth) {
            this.health = this.maxHealth
            return
        }

        this.health += health
    }

    public attachToTarget() {
        if (!this.healthBar || !this.backgroundBar) return

        this.backgroundBar.setPosition(this.target.x - 25, this.target.y - 40)
        this.healthBar.setPosition(this.target.x - 25, this.target.y - 40)

        const healthWidth = (this.health / this.maxHealth) * 50
        this.healthBar.setSize(healthWidth, 5)
    }

    private generateBar() {
        this.backgroundBar = this.scene.add
            .rectangle(this.target.x - 25, this.target.y - 40, 50, 5, 0xff0000)
            .setOrigin(0, 0.5)

        this.healthBar = this.scene.add
            .rectangle(this.target.x - 25, this.target.y - 40, 50, 5, 0x008000)
            .setOrigin(0, 0.5)
    }

    destroyHealthBar() {
        this.healthBar!.destroy(true)
        this.backgroundBar!.destroy(true)
        this.healthBar = null
        this.backgroundBar = null
    }
}

export default Health
