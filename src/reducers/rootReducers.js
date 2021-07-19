import { combineReducers } from 'redux'
import translations from './translations'
import cache from './cache'

const allReducers = combineReducers({ translations, cache })

export default allReducers
