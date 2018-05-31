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
const secSpan = document.querySelector('.seconds');
const minSpan = document.querySelector('.minutes');
const timeArray = [];
const congratMsg = document.querySelector('.modal-message')
const modalRating = document.querySelector('.modal-rating-show');
const starHtml = '<i class="fa fa-star"></i>';
let listOfClicked = Array();
let counter = 0;
let countTime; 
let totalTime;
let deckOfCard = document.querySelector('.deck');
let modal = document.getElementById('myModal');
let whatRating = 0;
let starSymbol = document.querySelector('.fa-star')

// Remove li's from the deck list element, shuffle array and create/append new elements
function resetDeck(){
	closeModal();
	shuffle(cardsList);
	stopTimer();
	secSpan.textContent = `00`;
	minSpan.textContent = `00`;
	counter = 0; 
	movesCounter.textContent = `${counter}`;
	while(listOfClicked.length){listOfClicked.pop();} //empty the array after reset
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
	let l = document.querySelectorAll('.modal-rating-show>i')
	for (const star of l){
		star.remove();
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
	if (e.target.classList.contains('card') 
		&& !e.target.classList.contains('open') 
		&& !e.target.classList.contains('match')
		&& listOfClicked.length < 2){
		e.target.classList.add('open');
		incrementCounter();
		if(timeArray.length === 0){timeArray.push(performance.now());}
	}
	
}

function incrementCounter(){
	counter ++; 
	movesCounter.textContent = `${counter}`;
	changeStarRating();
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
	if (e.target.classList.contains('card')
		&& !e.target.classList.contains('match')
		&& !e.target.classList.contains('locked')){
		listOfClicked.push(e.target);
		if(listOfClicked.length <= 1){e.target.classList.add('locked');}
	}
}

// get 2 items from the array and checks if both have same class of child elements, if no - remove the open class
function compareTwoCards(){
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
			cardOne.classList.remove('locked');
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
		stopTimer();
	}
}

function displayModal(){
	modal.style.display = "block";
	starsList.forEach(function(star){
		if(!star.classList.contains('redStar')){
			modalRating.insertAdjacentHTML('beforeend', starHtml);
		} 
	})
	congratMsg.textContent = `Congratulations! You've finished the game in ${totalTime} seconds with ${counter} moves! Wow! Do you want to retry?`

/*
	if (confirm(`Congratulations! You've finished the game in ${totalTime} seconds with ${counter} moves! Wow! Do you want to retry?`)) {
        resetDeck();
    } else {} 
*/

}

function closeModal(){
    modal.style.display = "none";

}

document.querySelector('.deck').addEventListener('click',function(e){
	displayCard(e);
	addToList(e);
	compareTwoCards();

})

deckOfCard.addEventListener('click', timer);

//count the time, using diff between two Date objects
function timer(){
	let startTime = new Date;
	countTime = setInterval(function(){
		let endTime = (new Date - startTime)/1000;
		let secs = Math.round(endTime) % 60;
		let mins = Math.trunc(Math.floor(endTime) / 60); 		
		secSpan.textContent = secs;
		minSpan.textContent = mins;
	}, 1000);
	deckOfCard.removeEventListener('click',timer);
}

//clears the Timer function and sets back the event Listener
function stopTimer(){
	clearInterval(countTime);
	deckOfCard.addEventListener('click', timer);
}





