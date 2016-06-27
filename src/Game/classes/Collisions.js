import { angle, distance } from '../../util/math'

const WALL_EAST = 'east'
const WALL_WEST = 'west'
const WALL_NORTH = 'north'
const WALL_SOUTH = 'south'

export default class Collisions {
  constructor(boundaries, balls) {
    this.balls = balls
    this.boundaries = boundaries
  }

  isColliding(ball) {
    return this._outOfBoundaries(ball) ||
           !!this._getColliderBall(ball)
  }

  getCollider(ball) {
    const wall = this._getColliderWall(ball)
    if (wall) {
      return {
        wall,
        angle: this._getAngleWithWall(ball, wall),
      }
    }

    const colliderBall = this._getColliderBall(ball)
    if (colliderBall) {
      return {
        ball: colliderBall,
        angle: angle(ball.center, colliderBall.center),
      }
    }
  }

  _getColliderBall(ball) {
    return this.balls.find(this._collide.bind(this, ball))
  }

  _outOfBoundaries(ball) {
    return !!this._getColliderWall(ball)
  }

  _getColliderWall(ball) {
    if (ball.center.x - ball.radius < 0) {
      return WALL_WEST
    }
    if (ball.center.y - ball.radius < 0) {
      return WALL_NORTH
    }
    if (ball.center.x + ball.radius >= this.boundaries.width) {
      return WALL_EAST
    }
    if (ball.center.y + ball.radius >= this.boundaries.height) {
      return WALL_SOUTH
    }
  }

  _getAngleWithWall(ball, wall) {
    switch (wall) {
      case WALL_EAST:
      case WALL_WEST:
        return -ball.direction.toAngle()
      case WALL_NORTH:
      case WALL_SOUTH:
        return Math.PI - ball.direction.toAngle()
    }
  }

  _collide(b1, b2) {
    return distance(b1.center, b2.center) <= b1.radius + b2.radius
  }
}
