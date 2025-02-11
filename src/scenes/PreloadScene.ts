import Phaser from 'phaser'
import { ScenesKeys } from './config.ts';
import AtlasIgor from '../assets/igor/igor.png'
import JSONIgor from '../assets/igor/igor.png'

export enum KeysAtlas {
  IGOR = 'igor'
}

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super(ScenesKeys.PRELOAD);
  }

  preload() {
    this.load.atlas(KeysAtlas.IGOR, AtlasIgor, JSONIgor)
  }

  create() {
    this.scene.start(ScenesKeys.LABORATORY)
  }
}