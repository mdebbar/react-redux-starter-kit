import React, { Component, PropTypes } from 'react'
import classes from './Game.scss'
import GameControls from './GameControls'
import GameBoard from './GameBoard'
import GameObject from './GameObject'
import Circle from '../../game/Circle'

export default class Game extends Component {
  static propTypes = {
    board: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
    objects: PropTypes.array.isRequired,
    addObject: PropTypes.func.isRequired,
    moveObject: PropTypes.func.isRequired,
    removeObject: PropTypes.func.isRequired,
  }

  render() {
    const { board, objects, removeObject } = this.props
    return (
      <div className={classes.gameContainer}>
        <GameControls onMove={this.onMove} />
        <GameBoard className={classes.gameBoard} width={board.width} height={board.height}>
          {objects.map(this.renderObject, this)}
        </GameBoard>
        <button className='btn btn-default' onClick={this.addRandomObject}>
          + New Object
        </button>
      </div>
    )
  }

  renderObject(obj) {
    const onClick = () => this.props.removeObject(obj)
    return (
      <GameObject
        key={obj.id}
        object={obj}
        onClick={onClick}
      />
    )
  }

  onMove = (direction) => {
    const { objects, moveObject } = this.props
    if (objects.length > 0) {
      moveObject(objects[0], direction)
    }
  }

  addRandomObject = () => {
    const { board, addObject } = this.props
    addObject(Circle.randomWithin(board.width, board.height))
  }
}
