import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import "./App.css";

const phrases = [
  "Bore da",
  "Prynhawn da",
  "Noswaith dda",
  "Nos da",
  "Helô",
  "Sut mae?",
  "Croeso",
  "Mae'n bwrw glaw"
];

const getHighlightedText = text => {
  // Split text on highlight term, include term itself into parts, ignore case
  const vowels = ["a", "e", "i", "o", "ô", "u", "w", "y", "'"];
  const parts = text.split(new RegExp(`(a|e|i|o|ô|u|w|y|')`, "gi"));
  return (
    <span>
      {parts.map(part =>
        vowels.includes(part.toLowerCase()) ? (
          <span className="Vowel">{part}</span>
        ) : (
          part
        )
      )}
    </span>
  );
};

const randomisePhrase = (text, setText) => {
  let oldText = text;
  let newText = text;
  while (newText === oldText) {
    newText = phrases[Math.floor(Math.random() * phrases.length)];
    console.log(newText);
  }
  setText(newText);
};

function App() {
  const [text, setText] = useState("Croeso, sut mae?");
  return (
    <div className="App">
      <header className="App-header">
        <div className="Container">
          <div className="Section">
            <div className="Inputs">
              <TextField
                id="filled-basic"
                variant="outlined"
                className="TextField"
                onChange={event => setText(event.target.value)}
                value={text}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => randomisePhrase(text, setText)}
              >
                Random Phrase
              </Button>
            </div>
          </div>
          <div className="Section">{getHighlightedText(text)}</div>
        </div>
      </header>
    </div>
  );
}

export default App;
