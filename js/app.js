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
let listOfClicked = Array();
let counter = 0;

// Remove li's from the deck list element, shuffle array and create/append new elements
function resetDeck(){
	shuffle(cardsList);
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

	}
	return incrementCounter();
}

function incrementCounter(){

}

// update the list of cards with new clicked
function addToList(e){
	if (e.target.classList.contains('card') && !e.target.classList.contains('match')){
		listOfClicked.push(e.target);
	}
	console.log('length of array is '+listOfClicked.length)
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
			return listOfClicked.length = 0;
		} else setTimeout(function closeCards(){
			cardOne.classList.remove('open');
			cardTwo.classList.remove('open');
			return listOfClicked.length = 0;
		}, 1000)
	} else {console.log('Click more!')}


}

document.querySelector('.deck').addEventListener('click',function(e){
	displayCard(e);
	addToList(e);
	compareTwoCards();
})



/*
  *    + increment the move counter and display it on the page (put this functionality in another function 
 that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in 
 another function that you call from this one)
 */
