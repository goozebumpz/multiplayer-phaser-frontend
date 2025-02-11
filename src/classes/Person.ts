import Phaser from 'phaser'
import {getAngle, getRelativePositionPoints} from "../utils/getAngle.ts";

class Person extends Phaser.Physics.Arcade.Sprite {
  private speed = 300
  private bodyThis: Phaser.Physics.Arcade.Body
  private maxCountJumps = 2
  private currentCountJumps = 0
  private heightJump = 400
  isJumping = false
  jumpButton: Phaser.Input.Keyboard.Key
  private keys: Record<'moveLeft' | 'moveRight' | 'crouch' | 'jerk' | 'jump', Phaser.Input.Keyboard.Key>
  isCrouching = false
  private attackRectangle: Phaser.GameObjects.Rectangle | null
  dodgeDistanceX = 25
  positionMouse: { x: number; y: number } = { x: 0, y: 0 }
  isAttacking = false
  enemies: Person[]
  aim: Phaser.GameObjects.Text

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

    this.aim = this.scene.add.text(this.positionMouse.x, this.positionMouse.y, "+")
    this.scene.input.setDefaultCursor("none")

    this.scene.input.on('pointerdown', this.attack, this)

    this.scene.input.on('pointermove', (event: PointerEvent) => {
      this.positionMouse = { x: event.x, y: event.y }
      this.aim.setPosition(event.x, event.y)
    })

    this.setInteractive()
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
      const speedLocal = this.isCrouching ? this.speed / 2 : this.speed
      this.bodyThis.setVelocityX(speedLocal)
    } else if (this.keys.moveLeft.isDown) {
      this.dodge(-1)
      const speedLocal = this.isCrouching ? this.speed / 2 : this.speed
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

  private attack() {
    if (this.isAttacking) return

    const widthAttackRectangle = 50
    const firstIsFurther = getRelativePositionPoints(
      { x: this.x, y: this.y },
      { x: this.positionMouse.x, y: this.positionMouse.y }
    )

    const positionAttackX = firstIsFurther
      ? this.x - this.width / 2 - widthAttackRectangle / 2
      : this.x + this.width / 2 + widthAttackRectangle / 2

    this.attackRectangle = new Phaser.GameObjects.Rectangle(
      this.scene,
      positionAttackX,
      this.y - this.height / 2,
      widthAttackRectangle,
      20
    )

    getAngle(
      { x: this.x, y: this.y },
      { x: this.positionMouse.x, y: this.positionMouse.y }
    )

    this.scene.physics.add.existing(this.attackRectangle, false)
    this.isAttacking = true
    const bodyAttackRectangle = this.attackRectangle.body as Phaser.Physics.Arcade.Body

    bodyAttackRectangle.setAllowGravity(false)
    const timeout = setTimeout(() => {
      if (this.attackRectangle) {
        this.attackRectangle.destroy();
        this.attackRectangle = null
        clearTimeout(timeout)
        this.isAttacking = false
      }
    }, 100)
  }
}

export default Person