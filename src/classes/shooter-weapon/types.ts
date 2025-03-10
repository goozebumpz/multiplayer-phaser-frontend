import Phaser from 'phaser'

export type ShooterWeaponConstructor = {
    scene: Phaser.Scene
    name: string
    x: number
    y: number
}
