import React from 'react'
import { useSelector } from 'react-redux'
import { getHighlightedText } from '../utils/utils'

const setHighlightedText = (text, isWelsh) => {
  const { vowels, parts } = getHighlightedText(text, isWelsh)
  return (
    <span>
      {parts.map((part) =>
        vowels.includes(part.toLowerCase()) ? <span className={`Vowel-${isWelsh}`}>{part}</span> : part
      )}
    </span>
  )
}

export const HighlightedText = () => {
  const { translations } = useSelector((state) => state)
  const last = translations[translations.length - 1]
  return (
    <div className="Section highlighted">
      <div>
        {setHighlightedText(last.welsh, true)}
        {`  -  ${last.cyPercentage}%`}
      </div>
      <div className="english">
        {setHighlightedText(last.english || '', false)}
        {`  -  ${last.enPercentage}%`}
      </div>
    </div>
  )
}
