import React from 'react'
import classes from './Game.scss'
import { BallShape } from '../shapes'

function getBallStyles(ball) {
  return {
    top: ball.center.y - ball.radius,
    left: ball.center.x - ball.radius,
    width: 2 * ball.radius,
    height: 2 * ball.radius,
  }
}

export const Ball = ({ ball, ...props }) => (
  <div {...props}
    className={[
      classes.ball,
      ball.selected ? classes.selected : '',
    ].join(' ')}
    style={getBallStyles(ball)}
  />
)

Ball.propTypes = {
  ball: BallShape.isRequired,
}

export default Ball
