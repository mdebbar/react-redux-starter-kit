import { distance } from '../../util/math'

export default class Collisions {
  constructor(boundaries, balls) {
    this.balls = balls
    this.boundaries = boundaries
  }

  isColliding(ball) {
    return this._outOfBoundaries(ball) ||
           this.balls.some(this._collide.bind(this, ball))
  }

  _outOfBoundaries(ball) {
    return ball.center.x - ball.radius < 0 ||
           ball.center.y - ball.radius < 0 ||
           ball.center.x + ball.radius >= this.boundaries.width ||
           ball.center.y + ball.radius >= this.boundaries.height
  }

  _collide(b1, b2) {
    return distance(b1.center, b2.center) <= b1.radius + b2.radius
  }
}
