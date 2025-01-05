import Phaser from 'phaser'

class Person extends Phaser.GameObjects.Rectangle {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
  speed: number = 300
  maxCountJumps: number = 2
  currentCountJumps: number = 0
  heightJump: number = 300
  heightDefault: number = 32
  isJumping: boolean = false

  constructor(scene: Phaser.Scene) {
    super(scene, 100, 200, 32, 32, 0xffffff);
    this.init()
  }

  private init() {
    this.createPhysics()
    this.createControl()
    this.scene.events.on('update', this.jump, this)
  }

  public move() {
    this.run()
    this.sitDown()
    this.jump()
  }

  private createControl() {
    this.cursors = this.scene.input.keyboard!.createCursorKeys()
  }

  private createPhysics(){
    this.scene.physics.add.existing<Person>(this, false)
    const bodyThis = this.body as Phaser.Physics.Arcade.Body
    bodyThis.collideWorldBounds = true
  }

  private run() {
    if (!this.body) {
      return
    }

    const bodyThis = this.body as Phaser.Physics.Arcade.Body
    bodyThis.setVelocityX(0)

    if (this.cursors.right.isDown) {
      bodyThis.setVelocityX(this.speed)
    } else if (this.cursors.left.isDown) {
      bodyThis.setVelocityX(-this.speed)
    }
  }

  private sitDown() {
    if (this.cursors.down.isDown) {
      this.height = this.heightDefault / 2
    } else {
      this.height = this.heightDefault
    }
  }

  private jump() {
    if (!this.body) {
      return
    }

    console.log('this.body work jump')

    const thisBody = this.body as Phaser.Physics.Arcade.Body

    if (this.cursors.space.isDown) {

    }

    if (thisBody.touching.down) {
      this.currentCountJumps = 0;
    }
  }
}


export default Person