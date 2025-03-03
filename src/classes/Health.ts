class Health {
  health: number
  maxHealth: number

  constructor(health: number) {
    this.health = health
    this.maxHealth = health
  }

  decrementHealth(damage: number) {
    this.health -= damage
  }
}

export default Health

