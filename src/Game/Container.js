import { connect } from 'react-redux'
import { updateFriction, setBoardSize } from './reducers/board'
import { addBall, updateBall, removeBall } from './reducers/balls'

import Game from './components/Game'

const mapActionCreators = {
  updateFriction,
  setBoardSize,
  addBall,
  updateBall,
  removeBall,
}

const mapStateToProps = (state) => ({
  board: state.board,
  balls: state.balls,
})

export default connect(mapStateToProps, mapActionCreators)(Game)
