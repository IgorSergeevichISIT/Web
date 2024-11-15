window.onload = function() { 
    let a = '';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;
    let expressionString = ''; 
    let isAccumulated = false; // Флаг для накопленного результата

    const outputElement = document.getElementById("result");

    function updateOutput(value) {
        outputElement.innerHTML = value;

        // Проверяем обращение к длине текста и добавляем класс для прокрутки
        if (outputElement.scrollWidth > outputElement.clientWidth) {
            outputElement.classList.add('scrolling-text');
        } else {
            outputElement.classList.remove('scrolling-text');
        }

        // Прокручиваем до конца, если это необходимо
        outputElement.scrollLeft = outputElement.scrollWidth; // Устанавливаем прокрутку в конец
    }

    function resetCalculator() {
        a = '';
        b = '';
        selectedOperation = null;
        expressionResult = '';
        expressionString = '';
        isAccumulated = false;
        updateOutput('0'); // Вернуть к начальному состоянию
    }
    
    // Функция для проверки Infinity
    function checkInfinity() {
        if (outputElement.innerHTML === 'Infinity') {
            resetCalculator();
            return true; // Указание на то, что сброс был выполнен
        }
        return false;
    }

    function onDigitButtonClicked(digit) {
        if (checkInfinity()) return; // Проверка на Infinity

        if (!selectedOperation) {
            if ((digit !== '.') || (digit === '.' && !a.includes(digit))) { 
                a += digit;
            }
            updateOutput(a || '0'); 
        } else {
            if ((digit !== '.') || (digit === '.' && !b.includes(digit))) { 
                b += digit;
                expressionString = a + ' ' + selectedOperation + ' ' + b;
                updateOutput(expressionString);         
            }
        }
    }

    // Привязываем кнопки цифр
    const digitButtons = document.querySelectorAll('[id^="btn_digit_"]');
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    // Обработчики для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (checkInfinity()) return; // Проверка на Infinity
        if (selectedOperation) return; // Если уже выбрана операция, не делаем ничего
        if (a === '') return;
        selectedOperation = '×';
        expressionString = a + ' ' + selectedOperation; 
        updateOutput(expressionString);
    }
    
    document.getElementById("btn_op_plus").onclick = function() { 
        if (checkInfinity()) return; // Проверка на Infinity
        if (selectedOperation) { 
            selectedOperation = '+'; // Меняем знак, если он уже есть
        } else {
            if (a === '') return;
            if (isAccumulated) {
                a = expressionResult.toString(); // Используем накопленный результат
            }
            selectedOperation = '+';
        }
        expressionString = a + ' ' + selectedOperation;
        updateOutput(expressionString);
        isAccumulated = true; // Включаем флаг накопления
    }
    
    document.getElementById("btn_op_minus").onclick = function() { 
        if (checkInfinity()) return; // Проверка на Infinity
        if (selectedOperation) { 
            selectedOperation = '-'; // Меняем знак, если он уже есть
        } else {
            if (a === '') return;
            if (isAccumulated) {
                a = expressionResult.toString(); // Используем накопленный результат
            }
            selectedOperation = '-';
        }
        expressionString = a + ' ' + selectedOperation;
        updateOutput(expressionString);
        isAccumulated = true; // Включаем флаг накопления
    }
    
    document.getElementById("btn_op_div").onclick = function() { 
        if (checkInfinity()) return; // Проверка на Infinity
        if (selectedOperation) {
            selectedOperation = '/'; // Меняем знак, если он уже есть
        } else {
            if (a === '') return;
            selectedOperation = '/';
        }
        expressionString = a + ' ' + selectedOperation;
        updateOutput(expressionString);
    }

    // Кнопка очистки
    document.getElementById("btn_op_clear").onclick = resetCalculator;

    // Переключение знака
    document.getElementById("btn_op_sign").onclick = function() {
        checkInfinity(); // Проверка на Infinity
        // Находим текущее значение в зависимости от того, есть ли b
        if (b === '' && a !== '') {
            a = (-a).toString();
            updateOutput(a);
        } else if (b !== '') {
            b = (-b).toString();
            expressionString = a + ' ' + (selectedOperation || '') + ' ' + b;
            updateOutput(expressionString);
        }
    }

    // Кнопка процента
    document.getElementById("btn_op_percent").onclick = function() {
        if (checkInfinity()) return; // Проверка на Infinity
        if (b === '' && a !== '') {
            a = (+a / 100).toString();
            expressionString = a + ' ' + (selectedOperation || '') + ' ' + b;
            updateOutput(expressionString);
        } else if (b !== '') {
            b = (+b / 100).toString();
            expressionString = a + ' ' + (selectedOperation || '') + ' ' + b;
            updateOutput(expressionString);
        }
    }

    // Кнопка результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (checkInfinity()) return; // Проверка на Infinity
        if (a === '' || b === '' || !selectedOperation) return;

        switch(selectedOperation) { 
            case '×':
                expressionResult = (+a) * (+b);
                break;
            case '+':
                expressionResult = (+a) + (+b);
                break;
            case '-':
                expressionResult = (+a) - (+b);
                break;
            case '/':
                expressionResult = (+a) / (+b);
                break;
        }

        updateOutput(expressionResult); 
        a = expressionResult.toString(); 
        b = '';
        selectedOperation = null;
        isAccumulated = false; // Сбрасываем флаг накопления
    }

    // Позволяет удалять последние символы
    document.getElementById("btn_op_backspace").onclick = function() {
        if (checkInfinity()) return; // Проверка на Infinity
        if (b !== '') { 
            b = b.slice(0, -1);
            updateOutput(a + ' ' + selectedOperation + ' ' + b || a || '0');
        } else if (selectedOperation) { 
            selectedOperation = null;
            updateOutput(a || '0');
        } else {
            a = a.slice(0, -1);
            updateOutput(a || '0');
        }
    }

    // Кнопка квадратного корня
    document.getElementById("btn_op_sqrt").onclick = function() {
        if (checkInfinity()) return; // Проверка на Infinity
        if (!selectedOperation && a !== '') {
            a = Math.sqrt(+a).toString();
            updateOutput(a);
        } else if (b !== '') {
            b = Math.sqrt(+b).toString();
            expressionString = a + ' ' + selectedOperation + ' ' + b;
            updateOutput(expressionString);
        }
    }

    // Кнопка возведения в квадрат
    document.getElementById("btn_op_square").onclick = function() {
        if (checkInfinity()) return; // Проверка на Infinity
        if (!selectedOperation && a !== '') {
            a = Math.pow(+a, 2).toString();
            updateOutput(a);
        } else if (b !== '') {
            b = Math.pow(+b, 2).toString();
            expressionString = a + ' ' + selectedOperation + ' ' + b;
            updateOutput(expressionString);
        }
    }

    // Кнопка факториала
    document.getElementById("btn_op_fact").onclick = function() {
        function factorial(n) {
            if (n >= 171) {
                return Infinity; // Возвращаем Infinity для факториала большего 170
            }
            return (n != 1 && n != 0) ? n * factorial(n - 1) : 1; // Факториал
        }

        if (checkInfinity()) return; // Проверка на Infinity
        if (!selectedOperation && a !== '') {
            a = factorial(+a).toString();
            updateOutput(a);
        } else if (b !== '') {
            b = factorial(+b).toString();
            expressionString = a + ' ' + selectedOperation + ' ' + b;
            updateOutput(expressionString);
        }
    };

    // Кнопка добавления трех нулей
    document.getElementById("btn_op_triple_zero").onclick = function() {
        if (checkInfinity()) return; // Проверка на Infinity
        if (!selectedOperation) {
            a += '000'; // Добавляем '000' к числу 'a'
            updateOutput(a || '0');
        } else {
            b += '000'; // Добавляем '000' к числу 'b'
            expressionString = a + ' ' + selectedOperation + ' ' + b;
            updateOutput(expressionString);
        }
    };
};
