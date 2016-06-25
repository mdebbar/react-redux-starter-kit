import { connect } from 'react-redux'
import { addObject, moveObject, removeObject } from '../modules/game'

import Game from 'components/Game'

const mapActionCreators = {
  addObject,
  moveObject,
  removeObject,
}

const mapStateToProps = (state) => ({
  board: state.game.board,
  objects: state.game.objects,
})

export default connect(mapStateToProps, mapActionCreators)(Game)
