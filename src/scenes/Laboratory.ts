import Phaser from 'phaser'
import { ScenesKeys } from './config.ts'
import { Igor } from '../classes/persons/Igor'
import { CharacterBase } from '../classes/character-base/index.ts'

class Laboratory extends Phaser.Scene {
    person: CharacterBase
    textPosition: Phaser.GameObjects.Text

    constructor() {
        super({ key: ScenesKeys.LABORATORY })
    }

    create() {
        this.person = new Igor(this, 50, 50)
        const camera = this.cameras.main
        camera.zoom = 1.3
        camera.startFollow(this.person)
        this.createPlatforms()
    }

    update() {
        this.person.move()
        this.textPosition.setText(`Position x - ${this.person.x}, y - ${this.person.y.toFixed(0)}`)
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

        this.physics.add.collider(this.person, platform1)
        this.physics.add.collider(this.person, platform2)
        this.physics.add.collider(this.person, platform3)

        this.textPosition = this.add.text(
            Number(this.game.config.width) / 2,
            20,
            `Position x - ${this.person.x}, y - ${this.person.y}`
        )
    }
}

export default Laboratory
