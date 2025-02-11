import Phaser from 'phaser'
import Person from "../classes/Person.ts";
import { ScenesKeys } from './config.ts';

class Laboratory extends Phaser.Scene {
    person: Person
    textPosition: Phaser.GameObjects.Text

    constructor() {
        super(ScenesKeys.LABORATORY);
    }

    create() {
        this.person = new Person(this);
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

        this.textPosition = this.add.text(Number(this.game.config.width) / 2, 20, `Position x - ${this.person.x}, y - ${this.person.y}`)
    }

    update() {
        this.person.move()
        this.textPosition.setText(`Position x - ${this.person.x}, y - ${this.person.y.toFixed(0)}`)
    }
}

export default Laboratory