window.onload = function(){ 
    let a = '0'
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    let expressionString = '' 
    let colors = ['gray', 'yellow', 'red', 'blue', 'green', 'purple']; // Список цветов
    let currentColorIndex = 0; // Текущий индекс цвета
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                if (digit === '.' && ((a === "0")||(a === ""))){
                    a = "0."
                }
                else if (a === "Infinity"){
                    a = digit
                }
                else if (a[0] === "0"){
                    if (a[1] === "."){
                        a += digit
                    }
                    else if(a[1] !== "."){
                        a = digit
                    }
                }
                else{
                    a += digit
                }
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                if (digit === '.' && ((b === "0")||(b === ""))){
                    b = "0."
                }
                else if (b === "Infinity"){
                    b = digit
                }
                else if (b === "0"){
                    b = digit
                }
                else{
                    b += digit
                }
                expressionString = a + ' ' + selectedOperation + ' ' + b;
                outputElement.innerHTML = expressionString;         
            }
        }
    }
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
        expressionString = a + ' ' + selectedOperation + ' ' + b
        outputElement.innerHTML = expressionString
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        selectedOperation = '+'
        expressionString = a + ' ' + selectedOperation + ' ' + b
        outputElement.innerHTML = expressionString
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        selectedOperation = '-'
        expressionString = a + ' ' + selectedOperation + ' ' + b
        outputElement.innerHTML = expressionString
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
        expressionString = a + ' ' + selectedOperation + ' ' + b
        outputElement.innerHTML = expressionString
    }
    
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = '0'
        b = ''
        selectedOperation = ''
        expressionResult = ''
        expressionString = '' // Очищаем строку выражения
        outputElement.innerHTML = 0
    }

    document.getElementById("btn_op_sign").onclick = function() {
        if (b === '' && a !== '') {
            a = (-a).toString();
            expressionString = a + ' ' + (selectedOperation || '') + ' ' + b 
            outputElement.innerHTML = expressionString;
        } else if (b !== '') {
            b = (-b).toString();
            expressionString = a + ' ' + (selectedOperation || '') + ' ' + b
            outputElement.innerHTML = expressionString;
        }
    }

    document.getElementById("btn_op_percent").onclick = function() {
        if (b === '' && a !== '') {
            a = (+a / 100).toString();
            expressionString = a + ' ' + (selectedOperation || '') + ' ' + b
            outputElement.innerHTML = expressionString;
        } else if (b !== '') {
            b = (+b / 100).toString();
            expressionString = a + ' ' + (selectedOperation || '') + ' ' + b
            outputElement.innerHTML = expressionString;
        }
    }
    
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
        }
        
        // Дополняем выражение результатом
        outputElement.innerHTML = expressionResult
        
        // Обновляем переменные для следующего расчета
        a = expressionResult.toString()
        b = ''
        selectedOperation = null
    }

    document.getElementById("btn_op_square").onclick = function() {
        if (!selectedOperation && a !== '') {
            a = Math.pow(+a, 2).toString();
            outputElement.innerHTML = a;
        } else if (b !== '') {
            b = Math.pow(+b, 2).toString();
            expressionString = a + ' ' + selectedOperation + ' ' + b;
            outputElement.innerHTML = expressionString;
        }
    }

    document.getElementById("btn_op_sqrt").onclick = function() {
        if (!selectedOperation && a !== '') {
            a = Math.sqrt(+a).toString();
            outputElement.innerHTML = a;
        } else if (b !== '') {
            b = Math.sqrt(+b).toString();
            expressionString = a + ' ' + selectedOperation + ' ' + b;
            outputElement.innerHTML = expressionString;
        }
    }

    document.getElementById("btn_op_backspace").onclick = function() {
        if (b !== '') { 
            // Если b не пустое, удаляем последнюю цифру из b
            b = b.slice(0, -1);
            outputElement.innerHTML =  a+' '+selectedOperation+' '+b || a+' '+selectedOperation || '0';  
        } else if (selectedOperation) { 
            // Если b пустое и операция выбрана, сбрасываем операцию
            selectedOperation = null;
            outputElement.innerHTML = a || '0';  // Показываем значение a
        } else {
            // Если только a введено, удаляем последнюю цифру из a
            a = a.slice(0, -1);
            outputElement.innerHTML = a || '0';  // Если a станет пустым, вывести '0'
        }
    }

    document.getElementById("btn_op_fact").onclick = function() {
        function factorial(n) {
            if(n > 170) return outputElement.innerHTML = "Infinity";
            return ((n != 1) ? n * factorial(n - 1) : 1);
        }
        if (!selectedOperation && a !== '') {
            a = factorial(a).toString();
            outputElement.innerHTML = a;
        } else if (b !== '') {
            b = factorial(b).toString();
            expressionString = a + ' ' + selectedOperation + ' ' + b;
            outputElement.innerHTML = expressionString;
        }
    }

    document.getElementById("btn_op_3_zeros").onclick = function() {
        if (!selectedOperation) {
            if (a === '0'){
                a = '0'
            }
            else{
                a += '000';
            }
            
            outputElement.innerHTML = a;
        } else {
            if (b === '0'){
                b = '0'
            }
            else{
                b += '000';
            }
            expressionString = a + ' ' + selectedOperation + ' ' + b;
            outputElement.innerHTML = expressionString;
        }
    }

    document.getElementById("btn_op_2_zeros").onclick = function() {
        if (!selectedOperation) {
            if (a === '0'){
                a = '0'
            }
            else{
                a += '00';
            }
            outputElement.innerHTML = a;
        } else {
            if (b === '0'){
                b = '0'
            }
            else{
                b += '00';
            }
            expressionString = a + ' ' + selectedOperation + ' ' + b;
            outputElement.innerHTML = expressionString;
        }
    }

    document.getElementById("btn_op_1_zeros").onclick = function() {
        if (!selectedOperation) {
            if (a === '0'){
                a = '0'
            }
            else{
                a += '0';
            }
            outputElement.innerHTML = a;
        } else {
            if (b === '0'){
                b = '0'
            }
            else{
                b += '0';
            }
            expressionString = a + ' ' + selectedOperation + ' ' + b;
            outputElement.innerHTML = expressionString;
        }
    }
    
    document.getElementById("theme-btn").onclick = function() {
        // Увеличиваем индекс цвета
        currentColorIndex = (currentColorIndex + 1) % colors.length; // Цикличный переход по массиву
        // Меняем цвет фона элемента вывода результата
        outputElement.style.backgroundColor = colors[currentColorIndex];
    }
};
