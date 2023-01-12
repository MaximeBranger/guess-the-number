let isPlaying = false;
let target;
let round;
let maxTries;

startButton.addEventListener("click", startGame);
gameForm.addEventListener("submit", guessNumber);

function startGame() {
    const min = parseInt(paramMinInput.value);
    const max = parseInt(paramMaxInput.value);
    const tries = parseInt(paramTryInput.value);

    target = Math.floor(Math.random() * (max - min) + min);
    round = 1;
    maxTries = tries;
    isPlaying = true;

    updateTries(round, maxTries);

    guessButton.disabled = false;
    resetResultDivs();

    updateHistory("games");

    console.log(target);
}

function guessNumber(ev) {
    ev.preventDefault();

    const guessNumber = parseInt(ev.target.number.value);

    if (isNaN(guessNumber)) {
        return;
    }

    resetResultDivs();
    ev.target.number.value = "";

    if (guessNumber === target) {

        success(round);
        updateHistory("success");
        updateTries(0, maxTries);
        guessButton.disabled = true;
        return;

    } else if (round === maxTries) {

        unsuccess(target);
        updateHistory("failed");
        return;

    } else if (guessNumber > target) {

        tips("You are to high");

    } else {

        tips("You are to low");

    }

    round++;
    updateTries(round, maxTries);
}