require("dotenv").config();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const API = (word, setText, setWelshText) => {
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  let fromLang = "en";
  let toLang = "cy";

  let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  url += "&q=" + encodeURI(word);
  url += `&source=${fromLang}`;
  url += `&target=${toLang}`;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
    .then(res => res.json())
    .then(response => {
      setWelshText(
        capitalizeFirstLetter(response.data.translations[0].translatedText)
      );
      setText(capitalizeFirstLetter(word));
    })
    .catch(error => {
      console.log("There was an error with the translation request: ", error);
    });
};

export default API;
