import React, { PropTypes } from 'react'
import classes from './Game.scss'

export const FrictionRange = ({ friction, updateFriction }) => (
  <div>
    Friction: {' '}
    <input
      className={classes.frictionRange}
      type='range'
      value={friction * 100}
      onChange={(event) => updateFriction(event.target.value / 100)}
    />
  </div>
)

FrictionRange.propTypes = {
  friction: PropTypes.number.isRequired,
  updateFriction: PropTypes.func.isRequired,
}

export default FrictionRange
