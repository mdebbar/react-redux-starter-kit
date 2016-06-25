// ------------------------------------
// Constants
// ------------------------------------
export const ADD_OBJECT = 'ADD_OBJECT'
export const MOVE_OBJECT = 'MOVE_OBJECT'
export const REMOVE_OBJECT = 'REMOVE_OBJECT'

// ------------------------------------
// Actions
// ------------------------------------
export function addObject(object) {
  return {
    type: ADD_OBJECT,
    payload: object,
  }
}

export function moveObject(object, direction) {
  return {
    type: MOVE_OBJECT,
    payload: { object, direction },
  }
}

export function removeObject(object) {
  return {
    type: REMOVE_OBJECT,
    payload: object,
  }
}

export const actions = {
  addObject,
  moveObject,
  removeObject,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_OBJECT]: (state, action) => {
    return {
      ...state,
      objects: [...state.objects, action.payload],
    }
  },

  [MOVE_OBJECT]: (state, action) => {
    const { objects } = state
    const { payload: { object, direction } } = action
    const index = objects.indexOf(object)

    if (index === -1) {
      throw new Error("Trying to move an object that doesn't exist!")
    }

    return {
      ...state,
      objects: [
        ...objects.slice(0, index),
        objects[index].move(direction),
        ...objects.slice(index + 1),
      ],
    }
  },

  [REMOVE_OBJECT]: (state, action) => {
    var { objects } = state
    const index = objects.indexOf(action.payload)

    if (index === -1) {
      throw new Error("Trying to remove an object that doesn't exist!")
    }

    objects = objects.slice()
    objects.splice(index, 1)
    return { ...state, objects }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { objects: [], board: { width: 400, height: 200 } }
export default function gameReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
