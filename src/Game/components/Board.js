import React, { PropTypes } from 'react'
import classes from './Game.scss'
import { BoardShape } from './shapes'
import { getPosition } from '../../util/dom'

function getClickPosition(event) {
  const boardPosition = getPosition(event.target)
  return {
    x: event.clientX - boardPosition.x,
    y: event.clientY - boardPosition.y,
  }
}

export const Board = ({ board, children, onClick, ...props }) => (
  <div {...props}
    className={classes.board}
    style={{ width: board.width, height: board.height }}
    onClick={(event) => onClick(getClickPosition(event))}>
    {children}
  </div>
)

Board.propTypes = {
  board: BoardShape.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Board
