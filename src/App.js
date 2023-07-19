import { useState } from "react";

function App() {
  const [anagrams, setAnagrams] = useState([]);
  const [showModal, setShowModal] = useState(false);

  function onChange(event) {
    let files = event.target.files;
    if (!files.length) {
      console.log("No file selected.");
      return;
    }
    let file = files[0];
    if (!file.type.match("text.*")) {
      // show modal
      setShowModal(true);
      // clear the file input field
      event.target.value = null;
      return;
    }
    let reader = new FileReader();
    reader.onload = (event) => {
      let fileContents = event.target.result;
      let words = fileContents.split("\n").map((word) => word.trim());
      setAnagrams(anagramCompiler(words));
    };
    reader.readAsText(file);
  }

  function anagramCompiler(words) {
    const anagramMap = new Map();

    // Loop through the words array
    for (let i = 0; i < words.length; i++) {
      // Remove non-letter characters, convert to lowercase, sort, and join the letters to create a sorted word
      const sorted = words[i]
        .replace(/[^a-z]/gi, "")
        .toLowerCase()
        .split("")
        .sort()
        .join("");
      // If the sorted word is already in the Map, add the original word to its array of anagrams
      if (anagramMap.has(sorted)) {
        anagramMap.get(sorted).push(words[i]);
      }
      // else, key-value pair with the sorted word as key and an array containing the original word as value
      else {
        anagramMap.set(sorted, [words[i]]);
      }
    }

    // Initialize an empty array to store the result
    let result = [];
    // Loop through the entries of the anagramMap
    for (const [anagrams] of anagramMap) {
      // Join the array of anagrams with a space separator and add it to the result array
      result.push(anagrams.join(" "));
    }

    return result;
  }

  function onClick() {
    setAnagrams([]);
  }

  return (
    <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white font-bold text-2xl text-center min-h-screen pt-5">
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-sm mx-auto">
            <h2 className="text-xl font-semibold mb-4">Invalid file type</h2>
            <p className="text-gray-700">
              The selected file is not a text file. Please select a .txt file.
            </p>
            <button
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold"
              onClick={() => setShowModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-3xl p-8 rounded-lg shadow-lg bg-white">
        <div className="bg-gray-100 rounded-lg shadow-md p-8">
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-8" role="alert">
            <p className="font-bold">What is an anagram?</p>
            <p>An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.</p>
          </div>
          <input
            type="file"
            name="file"
            className="mb-8 py-2 px-4 border border-gray-400 rounded-lg shadow-sm w-full"
            onClick={onClick}
            onChange={(e) => onChange(e)}
          />
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {anagrams.map((anagram, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <p className="text-pink-500 font-medium text-lg">{anagram}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;
