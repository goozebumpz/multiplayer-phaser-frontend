import Phaser from "phaser";
import Bullet from "../bullet/Bullet.ts";
import ShooterWeapon from "../ShooterWeapon.ts";

interface GroupBulletsConstructor {
  scene: Phaser.Scene
  amount: number;
}

class Bullets extends Phaser.Physics.Arcade.Group {
  constructor(constructor: GroupBulletsConstructor) {
    const { scene } = constructor
    super(scene.physics.world, scene);
  }

  createBullet(shooterWeapon: ShooterWeapon) {
    this.add(new Bullet({
      sender: null,
      scene: this.scene,
      damage: 2.5,
      x: shooterWeapon.x,
      y: shooterWeapon.y,
      speed: 10,
      height: 3,
      width: 3
    }))
  }
}


export default Bullets;
