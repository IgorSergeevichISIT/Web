document.addEventListener('DOMContentLoaded', function() {
    let currentInput = '0';
    let previousInput = '';
    let operator = null;
    let isPercent = false; 
    let isError = false;  
    let result = document.getElementById('result');

    // переключение темы
    const toggleThemeButton = document.getElementById('theme-toggle');
    if (toggleThemeButton) {
        toggleThemeButton.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
        });
    } else {
        console.error('Toggle theme button not found!');
    }

    function updateResult() {
        result.textContent = currentInput;
    }

    function showError(message) {
        currentInput = message;
        isError = true;
        updateResult();
    }

    function handleDigit(digit) {
        if (isError) { 
            clearCalculator(); 
        }
        if (currentInput === '0' || isPercent) {
            currentInput = digit;
            isPercent = false; 
        } else {
            currentInput += digit;
        }
        updateResult();
    }

    function handleOperator(op) {
        if (isError) return;
        if (operator !== null) {
            calculate();
        }
        previousInput = currentInput;
        currentInput = '0';
        operator = op;
        updateResult();
    }

    // выполнение вычисления
    function calculate() {
        if (isError) return; 

        let resultValue = 0;
        let prev = parseFloat(previousInput);
        let current = parseFloat(currentInput);

        if (isPercent) {
            current = prev * (current / 100); 
            isPercent = false;
        }

        switch (operator) {
            case '+':
                resultValue = prev + current;
                break;
            case '-':
                resultValue = prev - current;
                break;
            case 'x':
                resultValue = prev * current;
                break;
            case '/':
                if (current === 0) {
                    showError('Error: Division by 0');
                    return;
                }
                resultValue = prev / current;
                break;
            default:
                return;
        }

        currentInput = resultValue.toString();
        operator = null;
        previousInput = '';
        updateResult();
    }

    //  сброс калькулятора
    function clearCalculator() {
        currentInput = '0';
        previousInput = '';
        operator = null;
        isPercent = false;
        isError = false;
        updateResult();
    }

    // смены знака 
    function toggleSign() {
        if (isError) return; 
        if (currentInput === '0') return;
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateResult();
    }

    //  процента
    function calculatePercentage() {
        if (isError) return; 
        let value = parseFloat(currentInput);
    
        if (operator && previousInput) {
            let base = parseFloat(previousInput);
            value = base * (value / 100); 
        } else {
            value = value / 100; 
        }
    
        currentInput = value.toString();
        updateResult();
    }

    // квадратный корень
    function calculateSqrt() {
        if (isError) return; 
        let value = parseFloat(currentInput);
        if (value < 0) {
            showError('Error: Negative sqrt');
            return;
        }
        currentInput = Math.sqrt(value).toString();
        updateResult();
    }

    //  квадрат числа
    function calculateSquare() {
        if (isError) return;
        currentInput = (parseFloat(currentInput) ** 2).toString();
        updateResult();
    }

    // вычисления факториала
    function calculateFactorial() {
        if (isError) return; 
        let num = parseInt(currentInput);
        if (num < 0) {
            showError('Error: Negative factorial');
            return;
        }
        let factorial = 1;
        for (let i = 1; i <= num; i++) {
            factorial *= i;
        }
        currentInput = factorial.toString();
        updateResult();
    }

    //  точка
    function handleDot() {
        if (isError) {
            clearCalculator(); 
        }
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        updateResult();
    }

    // Обработчики событий для кнопок
    document.getElementById('btn_op_clear').addEventListener('click', clearCalculator);
    document.getElementById('btn_op_sign').addEventListener('click', toggleSign);
    document.getElementById('btn_op_percent').addEventListener('click', calculatePercentage);
    document.getElementById('btn_op_sqrt').addEventListener('click', calculateSqrt);
    document.getElementById('btn_op_square').addEventListener('click', calculateSquare);
    document.getElementById('btn_op_factorial').addEventListener('click', calculateFactorial);

    document.getElementById('btn_op_backspace').addEventListener('click', () => {
        if (isError) return; 
        currentInput = currentInput.slice(0, -1) || '0';
        updateResult();
    });

    document.getElementById('btn_op_div').addEventListener('click', () => handleOperator('/'));
    document.getElementById('btn_op_mult').addEventListener('click', () => handleOperator('x'));
    document.getElementById('btn_op_minus').addEventListener('click', () => handleOperator('-'));
    document.getElementById('btn_op_plus').addEventListener('click', () => handleOperator('+'));
    document.getElementById('btn_op_equal').addEventListener('click', calculate);

    document.getElementById('btn_op_000').addEventListener('click', () => handleDigit('000'));
    document.getElementById('btn_digit_0').addEventListener('click', () => handleDigit('0'));
    document.getElementById('btn_digit_1').addEventListener('click', () => handleDigit('1'));
    document.getElementById('btn_digit_2').addEventListener('click', () => handleDigit('2'));
    document.getElementById('btn_digit_3').addEventListener('click', () => handleDigit('3'));
    document.getElementById('btn_digit_4').addEventListener('click', () => handleDigit('4'));
    document.getElementById('btn_digit_5').addEventListener('click', () => handleDigit('5'));
    document.getElementById('btn_digit_6').addEventListener('click', () => handleDigit('6'));
    document.getElementById('btn_digit_7').addEventListener('click', () => handleDigit('7'));
    document.getElementById('btn_digit_8').addEventListener('click', () => handleDigit('8'));
    document.getElementById('btn_digit_9').addEventListener('click', () => handleDigit('9'));

    document.getElementById('btn_digit_dot').addEventListener('click', handleDot);
});
