const choices = document.querySelectorAll('.choice');
const scoreboard = {
    user: document.getElementById('user-score'),
    computer: document.getElementById('comp-score')
};

let userScore = 0;
let computerScore = 0;

// Play game
function playGame() {
    choices.forEach(choice => {
        choice.addEventListener('click', function () {
            const userChoice = this.id;
            const computerChoice = getComputerChoice();
            const result = getResult(userChoice, computerChoice);
            displayResult(result, computerChoice);
            checkScore();
        });
    });
}

// Get computer's choice
function getComputerChoice() {
    const choices = ['r', 'p', 's'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

// Determine result
function getResult(user, computer) {
    if (user === computer) {
        return 'draw';
    } else if ((user === 'r' && computer === 's') || (user === 'p' && computer === 'r') || (user === 's' && computer === 'p')) {
        return 'win';
    } else {
        return 'lose';
    }
}

// Display result
function displayResult(result, computerChoice) {
    const resultDiv = document.querySelector('.result p');
    resultDiv.textContent = `Computer chose ${computerChoice.toUpperCase()}. You ${result}.`;
    if (result === 'win') {
        userScore++;
        scoreboard.user.textContent = userScore;
    } else if (result === 'lose') {
        computerScore++;
        scoreboard.computer.textContent = computerScore;
    }
}

// Check score and trigger animations
function checkScore() {
    if (userScore === 10) {
        triggerWinAnimation();
    } else if (computerScore === 10) {
        triggerLoseAnimation();
    }
}

// Trigger win animation
function triggerWinAnimation() {
    document.body.classList.add('win-animation', 'fade-green');
    const resultDiv = document.querySelector('.result p');
    resultDiv.textContent = 'YOU WIN';
    document.getElementById('restart-button').style.opacity = '1';
}

// Trigger lose animation
function triggerLoseAnimation() {
    document.body.classList.add('lose-animation', 'fade-red');
    const resultDiv = document.querySelector('.result p');
    resultDiv.textContent = 'YOU LOSE';
    document.getElementById('restart-button').style.opacity = '1';
}

// Reset the game
function resetGame() {
    userScore = 0;
    computerScore = 0;
    scoreboard.user.textContent = userScore;
    scoreboard.computer.textContent = computerScore;
    document.getElementById('restart-button').style.opacity = '0';
}

// Restart button click handler
document.getElementById('restart-button').addEventListener('click', function () {
    document.body.classList.remove('win-animation', 'fade-green', 'lose-animation', 'fade-red');
    const resultDiv = document.querySelector('.result p');
    resultDiv.textContent = 'Pick an image to play';
    resetGame();
});

playGame();