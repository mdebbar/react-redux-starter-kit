import React, { PropTypes } from 'react'
import classes from './Game.scss'
import { BoardShape } from './shapes'

export const Board = ({ board, children, ...props }) => (
  <div {...props}
    className={classes.board}
    style={{ width: board.width, height: board.height }}>
    {children}
  </div>
)

Board.propTypes = {
  board: BoardShape.isRequired,
  children: PropTypes.node,
}

export default Board
