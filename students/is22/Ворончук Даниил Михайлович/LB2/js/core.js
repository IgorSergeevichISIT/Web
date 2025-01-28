window.onload = function () {
    let currentNumber = ''; // Текущее число
    let operationsStack = []; // Стек операций
    let numbersStack = []; // Стек чисел

    const outputElement = document.getElementById("result");

    function updateOutput() {
        // Формируем строку для отображения
        const expression = numbersStack.join(' ') +
            (operationsStack.length > 0 ? ` ${operationsStack.join(' ')} ${currentNumber || ''}` : ` ${currentNumber || ''}`);
        outputElement.innerHTML = expression || '0';
    }

    function calculate() {
        // Определяем приоритет операций
        const precedence = {
            '+': 1,
            '-': 1,
            'x': 2,
            '/': 2
        };

        const operatorStack = [];
        const operandStack = [];

        for (let i = 0; i < numbersStack.length; i++) {
            operandStack.push(numbersStack[i]);
            if (operationsStack[i]) {
                while (
                    operatorStack.length > 0 &&
                    precedence[operationsStack[i]] <= precedence[operatorStack[operatorStack.length - 1]]
                    ) {
                    const operator = operatorStack.pop();
                    const b = operandStack.pop();
                    const a = operandStack.pop();
                    operandStack.push(evaluate(a, b, operator));
                }
                operatorStack.push(operationsStack[i]);
            }
        }

        while (operatorStack.length > 0) {
            const operator = operatorStack.pop();
            const b = operandStack.pop();
            const a = operandStack.pop();
            operandStack.push(evaluate(a, b, operator));
        }

        return operandStack[0];
    }

    function evaluate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case 'x':
                return a * b;
            case '/':
                return b === 0 ? "Ошибка" : a / b;
            default:
                return 0;
        }
    }

    document.querySelectorAll('[id^="btn_digit_"]').forEach(button => {
        button.onclick = function () {
            const digit = button.innerHTML;

            // Если текущее значение "Ошибка", сбрасываем его перед вводом нового числа
            if (currentNumber === 'Ошибка') {
                currentNumber = ''; // Сбрасываем текущее число
            }

            // Проверяем на недопустимый ввод нескольких нулей
            if (digit === '0' && currentNumber === '0') {
                return; // Игнорируем ввод, если уже введён ноль
            }

            // Если начинается с 0 и добавляется не ".", заменяем 0
            if (currentNumber === '0' && digit !== '.') {
                currentNumber = digit; // Заменяем 0 на введённое число
            } else {
                // Добавляем символ к текущему числу
                if (digit === '.' && currentNumber.includes('.')) return; // Запрещаем вводить второй "."
                currentNumber += digit;
            }

            updateOutput(); // Обновляем отображение
        };
    });

// Обработчик операций
    document.getElementById("btn_op_mult").onclick = () => addOperation('x');
    document.getElementById("btn_op_plus").onclick = () => addOperation('+');
    document.getElementById("btn_op_minus").onclick = () => addOperation('-');
    document.getElementById("btn_op_div").onclick = () => addOperation('/');

    function addOperation(operation) {
        if (currentNumber === '' && numbersStack.length === 0) return;
        if (currentNumber !== '') {
            numbersStack.push(currentNumber);
            currentNumber = '';
        }
        operationsStack.push(operation);
        updateOutput();
    }

    // Кнопка равенства
    document.getElementById("btn_op_equal").onclick = function () {
        if (currentNumber !== '') {
            numbersStack.push(currentNumber);
            currentNumber = '';
        }
        if (numbersStack.length > 1) {
            const result = calculate();
            numbersStack = [result.toString()]; // Оставляем результат в стеке чисел
            operationsStack = []; // Очищаем операции, чтобы начать новые вычисления
            currentNumber = ''; // Сбрасываем текущий ввод
            updateOutput();
        }
    };



    // Сброс
    document.getElementById("btn_op_clear").onclick = function () {
        currentNumber = '';
        operationsStack = [];
        numbersStack = [];
        updateOutput();
    };

    // Удаление последнего символа или элемента из стека
    document.getElementById("bth_digit_back").onclick = function () {
        if (currentNumber !== '') {
            // Удаляем последний символ из текущего числа
            currentNumber = currentNumber.slice(0, -1);
        } else if (numbersStack.length > 0) {
            // Если текущее число пустое, но есть числа в стеке, переносим последнее число в currentNumber
            currentNumber = numbersStack.pop();
        } else if (operationsStack.length > 0) {
            // Если текущее число и числа в стеке пусты, удаляем последнюю операцию
            operationsStack.pop();
        }
        updateOutput();
    };


    // Квадрат числа
    document.getElementById("bth_digit_Square").onclick = function () {
        if (currentNumber !== '') {
            currentNumber = (Math.pow(parseFloat(currentNumber), 2)).toString();
        } else if (numbersStack.length > 0) {
            // Если currentNumber пустое, используем последнее число из стека
            currentNumber = (Math.pow(parseFloat(numbersStack.pop()), 2)).toString();
        }
        updateOutput();
    };

    // Квадратный корень
    document.getElementById("bth_digit_Root").onclick = function () {
        if (currentNumber !== '') {
            const value = parseFloat(currentNumber);
            if (value < 0) {
                currentNumber = "Ошибка";
            } else {
                currentNumber = (Math.sqrt(value)).toString();
            }
            updateOutput();
        }
    };

    // Смена знака
    document.getElementById("btn_op_sing").onclick = function () {
        if (currentNumber !== '') {
            currentNumber = (parseFloat(currentNumber) * -1).toString();
            updateOutput();
        }
    };

    document.getElementById("btn_op_percent").onclick = function () {
        if (currentNumber !== '') {
            const percentage = parseFloat(currentNumber) / 100;

            if (operationsStack.length > 0 && operationsStack[operationsStack.length - 1] === 'x') {
                // Преобразуем только текущее число для умножения
                currentNumber = percentage.toString();
            } else if (numbersStack.length > 0) {
                // Для других операций (например, + или -) вычисляем процент от предыдущего числа
                const baseNumber = parseFloat(numbersStack[numbersStack.length - 1]);
                currentNumber = (baseNumber * percentage).toString();
            }

            updateOutput();
        }
    };

    // Факториал
    document.getElementById("bth_digit_Factorial").onclick = function () {
        if (currentNumber !== '') {
            const num = parseInt(currentNumber, 10);
            currentNumber = factorial(num);
            updateOutput();
        }
    };

    function factorial(n) {
        if (n < 0) return "Ошибка";
        if (n > 50) return "Ошибка";
        if (n === 0 || n === 1) return "1";
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result.toString();
    }

    function addOperation(operation) {
        // Если текущий ввод пуст, а стек операций пуст, ничего не делаем
        if (currentNumber === '' && numbersStack.length === 0) return;

        // Если текущий ввод не пустой, добавляем его в стек чисел
        if (currentNumber !== '') {
            numbersStack.push(currentNumber);
            currentNumber = '';
        }

        // Проверка, если последней операцией была операция, то не добавляем новую
        if (operationsStack.length > 0 && ['+', '-', 'x', '/'].includes(operationsStack[operationsStack.length - 1])) {
            return; // Прерываем выполнение, если последняя операция уже была
        }

        // Добавляем операцию в стек операций
        operationsStack.push(operation);
        updateOutput();
    }
    // Кнопка добавления трех нулей
    document.getElementById("bth_digit_000").onclick = function () {
        if (currentNumber !== '') {
            currentNumber += '000'; // Добавляем три нуля к текущему числу
            updateOutput();
        }
    };


    // Переключение темы
    const themeSwitchButton = document.getElementById('theme-switch');
    const resultElement = document.querySelector('.result');
    themeSwitchButton.addEventListener('click', function () {
        resultElement.classList.toggle('dark-mode');
    });
};
