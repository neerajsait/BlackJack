let player = {
    name: "Per",
    chips: 200
};

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");

playerEl.textContent = `${player.name}: $${player.chips}`;

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber > 10) {
        return 10;
    } else if (randomNumber === 1) {
        return 11;
    } else {
        return randomNumber;
    }
}

function startGame() {
    if (!isAlive) {
        isAlive = true;
        hasBlackJack = false;
        cards = [getRandomCard(), getRandomCard()];
        sum = cards[0] + cards[1];
        renderGame();
    } else {
        messageEl.textContent = "Game in progress. Hit or stay!";
    }
}

function renderGame() {
    cardsEl.textContent = "Cards: " + cards.join(", ");
    sumEl.textContent = "Sum: " + sum;

    if (sum <= 20) {
        message = "Hit or stay?";
    } else if (sum === 21) {
        message = "Blackjack! You win!";
        hasBlackJack = true;
        player.chips += 50;
        playerEl.textContent = `${player.name}: $${player.chips}`;
    } else {
        message = "Bust! You're out.";
        isAlive = false;
        player.chips -= 20;
        playerEl.textContent = `${player.name}: $${player.chips}`;
    }
    messageEl.textContent = message;
}

function newCard() {
    if (isAlive && !hasBlackJack) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
    } else if (!isAlive) {
        messageEl.textContent = "Game over! Deal cards to start again.";
    } else {
        messageEl.textContent = "You've won! Deal cards to play again.";
    }
}
