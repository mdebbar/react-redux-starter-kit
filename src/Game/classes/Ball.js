var seqId = 0

export default class Ball {
  constructor(options) {
    this._update({
      ...options,
      id: options.id || ++seqId,
      selected: options.selected || false,
      speed: options.speed || 0,
    })
  }

  move() {
    const center = this.direction.apply(this.center)
    return this.update({ center })
  }

  accelerate(factor) {
    return this.update({ speed: this.speed * factor })
  }

  update(attributes) {
    return new Ball(this)._update(attributes)
  }

  _update(attributes) {
    return Object.assign(this, attributes)
  }
}
