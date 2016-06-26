import { PropTypes } from 'react'

export const Point = PropTypes.shape({
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
})

export const Dimensions = PropTypes.shape({
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
})

export const BallShape = PropTypes.shape({
  center: Point.isRequired,
  radius: PropTypes.number.isRequired,
})

export const BoardShape = Dimensions
