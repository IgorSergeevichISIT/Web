"use strict";
const output = document.getElementById("Output");
const operOutput = document.getElementById("CurrentOperation");
const firstNumber = document.getElementById("LastNumber");
const numberContainer = document.querySelector(".numButtons");
const operationContainer = document.querySelector(".operButtons");
const numberButtons = Array.from(numberContainer.children);
const operButtons = Array.from(operationContainer.children);
let isThatFirstNumber = true;
let div1 = "0";
let div2 = "0";
for (const button of numberButtons) {
    button.addEventListener('click', function () {
        const number = button.textContent;
        if (!number)
            return;
        if (output.textContent === "0" || output.textContent === "000") {
            if (output.textContent === "000" && isThatFirstNumber === true) {
                return;
            }
            output.textContent = "";
            if (isThatFirstNumber) {
                div1 = "";
            }
            else {
                div2 = "";
            }
        }
        if (isThatFirstNumber) {
            div1 += number;
            output.textContent = div1;
        }
        else {
            div2 += number;
            output.textContent = div2;
        }
    });
}
for (const button of operButtons) {
    button.addEventListener('click', function () {
        const buttonText = button.textContent;
        if (!buttonText)
            return;
        switch (buttonText) {
            case "C":
                handleClear();
                break;
            case "CE":
                handleFullClear();
                break;
            case "<--":
                handleBackspace();
                break;
            case "=":
                if (isThatFirstNumber)
                    return;
                operation(operOutput.textContent);
                break;
            case "n*2":
                handleSquare();
                break;
            case "√(n)":
                handleSquareRoot();
                break;
            case "!n":
                handleFactorial();
                break;
            default:
                handleOperator(buttonText);
                break;
        }
    });
}
function handleClear() {
    if (isThatFirstNumber) {
        div1 = "0";
    }
    else {
        div2 = "0";
    }
    output.textContent = "0";
}
function handleFullClear() {
    div1 = "0";
    div2 = "0";
    output.textContent = "0";
    operOutput.textContent = "";
    firstNumber.textContent = "";
    isThatFirstNumber = true;
}
function handleBackspace() {
    if (isThatFirstNumber) {
        if (div1.length > 1) {
            div1 = div1.slice(0, -1);
        }
        else {
            div1 = "0";
        }
        output.textContent = div1;
    }
    else {
        if (div2.length > 1) {
            div2 = div2.slice(0, -1);
        }
        else {
            div2 = "0";
        }
        output.textContent = div2;
    }
}
function handleSquare() {
    const num = Number(isThatFirstNumber ? div1 : div2);
    const result = num * num;
    if (isThatFirstNumber) {
        div1 = result.toString();
        output.textContent = div1;
    }
    else {
        div2 = result.toString();
        output.textContent = div2;
    }
}
function handleSquareRoot() {
    const num = Number(isThatFirstNumber ? div1 : div2);
    if (num < 0) {
        output.textContent = "Ошибка: корень из отрицательного числа";
        return;
    }
    const result = Math.sqrt(num);
    if (isThatFirstNumber) {
        div1 = result.toString();
        output.textContent = div1;
    }
    else {
        div2 = result.toString();
        output.textContent = div2;
    }
}
function handleFactorial() {
    const num = Number(isThatFirstNumber ? div1 : div2);
    if (num < 0 || !Number.isInteger(num)) {
        output.textContent = "Ошибка: факториал только для целых неотрицательных чисел";
        return;
    }
    const result = factorial(num);
    if (isThatFirstNumber) {
        div1 = result.toString();
        output.textContent = div1;
    }
    else {
        div2 = result.toString();
        output.textContent = div2;
    }
}
function handleOperator(operator) {
    if (isThatFirstNumber) {
        isThatFirstNumber = false;
        operOutput.textContent = operator;
        firstNumber.textContent = div1;
        output.textContent = div2;
    }
}
function operation(oper) {
    if (!oper)
        return;
    let result;
    const num1 = Number(div1);
    const num2 = Number(div2);
    switch (oper) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                output.textContent = "Ошибка: деление на ноль";
                return;
            }
            result = num1 / num2;
            break;
        default:
            return;
    }
    div1 = result.toString();
    div2 = "0";
    output.textContent = div1;
    operOutput.textContent = "";
    firstNumber.textContent = "";
    isThatFirstNumber = true;
}
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
