import Phaser from 'phaser'

class Person extends Phaser.GameObjects.Rectangle {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys
  speed: number = 300

  maxCountJumps: number = 3
  currentCountJumps: number = 0
  heightJump: number = 350
  heightDefault: number = 32
  isJumping: boolean = false
  jumpButton: Phaser.Input.Keyboard.Key

  constructor(scene: Phaser.Scene) {
    super(scene, 100, 200, 32, 32, 0xffffff);
    this.init()
  }

  private init() {
    this.createPhysics()
    this.createControl()
    this.jump()
  }

  public move() {
    this.run()
    this.sitDown()
    this.jump()
  }

  private createControl() {
    this.cursors = this.scene.input.keyboard!.createCursorKeys()
    this.jumpButton = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
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
    const thisBody = this.body as Phaser.Physics.Arcade.Body
    const sitDownHeight = this.heightDefault / 2

    if (this.cursors.down.isDown) {
      this.height = sitDownHeight
      // @ts-ignore
      thisBody.height = sitDownHeight
    } else {
      this.height = this.heightDefault
      // @ts-ignore
      thisBody.height = this.heightDefault
    }
  }

  private jump() {
    if (!this.body) {
      return
    }

    const thisBody = this.body as Phaser.Physics.Arcade.Body

    if (Phaser.Input.Keyboard.JustDown(this.jumpButton)) {
      if (this.isJumping && this.currentCountJumps > 0 && this.currentCountJumps < this.maxCountJumps) {
        thisBody.setVelocityY(-this.heightJump / (this.currentCountJumps + 1))
        this.currentCountJumps++
      } else if (!this.isJumping) {
        this.isJumping = true
        this.currentCountJumps = 1
        thisBody.touching.down = false
        thisBody.setVelocityY(-this.heightJump)
      }
    } else if (thisBody.touching.down && this.isJumping) {
      this.currentCountJumps = 0;
      this.isJumping = false
    }

  }
}


export default Person