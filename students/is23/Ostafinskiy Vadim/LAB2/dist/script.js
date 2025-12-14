"use strict";
let a = '';
let b = '';
let expressionResult = 0;
let selectedOperation = null;
const outputElement = document.getElementById("result");
function resetCalculator() {
    a = '';
    b = '';
    selectedOperation = null;
    expressionResult = 0;
}
function showError(message = 'Error') {
    outputElement.innerHTML = message;
    resetCalculator();
}
function setupEventListeners() {
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');
    digitButtons.forEach(button => {
        button.addEventListener('click', () => {
            const digitValue = button.innerHTML;
            if (outputElement.innerHTML === 'Error' || outputElement.innerHTML === 'Division by zero!') {
                resetCalculator();
            }
            if (!selectedOperation) {
                if (digitValue === '.') {
                    if (a.indexOf('.') === -1) {
                        a = a === '' ? '0.' : a + '.';
                    }
                }
                else {
                    a += digitValue;
                }
                outputElement.innerHTML = a || '0';
            }
            else {
                if (digitValue === '.') {
                    if (b.indexOf('.') === -1) {
                        b = b === '' ? '0.' : b + '.';
                    }
                }
                else {
                    b += digitValue;
                }
                outputElement.innerHTML = b || '0';
            }
        });
    });
    document.getElementById("btn_op_triple_zero").addEventListener('click', () => {
        if (outputElement.innerHTML === 'Error' || outputElement.innerHTML === 'Division by zero!') {
            resetCalculator();
        }
        if (!selectedOperation) {
            a += '000';
            outputElement.innerHTML = a;
        }
        else {
            b += '000';
            outputElement.innerHTML = b || '0';
        }
    });
    document.getElementById("btn_op_mult").addEventListener('click', () => {
        if (a === '' || outputElement.innerHTML === 'Error' || outputElement.innerHTML === 'Division by zero!')
            return;
        selectedOperation = 'x';
        expressionResult = 0;
    });
    document.getElementById("btn_op_plus").addEventListener('click', () => {
        if (a === '' || outputElement.innerHTML === 'Error' || outputElement.innerHTML === 'Division by zero!')
            return;
        selectedOperation = '+';
        expressionResult = 0;
    });
    document.getElementById("btn_op_minus").addEventListener('click', () => {
        if (a === '' || outputElement.innerHTML === 'Error' || outputElement.innerHTML === 'Division by zero!')
            return;
        selectedOperation = '-';
        expressionResult = 0;
    });
    document.getElementById("btn_op_div").addEventListener('click', () => {
        if (a === '' || outputElement.innerHTML === 'Error' || outputElement.innerHTML === 'Division by zero!')
            return;
        selectedOperation = '/';
        expressionResult = 0;
    });
    document.getElementById("btn_op_clear").addEventListener('click', () => {
        resetCalculator();
        outputElement.innerHTML = '0';
    });
    document.getElementById("btn_op_equal").addEventListener('click', () => {
        if (a === '' || b === '' || !selectedOperation)
            return;
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        switch (selectedOperation) {
            case 'x':
                expressionResult = numA * numB;
                break;
            case '+':
                expressionResult = numA + numB;
                break;
            case '-':
                expressionResult = numA - numB;
                break;
            case '/':
                if (numB === 0) {
                    showError('Division by zero!');
                    return;
                }
                expressionResult = numA / numB;
                break;
            default:
                break;
        }
        if (!isFinite(expressionResult)) {
            showError('Too large');
            return;
        }
        a = expressionResult.toString();
        b = '';
        selectedOperation = null;
        outputElement.innerHTML = a;
    });
    document.getElementById("btn_op_sign").addEventListener('click', () => {
        if (outputElement.innerHTML === 'Error' || outputElement.innerHTML === 'Division by zero!')
            return;
        if (!selectedOperation && a !== '') {
            a = (parseFloat(a) * -1).toString();
            outputElement.innerHTML = a;
        }
        else if (selectedOperation && b !== '') {
            b = (parseFloat(b) * -1).toString();
            outputElement.innerHTML = b;
        }
    });
    document.getElementById("btn_op_percent").addEventListener('click', () => {
        if (outputElement.innerHTML === 'Error' || outputElement.innerHTML === 'Division by zero!')
            return;
        if (!selectedOperation && a !== '') {
            a = (parseFloat(a) / 100).toString();
            outputElement.innerHTML = a;
        }
        else if (selectedOperation && b !== '') {
            b = (parseFloat(b) / 100).toString();
            outputElement.innerHTML = b;
        }
    });
    document.getElementById("btn_op_backspace").addEventListener('click', () => {
        if (outputElement.innerHTML === 'Error' || outputElement.innerHTML === 'Division by zero!') {
            resetCalculator();
            outputElement.innerHTML = '0';
            return;
        }
        if (!selectedOperation && a !== '') {
            a = a.slice(0, -1);
            outputElement.innerHTML = a || '0';
        }
        else if (selectedOperation && b !== '') {
            b = b.slice(0, -1);
            outputElement.innerHTML = b || '0';
        }
    });
    document.getElementById("btn_op_sqrt").addEventListener('click', () => {
        if (!selectedOperation && a !== '') {
            const num = parseFloat(a);
            if (num >= 0) {
                a = Math.sqrt(num).toString();
                outputElement.innerHTML = a;
            }
            else {
                showError('Error');
            }
        }
    });
    document.getElementById("btn_op_square").addEventListener('click', () => {
        if (!selectedOperation && a !== '') {
            const num = parseFloat(a);
            a = (num * num).toString();
            outputElement.innerHTML = a;
        }
    });
    document.getElementById("btn_op_cube").addEventListener('click', () => {
        if (!selectedOperation && a !== '') {
            const num = parseFloat(a);
            a = (num * num * num).toString();
            outputElement.innerHTML = a;
        }
    });
    document.getElementById("btn_op_factorial").addEventListener('click', () => {
        if (!selectedOperation && a !== '') {
            const num = parseInt(a);
            if (num >= 0 && num <= 170) {
                let result = 1;
                for (let i = 2; i <= num; i++) {
                    result *= i;
                }
                a = result.toString();
                outputElement.innerHTML = a;
            }
            else if (num < 0) {
                showError('Error');
            }
            else {
                showError('Too large');
            }
        }
    });
    document.getElementById("theme-toggle").addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
    });
    document.getElementById("display-theme-toggle").addEventListener('click', () => {
        outputElement.classList.toggle('light-display');
    });
}
window.onload = function () {
    setupEventListeners();
};