
export default class Movement {
  constructor(direction, step = 10) {
    this.direction = direction
    this.step = step
  }

  apply(point) {
    const delta = this._getDelta()
    return {
      x: point.x + (this.step * delta.x),
      y: point.y + (this.step * delta.y),
    }
  }

  _getDelta() {
    switch (this.direction.toLowerCase()) {
      case 'up': return { x: 0, y: -1 }
      case 'down': return { x: 0, y: 1 }
      case 'right': return { x: 1, y: 0 }
      case 'left': return { x: -1, y: 0 }
      default:
        throw new Error(`Unknown direction: "${this.direction}"`)
    }
  }
}
