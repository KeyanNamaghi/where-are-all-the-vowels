import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import randomWords from 'random-words'
import { useDispatch, useSelector } from 'react-redux'
import { FETCH_TRANSLATION_REQUEST } from '../actions'
import { capitalizeFirstLetter, validLength } from '../utils/utils'

export const Inputs = () => {
  const [search, setSearch] = useState('Welcome')
  const dispatch = useDispatch()
  const { cache } = useSelector((state) => state)

  const handleFetchTranslation = (term) => {
    if (cache.includes(term.toLowerCase())) {
      console.log('cache')
    } else {
      if (validLength(term)) dispatch(FETCH_TRANSLATION_REQUEST(term))
    }
  }

  const handleFetchRandomTranslation = () => {
    const randomWord = randomWords()
    setSearch(capitalizeFirstLetter(randomWord))
    handleFetchTranslation(randomWord)
  }

  return (
    <div className="Inputs">
      <TextField
        id="filled-basic"
        variant="outlined"
        className="TextField"
        onChange={(event) => setSearch(event.target.value)}
        value={search}
        // onKeyDown={handleKeyDown}
      />
      <Button variant="contained" color="primary" className="Button" onClick={() => handleFetchTranslation(search)}>
        Search
      </Button>
      <Button variant="contained" color="secondary" onClick={handleFetchRandomTranslation} className="Button">
        Random
      </Button>
    </div>
  )
}
