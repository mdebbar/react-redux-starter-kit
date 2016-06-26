import { injectReducer } from '../store/reducers'

export default (store) => ({
  path: 'game',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const GameContainer = require('./Container').default
      const boardReducer = require('./reducers/board').default
      const ballsReducer = require('./reducers/balls').default

      injectReducer(store, { key: 'board', reducer: boardReducer })
      injectReducer(store, { key: 'balls', reducer: ballsReducer })

      cb(null, GameContainer)

    /* Webpack named bundle   */
    }, 'game')
  },
})
