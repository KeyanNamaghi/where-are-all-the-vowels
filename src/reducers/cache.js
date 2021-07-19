import { createReducer } from '@reduxjs/toolkit'
import { CACHE_TERM } from '../actions'

const initialState = ['welcome']

const translations = createReducer(initialState, {
  [CACHE_TERM.type]: (state, { payload }) => {
    state.push(payload.toLowerCase())
  }
})

export default translations
