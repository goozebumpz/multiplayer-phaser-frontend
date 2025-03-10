import Phaser from 'phaser'
import { HealthConstructor } from './types.ts'

class Health {
    health: number
    maxHealth: number
    bar: Phaser.GameObjects.Graphics
    target: Phaser.Physics.Arcade.Sprite

    constructor(data: HealthConstructor) {
        const { scene, health, target } = data
        this.health = 20
        this.maxHealth = health
        this.target = target
        this.bar = new Phaser.GameObjects.Graphics(scene)
        scene.add.existing(this.bar)
    }

    public minus(damage: number) {
        this.health += damage
    }

    public plus(health: number) {
        if (this.health + health >= this.maxHealth) {
            this.health = this.maxHealth
            return
        }

        this.health += health
    }

    public attachToTarget() {
        this.bar.clear()

        this.bar.fillStyle(0xff0000)
        this.bar.fillRect(this.target.x - 25, this.target.y - 40, 50, 3)

        this.bar.fillStyle(0x04ff00)
        this.bar.fillRect(this.bar.x - 25, this.bar.y - 40, (this.health / this.maxHealth) * 50, 3)
    }
}

export default Health
