import Phaser from 'phaser'
import { KeysAtlas } from '../constants/keys-atlas.ts'
import { ScenesKeys } from './config.ts'
import IgorIdleAtlas from '../assets/igor/igor-idle.png'
import IgorIdleJSON from '../assets/igor/igor-idle_atlas.json'
import IgorRunAtlas from '../assets/igor/igor-run.png'
import IgorRunJSON from '../assets/igor/igor-run_atlas.json'

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: ScenesKeys.PRELOAD })
    }

    preload() {
        this.load.atlas(KeysAtlas.IGOR_IDLE, IgorIdleAtlas, IgorIdleJSON)
        this.load.atlas(KeysAtlas.IGOR_RUN, IgorRunAtlas, IgorRunJSON)
    }

    create() {
        this.scene.start(ScenesKeys.LABORATORY)
    }
}
