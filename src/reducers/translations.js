import { createReducer } from '@reduxjs/toolkit'
import { FETCH_TRANSLATION_SUCCESS } from '../actions'
import { capitalizeFirstLetter, vowelPercentage } from '../utils/utils'

const initialState = [{ english: 'Welcome', welsh: 'Croeso', enPercentage: 42.86, cyPercentage: 50 }]

const translations = createReducer(initialState, {
  [FETCH_TRANSLATION_SUCCESS.type]: (state, { payload }) => {
    state.push({
      english: capitalizeFirstLetter(payload.word),
      welsh: capitalizeFirstLetter(payload.data.translations[0].translatedText),
      enPercentage: vowelPercentage(payload.word),
      cyPercentage: vowelPercentage(payload.data.translations[0].translatedText, true)
    })
  }
})

export default translations
