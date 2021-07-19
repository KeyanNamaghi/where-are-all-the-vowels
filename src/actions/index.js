import { createAction } from '@reduxjs/toolkit'

export const FETCH_TRANSLATION_REQUEST = createAction('FETCH_TRANSLATION_REQUEST')
export const FETCH_TRANSLATION_SUCCESS = createAction('FETCH_TRANSLATION_SUCCESS')
export const FETCH_TRANSLATION_FAILURE = createAction('FETCH_TRANSLATION_FAILURE')

export const CACHE_TERM = createAction('CACHE_TERM')
