import { BulletParams } from '@classes/bullet/types.ts'

export const BULLET_AK_47 = (damage: number): BulletParams => ({
    damage,
    width: 5,
    height: 5,
    lifetime: 1000,
    speed: 1000,
    allowToGravitation: false,
})
