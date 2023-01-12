const parametersButton = document.querySelector("#parameters-button");
const parametersDiv = document.querySelector(".parameters");

const paramMinInput = document.querySelector("#min_value");
const paramMaxInput = document.querySelector("#max_value");
const paramTryInput = document.querySelector("#max_try");

const triesDiv = document.querySelector(".tries");

const resultDiv = document.querySelector(".result");


const startButton = document.querySelector("#start");
const gameForm = document.querySelector("#game-form");
const guessButton = document.querySelector("#game-form button");

let history;

parametersButton.addEventListener("click", (ev) => {
    ev.preventDefault();
    parametersDiv.classList.toggle("hide");
});

paramMinInput.addEventListener("change", (ev) => {
    validateParam(ev);
    updateMinMaxParams(paramMaxInput, "min", ev.target.value);
});
paramMaxInput.addEventListener("change", (ev) => {
    validateParam(ev);
    updateMinMaxParams(paramMinInput, "max", ev.target.value);
});
paramTryInput.addEventListener("change", validateParam);

function validateParam(ev) {
    const min = parseInt(ev.target.min);
    const max = parseInt(ev.target.max);
    const value = parseInt(ev.target.value);
    if (value < 1) {
        ev.target.value = 1;
    } else if (value > 99999) {
        ev.target.value = 99999;
    } else if (value < min) {
        ev.target.value = min;
    } else if (value > max) {
        ev.target.value = max;
    }

    saveParam();
}

function updateMinMaxParams(target, field, value) {
    if (field == "min") {
        target.min = value;
    } else if (field == "max") {
        target.max = value;
    }
}

function saveParam() {
    localStorage.setItem("params", JSON.stringify({ "min": parseInt(paramMinInput.value), "max": parseInt(paramMaxInput.value), "round": parseInt(paramTryInput.value) }));
}

function initParams() {
    params = JSON.parse(localStorage.getItem("params"));
    if (params === null) {
        paramMinInput.value = 1;
        paramMaxInput.value = 100;
        paramTryInput.value = 10;
    } else {
        paramMinInput.value = params["min"];
        paramMaxInput.value = params["max"];
        paramTryInput.value = params["round"];
    }
}

function resetResultDivs() {
    resultDiv.innerHTML = "";
    resultDiv.className = "result";
}

function updateTries(round, maxTries) {
    triesDiv.innerHTML = "";
    if (round > 0) {
        const p = document.createElement("p");
        p.textContent = "Try " + round + " over " + maxTries;
        triesDiv.appendChild(p);
    }
}

function tips(message) {
    const p = document.createElement("p");
    p.textContent = message;
    resultDiv.appendChild(p);
    resultDiv.classList.add("tips");
}

function success(round) {
    const message = "Congratulations ! You discovered the number in " + round + " tries";
    const p = document.createElement("p");
    p.textContent = message;
    resultDiv.appendChild(p);
    resultDiv.classList.add("success");
}

function unsuccess(target) {
    const message = "Oh noooo ! You failed to get the number ! It was " + target;
    const p = document.createElement("p");
    p.textContent = message;
    resultDiv.appendChild(p);
    resultDiv.classList.add("unsuccess");
}

function initHistory() {
    history = JSON.parse(localStorage.getItem("history"));
    if (history === null) {
        history = { "games": 0, "success": 0, "failed": 0 };
    }
}

function updateHistory(target) {
    history[target]++;
    localStorage.setItem("history", JSON.stringify(history));
}

initHistory();
initParams();