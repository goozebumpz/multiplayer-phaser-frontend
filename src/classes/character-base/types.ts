export interface CharacterBaseConstructor {
    scene: Phaser.Scene
    x: number
    y: number
    animations: {
        idle: string
        move: string
    }
    frame?: string
}

export type CharacterBaseActions = 'moveLeft' | 'moveRight' | 'crouch' | 'jerk' | 'jump'
