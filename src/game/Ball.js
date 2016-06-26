import Movement from './Movement'

var seqId = 0

export default class Ball {
  constructor({ center, radius, selected, id }) {
    this._update({ center, radius, selected })
    this.id = id || ++seqId
  }

  move(direction) {
    const center = new Movement(direction).apply(this.center)
    return new Ball(this)._update({ center })
  }

  select(selected) {
    selected = selected || typeof selected === 'undefined'
    return new Ball(this)._update({ selected })
  }

  _update(attributes) {
    Object.keys(attributes).forEach(key => {
      this[key] = attributes[key]
    })
    return this
  }
}
