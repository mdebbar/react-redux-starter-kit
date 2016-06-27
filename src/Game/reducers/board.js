// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_FRICTION = 'UPDATE_FRICTION'
export const SET_BOARD_SIZE = 'SET_BOARD_SIZE'

// ------------------------------------
// Actions
// ------------------------------------
export function updateFriction(friction) {
  return {
    type: UPDATE_FRICTION,
    payload: friction,
  }
}

export function setBoardSize({ width, height }) {
  return {
    type: SET_BOARD_SIZE,
    payload: { width, height },
  }
}

export const actions = {
  updateFriction,
  setBoardSize,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_FRICTION]: (state, action) => {
    return {
      ...state,
      friction: action.payload,
    }
  },

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
const initialState = { friction: 0.2, width: 500, height: 250 }
export default function boardReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
