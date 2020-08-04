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

//list of phrases for About Me page
const PAGE_PHRASES = [ 
  "proud Latina", 
  "Computer Scientist", 
  "first-gen student"
];

var currrentPhrase = 0;
var letterIndex = 0; 
var interval;

// Element that holds the text
var element = document.getElementById("phrases");
// Cursor element 
var cursor = document.getElementById("cursor");

/**
 * Function which implements the typing animation.
 */
function typeWord() { 
  var displayedText =  PAGE_PHRASES[currrentPhrase].substring(0, letterIndex + 1);
  console.log(displayedText); 
  element.innerText = displayedText;
  letterIndex++;

  // If full sentence has been displayed then start to delete the sentence after some time
  if(displayedText === PAGE_PHRASES[currrentPhrase]) {
    // Hide the cursor
    //cursor.style.display = 'none';

    clearInterval(interval);
    setTimeout(function() {
      interval = setInterval(deleteWord, 50);
    }, 1000);
}
}

/**
 * Function which implements the deleting effect for the typing animation.
 */
function deleteWord() {
  // Get substring with 1 characater deleted
  var displayedText =  PAGE_PHRASES[currrentPhrase].substring(0, letterIndex - 1);
  element.innerText = displayedText;
  letterIndex--;

  // If sentence has been deleted then start to display the next sentence
  if(displayedText === '') {
    clearInterval(interval);

    // If current sentence was last then display the first one, else move to the next
    if(currrentPhrase== (PAGE_PHRASES.length - 1))
        currrentPhrase= 0;
    else
        currrentPhrase++;
    
    letterIndex = 0;

    // Start to display the next sentence after some time
    setTimeout(function() {
        cursor.style.display = 'inline-block';
        interval = setInterval(typeWord, 130);
    }, 200);
  }
}

// Start the typing effect on load
function start(){
    interval = setInterval(typeWord, 130);
}


//Adds a random fact to the page.
function addRandomFact(){
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

/** 
// Fetches messages from the server and adds them to the DOM.
function getMessages() {
    fetch('/data').then(response => response.json()).then((messages) => {
    const messageListElement = document.getElementById('message_history');
    messageListElement.innerHTML = '';
    for (i = 0; i < messages.length; i++)
    {
        messageListElement.appendChild(createListElement(messages[i].comment));
    }
    });
} */

// Fetches messages from the server and adds them to the DOM.
function getMessages() {
    fetch('/data').then(response => response.json()).then((messages) => {

    console.log(messages);
    const commentsContainer = document.getElementById('display-messages');
    //const userName = messages.name + " commented: ";
    //const comment = messages.comment;
    commentsContainer.innerHTML = '';
    for (i = 0; i < messages.length; i++){
        console.log(messages.name + " " + messages.comment);
        commentsContainer.appendChild(createListElement(messages[i].name + " commented: " + messages[i].comment));
    }
    //commentsContainer.innerHTML += "<br>" + userName + "<br>";
    //commentsContainer.innerHTML += comment;
    });
}

// Creates an <li> element containing text
//function createListElement(text) {
//  const liElement = document.createElement('li');
//  liElement.innerText = text;
//  return liElement;
//}

// Creates an <li> element containing text
function createListElement(text) {
  const listElement = document.createElement('li');
  listElement.innerText = text;
  return listElement;
}
