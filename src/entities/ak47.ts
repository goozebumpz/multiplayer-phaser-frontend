import { Shotgun } from '@classes/shotgun'
import { ShotgunConstructor } from '@classes/shotgun/types'
import { KeysShotguns } from '@constants/keys-atlas.ts'

export class Ak47 extends Shotgun {
    constructor(data: Omit<ShotgunConstructor, 'texture'>) {
        const { scene, x, y } = data
        super({ scene, x, y, texture: KeysShotguns.AK47, fireRate: 1000 })
    }
}
