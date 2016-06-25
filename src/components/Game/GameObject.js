import React, { PropTypes } from 'react'
import classes from './Game.scss'

export const GameObject = ({ object, onClick }) => (
  <div
    className={classes.gameObject}
    style={{
      top: object.center.y - object.radius,
      left: object.center.x - object.radius,
      width: 2 * object.radius,
      height: 2 * object.radius,
    }}
    onClick={onClick}
  />
)

GameObject.propTypes = {
  object: PropTypes.object.isRequired,
  onClick: PropTypes.func,
}

export default GameObject
