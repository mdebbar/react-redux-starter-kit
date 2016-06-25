import Movement from './Movement'
import { randomInt } from '../util/math'

var seqId = 0

export default class Circle {
  static randomWithin(width, height) {
    const radius = randomInt(10, 30)
    const center = {
      x: randomInt(radius, width - radius),
      y: randomInt(radius, height - radius),
    }
    return new Circle({ center, radius })
  }

  constructor({ center, radius, id }) {
    this._update({ center, radius })
    this.id = id || ++seqId
  }

  move(direction) {
    const center = new Movement(direction).apply(this.center)
    return new Circle(this)._update({ center })
  }

  _update({ center, radius }) {
    this.center = center || this.center
    this.radius = radius || this.radius
    return this
  }
}
