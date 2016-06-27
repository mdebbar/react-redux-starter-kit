const directionToShift = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 },
}

export default class Direction {
  static fromString(direction) {
    if (direction in directionToShift) {
      return new Direction(directionToShift[direction])
    }
    throw new Error(`Unknown direction: "${direction}"`)
  }

  static fromAngle(angle) {
    return new Direction({
      x: Math.cos(angle),
      y: Math.sin(angle),
    })
  }

  constructor(shift) {
    this.shift = this._normalizeShift(shift)
  }

  invert() {
    return new Direction({
      x: -this.shift.x,
      y: -this.shift.y,
    })
  }

  apply(point) {
    return {
      x: point.x + this.shift.x,
      y: point.y + this.shift.y,
    }
  }

  toAngle() {
    return Math.atan2(this.shift.y, this.shift.x)
  }

  _normalizeShift(shift) {
    const { x, y } = shift
    const max = Math.max(Math.abs(x), Math.abs(y))
    return {
      x: x / max,
      y: y / max,
    }
  }
}
