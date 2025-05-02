import { CharacterBase } from '@classes/character-base'
import { Bullet } from '@classes/bullet'
import { ShotgunConstructor } from './types.ts'
import { BulletParams } from '@classes/bullet/types.ts'

class Shotgun extends Phaser.GameObjects.Sprite {
    damage: number
    fireRate: number
    character: CharacterBase | null
    width = 5
    height = 5
    offsetPosition = { x: 4, y: 7 }
    canShoot: boolean = true
    timerShoot: Phaser.Time.TimerEvent
    readonly bulletParams: BulletParams
    readonly maxAmmo: number

    constructor(data: ShotgunConstructor) {
        const { scene, x, y, texture, fireRate, bulletParams, damage } = data
        super(scene, x, y, texture)
        this.fireRate = fireRate
        this.damage = damage
        this.bulletParams = bulletParams
        this.init()
    }

    public init() {
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.width = 32
        this.height = 10
    }

    public attachToPerson() {
        if (this.character) {
            const flipPersonX = this.character.flipX
            const offsetX = flipPersonX
                ? this.character.x - this.offsetPosition.x
                : this.character.x + this.offsetPosition.x

            this.setFlipX(flipPersonX)
            this.setPosition(offsetX, this.character.y + this.offsetPosition.y)

            const angle = flipPersonX
                ? Phaser.Math.Angle.Between(
                      this.character.positionMouse.x,
                      this.character.positionMouse.y,
                      this.x,
                      this.y
                  )
                : Phaser.Math.Angle.Between(
                      this.x,
                      this.y,
                      this.character.positionMouse.x,
                      this.character.positionMouse.y
                  )
            this.setRotation(angle)
        }
    }

    public pickup(character: CharacterBase) {
        const body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false)
        body.enable = false
        this.character = character
    }

    shoot() {
        if (!this.character || !this.canShoot) {
            return
        }

        const bullet = Bullet.generate(this.scene, this, this.character, this.bulletParams)
        bullet.fly()
        this.canShoot = false
        this.timerShoot = this.scene.time.delayedCall(this.fireRate, () => {
            this.canShoot = true
        })
    }
}

export default Shotgun
