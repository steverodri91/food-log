import * as types from './actionTypes'
export const setView = (view) => {
  return {
    type: types.SET_VIEW,
    payload: view
  }
}