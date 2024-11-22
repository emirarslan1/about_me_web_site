const gameContainer = document.getElementById('game-container');

function display() {
    const imageNames = ['A.svg', 'H.svg', 'M.svg', 'E.svg', 'T.svg'];
    const spacing = '40px';

    for (let i = 0; i < imageNames.length; i++) {
        const img = document.createElement('img');
        img.src = imageNames[i];
        gameContainer.appendChild(img);

        if (i !== imageNames.length - 1) {
            let spacer = document.createElement('div');
            spacer.style.width = spacing;
            spacer.style.display = 'inline-block';
            gameContainer.appendChild(spacer);
        }
    }
}

display();

function shuffle_distribute() {
    const images = document.querySelectorAll('#game-container img');
    const imageSources = Array.from(images).map(img => img.src);
    const shuffledImageSources = imageSources.sort(() => Math.random() - 0.5);

    gameContainer.innerHTML = '';

    for (let i = 0; i < shuffledImageSources.length; i++) {
        const img = document.createElement('img');
        img.src = shuffledImageSources[i];
        gameContainer.appendChild(img);

        if (i !== shuffledImageSources.length - 1) {
            let spacer = document.createElement('div');
            spacer.style.width = '40px';
            spacer.style.display = 'inline-block';
            gameContainer.appendChild(spacer);
        }
    }
}

function hider() {
    setTimeout(() => {
        const images = document.querySelectorAll('#game-container img');
        images.forEach(img => {
            img.style.backgroundColor = 'black';
        });
        canClick = true;
    }, 2000);
}

function buttonClick() {
    document.getElementById("startButton").disabled = true;
    shuffle_distribute();
    hider();
}

const correctSequence = ['A.svg', 'H.svg', 'M.svg', 'E.svg', 'T.svg'];
let score = 0;
let currentStep = 0;
let canClick = false;
let lastClickedImage = null;

function updater() {
    const scoreDisplay = document.getElementById('score-display');
    if (scoreDisplay) {
        scoreDisplay.textContent = `Score: ${score}`;
    } else {
        const newScoreDisplay = document.createElement('div');
        newScoreDisplay.id = 'score-display';
        newScoreDisplay.textContent = `Score: ${score}`;
        gameContainer.appendChild(newScoreDisplay);
    }
}

function showcongrats() {
    const congratsDiv = document.getElementById('congrats-message');
    if (score === 100) {
        congratsDiv.style.display = 'block';
    }
    canClick = false;
}

function showincorrect() {
    const wrongDiv = document.getElementById('wrong-message');
    wrongDiv.style.display = 'block';
    canClick = false;
}

gameContainer.addEventListener('click', function (event) {
    if (canClick && event.target.tagName === 'IMG') {
        const clickedImageSrc = event.target.src;

        if (lastClickedImage === event.target) {
            event.target.dataset.canClick = 'false';
        } else {
            if (event.target.dataset.clicked === 'true') {
                return;
            }
            event.target.dataset.clicked = 'true';
            lastClickedImage = event.target;
            event.target.dataset.canClick = 'true';
            canClick = true;

            if (clickedImageSrc.endsWith(correctSequence[currentStep])) {
                score += 20;
                event.target.style.backgroundColor = 'rgb(114, 241, 230)';
                updater();
                currentStep++;

                if (currentStep === correctSequence.length) {
                    showcongrats();
                }
            } else {
                event.target.style.backgroundColor = 'rgb(114, 241, 230)';
                updater();
                showincorrect();
            }
        }
    }
});
