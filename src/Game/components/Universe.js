import React, { Component, PropTypes } from 'react'
import Collisions from '../classes/Collisions'
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

    // Try to move the ball if it doesn't cause collision.
    var newBall = ball.move()
    if (this.isColliding(newBall)) {
      return updateBall(ball.update({ speed: 0 }))
    }

    // Decelerate the ball based on current friction of the universe.
    const { friction } = this.props.board
    newBall = newBall.accelerate(1 - friction)
    updateBall(newBall)

    // Clear any previously scheduled movements for this ball.
    if (this.timers[ball.id]) {
      clearTimeout(this.timers[ball.id])
    }

    if (newBall.speed > SPEED_THROSHOLD) {
      // Schedule the next movement based on the ball's speed.
      const timeout = 1000 / newBall.speed
      this.timers[ball.id] = setTimeout(() => {
        this.moveBall(newBall)
      }, timeout)
    }
  }

  isColliding(ball) {
    const { balls, board } = this.props
    const others = balls.filter(b => b.id !== ball.id)
    const collisions = new Collisions(board, others)
    return collisions.isColliding(ball)
  }
}
