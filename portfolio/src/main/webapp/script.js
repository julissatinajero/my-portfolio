// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random fact to the page.
 */
function addRandomFact() {
  const facts =
      ['I love chocolate!', 'I am Bilingual (Spanish and English)', 'I was a soccer goalie for 5 years.', 
      'I am a Capricorn :)', 'Purple is my favorite color.', 'I LOVE Disney! Tangled is my favorite.',
      'My sister and I have a 6 year age difference.', 'I have a doggy named Roky.', 
      'I like to listen to Jhene Aiko and Bruno Mars.'];

  // Pick a random fact.
  const fact = facts[Math.floor(Math.random() * facts.length)];

  // Add it to the page.
  const factContainer = document.getElementById("fact-container");
  factContainer.innerText = fact;
}


//Gets the phrase from /data
function getDataPhrase() {
  console.log('Fetching the phrase.');

  // The fetch() function returns a Promise because the request is asynchronous.
  const responsePromise = fetch('/data');

  // When the request is complete, pass the response into handleResponse().
  responsePromise.then(handleResponse);
}

/**
 * Handles response by converting it to text and passing the result to
 * addPhraseToDom().
 */
function handleResponse(response) {
  console.log('Handling the response.');

  // response.text() returns a Promise, because the response is a stream of
  // content and not a simple variable.
  const textPromise = response.text();

  // When the response is converted to text, pass the result into the
  // addPhraseToDom() function.
  textPromise.then(addPhraseToDom);
}

/** Adds a random quote to the DOM. */
function addPhraseToDom(thePhrase) {
  console.log('Adding phrase to dom: ' + thePhrase);

  const phraseContainer = document.getElementById('phrase-container');
  phraseContainer.innerText = thePhrase;
}



function getPhraseJSON()
{
    fetch('/data').then(response => response.json()).then((phrase) => {
        const phraseListElement = document.getElementById('phrase-container');
        phraseListElement.innerHTML = '';
        phraseListElement.appendChild(
        createListElement('Message 1: ' + phrase[0]));
        phraseListElement.appendChild(
        createListElement('Message 2: ' + phrase[1]));
        phraseListElement.appendChild(
        createListElement('Message 3: ' + phrase[2]));
  });
}

/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}