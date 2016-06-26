// ------------------------------------
// Constants
// ------------------------------------
export const ADD_BALL = 'ADD_BALL'
export const UPDATE_BALL = 'UPDATE_BALL'
export const REMOVE_BALL = 'REMOVE_BALL'

// ------------------------------------
// Actions
// ------------------------------------
export function addBall(ball) {
  return {
    type: ADD_BALL,
    payload: ball,
  }
}

export function updateBall(ball) {
  return {
    type: UPDATE_BALL,
    payload: ball,
  }
}

export function removeBall(ball) {
  return {
    type: REMOVE_BALL,
    payload: ball,
  }
}

export const actions = {
  addBall,
  updateBall,
  removeBall,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_BALL]: (state, action) => {
    return [...state, action.payload]
  },

  [UPDATE_BALL]: (state, action) => {
    return state.map(ball =>
      ball.id === action.payload.id ? action.payload : ball
    )
  },

  [REMOVE_BALL]: (state, action) => {
    return state.filter(ball => ball !== action.payload)
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []
export default function gameReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
