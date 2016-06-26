import { connect } from 'react-redux'
import { setBoardSize } from '../modules/board'
import { addBall, updateBall, removeBall } from '../modules/balls'

import Game from 'components/Game'

const mapActionCreators = {
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
