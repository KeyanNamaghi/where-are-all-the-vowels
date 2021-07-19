import React from 'react'
import Graph from './components/Graph'

import './App.css'
import { Inputs } from './components/Inputs'
import { HighlightedText } from './components/HighlightedText'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Container">
          <div className="Section">
            <Inputs />
          </div>
          <HighlightedText />
        </div>

        <Graph />
      </header>
    </div>
  )
}

export default App
