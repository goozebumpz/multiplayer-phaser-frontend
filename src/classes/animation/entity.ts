import Phaser from 'phaser'

type AnimationConstructor = {
    scene: Phaser.Scene
    atlasName: string
    target: Phaser.Physics.Arcade.Sprite
}

class Animation {
    scene: Phaser.Scene
    target: Phaser.Physics.Arcade.Sprite

    constructor(data: AnimationConstructor) {
        const { scene, atlasName, target } = data
        this.scene = scene
        this.target = target
        this.createIdleState(atlasName)
        this.createWalkState(atlasName)
        this.playAnimation('idle')
    }

    public playAnimation(animation: string) {
        this.scene.anims.play(animation, this.target)
    }

    private createIdleState(name: string) {
        this.scene.anims.create({
            key: 'idle',
            frames: name,
            frameRate: 10,
            repeat: -1,
        })
    }

    private createWalkState(name: string) {
        this.scene.anims.create({
            key: 'run',
            frames: name,
            frameRate: 10,
            repeat: -1,
        })
    }
}

export default Animation
