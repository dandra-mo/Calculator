let runTotal = 0;
let buffer = "0";
let previousOp = null;
const screen = document.querySelector(".screen");

document.querySelector(".calc-buttons").addEventListener("click", function (e) {
    buttonClick(e.target.innerText);
});

function buttonClick(val) {
    if (isNaN(parseInt(val))) {
        handleSymbol(val);
    } else {
        handleNumber(val);
    }
    rerender();
}

function handleNumber(val) {
    if (buffer === "0") {
        buffer = val;
    } else {
        buffer += val;
    }
}

function handleSymbol(val) {
    switch (val) {
        case "C":
            buffer = "0";
            runTotal = 0;
            previousOp = null;
            break;

        case "=":
            if (previousOp === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOp = null;
            buffer = "" + runTotal;
            runTotal = 0;
            break;

        case "⬅️":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;

        default:
            handleMath(val);
            break;
    }
}

function handleMath(val) {
    const intBuffer = parseInt(buffer);
    if (runTotal === 0) {
        runTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOp = val;
    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previousOp === "+") {
        runTotal += intBuffer;
    } else if (previousOp === "-") {
        runTotal -= intBuffer;
    } else if (previousOp === "*") {
        runTotal *= intBuffer;
    } else {
        runTotal /= intBuffer;
    }
}

function rerender() {
    screen.innerText = buffer;
}
