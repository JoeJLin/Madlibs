const submitButton = document.getElementById("submitButton");
const noun = document.getElementById("noun");
const adjective = document.getElementById("adjective");
const name = document.getElementById("name");
const sentence = document.getElementById("sentence");
const selectVoice = document.getElementById("selectVoice");
const error = document.getElementById("error");
const id = document.getElementById("output");

/**
 * on click
 * checks if the inputs are not empty
 * and call speak function
 * or display error
 */
submitButton.addEventListener("click", () => {
  if (name.value !== "" && noun.value !== "" && adjective.value !== "") {
    console.log(name.value);
    speak(randomSentence(name.value, noun.value, adjective.value));
  } else if (sentence.value !== "") {
    console.log(sentence.value);
    speak(sentence.value);
  } else {
    error.innerHTML = "You must enter the following field!!!";
  }
});

/**
 * @param name
 * @param noun
 * @param adjective
 * @return a randomized sentence filled with words
 */
randomSentence = (name, noun, adjective) => {
  let sentenceArr = [
    `Please excuse ${name}, who is far too ${adjective} to attend ${noun} class.`,
    `${adjective} ${name} is authorized to be at home instead of ${noun} class.`,
    `${name} is too ${adjective} for ${noun} class. Instead, she/he will be attending the party.`
  ];
  return sentenceArr[Math.floor(Math.random() * 3)];
};

/**
 * @param text
 * play the sentence and clear all the input
 */
speak = text => {
  let sentence = new SpeechSynthesisUtterance(text);
  let selectedOption = selectVoice.selectedOptions[0].getAttribute("data-name");
  let voices = speechSynthesis.getVoices();
  for (i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      sentence.voice = voices[i];
    }
  }

  sentence.pitch = 1.0;
  sentence.rate = 1.0;
  console.log(sentence);
  speechSynthesis.speak(sentence);

  noun.value = "";
  name.value = "";
  adjective.value = "";
  sentence.value = "";
  selectVoice.value =
    voices[0].name + " (" + voices[0].lang + ")" + " -- DEFAULT";
  console.log(voices[0]);
  output.innerHTML = text;
};

// generate select options
function populateVoiceList() {
  voices = speechSynthesis.getVoices();

  for (i = 0; i < voices.length; i++) {
    var option = document.createElement("option");
    option.textContent = voices[i].name + " (" + voices[i].lang + ")";

    if (voices[i].default) {
      option.textContent += " -- DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    selectVoice.appendChild(option);
  }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}
