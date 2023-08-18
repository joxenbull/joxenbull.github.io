// alert('Hello there Welcome to our JS Project');
// console.log('Hello there Welcome to our JS Project');

// Project 1 : Age in Days
// Age input calculation and display
// fator in the current year, leap years

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function ageInDays() {
    var birthDateInput = document.getElementById("birthDate");
    var birthDate = new Date(birthDateInput.value);
    var currentDate = new Date();
    var age = 0;

    // Calculate days from birth year to the end of the birth year
    var birthYear = birthDate.getFullYear();
    var currentYear = currentDate.getFullYear();
    for (var year = birthYear; year < currentYear; year++) {
        age += isLeapYear(year) ? 366 : 365;
    }

    // Calculate days from the beginning of the current year until the current date
    var firstDayOfYear = new Date(currentYear, 0, 1);
    var daysFromStartOfYear = Math.floor((currentDate - firstDayOfYear) / (1000 * 60 * 60 * 24));

    // Add the days from the current year to the age
    age += daysFromStartOfYear;

    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You Are ' + age + ' Days Old');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);

    // Clear previous result
    var resultDiv = document.getElementById('flex-box-result');
    resultDiv.innerHTML = '';

    resultDiv.appendChild(h1);
}

function reset() {
    var ageInDaysElement = document.getElementById('ageInDays');
    if (ageInDaysElement) {
        ageInDaysElement.remove();
    }
}

// Project 2 : CAT Generator
function generateCAT() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small"
    div.appendChild(image);
}

// Project 3 : ROCK PAPER SCISSORS

// Store references to the result div and play again button
function rpsGame(yourChoice) {
    console.log(yourChoice);
    // console.log(yourChoice.src) // get source

    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randomToRpsInt()); // random number
    console.log('Computer Choice : ', botChoice);
    // alert(botChoice);

    results = decideWinner(humanChoice, botChoice); //(0,1 1,0 0.5)
    console.log(results);
    message = finalMessage(results); // you won lost draw {'message' : 'You Won', 'color' : 'green'}
    console.log(message);
    rpsFrontEnd(yourChoice.id, botChoice, message);
}

// random number
function randomToRpsInt() {
    return Math.floor(Math.random() * 3); // 1- 3 picks 0,1,2 not 3
}

// number to choice
function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}

// decide winner
function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        // possible outcomes if you choose vs bot choose
        // 0.5 draw 1 win 0 lose
        // you    // bot
        'rock': { 'rock': 0.5, 'paper': 0, 'scissors': 1 },     // you pick rock - draw lose win
        'paper': { 'rock': 1, 'paper': 0.5, 'scissors': 0 },    // you pick paper - win draw lose
        'scissors': { 'rock': 0, 'paper': 1, 'scissors': 0.5 } // you pick scissors - lose win draw
    };

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

// final message
function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return { 'message': 'You Lost', 'color': 'red' };
    }
    else if (yourScore === 0.5) {
        return { 'message': 'You Tied', 'color': 'yellow' };
    }
    else {
        return { 'message': 'You Won', 'color': 'green' };
    }
}

// front end
function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    // remove all images once user makes their choice
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    // show the selection(user and bot) and results  // raw
    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px;'>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(248,33,233,1);'>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

// Refresh the page
function refreshPage() {
    location.reload();
}

// Project 4 : change all button colors
var all_buttons = document.getElementsByTagName('button');
// console.log(all_buttons) // shows all buttons

// save - record buttons before change to allow reverting later
var copyAllButtons = [];
for (let i = 0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]); // array data structure maintains list order of buttons
}

console.log(copyAllButtons);

// Button color change
function buttonColorChange(buttonThingy) {
    // get button value 
    // console.log(buttonThingy.value);

    if (buttonThingy.value === 'red') {
        buttonsRed();
    }
    else if (buttonThingy.value === 'green') {
        buttonsGreen();
    }
    else if (buttonThingy.value === 'yellow') {
        buttonsYellow();
    }
    else if (buttonThingy.value === 'reset') {
        buttonColorReset();
    }
    else if (buttonThingy.value === 'random') {
        randomColors();
    }
}

// colors functions
//red
function buttonsRed() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

// green
function buttonsGreen() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

// Yellow
function buttonsYellow() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-warning');
    }
}

// reset
function buttonColorReset() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

// random
function randomColors() {
    var choices = ['btn-primary', 'btn-success', 'btn-warning', 'btn-danger']

    for (let i = 0; i < all_buttons.length; i++) {
        var randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}

// Project 5 : Blackjack
let blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'K': 10, 'Q': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

// That don't change
const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']
const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/win.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

// Buttons
// Event listeners
document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

function blackjackHit() {
    // check state first before it runs
    if (blackjackGame['isStand'] === false) {

        let card = randomCard();
        console.log(card);
        showCard(card, YOU);
        // showCard(DEALER);
        updateScore(card, YOU);
        showScore(YOU);
        console.log(YOU['score']);
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

// show card
function showCard(card, activePlayer) {
    // bust action - sop cards and score when 21
    if (activePlayer['score'] <= 21) {

        // alert('Hit'); // check
        let cardImage = document.createElement('img');
        // cardImage.src = 'static/images/Q.png'; // HARD CODED
        cardImage.src = `static/images/${card}.png`; // random using string templating backticks`` and $

        // document.querySelector(YOU['div']).appendChild(cardImage);
        // document.querySelector(DEALER['div']).appendChild(cardImage);
        document.querySelector(activePlayer['div']).appendChild(cardImage); // depend on player
        hitSound.play();
    }
}

function blackjackDeal() {
    // computeWinner();
    // showResult(computeWinner());
    // alert('Deal'); // check
    // not play (deal) until turn
    if (blackjackGame['turnsOver'] === true) {
        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        // console.log(yourImages);
        // yourImages[0].remove(); // remove first only

        // clear your table images
        for (i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        // clear dealer table images
        for (i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        // reset / clear score + style
        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

        // back to default text and color 'Lets Play' after deal
        document.querySelector('#blackjack-result').textContent = "let's Play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnsOver'] = true;
    }
}

// Update Score
function updateScore(card, activePlayer) {
    // if adding A as 11 makes score <= 21 add 11 else, add 1
    if (card === 'A') {

        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1]; // 11
        }
        else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0]; // 1
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

// show score
function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

// sleeper
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms)); // => function notation
}

// DEALER Logic - second player
async function dealerLogic() { // asynch not run linearly
    // change states true - false
    blackjackGame['isStand'] = true;

    // automate the bot
    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(750); // call it
    }

    // Auto Bot
    if (DEALER['score'] > 15) {
        // change states true - false
        blackjackGame['turnsOver'] = true;
        let winner = computeWinner();
        showResult(winner);
        console.log(blackjackGame['turnsOver']);
    }
}

// Compute and Decide winner
// Update wins draws losses for you
function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        // condition : higher than dealer / dealer busts and you don't
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackjackGame['wins']++;
            console.log('You Win');
            winner = YOU;

        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            console.log('You Lost');
            winner = DEALER;

        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
            console.log('You Draw');
        }

        // condition : you bust dealer doesn't
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        console.log('Dealer Wins')
        winner = DEALER;

        // condition : you both bust
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
        console.log('Draw');
    }

    console.log('Winner is : ', winner);
    console.log(blackjackGame);
    return winner;
}

// show results
function showResult(winner) {
    let message, messageColor;

    // show when all turns over
    if (blackjackGame['turnsOver'] === true) {

        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You Win';
            messageColor = 'green';
            winSound.play();
        }

        else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'Dealer Wins';
            messageColor = 'red';
            lossSound.play();

        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'Draw';
            messageColor = 'blue';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}

// Project 6 : AJAX & API - USER GENERATOR
const url = 'https://randomuser.me/api/?results=4'; // Fix the query parameter name ('result' should be 'results')
fetch(url)
    .then(resp => resp.json())
    .then(data => {
        let authors = data.results;
        console.log(authors);
        for (let i = 0; i < authors.length; i++) {
            let div = document.createElement('div');
            let image = document.createElement('img');
            let p = document.createElement('p');

            p.appendChild(document.createTextNode(`${title(authors[i].name.first)} ${title(authors[i].name.last)}`)); // Use backticks for template literals
            image.src = authors[i].picture.large;
            div.appendChild(image);
            div.appendChild(p);
            document.querySelector('.container-6 .flex-ajax-row-1').appendChild(div);
        }
    });

function title(str) {
    return str[0].toUpperCase() + str.slice(1);
}
