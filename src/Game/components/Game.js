import React, { Component, PropTypes } from 'react'

import Universe from './Universe'
import Controls from './Controls'
import Board from './Board'
import BallComponent from './Ball'
import FrictionRange from './FrictionRange'
import { BoardShape, BallShape } from './shapes'

import Ball from '../classes/Ball'
import { randomInt } from '../../util/math'

export default class Game extends Component {
  static propTypes = {
    board: BoardShape.isRequired,
    balls: PropTypes.arrayOf(BallShape).isRequired,
    addBall: PropTypes.func.isRequired,
    updateBall: PropTypes.func.isRequired,
    removeBall: PropTypes.func.isRequired,
    updateFriction: PropTypes.func.isRequired,
  }

  getSelectedBall() {
    return this.props.balls.find(ball => ball.selected)
  }

  render() {
    const { board, balls, updateBall, updateFriction } = this.props
    return (
      <Universe
        board={board}
        balls={balls}
        selectedBall={this.getSelectedBall()}
        controls={Controls}
        updateBall={updateBall}>
        <FrictionRange friction={board.friction} updateFriction={updateFriction} />
        <Board board={board} onClick={this.newBall}>
          {balls.map(this.renderBall, this)}
        </Board>
        <p><i><small>
          To add a ball, click anywhere inside the playing area.
        </small></i></p>
      </Universe>
    )
  }

  renderBall(ball) {
    const onClick = (event) => {
      event.stopPropagation()
      this.ballClick(ball)
    }
    return (
      <BallComponent
        key={ball.id}
        ball={ball}
        onClick={onClick}
      />
    )
  }

  newBall = (center) => {
    const radius = randomInt(10, 25)
    this.props.addBall(new Ball({ center, radius }))
  }

  ballClick = (ball) => {
    const selectedBall = this.getSelectedBall()
    // First, unselect the currently selected ball.
    if (selectedBall) {
      this.props.updateBall(selectedBall.update({ selected: false }))
    }
    // Then, select the clicked ball if it wasn't already selected.
    if (ball !== selectedBall) {
      this.props.updateBall(ball.update({ selected: true }))
    }
  }
}
