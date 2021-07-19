import { call, put, takeEvery } from 'redux-saga/effects'

const makeRequest = async (word) => {
  const key = process.env.REACT_APP_GOOGLE_API_KEY
  const coreURL = 'https://translation.googleapis.com/language/translate/v2'

  const url = `${coreURL}?key=${key}&q=${encodeURI(word)}&source=en&target=cy`
  const res = await fetch(url)

  const payload = await res.json().catch(() => {})

  if (!res.ok) {
    throw payload
  }
  return payload
}

function* fetchUser(fetch) {
  try {
    const response = yield call(makeRequest, fetch.payload)
    yield put({ type: 'FETCH_TRANSLATION_SUCCESS', payload: { ...response, word: fetch.payload } })
    yield put({ type: 'CACHE_TERM', payload: fetch.payload })
  } catch (e) {
    yield put({ type: 'FETCH_TRANSLATION_FAILURE' })
  }
}

export default function* mySaga() {
  yield takeEvery('FETCH_TRANSLATION_REQUEST', fetchUser)
}
