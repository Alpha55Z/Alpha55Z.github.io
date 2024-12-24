const documentContainer = document.getElementById('document');
const personPhoto = document.getElementById('person-photo');
const acceptButton = document.getElementById('accept-button');
const denyButton = document.getElementById('deny-button');
const executeButton = document.getElementById('execute-button');
const feedback = document.getElementById('feedback');
const timerDisplay = document.getElementById('time-remaining');
const scoreDisplay = document.getElementById('current-score');

let score = 0;
let timeRemaining = 60;
let gameInterval;
let currentPerson;

const peopleData = [
    {
        name: "John Doe",
        photo: "john.jpg", // Replace with actual image URLs
        isInfected: false,
        documents: {
            id: "ID-12345",
            status: "CLEAN"
        }
    },
    {
        name: "Jane Smith",
        photo: "jane.jpg", // Replace with actual image URLs
        isInfected: true,
        documents: {
            id: "ID-67890",
            status: "INFECTED"
        }
    },
];

function startGame() {
    score = 0;
    timeRemaining = 60;
    updateScore();
    updateTimerDisplay();
    nextPerson();
    gameInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeRemaining--;
    updateTimerDisplay();
    if (timeRemaining <= 0) {
        endGame();
    }
}

function updateTimerDisplay() {
    timerDisplay.textContent = timeRemaining;
}

function updateScore() {
    scoreDisplay.textContent = score;
}

function nextPerson() {
    currentPerson = peopleData[Math.floor(Math.random() * peopleData.length)];
    displayPersonData(currentPerson);
}

function displayPersonData(person) {
    documentContainer.innerHTML = `
        <p>Name: ${person.name}</p>
        <p>ID: ${person.documents.id}</p>
        <p>Status: ${person.documents.status}</p>
    `;
    personPhoto.src = person.photo;
    feedback.textContent = "";
}

function handleDecision(decision) {
    let isCorrect = false;
    if (decision === 'accept' && !currentPerson.isInfected) {
        isCorrect = true;
    } else if (decision === 'deny' && currentPerson.isInfected) {
        isCorrect = true;
    } else if (decision === 'execute' && currentPerson.isInfected) {
        isCorrect = true;
        score++;
    }

    if (isCorrect) {
        score++;
        feedback.textContent = "Correct!";
    } else {
        feedback.textContent = "Incorrect!";
    }
    updateScore();
    nextPerson();
}

acceptButton.addEventListener('click', () => handleDecision('accept'));
denyButton.addEventListener('click', () => handleDecision('deny'));
executeButton.addEventListener('click', () => handleDecision('execute'));

function endGame() {
    clearInterval(gameInterval);
    alert(`Game Over! Your score: ${score}`);
}

startGame();