import React, { PropTypes } from 'react'
import { BallShape, BoardShape } from './shapes'

export const Hints = ({ balls, board }) => {
  if (balls.length === 0) {
    return <span>To add a ball, click anywhere inside the playing area.</span>
  }
  if (!balls.some(b => b.selected)) {
    return <span>Great! You've added some balls. Now click on any of them to select it.</span>
  }
  if (!balls.some(b => !!b.speed)) {
    return <span>You can move the selected ball by using the keyboard arrow keys.</span>
  }
  if (board.friction === 0.2) {
    return <span>To control the friction of the universe, use the slider above.</span>
  }
  return <span>Congrats! You've learned everything about this game!</span>
}

Hints.propTypes = {
  balls: PropTypes.arrayOf(BallShape).isRequired,
  board: BoardShape.isRequired,
}


export default Hints
