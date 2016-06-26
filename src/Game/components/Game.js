import React, { Component, PropTypes } from 'react'
import classes from './Game.scss'
import Controls from './Controls'
import Board from './Board'
import BallComponent from './Ball'
import Ball from '../classes/Ball'
import Collisions from '../classes/Collisions'
import { randomInt } from '../../util/math'
import { getPosition } from '../../util/dom'
import { BoardShape, BallShape } from './shapes'

export default class Game extends Component {
  static propTypes = {
    board: BoardShape.isRequired,
    balls: PropTypes.arrayOf(BallShape).isRequired,
    addBall: PropTypes.func.isRequired,
    updateBall: PropTypes.func.isRequired,
    removeBall: PropTypes.func.isRequired,
  }

  getSelectedBall() {
    return this.props.balls.find(ball => ball.selected)
  }

  render() {
    const { board, balls } = this.props
    const enableMovement = !!this.getSelectedBall()
    return (
      <div className={classes.container}>
        <Controls enabled={enableMovement} onMove={this.onMove} />
        <Board board={board} onClick={this.boardClick}>
          {balls.map(this.renderBall, this)}
        </Board>
        <p><i><small>
          To add a ball, click anywhere inside the playing area.
        </small></i></p>
      </div>
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

  boardClick = (event) => {
    const boardPosition = getPosition(event.target)
    const center = {
      x: event.clientX - boardPosition.x,
      y: event.clientY - boardPosition.y,
    }
    const radius = randomInt(10, 25)
    this.props.addBall(new Ball({ center, radius }))
  }

  ballClick = (ball) => {
    const selectedBall = this.getSelectedBall()
    // First, unselect the currently selected ball.
    if (selectedBall) {
      this.props.updateBall(selectedBall.select(false))
    }
    // Then, select the clicked ball if it wasn't already selected.
    if (ball !== selectedBall) {
      this.props.updateBall(ball.select(true))
    }
  }

  onMove = (movement) => {
    const selectedBall = this.getSelectedBall()
    const others = this.props.balls.filter(ball => ball !== selectedBall)
    const collisions = new Collisions(others)
    this.props.updateBall(collisions.safeMove(selectedBall, movement))
  }
}
