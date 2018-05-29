let cardsList = [
	'fa-diamond',
	'fa-paper-plane-o',
	'fa-anchor',
	'fa-bolt',
	'fa-cube',
	'fa-leaf',
	'fa-bicycle',
	'fa-bomb',
	'fa-diamond',
	'fa-paper-plane-o',
	'fa-anchor',
	'fa-bolt',
	'fa-cube',
	'fa-leaf',
	'fa-bicycle',
	'fa-bomb'];

const cardDeck = document.querySelector('.deck');
const movesCounter = document.querySelector('.moves');
const starsList = document.querySelectorAll('.fa-star');
let listOfClicked = Array();
let counter = 0;
 
const timeArray = [];
let totalTime;

// Remove li's from the deck list element, shuffle array and create/append new elements
function resetDeck(){
	shuffle(cardsList);
	counter = 0; 
	movesCounter.textContent = `${counter}`;
	while(timeArray.length){timeArray.pop();}
	for (const star of starsList){
		star.classList.remove('redStar');
		star.style.opacity = 1;
	}
	while (cardDeck.firstChild) {
  		cardDeck.removeChild(cardDeck.firstChild);
	}
	for (const cards of cardsList){
		let card = document.createElement('li');
		card.classList.add('card');
		card.innerHTML = `<i class="fa ${cards}"></i>`;
		cardDeck.appendChild(card);
	}
}

function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// make clicked target card opened
function displayCard(e){
	if (e.target.classList.contains('card') && !e.target.classList.contains('open') && !e.target.classList.contains('match') && listOfClicked.length < 2){
		e.target.classList.add('open');	
		incrementCounter();
		if(timeArray.length === 0){timeArray.push(performance.now());}
	}
	
}

function incrementCounter(){
	counter ++; 
	movesCounter.textContent = `${counter}`;
	changeStarRating();
	//console.log('Moves = '+counter);
}

function changeStarRating(){
	switch(counter){
		case 24:
		starsList[2].classList.add('redStar');
		setTimeout(function(){
			starsList[2].style.opacity = 0;
		})
		break;
		case 30:
		starsList[1].classList.add('redStar');
		setTimeout(function(){
			starsList[1].style.opacity = 0;
		})
		break;
	}
}

// update the list of cards with new clicked
function addToList(e){
	if (e.target.classList.contains('card') && !e.target.classList.contains('match')){
		listOfClicked.push(e.target);
	}
	//console.log('length of array is '+listOfClicked.length)
}


function compareTwoCards(){
	//console.log('Compare function')
	let cardOne = listOfClicked[0];
	let cardTwo = listOfClicked[1];

	if (listOfClicked.length === 2) {
		if (cardOne.firstElementChild.className === cardTwo.firstElementChild.className){
			cardOne.classList.remove('open');
			cardOne.classList.add('match');
			cardTwo.classList.remove('open');
			cardTwo.classList.add('match');
			checkIfGameFinished();
			return listOfClicked.length = 0;
		} else setTimeout(function closeCards(){
			cardOne.classList.remove('open');
			cardTwo.classList.remove('open');
			return listOfClicked.length = 0;
		}, 1000)
	} else {}


}

function checkAllCards(){
	let allCards = document.querySelectorAll('.card.match');
	if (allCards.length === 16){
		return true;
	} else return false;
}

function checkIfGameFinished(){
	if(checkAllCards()){
		timeArray.push(performance.now());
		totalTime = (timeArray[1] - timeArray[0])/1000;
		totalTime = Math.round(totalTime);
		displayModal();
	}
}

function displayModal(){
	if (confirm(`Congratulations! You've finished the game in ${totalTime} seconds! Wow! Do you want to retry?`)) {
        resetDeck();
    } else {}
}

document.querySelector('.deck').addEventListener('click',function(e){
	displayCard(e);
	addToList(e);
	compareTwoCards();

})