import { BulletParams } from '@classes/bullet/types.ts'

export type ShotgunConstructor = {
    scene: Phaser.Scene
    x: number
    y: number
    texture: string
    fireRate: number
    damage: number
    bulletParams: BulletParams
}
