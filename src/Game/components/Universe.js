import React, { Component, PropTypes } from 'react'
import Collisions from '../classes/Collisions'
import Direction from '../classes/Direction'
import { BallShape, BoardShape } from './shapes'

const SPEED_THROSHOLD = 20

/**
 * The Universe class is responsible for moving objects according to their speed.
 */
export default class Universe extends Component {
  static propTypes = {
    balls: PropTypes.arrayOf(BallShape).isRequired,
    selectedBall: BallShape,
    board: BoardShape.isRequired,
    controls: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    updateBall: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.timers = {}
    // Resume moving balls that were already moving.
    this.props.balls.forEach(ball => {
      if (ball.speed > SPEED_THROSHOLD) {
        this.moveBall(ball)
      }
    })
  }

  componentWillUnmount() {
    Object.keys(this.timers)
          .map(id => this.timers[id])
          .forEach(clearTimeout)
    this.timers = null
  }

  render() {
    const { selectedBall, children } = this.props
    const Controls = this.props.controls
    return (
      <div>
        <Controls enabled={!!selectedBall} onMove={this.startMovingSelectedBall} />
        {children}
      </div>
    )
  }

  startMovingSelectedBall = (direction) => {
    this.startMovingBall(this.props.selectedBall, direction)
  }

  /**
   * Can be used in two cases:
   * 1. When user moves a ball.
   * 2. When a ball is hit by another ball.
   */
  startMovingBall(ball, direction, speed = 10000) {
    this.moveBall(ball.update({ direction, speed }))
  }

  moveBall(ball) {
    const { updateBall } = this.props

    // If the ball is already collided, don't move it!
    if (this.getCollider(ball)) {
      return
    }

    // Move the ball, handle any collisions and decelerate based on current friction of universe.
    const { friction } = this.props.board
    const movedBall = this.moveAndHandleCollision(ball).accelerate(1 - friction)
    updateBall(movedBall)

    // Schedule the next movement of the ball
    this.scheduleNextMove(movedBall)
  }

  // Move the ball and update direction if a collision occurs.
  // Also start moving the collider.
  moveAndHandleCollision(ball) {
    const movedBall = ball.move()
    const collider = this.getCollider(movedBall)
    if (collider) {
      const direction = Direction.fromAngle(collider.angle)
      if (collider.ball) {
        this.startMovingBall(collider.ball, direction, ball.speed)
      }
      return ball.update({ direction: direction.invert() })
    }
    return movedBall
  }

  scheduleNextMove(ball) {
    // Clear any previously scheduled movements for this ball.
    if (this.timers[ball.id]) {
      clearTimeout(this.timers[ball.id])
    }

    if (ball.speed > SPEED_THROSHOLD) {
      // Schedule the next movement based on the ball's speed.
      const timeout = 1000 / ball.speed
      this.timers[ball.id] = setTimeout(() => {
        // The list of balls might have changed.. get the most up to date ball.
        const upToDateBall = this.props.balls.find(b => b.id === ball.id)
        if (upToDateBall) {
          this.moveBall(upToDateBall)
        }
      }, timeout)
    }
  }

  getCollider(ball) {
    const { balls, board } = this.props
    const others = balls.filter(b => b.id !== ball.id)
    const collisions = new Collisions(board, others)
    return collisions.getCollider(ball)
  }
}
