var Calculator = /** @class */ (function () {
    function Calculator() {
        this.currentInput = '';
        this.previousInput = '';
        this.operator = '';
        this.waitingForNewInput = false;
        this.isDarkTheme = false;
        this.display = document.querySelector('#result-input');
        this.initializeEventListeners();
        this.clear();
    }
    Calculator.prototype.initializeEventListeners = function () {
        var _this = this;
        var _loop_1 = function (i) {
            var button = document.getElementById("btn_digit_".concat(i));
            if (button) {
                button.addEventListener('click', function () { return _this.inputDigit(i.toString()); });
            }
        };
        for (var i = 0; i <= 9; i++) {
            _loop_1(i);
        }
        var dotButton = document.getElementById('btn_digit_dot');
        if (dotButton) {
            dotButton.addEventListener('click', function () { return _this.inputDot(); });
        }
        var operators = [
            { id: 'btn_op_plus', op: '+' },
            { id: 'btn_op_minus', op: '-' },
            { id: 'btn_op_mult', op: '*' },
            { id: 'btn_op_div', op: '/' },
        ];
        operators.forEach(function (_a) {
            var id = _a.id, op = _a.op;
            var button = document.getElementById(id);
            if (button) {
                button.addEventListener('click', function () { return _this.handleOperator(op); });
            }
        });
        var clearButton = document.getElementById('btn_op_clear');
        if (clearButton) {
            clearButton.addEventListener('click', function () { return _this.clear(); });
        }
        var backButton = document.getElementById('btn_op_back');
        if (backButton) {
            backButton.addEventListener('click', function () { return _this.backspace(); });
        }
        var signButton = document.getElementById('btn_op_sign');
        if (signButton) {
            signButton.addEventListener('click', function () { return _this.toggleSign(); });
        }
        var equalButton = document.getElementById('btn_op_equal');
        if (equalButton) {
            equalButton.addEventListener('click', function () { return _this.calculate(); });
        }
        var expButton = document.getElementById('btn_op_exp');
        if (expButton) {
            expButton.addEventListener('click', function () { return _this.square(); });
        }
        var factorialButton = document.getElementById('btn_op_factorial');
        if (factorialButton) {
            factorialButton.addEventListener('click', function () { return _this.factorial(); });
        }
        var rootButton = document.getElementById('btn_op_root');
        if (rootButton) {
            rootButton.addEventListener('click', function () { return _this.squareRoot(); });
        }
        var thousandButton = document.getElementById('btn_op_thousand');
        if (thousandButton) {
            thousandButton.addEventListener('click', function () { return _this.inputThousand(); });
        }
        var percentButton = document.getElementById('btn_op_percent');
        if (percentButton) {
            percentButton.addEventListener('click', function () { return _this.calculatePercent(); });
        }
        var logButton = document.getElementById('btn_op_log');
        if (logButton) {
            logButton.addEventListener('click', function () { return _this.logarithm(); });
        }
        var modeButton = document.getElementById('btn_mode');
        if (modeButton) {
            modeButton.addEventListener('click', function () { return _this.toggleTheme(modeButton); });
        }
    };
    Calculator.prototype.inputDigit = function (digit) {
        if (this.waitingForNewInput) {
            this.currentInput = digit;
            this.waitingForNewInput = false;
        }
        else {
            this.currentInput = this.currentInput === '0' ? digit : this.currentInput + digit;
        }
        this.updateDisplay();
    };
    Calculator.prototype.inputDot = function () {
        if (this.waitingForNewInput) {
            this.currentInput = '0.';
            this.waitingForNewInput = false;
        }
        else if (this.currentInput.indexOf('.') === -1) {
            this.currentInput += this.currentInput === '' ? '0.' : '.';
        }
        this.updateDisplay();
    };
    Calculator.prototype.inputThousand = function () {
        this.currentInput += '000';
        this.updateDisplay();
    };
    Calculator.prototype.handleOperator = function (nextOperator) {
        var inputValue = parseFloat(this.currentInput);
        if (this.previousInput !== '' && this.operator && !this.waitingForNewInput) {
            this.calculate();
        }
        this.previousInput = this.currentInput;
        this.waitingForNewInput = true;
        this.operator = nextOperator;
    };
    Calculator.prototype.calculate = function () {
        if (this.operator === '' || this.waitingForNewInput) {
            return;
        }
        var prev = parseFloat(this.previousInput);
        var current = parseFloat(this.currentInput);
        var result;
        switch (this.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert('Ошибка: деление на ноль!');
                    this.clear();
                    return;
                }
                result = prev / current;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }
        this.currentInput = result.toString();
        this.operator = '';
        this.previousInput = '';
        this.waitingForNewInput = true;
        this.updateDisplay();
    };
    Calculator.prototype.clear = function () {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = '';
        this.waitingForNewInput = false;
        this.updateDisplay();
    };
    Calculator.prototype.backspace = function () {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        }
        else {
            this.currentInput = '0';
        }
        this.updateDisplay();
    };
    Calculator.prototype.toggleSign = function () {
        this.currentInput = (parseFloat(this.currentInput) * -1).toString();
        this.updateDisplay();
    };
    Calculator.prototype.square = function () {
        var current = parseFloat(this.currentInput);
        this.currentInput = (current * current).toString();
        this.waitingForNewInput = true;
        this.updateDisplay();
    };
    Calculator.prototype.squareRoot = function () {
        var current = parseFloat(this.currentInput);
        if (current < 0) {
            alert('Ошибка: нельзя извлечь корень из отрицательного числа!');
            return;
        }
        this.currentInput = Math.sqrt(current).toString();
        this.waitingForNewInput = true;
        this.updateDisplay();
    };
    Calculator.prototype.factorial = function () {
        var current = parseInt(this.currentInput);
        if (current < 0 || current !== Math.floor(current)) {
            alert('Ошибка: факториал определен только для целых неотрицательных чисел!');
            return;
        }
        if (current > 100) {
            alert('Ошибка: число слишком большое для вычисления факториала!');
            return;
        }
        var result = 1;
        for (var i = 2; i <= current; i++) {
            result *= i;
        }
        this.currentInput = result.toString();
        this.waitingForNewInput = true;
        this.updateDisplay();
    };
    Calculator.prototype.calculatePercent = function () {
        var current = parseFloat(this.currentInput);
        if (this.previousInput !== '' && this.operator) {
            var prev = parseFloat(this.previousInput);
            var percentValue = void 0;
            switch (this.operator) {
                case '+':
                    percentValue = prev + (prev * current / 100);
                    break;
                case '-':
                    percentValue = prev - (prev * current / 100);
                    break;
                case '*':
                    percentValue = prev * (current / 100);
                    break;
                case '/':
                    if (current === 0) {
                        alert('Ошибка: деление на ноль!');
                        this.clear();
                        return;
                    }
                    percentValue = prev / (current / 100);
                    break;
                default:
                    percentValue = current / 100;
            }
            this.currentInput = percentValue.toString();
            this.waitingForNewInput = true;
        }
        else {
            this.currentInput = (current / 100).toString();
            this.waitingForNewInput = true;
        }
        this.updateDisplay();
    };
    Calculator.prototype.log10 = function (x) {
        return Math.log(x) / Math.LN10;
    };
    Calculator.prototype.logarithm = function () {
        var current = parseFloat(this.currentInput);
        if (current <= 0) {
            alert('Ошибка: логарифм определен только для положительных чисел!');
            return;
        }
        var result = this.log10(current);
        this.currentInput = result.toString();
        this.waitingForNewInput = true;
        this.updateDisplay();
    };
    Calculator.prototype.toggleTheme = function (button) {
        this.isDarkTheme = !this.isDarkTheme;
        var calculatorContainer = document.querySelector('.calculator-background');
        if (this.isDarkTheme) {
            calculatorContainer.classList.add('dark-theme');
            button.textContent = 'Light';
        }
        else {
            calculatorContainer.classList.remove('dark-theme');
            button.textContent = 'Dark';
        }
    };
    Calculator.prototype.updateDisplay = function () {
        this.display.value = this.currentInput;
    };
    return Calculator;
}());
document.addEventListener('DOMContentLoaded', function () {
    new Calculator();
});
