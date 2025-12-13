var currentInput = '0';
var previousInput = '';
var operator = '';
var displayColorIndex = 0;
var backgroundColorIndex = 0;
var resultDisplay = document.getElementById('result');
var body = document.body;
function startCalculator() {
    setupEvents();
    loadTheme();
    updateDisplay();
    highlightWords();
}
function setupEvents() {
    var _a, _b, _c, _d;
    document.querySelectorAll('.btn.number').forEach(function (button) {
        button.addEventListener('click', function (e) {
            var number = e.target.getAttribute('data-number');
            if (number)
                inputNumber(number);
        });
    });
    document.querySelectorAll('.btn.operator').forEach(function (button) {
        button.addEventListener('click', function (e) {
            var action = e.target.getAttribute('data-action');
            if (action)
                inputOperator(action);
        });
    });
    document.querySelectorAll('.btn.special').forEach(function (button) {
        button.addEventListener('click', function (e) {
            var action = e.target.getAttribute('data-action');
            if (action)
                doSpecial(action);
        });
    });
    (_a = document.getElementById('change-bg-color')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', changeBgColor);
    (_b = document.getElementById('change-display-color')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', changeDisplayColor);
    (_c = document.getElementById('theme-toggle')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', switchTheme);
    (_d = document.getElementById('calculation-type')) === null || _d === void 0 ? void 0 : _d.addEventListener('change', changeCalcType);
}
function loadTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
    }
}
function switchTheme() {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
    highlightWords();
}
function inputNumber(number) {
    if (currentInput === '0' || operator === '=') {
        currentInput = number;
        if (operator === '=')
            operator = '';
    }
    else {
        if (number === '.' && currentInput.indexOf('.') !== -1)
            return;
        if (currentInput.length >= 16)
            return;
        currentInput += number;
    }
    updateDisplay();
}
function inputOperator(action) {
    if (action === 'calculate') {
        calculate();
    }
    else {
        var operators = {
            'add': '+', 'subtract': '-', 'multiply': '×', 'divide': '/'
        };
        if (previousInput && currentInput && operator) {
            calculate();
        }
        previousInput = currentInput;
        currentInput = '0';
        operator = operators[action];
    }
    updateDisplay();
}
function doSpecial(action) {
    switch (action) {
        case 'clear':
            clear();
            break;
        case 'backspace':
            backspace();
            break;
        case 'toggleSign':
            changeSign();
            break;
        case 'percentage':
            percent();
            break;
        case 'sqrt':
            sqrt();
            break;
        case 'square':
            square();
            break;
        case 'cube':
            cube();
            break;
        case 'factorial':
            factorial();
            break;
        case 'addZeros':
            addZeros();
            break;
    }
    updateDisplay();
}
function calculate() {
    var prev = parseFloat(previousInput);
    var current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current))
        return;
    var result = 0;
    var error = false;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                error = true;
                currentInput = 'Error: Division by zero';
            }
            else {
                result = prev / current;
            }
            break;
        default: return;
    }
    if (!error) {
        currentInput = formatNumber(result);
    }
    previousInput = '';
    operator = '=';
}
function formatNumber(num) {
    if (num.toString().length > 16) {
        return num.toExponential(8);
    }
    return parseFloat(num.toFixed(10)).toString();
}
function clear() {
    currentInput = '0';
    previousInput = '';
    operator = '';
}
function backspace() {
    if (currentInput.length > 1 && currentInput.indexOf('Error') === -1) {
        currentInput = currentInput.slice(0, -1);
    }
    else {
        currentInput = '0';
    }
}
function changeSign() {
    if (currentInput !== '0' && currentInput.indexOf('Error') === -1) {
        var num = parseFloat(currentInput);
        currentInput = (-num).toString();
    }
}
function percent() {
    if (currentInput !== '0' && currentInput.indexOf('Error') === -1) {
        var num = parseFloat(currentInput);
        currentInput = (num / 100).toString();
    }
}
function sqrt() {
    if (currentInput.indexOf('Error') === -1) {
        var num = parseFloat(currentInput);
        if (num >= 0) {
            currentInput = formatNumber(Math.sqrt(num));
        }
        else {
            currentInput = 'Error: Negative number';
        }
    }
}
function square() {
    if (currentInput.indexOf('Error') === -1) {
        var num = parseFloat(currentInput);
        currentInput = formatNumber(num * num);
    }
}
function cube() {
    if (currentInput.indexOf('Error') === -1) {
        var num = parseFloat(currentInput);
        currentInput = formatNumber(num * num * num);
    }
}
function factorial() {
    if (currentInput.indexOf('Error') === -1) {
        var num = parseInt(currentInput);
        if (num < 0 || num % 1 !== 0 || currentInput.indexOf('.') !== -1) {
            currentInput = 'Error: Invalid input';
            return;
        }
        if (num > 170) {
            currentInput = 'Error: Too large';
            return;
        }
        var result = 1;
        for (var i = 2; i <= num; i++) {
            result *= i;
        }
        currentInput = result.toString();
    }
}
function addZeros() {
    if (currentInput.indexOf('Error') === -1 && currentInput.length + 3 <= 16) {
        if (currentInput === '0') {
            currentInput = '000';
        }
        else {
            currentInput += '000';
        }
    }
}
function changeBgColor() {
    backgroundColorIndex = (backgroundColorIndex + 1) % 4;
    body.classList.remove('body-color-1', 'body-color-2', 'body-color-3', 'body-color-4');
    body.classList.add('body-color-' + (backgroundColorIndex + 1));
}
function changeDisplayColor() {
    displayColorIndex = (displayColorIndex + 1) % 4;
    if (resultDisplay) {
        resultDisplay.classList.remove('display-color-1', 'display-color-2', 'display-color-3', 'display-color-4');
        resultDisplay.classList.add('display-color-' + (displayColorIndex + 1));
    }
}
function changeCalcType() {
    var select = document.getElementById('calculation-type');
    console.log('Calculation type:', select.value);
}
function highlightWords() {
    var goalText = document.getElementById('lab-goal');
    if (!goalText)
        return;
    var words = ['HTML', 'CSS', 'TypeScript'];
    var text = goalText.textContent || '';
    words.forEach(function (word) {
        text = text.replace(new RegExp(word, 'gi'), "<span class=\"highlight\">".concat(word, "</span>"));
    });
    goalText.innerHTML = text;
}
function updateDisplay() {
    if (resultDisplay) {
        resultDisplay.textContent = currentInput;
    }
}
document.addEventListener('DOMContentLoaded', startCalculator);
