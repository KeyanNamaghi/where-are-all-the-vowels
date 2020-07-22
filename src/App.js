import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import randomWords from "random-words";
import VowelPercentage from "./ConsonantCounter";
import API from "./Translate";

import "./App.css";

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

function App() {
  const [search, setSearch] = useState("Welcome");
  const [text, setText] = useState("Welcome");
  const [welshText, setWelshText] = useState("Croeso");

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
                onChange={event => setSearch(event.target.value)}
                value={search}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => API(search, setText, setWelshText)}
                className="Button"
              >
                Search
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => API(randomWords(), setText, setWelshText)}
                className="Button"
              >
                Random Phrase
              </Button>
            </div>
          </div>
          <div className="Section highlighted">
            <div>
              {getHighlightedText(welshText, true)}
              {"  -  "}
              <VowelPercentage string={welshText} isWelsh />
            </div>
            <div className="english">
              {getHighlightedText(text || "", false)}
              {"  -  "}
              <VowelPercentage string={text} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
