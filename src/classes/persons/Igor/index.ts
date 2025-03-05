import { CharacterBase } from '../../character-base'
import { KeysAtlas } from '../../../constants/keys-atlas.ts'

export class Igor extends CharacterBase {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super({
            scene,
            x,
            y,
            animations: {
                idle: KeysAtlas.IGOR_IDLE,
                move: KeysAtlas.IGOR_RUN,
            },
            frame: 'idle1',
        })
    }
}
