import React from "react";
import ReactDOM from "react-dom";
import Grep from "./Grep";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Grep func={grepHash} />
    </div>
  );
}

function grepHash(haystack, needle) {
  const matches = [];
  const needleHash = hash(needle);
  console.log(needle);
  const nLength = needle.length;
  let currentHash = hash(haystack.substr(0, nLength));
  for (let i = 0; i < haystack.length - (nLength - 1); i++) {
    if (needleHash === currentHash) matches.push(i);
    currentHash = rollHash(
      currentHash,
      haystack[i], // first character in current search
      haystack.substr(i + nLength, 1), // next letter in haystack
      nLength
    );
  }

  return matches;
}

function hash1(char, vector = 0) {
  return char.charCodeAt(0) * 256 ** vector;
}

function add(a, b) {
  return a + b;
}

function hash(str) {
  return str
    .split("") // transform the string into an array of characters
    .map(hash1) // hash each character, using its index in the array as vector
    .reduce(add, 0); // add all of the values up (assume add function defined as `(a,b) => a+b`)
}

function shiftHash(originalHash, firstChar) {
  return (originalHash - hash1(firstChar)) / 256;
}

function pushHash(originalHash, strLen, nextChar) {
  return originalHash + hash1(nextChar, strLen - 1);
}

function rollHash(originalHash, firstChar, nextChar, strLen) {
  const shiftedHash = shiftHash(originalHash, firstChar);
  return pushHash(shiftedHash, strLen, nextChar);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
