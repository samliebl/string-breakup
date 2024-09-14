export function stringBreakup(inputString, breakOption = "vowel", frequency = 1) {
  // Convert input string to lowercase, remove all whitespace, punctuation, and numbers
  inputString = inputString.toLowerCase().replace(/[\s\p{P}\d]+/gu, "");

  // Helper function to check if a character is a vowel or part of a diphthong
  const isVowel = (char, nextChar) => {
    const vowels = "aeiou";
    const diphthongs = ["ai", "au", "ei", "eu", "oi", "ou"];
    const pair = char + nextChar;
    return vowels.includes(char) || diphthongs.includes(pair);
  };

  // Main splitting logic
  if (breakOption === "vowel") {
    let result = [];
    let tempString = "";
    let vowelCount = 0;

    for (let i = 0; i < inputString.length; i++) {
      tempString += inputString[i];
      if (isVowel(inputString[i], inputString[i + 1])) {
        vowelCount++;
        // If a diphthong is found, skip the next character
        if (isVowel(inputString[i], inputString[i + 1])) {
          tempString += inputString[i + 1];
          i++; // Skip the next character as it's part of the diphthong
        }
      }

      if (vowelCount === frequency) {
        result.push(tempString);
        tempString = "";
        vowelCount = 0;
      }
    }

    // Push remaining string if any
    if (tempString) {
      result.push(tempString);
    }

    return result;
  }

  // Future breakOptions can be added here
  return [inputString]; // Default behavior, return input as a single string array
}
