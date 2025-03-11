import Phaser from 'phaser'
import { Igor } from '@classes/persons/Igor'
import { CharacterBase } from '@classes/character-base'
import { ScenesKeys } from './config.ts'

class Laboratory extends Phaser.Scene {
    person1: CharacterBase
    person2: CharacterBase

    constructor() {
        super({ key: ScenesKeys.LABORATORY })
    }

    create() {
        this.person1 = new Igor(this, 50, 50)
        this.person2 = new Igor(this, 100, 50)
        this.person1.enemies = [this.person2]
        this.person2.enemies = [this.person1]

        this.createPlatforms()
    }

    update() {
        this.person1.move()
        this.person2.move()
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
        this.physics.add.existing(platform1, true)
        this.physics.add.existing(platform2, true)
        this.physics.add.existing(platform3, true)

        this.physics.add.collider(this.person1, platform1)
        this.physics.add.collider(this.person1, platform2)
        this.physics.add.collider(this.person1, platform3)

        this.physics.add.collider(this.person2, platform1)
        this.physics.add.collider(this.person2, platform2)
        this.physics.add.collider(this.person2, platform3)
    }
}

export default Laboratory
