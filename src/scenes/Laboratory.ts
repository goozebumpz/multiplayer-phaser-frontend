import Phaser from 'phaser'
import { Igor } from '@entities/igor'
import { Ak47 } from '@entities/ak47'
import { Enemy } from '@classes/enemy'
import { CharacterBase } from '@classes/character-base'
import { Shotgun } from '@classes/shotgun'
import { ScenesKeys } from './config'
import { RegistryKeys } from '@constants/registry'

class Laboratory extends Phaser.Scene {
    person: CharacterBase
    enemies: Enemy[] = []
    guns: Shotgun[] = []
    platforms: Phaser.GameObjects.Rectangle[]

    constructor() {
        super({ key: ScenesKeys.LABORATORY })
    }

    create() {
        this.person = new Igor(this, 50, 50)
        this.enemies = new Array(5).fill(
            new Enemy({
                scene: this,
                x: 50,
                y: 300,
                target: this.person,
                texture: '',
                widthZone: 300,
            })
        )
        this.registry.set<Enemy[]>(RegistryKeys.ENEMIES, this.enemies)
        this.createPlatforms()
        this.createGuns()
        this.createCollisionsPlayerGuns()
        this.createCollisionsEnemies()
    }

    update() {
        this.person.move()
        this.enemies.forEach((enemy) => enemy.update())
    }

    private createPlatforms() {
        const platform1 = this.add.rectangle(100, 300, 100, 10, 0xccccc)
        const platform2 = this.add.rectangle(300, 300, 100, 10, 0xccccc)
        const platform3 = this.add.rectangle(
            Number(this.game.config.width) / 2,
            Number(this.game.config.height),
            Number(this.game.config.width),
            10,
            0xccccc
        )

        this.platforms = [platform1, platform2, platform3]
        this.platforms.forEach((platform) => {
            this.physics.add.existing(platform, true)
        })
        this.platforms.forEach((platform) => {
            this.physics.add.collider(this.person, platform)
        })

        this.registry.set(RegistryKeys.PLATFORMS, this.platforms)
    }

    private createCollisionsPlayerGuns() {
        this.guns.forEach((gun) => {
            this.physics.add.overlap(this.person, gun, () => {
                gun.pickup(this.person)
                this.person.setGun(gun)
            })
        })
    }

    private createCollisionsEnemies() {
        this.enemies.forEach((enemy) => {
            this.platforms.forEach((platform) => {
                this.physics.add.collider(enemy, platform)
            })
        })

        this.registry.set(RegistryKeys.ENEMIES, this.enemies)
    }

    private createGuns = () => {
        const gun = new Ak47({ scene: this, x: 200, y: 300 })
        this.guns.push(gun)

        this.platforms.forEach((platform) => {
            this.guns.forEach((gun) => {
                this.physics.add.collider(platform, gun)
            })
        })
    }
}

export default Laboratory
