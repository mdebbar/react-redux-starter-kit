// ------------------------------------
// Constants
// ------------------------------------
export const SET_BOARD_SIZE = 'SET_BOARD_SIZE'

// ------------------------------------
// Actions
// ------------------------------------
export function setBoardSize({ width, height }) {
  return {
    type: SET_BOARD_SIZE,
    payload: { width, height },
  }
}

export const actions = {
  setBoardSize,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_BOARD_SIZE]: (state, action) => {
    return {
      ...state,
      ...action.payload,
    }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { width: 500, height: 250 }
export default function boardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
