import Phaser from "phaser";
import Person from "./Person.ts";

interface BulletConstructorT {
  scene: Phaser.Scene,
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number
  damage: number;
  sender: Person | null;
}

interface BulletI {
  fly: () => void
}

class Bullet extends Phaser.GameObjects.Rectangle implements BulletI {
  damage: number
  speed: number
  sender: Person | null

  constructor(constructor: BulletConstructorT) {
    const { scene, x, y, width, height, speed, damage, sender } = constructor
    super(scene, x, y, width, height);
    this.speed = speed
    this.damage = damage
    this.sender = sender
    this.init()
  }

  private init() {
    this.setupPhysics()
  }

  private setupPhysics() {
    this.scene.add.existing(this)
    this.scene.physics.add.existing<Bullet>(this)
    const bodyThis = this.body as Phaser.Physics.Arcade.Body
    bodyThis.setEnable(true)
  }

  fly() {
    const bodyThis = this.body as Phaser.Physics.Arcade.Body
    bodyThis.setVelocityX(this.speed)
  }

  remove() {
    const thisBody = this.body as Phaser.Physics.Arcade.Body
    thisBody.setEnable(false)
    this.setVisible(false)
    this.setActive(false)
  }
}

export default Bullet

