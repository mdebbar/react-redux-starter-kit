import { distance } from '../../util/math'

export default class Collisions {
  constructor(balls) {
    this.balls = balls
  }

  isColliding(ball) {
    return this.balls.some(this._collide.bind(this, ball))
  }

  safeMove(ball, movement) {
    // If ball is already colliding, move it further until it's not colliding.
    const delta = this.isColliding(ball) ? 1 : -1
    while (!this._isSafeMove(ball, movement)) {
      movement = movement.setStep(movement.step + delta)
    }
    return ball.move(movement)
  }

  _isSafeMove(ball, movement) {
    return !this.isColliding(ball.move(movement))
  }

  _collide(b1, b2) {
    return distance(b1.center, b2.center) < b1.radius + b2.radius - 1
  }
}
