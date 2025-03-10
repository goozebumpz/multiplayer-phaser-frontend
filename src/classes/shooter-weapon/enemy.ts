import Phaser from 'phaser'
import { ShooterWeaponConstructor } from './types.ts'

interface ShooterWeaponI {
    shoot: () => void
    reload: () => void
}

class ShooterWeapon extends Phaser.GameObjects.Rectangle implements ShooterWeaponI {
    name: string
    speedShoot: number

    constructor(constructor: ShooterWeaponConstructor) {
        const { scene, x, y, name } = constructor
        super(scene, x, y)
        this.name = name
    }

    shoot() {}

    reload() {}
}

export default ShooterWeapon
