var seqId = 0

export default class Ball {
  constructor(options) {
    this.update({
      ...options,
      id: options.id || ++seqId,
      selected: options.selected || false,
      speed: options.speed || 0,
    })
  }

  move() {
    const center = this.direction.apply(this.center)
    return new Ball(this).update({ center })
  }

  accelerate(factor) {
    return this.update({ speed: this.speed * factor })
  }

  update(attributes) {
    Object.keys(attributes).forEach(key => {
      this[key] = attributes[key]
    })
    return this
  }
}
