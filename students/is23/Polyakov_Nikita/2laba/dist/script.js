"use strict";
let a = '';
let b = '';
let selectedOperation = null;
const outputElement = document.getElementById('result');
outputElement.textContent = '0';
function updateResult() {
    if (!selectedOperation) {
        outputElement.textContent = a || '0';
    }
    else if (!b) {
        outputElement.textContent = `${a} ${getOpSymbol(selectedOperation)}`;
    }
    else {
        outputElement.textContent = `${a} ${getOpSymbol(selectedOperation)} ${b}`;
    }
}
function getOpSymbol(op) {
    switch (op) {
        case '+': return '+';
        case '-': return '−';
        case '*': return '×';
        case '/': return '÷';
        case '%': return '%';
        default: return op;
    }
}
function onDigitButtonClick(digit) {
    if (!selectedOperation) {
        if (digit !== '.' || !a.includes('.')) {
            a += digit;
        }
    }
    else {
        if (digit !== '.' || !b.includes('.')) {
            b += digit;
        }
    }
    updateResult();
}
for (let i = 0; i <= 9; i++) {
    const btn = document.getElementById(`btn_digit_${i}`);
    if (btn) {
        const digit = i.toString();
        btn.addEventListener('click', () => onDigitButtonClick(digit));
    }
}
const dotBtn = document.getElementById('btn_digit_dot');
if (dotBtn) {
    dotBtn.addEventListener('click', () => onDigitButtonClick('.'));
}
// Операции
document.getElementById('btn_op_plus')?.addEventListener('click', () => setOperation('+'));
document.getElementById('btn_op_minus')?.addEventListener('click', () => setOperation('-'));
document.getElementById('btn_op_mult')?.addEventListener('click', () => setOperation('*'));
document.getElementById('btn_op_div')?.addEventListener('click', () => setOperation('/'));
document.getElementById('btn_op_percent')?.addEventListener('click', () => setOperation('%'));
function setOperation(op) {
    if (a === '')
        return;
    if (b !== '' && selectedOperation) {
        calculateResult();
        a = outputElement.textContent || '0';
        b = '';
    }
    selectedOperation = op;
    updateResult();
}
// Очистка
document.getElementById('btn_op_clear')?.addEventListener('click', () => {
    a = '';
    b = '';
    selectedOperation = null;
    outputElement.textContent = '0';
});
// Равно
document.getElementById('btn_op_equal')?.addEventListener('click', calculateResult);
function calculateResult() {
    if (!a || !b || !selectedOperation)
        return;
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA) || isNaN(numB)) {
        outputElement.textContent = 'Error';
        reset();
        return;
    }
    let result;
    switch (selectedOperation) {
        case '+':
            result = numA + numB;
            break;
        case '-':
            result = numA - numB;
            break;
        case '*':
            result = numA * numB;
            break;
        case '/':
            if (numB === 0) {
                outputElement.textContent = 'Error';
                reset();
                return;
            }
            result = numA / numB;
            break;
        case '%':
            if (numB === 0) {
                outputElement.textContent = 'Error';
                reset();
                return;
            }
            result = numA % numB;
            break;
        default:
            return;
    }
    // Убираем артефакты плавающей точки
    result = Math.round(result * 1e10) / 1e10;
    a = result.toString();
    b = '';
    selectedOperation = null;
    outputElement.textContent = a;
}
function reset() {
    a = '';
    b = '';
    selectedOperation = null;
}
