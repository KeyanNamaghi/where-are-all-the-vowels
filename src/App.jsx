import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import randomWords from "random-words";
import VowelPercentage from "./ConsonantCounter";
import API from "./Translate";
import Graph from "./Graph";

import "./App.css";

const getHighlightedText = (text, isWelsh) => {
  // Split text on highlight term, include term itself into parts, ignore case
  // â, ê, î, ô, û, ŵ, ŷ
  const vowels = isWelsh
    ? [
        "a",
        "â",
        "e",
        "ê",
        "i",
        "î",
        "o",
        "ô",
        "u",
        "û",
        "w",
        "ŵ",
        "y",
        "ŷ",
        "'"
      ]
    : ["a", "e", "i", "o", "u", "'"];
  const parts = isWelsh
    ? text.split(new RegExp(`(a|â|e|ê|i|î|o|ô|u|û|w|ŵ|y|ŷ|')`, "gi"))
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
  const [data1, setdata1] = useState([
    {
      x: 0,
      y: 10
    }
  ]);

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
              <Button
                variant="contained"
                color="secondary"
                onClick={() =>
                  setdata1(
                    data1.concat([
                      {
                        x: 10,
                        y: 220
                      }
                    ])
                  )
                }
                className="Button"
              >
                Random plot
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
        <div style={{ height: 200, width: "100%" }}>
          <Graph
            data={[
              {
                id: "Japan",
                color: "hsl(104, 70%, 50%)",
                data: data1
              },
              {
                id: "Kenya",
                color: "hsl(124, 70%, 50%)",
                data: [
                  {
                    x: 0,
                    y: 300
                  },
                  {
                    x: 10,
                    y: 2000
                  }
                ]
              }
            ]}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
