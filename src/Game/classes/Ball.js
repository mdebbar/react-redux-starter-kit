var seqId = 0

export default class Ball {
  constructor({ center, radius, selected, id }) {
    this._update({ center, radius, selected })
    this.id = id || ++seqId
  }

  move(movement) {
    const center = movement.apply(this.center)
    return new Ball(this)._update({ center })
  }

  select(selected) {
    selected = selected || typeof selected === 'undefined'
    return new Ball(this)._update({ selected })
  }

  equals(other) {
    return this.radius === other.radius &&
           this.center.x === other.center.x &&
           this.center.y === other.center.y
  }

  _update(attributes) {
    Object.keys(attributes).forEach(key => {
      this[key] = attributes[key]
    })
    return this
  }
}
