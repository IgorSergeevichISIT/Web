window.onload = function() 
{ 
    // Переменные для хранения чисел и операций
    let a = '';          // Первое число
    let b = '';           // Второе число
    let expressionResult = '';  // Результат вычисления
    let selectedOperation = null;  // Выбранная операция

      // Получаем доступ к экрану калькулятора в поле вывода
    const outputElement = document.getElementById("result")

    // Получаем все кнопки с цифрами (их id начинаются с "btn_digit_")
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    function onDigitButtonClicked(digit) {
        // Если операция не выбрана, работаем с первым числом (a) - после выбора операции начинается ввод второго числа
        if (!selectedOperation) {
            // Проверяем, не пытаемся ли мы добавить вторую точку
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                // здесь у нас происходит складывание сохраненного уже числа и нажатой цифры. Оба поля string, поэтому
                // каждый раз цифра записывается в конец строки. Например: a = '14', digit = '5', 
                // a += digit - это короткая запись a = a + digit - поэтомоу после этой операции a = '145'
                a += digit;
            }
            outputElement.innerHTML = a;
        } 
        // Если операция выбрана, работаем со вторым числом (b)
        else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit;
                outputElement.innerHTML = b;        
            }
        }
    }

    function applyOperation() {
    if (a !== '' && b !== '' && selectedOperation) {
        switch (selectedOperation) { 
            case 'x': a = ((+a) * (+b)).toString(); break;
            case '+': a = ((+a) + (+b)).toString(); break;
            case '-': a = ((+a) - (+b)).toString(); break;
            case '/': a = ((+a) / (+b)).toString(); break;
        }
        b = '';
        outputElement.innerHTML = a;
    }
}

    // Настраиваем обработчики для цифровых кнопок - для каждой кнопки с цифрой и точкой вызываем выше написанную функцию по формированию числа
    digitButtons.forEach(button => {
        button.onclick = function() {
            // берем текст, написанный на кнопке - он и является цифрой
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    // Настраиваем обработчики для кнопок операций - сохраняем выбранную операцию в ранее созданную переменную selectedOperation
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return;
        if (selectedOperation && b !== '') applyOperation();
        selectedOperation = 'x';
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return;
        if (selectedOperation && b !== '') applyOperation();
        selectedOperation = '+';
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return;
        if (selectedOperation && b !== '') applyOperation();
        selectedOperation = '-';
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return;
        if (selectedOperation && b !== '') applyOperation();
        selectedOperation = '/';
    }


    document.getElementById("btn_op_sqrt").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = Math.sqrt(Number(a)).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = Math.sqrt(Number(b)).toString();
                outputElement.innerHTML = b;
            }
        }
    };

    document.getElementById("btn_op_square").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = (Number(a) ** 2).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = (Number(b) ** 2).toString();
                outputElement.innerHTML = b;
            }
        }
    };

    function factorial(n) {
        if (n < 0) return NaN;
        if (n === 0) return 1;
        let r = 1;
        for (let i = 1; i <= n; i++) r *= i;
        return r;
    }

    document.getElementById("btn_op_fact").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = factorial(Number(a)).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = factorial(Number(b)).toString();
                outputElement.innerHTML = b;
            }
        }
    };


    document.getElementById("btn_op_inv").onclick = function() {
    if (!selectedOperation && a !== '') {
        a = (1 / Number(a)).toString();
        outputElement.innerHTML = a;
    }
    if (selectedOperation && b !== '') {
        b = (1 / Number(b)).toString();
        outputElement.innerHTML = b;
    }
    }; 

    // Очищаем все значения при нажатии на кнопку C (вешаем обработчик события click на кнопку С)
    document.getElementById("btn_op_clear").onclick = function() { 
        a = '';
        b = '';
        selectedOperation = '';
        expressionResult = '';
        outputElement.innerHTML = 0;
    }

    document.getElementById("btn_op_sign").onclick = function () {
        // Если ещё не выбрано действие — меняем знак у первого числа a
        if (!selectedOperation) {
            if (a === '') return;
            a = (parseFloat(a) * -1).toString();
            outputElement.innerHTML = a;
        } 
        // Если действие выбрано — меняем знак у второго числа b
        else {
            if (b === '') return;
            b = (parseFloat(b) * -1).toString();
            outputElement.innerHTML = b;
        }
    };

    document.getElementById("btn_op_percent").onclick = function() {
        if (!selectedOperation) {
            if (a !== '') {
                a = (Number(a) / 100).toString();
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = (Number(b) / 100).toString();
                outputElement.innerHTML = b;
            }
        }
    };

    document.getElementById("btn_op_back").onclick = function() {
        if (!selectedOperation) {
            a = a.slice(0, -1);
            outputElement.innerHTML = a || 0;
        } else {
            b = b.slice(0, -1);
            outputElement.innerHTML = b || 0;
        }
    };

    // Вычисляем результат при нажатии на = (вешаем обработчик события click на кнопку =)
    document.getElementById("btn_op_equal").onclick = function() { 
        // Проверяем, что у нас есть оба числа и операция
        if (a === '' || b === '' || !selectedOperation)
            return;
            
        // Выполняем выбранную операцию - чтобы не плодить if, воспользуемся удобной и более наглядной функцией сравнения switch, которая на основе значения переданной переменной выполняет нужный кейс. В case указывается ожидаемое точное значение переменной (это может быть любое значение), а затем после : пишется код, который нужно выполнить в данном случае. Case проверяются последовательно, выход из switch происходит при попадании на break или если значение не совпало ни с чем.
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b);
                // обязательно пишется в конце действий case, чтобы выйти из switch, иначе продолжится сравнение case дальше
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
            // желательно (но не обязательно) всегда прописывать дефолтное поведение, в случае если в переменной окажется не перечисленное выше значение. в нашем случае это не нужно.
            default:
                break;
        }
        
        // Сохраняем результат и очищаем второе число, чтобы при новом вводе записывать значение нового числа в b
        a = expressionResult.toString();
        b = '';
        selectedOperation = null;

        // Показываем результат на экране
        outputElement.innerHTML = a;
    }
    
    document.getElementById("btn_theme_toggle").onclick = function() {
        document.body.classList.toggle("light-theme");
    }

// массив цветов для фона
    const colors = ["#b8b0f4", "#08c4ce", "#0b1a3d"]; // зелёный, серый, тёмно-синий
    let currentColor = 0;

    // находим кнопку
    const btnColor = document.getElementById("btn_color_fon");

    // Установим **предустановленный цвет** при загрузке
    document.body.style.backgroundColor = colors[currentColor];
    
    btnColor.addEventListener("click", () => {
        // меняем фон body
        document.body.style.background = colors[currentColor];
        document.body.style.backgroundSize = "cover"; // чтобы при картинке корректно
        // переход к следующему цвету
        currentColor = (currentColor + 1) % colors.length;
    });

};