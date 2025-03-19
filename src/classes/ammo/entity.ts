import { AmmoConstructor } from '@classes/ammo/types.ts'

class Ammo {
    readonly magazine: number
    currentMagazine: number
    max: number
    isReloading: boolean = false

    constructor(data: AmmoConstructor) {
        const { max, magazine } = data
        this.max = max
        this.magazine = magazine
        this.currentMagazine = magazine
    }

    get canShoot() {
        return this.currentMagazine > 0 && this.max > 0
    }

    get needReload() {
        return this.currentMagazine === 0
    }

    decrement() {
        this.currentMagazine -= 1
        this.max -= 1
    }
}

export default Ammo
