import Phaser from 'phaser'

class Person extends Phaser.GameObjects.Rectangle {
  // Person properties
  speed: number = 300
  bodyThis: Phaser.Physics.Arcade.Body

  // Jumps properties
  maxCountJumps: number = 2
  currentCountJumps: number = 0
  heightJump: number = 400
  isJumping: boolean = false

  // Controls
  jumpButton: Phaser.Input.Keyboard.Key
  keys: Record<'moveLeft' | 'moveRight' | 'crouch' | 'jerk' | 'jump', Phaser.Input.Keyboard.Key>

  // Crouching
  isCrouching: boolean = false

  // Attack
  attackRectangle: Phaser.GameObjects.Rectangle
  attackButton: Phaser.Input.Keyboard.Key

  //Dodge
  dodgeDistanceX: number = 25

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
      moveLeft: Phaser.Input.Keyboard.KeyCodes.A,
      moveRight: Phaser.Input.Keyboard.KeyCodes.D,
      crouch: Phaser.Input.Keyboard.KeyCodes.S,
      jerk: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      jump: Phaser.Input.Keyboard.KeyCodes.SPACE
    }) as Record<'moveLeft' | 'moveRight' | 'crouch' | 'jerk' | 'jump', Phaser.Input.Keyboard.Key>
    this.attackRectangle = this.scene.add.rectangle(this.x, this.y + 3, 5, 2, 0x555555)
  }

  private createPhysics(){
    this.scene.physics.add.existing<Person>(this, false)
    this.bodyThis = this.body as Phaser.Physics.Arcade.Body
    this.bodyThis.collideWorldBounds = true
  }

  private run() {
    this.bodyThis.setVelocityX(0)

    if (this.keys.moveRight.isDown) {
      this.dodge(1)
      let speedLocal = this.isCrouching ? this.speed / 2 : this.speed
      this.bodyThis.setVelocityX(speedLocal)
    } else if (this.keys.moveLeft.isDown) {
      this.dodge(-1)
      let speedLocal = this.isCrouching ? this.speed / 2 : this.speed
      this.bodyThis.setVelocityX(-speedLocal)
    }
  }

  private crouching() {
    const thisBody = this.body as Phaser.Physics.Arcade.Body

    if (this.keys.crouch.isDown) {
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
    if (Phaser.Input.Keyboard.JustDown(this.keys.jump)) {
      if (this.isJumping && this.currentCountJumps > 0 && this.currentCountJumps < this.maxCountJumps) {
        this.bodyThis.setVelocityY(-this.heightJump / (this.currentCountJumps + 1))
        this.currentCountJumps++
      } else if (!this.isJumping) {
        this.isJumping = true
        this.currentCountJumps = 1
        this.bodyThis.touching.down = false
        this.bodyThis.setVelocityY(-this.heightJump)
      }
    } else if (this.bodyThis.touching.down && this.isJumping) {
      this.currentCountJumps = 0;
      this.isJumping = false
    }
  }

  private dodge(direction: number) {
    if (Phaser.Input.Keyboard.JustDown(this.keys.jerk)) {
      this.setX((this.x + (this.dodgeDistanceX * direction)))
    }
  }
}

export default Person