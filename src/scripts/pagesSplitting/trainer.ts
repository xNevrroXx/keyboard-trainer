// own modules
import {authenticate} from "../services/services";
import initTesting from "../modules/initTesting";
import getRandomNumber from "../modules/getRandomNumber";
// general statisticData
import {DIGITS, ENGLISH_ALPHABET, MATCH_PAGES_URL, SPECIAL_SYMBOLS} from "../generalData";
import initTraining from "../modules/initTraining";
// types
import {IStatisticWithText} from "../types";
import validate from "../modules/validate";

const maxLengthText: number = 70;

async function trainer() {
  try {
    const authenticateResponse = await authenticate(); // todo comeback this line

    try {
      const digitCheckbox: HTMLInputElement = document.querySelector("#digits");
      const symbolCheckbox: HTMLInputElement = document.querySelector("#symbols");
      const ownCharactersInput: HTMLInputElement = document.querySelector("#own-characters");

      const trainerOptions = {
        digits: digitCheckbox.checked,
        symbols: symbolCheckbox.checked,
        ownCharacters: ownCharactersInput.value
      }

      digitCheckbox.addEventListener("change", function () {
        if (this.checked) {
          trainerOptions.ownCharacters = "";
          ownCharactersInput.disabled = true;
        }
        else if (!symbolCheckbox.checked) {
          trainerOptions.ownCharacters = ownCharactersInput.value;
          ownCharactersInput.disabled = false;
        }
        trainerOptions.digits = this.checked;
      })
      symbolCheckbox.addEventListener("change", function () {
        if (this.checked) {
          trainerOptions.ownCharacters = "";
          ownCharactersInput.disabled = true;
        }
        else if (!digitCheckbox.checked) {
          trainerOptions.ownCharacters = ownCharactersInput.value;
          ownCharactersInput.disabled = false;
        }
        trainerOptions.symbols = this.checked;
      })
      ownCharactersInput.addEventListener("input", async function () {
        if (ownCharactersInput.nextElementSibling && ownCharactersInput.nextElementSibling.classList.contains("error-description")) {
          ownCharactersInput.nextElementSibling.remove();
        }
        if (this.value.length > 0) {
          trainerOptions.digits = false;
          trainerOptions.symbols = false;
          digitCheckbox.disabled = true;
          symbolCheckbox.disabled = true;
        }
        else {
          trainerOptions.digits = digitCheckbox.checked;
          trainerOptions.symbols = symbolCheckbox.checked;
          trainerOptions.ownCharacters = "";
          digitCheckbox.disabled = false;
          symbolCheckbox.disabled = false;
        }

        if (this.value.length > 0) {
          const resultValidation = await validate({trainingOwnChars: this.value}, "trainingOwnChars");
          if (resultValidation && resultValidation.trainingOwnChars) {
            const errorDescriptionElem = document.createElement("div");
            errorDescriptionElem.classList.add("error-description");
            errorDescriptionElem.textContent = resultValidation.trainingOwnChars;

            this.value = this.value.replace(/[^0-9}{\[\]:;'\/"<>,.~?!@#$%^&*()_+№\-=]/g, "");
            trainerOptions.ownCharacters = this.value;
            ownCharactersInput.after(errorDescriptionElem);
          }
          else {
            trainerOptions.ownCharacters = this.value;
          }
        }
      })
      ownCharactersInput.value = "";
      initTesting(onContinueTraining);

      function onContinueTraining(statisticWithText: IStatisticWithText) {
        const {statistic} = statisticWithText;
        const failureChars: string[] = statistic.map(charStatistic => {
          if (charStatistic.countMistakes > 0) {
            return charStatistic.char;
          }
        }).filter(char => char != undefined && char !== "Space" && char !== "Enter");

        let text: string = "";
        for (let i = 0; i < maxLengthText; i++) {
          let char;
          if (getRandomNumber(0, 3) === 3) { // 1/3 probability of getting the space char
            char = " ";
          }
          else {
            if (failureChars.length === 0) {
              char = getRandomChar(trainerOptions);
            }
            else if (failureChars.length < 4) {
              if (getRandomNumber(0, 3) === 3) { // 1/3 probability of getting the random char
                char = getRandomChar(trainerOptions);
              }
              else {
                char = failureChars[getRandomNumber(0, failureChars.length - 1)];
              }
            }
            else {
              if (getRandomNumber(0, 8) === 8) { // 1/8 probability of getting the random char
                char = getRandomChar(trainerOptions);
              }
              else {
                char = failureChars[getRandomNumber(0, failureChars.length - 1)];
              }
            }
          }

          text += char;
        }

        window.addEventListener("keyup", onConfirmContinueTraining)

        function onConfirmContinueTraining () {
          window.removeEventListener("keyup", onConfirmContinueTraining);
          initTraining(onContinueTraining, text);
        }
      }
    }
    catch (error) {
      console.log("error: ", error);
    }
  } catch {
    window.location.href = MATCH_PAGES_URL["login"].pathname + MATCH_PAGES_URL["login"].possibleHashValue["sign-in"]
  }
}

function getRandomChar(trainerOptions: {digits: boolean, symbols: boolean, ownCharacters: string}) {
  if (trainerOptions.ownCharacters.length > 0) {
    if (getRandomNumber(0,3) === 3) { // 1/3 probability of getting the symbol
      return trainerOptions.ownCharacters[getRandomNumber(0, trainerOptions.ownCharacters.length - 1)];
    }
    else {
      return ENGLISH_ALPHABET[getRandomNumber(0, ENGLISH_ALPHABET.length - 1)];
    }
  }
  else if (trainerOptions.digits && trainerOptions.symbols) {
    if (getRandomNumber(0,3) === 3) { // 1/3 probability of getting the digit or the symbol
      if (getRandomNumber(0,1) === 0) {
        return SPECIAL_SYMBOLS[getRandomNumber(0, SPECIAL_SYMBOLS.length - 1)];
      }
      else {
        return DIGITS[getRandomNumber(0, DIGITS.length - 1)];
      }
    }

    return ENGLISH_ALPHABET[getRandomNumber(0, ENGLISH_ALPHABET.length - 1)];
  }
  else if (trainerOptions.digits) {
    if (getRandomNumber(0,3) === 3) { // 1/3 probability of getting the digit
      return DIGITS[getRandomNumber(0, DIGITS.length - 1)];
    }
    else {
      return ENGLISH_ALPHABET[getRandomNumber(0, ENGLISH_ALPHABET.length - 1)];
    }
  }
  else if (trainerOptions.symbols) {
    if (getRandomNumber(0,3) === 3) { // 1/3 probability of getting the symbol
      return SPECIAL_SYMBOLS[getRandomNumber(0, SPECIAL_SYMBOLS.length - 1)];
    }
    else {
      return ENGLISH_ALPHABET[getRandomNumber(0, ENGLISH_ALPHABET.length - 1)];
    }
  }
  else {
    return ENGLISH_ALPHABET[getRandomNumber(0, ENGLISH_ALPHABET.length - 1)];
  }
}

export default trainer;