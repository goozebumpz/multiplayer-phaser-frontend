import { Shotgun } from '@classes/shotgun'
import { ShotgunConstructor } from '@classes/shotgun/types'
import { KeysShotguns } from '@constants/keys-atlas.ts'
import { BULLET_AK_47 } from '@entities/bullets.ts'

export class Ak47 extends Shotgun {
    constructor(
        data: Omit<ShotgunConstructor, 'texture' | 'fireRate' | 'damage' | 'bulletParams'>
    ) {
        const { scene, x, y } = data
        const damage = 20

        super({
            scene,
            x,
            y,
            texture: KeysShotguns.AK47,
            fireRate: 10,
            damage,
            bulletParams: BULLET_AK_47(damage),
        })
    }
}
