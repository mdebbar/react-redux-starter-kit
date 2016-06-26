const directionToShift = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 },
}

export default class Movement {
  static fromDirection(direction) {
    if (direction in directionToShift) {
      return new Movement(directionToShift[direction])
    }
    throw new Error(`Unknown direction: "${direction}"`)
  }

  constructor(shift, step = 10) {
    this.shift = shift
    this.step = step
  }

  apply(point) {
    return {
      x: Math.floor(point.x + (this.step * this.shift.x)),
      y: Math.floor(point.y + (this.step * this.shift.y)),
    }
  }

  setStep(step) {
    return new Movement(this.shift, step)
  }

  multiply(factor) {
    return this.setStep(this.step * factor)
  }
}
