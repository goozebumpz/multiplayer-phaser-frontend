import Phaser from 'phaser'
import { CharacterBase } from '@classes/character-base'

export type EnemyConstructor = {
    scene: Phaser.Scene
    x: number
    y: number
    texture: string
    target: CharacterBase | null
}
