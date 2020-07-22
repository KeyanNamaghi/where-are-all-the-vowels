import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import "./App.css";

const phrases = {
  "Bore da": "Good morning",
  "Prynhawn da": "Good afternoon",
  "Noswaith dda": "Good evening",
  "Nos da": "Good night",
  Helô: "Hello",
  "Sut mae?": "How are you?",
  Croeso: "Welcome",
  "Mae'n bwrw glaw": "It's raining"
};

const getHighlightedText = (text, isWelsh) => {
  // Split text on highlight term, include term itself into parts, ignore case
  const vowels = isWelsh
    ? ["a", "e", "i", "o", "ô", "u", "w", "y", "'"]
    : ["a", "e", "i", "o", "u", "'"];
  const parts = isWelsh
    ? text.split(new RegExp(`(a|e|i|o|ô|u|w|y|')`, "gi"))
    : text.split(new RegExp(`(a|e|i|o|u|')`, "gi"));
  return (
    <span>
      {parts.map(part =>
        vowels.includes(part.toLowerCase()) ? (
          <span className={`Vowel-${isWelsh}`}>{part}</span>
        ) : (
          part
        )
      )}
    </span>
  );
};

var randomProperty = function() {
  var keys = Object.keys(phrases);
  return keys[(keys.length * Math.random()) << 0];
};

const randomisePhrase = (text, setText) => {
  let oldText = text;
  let newText = text;
  while (newText === oldText) {
    newText = randomProperty();
    console.log(newText);
  }
  setText(newText);
};

function App() {
  const [text, setText] = useState("Croeso");
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
          <div className="Section highlighted">
            {getHighlightedText(text, true)}
            <span className="english">
              {getHighlightedText(phrases[text] || "", false)}
            </span>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
