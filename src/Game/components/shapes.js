import { PropTypes } from 'react'

export const Point = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
})

export const BallShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  center: Point.isRequired,
  radius: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  direction: PropTypes.object,
})

export const BoardShape = PropTypes.shape({
  friction: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
})
