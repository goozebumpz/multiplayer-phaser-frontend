import Phaser from "phaser";
import Person from "./Person.ts";

type ShooterWeaponConstructor = {
  scene: Phaser.Scene
  name: string
  x: number;
  y: number;
}

interface ShooterWeaponI {
  shoot: () => void
  reload: () => void
}

class ShooterWeapon extends Phaser.GameObjects.Rectangle implements ShooterWeaponI {
  name: string
  speedShoot: number
  person: Person | null

  constructor(constructor: ShooterWeaponConstructor) {
    const { scene, x, y, name } = constructor
    super(scene, x, y);
    this.name = name;
  }

  shoot() {}

  reload() {}
}

export default ShooterWeapon