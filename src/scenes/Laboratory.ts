import Person from "../classes/Person.ts";

class Laboratory extends Phaser.Scene {
    person: Person

    constructor() {
        super("Laboratory");
    }

    init() {

    }

    create() {
        this.person = new Person(this);
        const platform1 = this.add.rectangle(100, 300, 100, 10, 0xccccc)
        const platform2 = this.add.rectangle(300, 300, 100, 10, 0xccccc)
        this.physics.add.existing(platform1, true)
        this.physics.add.existing(platform2, true)

        this.physics.add.collider(this.person, platform1)
        this.physics.add.collider(this.person, platform2)
    }

    update() {
        this.person.move()
    }
}

export default Laboratory