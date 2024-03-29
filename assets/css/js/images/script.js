var dealertotal = 0;
var playersum = 0;

var dealerAceCount = 0;
var playerAceCount = 0;

var hidden;
var dec; 

var canHit = true;

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values =["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "k"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }
    // console.log(deck);
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    hidden = deck.pop();
    dealertotal += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealertotal);
    while (dealertotal < 17) {
        //<img>
        let cardImg = document.createElement("img")
        let card = deck.pop();
        cardImg.src = "./cards/cards" + card + ".jpg";
        dealertotal += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealertotal);

    for (let i =0; i < 2; i++) {
        let cardImg = document.createElement("img")
        let card = deck.pop();
        cardImg.src = "./cards/cards" + card + ".jpg";
        playersum += getValue(card);
        playerAceCountAceCount += checkAce(card);
        document.getElementById("player-cards").append(cardImg);  
    }
    console.log(playersum)
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}

function hit() {
    if (!canHit) {
        return;
    }
    let cardImg = document.createElement("img")
    let card = deck.pop();
    cardImg.src = "./cards/cards" + card + ".jpg";
    playersum += getValue(card);
    playerAceCountAceCount += checkAce(card);
    document.getElementById("player-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) {
        canHit = false;
    }
}

function stay() {
    dealertotal = reduceAce(dealertotal, dealerAceCount);
    playersum = reduceAce(playersum, playerAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/cards" + hidden + ".jpg"

    let message = "";
    if (playersum >21) {
        message = "You Lose";
    }
    else if (dealersum > 21) {
        message = "You win!!";
    }
    else if (playersum == dealertotal) {
        message = "Draw";
    }
    else if (playersum > dealertotal) {
        message = "You win !";
    }
    else if (playersum < dealertotal) {
        message = "You lose";
    }
    document.getElementById("dealer-total").innerText = dealertotal;
    document.getElementById("player-sum").innerText = playersum;
    document.getElementById("results").innerText = message;
}

function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10;
    }

    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playersum, playerAceCount) {
    while (playersum > 21 && playerAceCount > 0) {
        playersum -= 10;
        playerAceCount -= 1;
    }
    return playersum;
}
