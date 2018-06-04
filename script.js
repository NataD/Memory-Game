const cardColors = ["red", "red", "green", "green", "blue", "blue", "brown", "brown", "yellow", "yellow", "gray", "gray", "cadetblue", "cadetblue", "violet", "violet", "lightgreen", "lightgreen"];

let cards = document.querySelectorAll("div");
console.log(cards);
cards = [...cards];

//variables to store chosen active card
let activeCard = "";
const activeCards = [];

const gamePairs = cards.length / 2;
let gameResult = 0;
const startTime = new Date().getTime();

//function to manage click of a card
const clickCard = function(){
  activeCard = this;

  //to enable clicking the same card
  if(activeCard == activeCards[0]){
    return;
  }

  activeCard.classList.remove("hidden");

  if(activeCards.length === 0){
    activeCards[0] = activeCard;
    return;
  } else {

    cards.forEach(card => card.removeEventListener("click", clickCard));
    activeCards[1] = activeCard;
    setTimeout(function(){
      if(activeCards[0].className === activeCards[1].className) {
        activeCards.forEach(card => card.classList.add("off"));
        cards = cards.filter(card => !card.classList.contains("off"));
        gameResult++;
        if(gameResult == gamePairs){
          const endTime = new Date().getTime();
          const gameTime = (endTime - startTime)/1000;
          alert(`You won! Your result is: ${gameTime} seconds`);
          location.reload(); //refresh a page;
        }
      } else {
        activeCards.forEach(card => card.classList.add("hidden"));
      }
      acriveCard = "";
      activeCards.length = 0;
      cards.forEach(card => card.addEventListener("click", clickCard));
    }, 500);

  }
}

//random selection of cards
const init = function() {
  cards.forEach(card => {
    const position = Math.floor(Math.random() * cardColors.length);
    card.classList.add(cardColors[position]);
    console.log(card);
    cardColors.splice(position, 1);
  })
  setTimeout(function(){
    cards.forEach(card => {
      card.classList.add("hidden");
      card.addEventListener("click", clickCard)
    })
  }, 2000);
};

init();
