require("dotenv").config();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const API = (word, setText, setWelshText) => {
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const CACHING_SERVER = "https://test-server-keyan.herokuapp.com/translations";
  let fromLang = "en";
  let toLang = "cy";
  let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  url += "&q=" + encodeURI(word);
  url += `&source=${fromLang}`;
  url += `&target=${toLang}`;

  fetch(`${CACHING_SERVER}/search?word=${word.toLowerCase()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }).then(res =>
    res
      .json()
      .then(response => {
        console.log("Checking caching server");
        console.log(response);
        if (response !== null) {
          setWelshText(capitalizeFirstLetter(response[word.toLowerCase()]));
          setText(capitalizeFirstLetter(word));
        } else {
          fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
          })
            .then(res => res.json())
            .then(response => {
              console.log(
                "Wasn't in caching server, using google translate API"
              );
              setWelshText(
                capitalizeFirstLetter(
                  response.data.translations[0].translatedText
                )
              );
              setText(capitalizeFirstLetter(word));

              let english = word.toLowerCase();
              let welsh = response.data.translations[0].translatedText;
              let cachingBody = { [english]: welsh };

              fetch(`${CACHING_SERVER}/new`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                },
                body: JSON.stringify(cachingBody)
              })
                .then(res => {
                  console.log(`caching ${word}`);
                })
                .catch(error => {
                  console.log(
                    "There was an error caching to the caching server: ",
                    error
                  );
                });
            })
            .catch(error => {
              console.log(
                "There was an error with the translation request: ",
                error
              );
            });
        }
      })
      .catch(error => {
        console.log("There was an error with the caching request: ", error);
      })
  );
};

export default API;
