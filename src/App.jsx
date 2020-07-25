import React, { useState, useEffect } from "react";
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

const averageFromData = data => {
  let total = 0;
  for (let entry of data) {
    total += entry.y;
  }
  total /= data.length;
  return Math.round(total * 1e2) / 1e2;
};

function App() {
  const [search, setSearch] = useState("Welcome");
  const [text, setText] = useState("Welcome");
  const [welshText, setWelshText] = useState("Croeso");
  const [dataEnglish, setDataEnglish] = useState([]);
  const [dataWelsh, setDataWelsh] = useState([]);

  useEffect(() => {
    console.log("text");
    setDataEnglish(
      dataEnglish.concat([
        {
          x: dataEnglish.length,
          y: VowelPercentage({ string: text, isWelsh: false })
        }
      ])
    );
    setDataWelsh(
      dataWelsh.concat([
        {
          x: dataWelsh.length,
          y: VowelPercentage({ string: welshText, isWelsh: true })
        }
      ])
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

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
                onClick={() => {
                  API(randomWords(), setText, setWelshText);
                }}
                className="Button"
              >
                Random Word
              </Button>
            </div>
          </div>
          <div className="Section highlighted">
            <div>
              {getHighlightedText(welshText, true)}
              {"  -  "}
              <VowelPercentage string={welshText} isWelsh />
              {"%"}
            </div>
            <div className="english">
              {getHighlightedText(text || "", false)}
              {"  -  "}
              <VowelPercentage string={text} />
              {"%"}
            </div>
          </div>
        </div>
        <div
          style={{
            height: 300,
            width: "100%",
            color: "black",
            fontSize: "12px"
          }}
        >
          <Graph
            data={[
              {
                id: "English",
                data: dataEnglish
              },
              {
                id: "Welsh",
                data: dataWelsh
              }
            ]}
          />
        </div>
        <div
          style={{
            fontSize: "12px"
          }}
        >
          <p>
            Using {dataEnglish.length} word{dataEnglish.length > 1 ? "s" : ""}:
          </p>
          <p>English average: {averageFromData(dataEnglish)}%</p>
          <p>Welsh average: {averageFromData(dataWelsh)}%</p>
        </div>
      </header>
    </div>
  );
}

export default App;
