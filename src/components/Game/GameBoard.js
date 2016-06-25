import React, { PropTypes } from 'react'
import classes from './Game.scss'

export const GameBoard = ({ width, height, children }) => (
  <div className={classes.gameBoard} style={{ width, height }}>
    {children}
  </div>
)

GameBoard.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.node,
}

export default GameBoard
