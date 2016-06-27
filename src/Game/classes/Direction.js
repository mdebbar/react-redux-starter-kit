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

  constructor(shift) {
    this.shift = this._normalizeShift(shift)
  }

  apply(point) {
    return {
      x: point.x + this.shift.x,
      y: point.y + this.shift.y,
    }
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
