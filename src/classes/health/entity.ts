import Phaser from 'phaser'
import { HealthConstructor } from './types.ts'

class Health {
    health: number
    maxHealth: number
    bar: Phaser.GameObjects.Graphics
    target: Phaser.Physics.Arcade.Sprite

    constructor(data: HealthConstructor) {
        const { scene, health, target } = data
        this.health = 100
        this.maxHealth = health
        this.target = target
        this.bar = new Phaser.GameObjects.Graphics(scene)
        scene.add.existing(this.bar)
    }

    public minus(damage: number) {
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
        this.bar.clear() // Очищаем предыдущий рисунок

        // Рисуем красную полосу (фон, максимальное здоровье)
        this.bar.fillStyle(0xff0000) // Красный цвет
        this.bar.fillRect(this.target.x - 25, this.target.y - 40, 50, 3)

        // Рисуем серую полосу (текущее здоровье) поверх красной
        this.bar.fillStyle(0xcccccc) // Серый цвет
        const healthWidth = (this.health / this.maxHealth) * 50 // Ширина пропорциональна здоровью
        this.bar.fillRect(this.target.x - 25, this.target.y - 40, healthWidth, 3)
    }
}

export default Health
