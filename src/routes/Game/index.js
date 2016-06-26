import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'game',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Game = require('./containers/GameContainer').default
      const boardReducer = require('./modules/board').default
      const ballsReducer = require('./modules/balls').default

      injectReducer(store, { key: 'board', reducer: boardReducer })
      injectReducer(store, { key: 'balls', reducer: ballsReducer })

      cb(null, Game)

    /* Webpack named bundle   */
    }, 'game')
  },
})
