import Phaser from 'phaser'

class Person extends Phaser.GameObjects.Rectangle {
  // Person properties
  heightDefault: number = 32
  speed: number = 300

  // Jumps properties
  maxCountJumps: number = 2
  currentCountJumps: number = 0
  heightJump: number = 400
  isJumping: boolean = false

  // Controls
  jumpButton: Phaser.Input.Keyboard.Key
  keys: Record<'a' | 's' | 'd', Phaser.Input.Keyboard.Key>

  // Crouching
  isCrouching: boolean = false

  constructor(scene: Phaser.Scene) {
    super(scene, 100, 200, 32, 32, 0xffffff);
    this.init()
  }

  private init() {
    this.createPhysics()
    this.createControl()
  }

  public move() {
    this.run()
    this.crouching()
    this.jump()
  }

  private createControl() {
    this.jumpButton = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keys = this.scene.input.keyboard?.addKeys({
      a: Phaser.Input.Keyboard.KeyCodes.A,
      d: Phaser.Input.Keyboard.KeyCodes.D,
      s: Phaser.Input.Keyboard.KeyCodes.S,
    }) as Record<'a' | 's' | 'd', Phaser.Input.Keyboard.Key>;
  }

  private createPhysics(){
    this.scene.physics.add.existing<Person>(this, false)
    const bodyThis = this.body as Phaser.Physics.Arcade.Body
    bodyThis.collideWorldBounds = true
  }

  private run() {
    if (!this.body) {
      console.error("Body not found on run !")
      return
    }

    const bodyThis = this.body as Phaser.Physics.Arcade.Body
    bodyThis.setVelocityX(0)

    if (this.keys.d.isDown) {
      let speedLocal = this.isCrouching ? this.speed / 2 : this.speed
      bodyThis.setVelocityX(speedLocal)
    } else if (this.keys.a.isDown) {
      let speedLocal = this.isCrouching ? this.speed / 2 : this.speed
      bodyThis.setVelocityX(-speedLocal)
    }
  }

  private crouching() {
    const thisBody = this.body as Phaser.Physics.Arcade.Body

    if (this.keys.s.isDown) {
      this.isCrouching = true
      this.setScale(0.7)
      thisBody.setOffset(0, 1)
    } else {
      this.isCrouching = false
      this.setScale(1)
      thisBody.setOffset(0, -5)
    }
  }

  private jump() {
    if (!this.body) {
      console.error("Body not found on jump !")
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