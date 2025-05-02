import { CharacterBase } from '@classes/character-base'
import { Shotgun } from '@classes/shotgun'

export type BulletConstructor = {
    scene: Phaser.Scene
    x: number
    y: number
    width: number
    height: number
    speed: number
    damage: number
    sender: CharacterBase
    shotgun: Shotgun
    lifetime: number
    allowToGravitation?: boolean
}

export interface BulletI {
    fly: () => void
}

export type BulletParams = Pick<
    BulletConstructor,
    'width' | 'height' | 'lifetime' | 'damage' | 'speed' | 'allowToGravitation'
>
