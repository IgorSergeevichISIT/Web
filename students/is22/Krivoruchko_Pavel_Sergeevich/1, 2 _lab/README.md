1 и 2 лабораторные были объединены.

# Скриншоты

## Калькулятор:

![](photo/t1.png)

![](photo/t2.png)

## Выпадающее поле с информацией:

![](photo/t3.png)

# Выполненые задания

## Основные

- Ознакомился инструментами построения пользовательских интерфейсов web-сайтов: HTML, CSS, JavaScript.

- Реализовал простой калькулятор

## Дополнительные

- Поменял цветовую палитру калькулятора с оранжево-серой на любую другую;
- Изменил фон калькулятора;
- Изменил форму кнопок;
- Изменил цвет поля вывода результата;
- Скруглил края поля вывода;
- Поменял шрифт цифр;
- Сделал шрифт более толстым;
- Изменил цвет при наведении мышки на кнопку на другой;
- Добавил надпись "ЛР выполнена ФИО"(находиться внутри разворачивающегося списка с информацией);
- Выровнял калькулятор по центру;
- Увеличил размер окна вывода;
- Добавил кнопку для смены темы;
- Сделал шрифт тоньше;
- Сменил цвет шрифта;
- Добавил изображение на фон;
- Добавил кнопку со ссылкой на GitHub(находиться внутри разворачивающегося списка с информацией);
- Сделал поле с выпадающим списком;
- Сделал сворачивающиеся и разворачивающиеся подробности;
- Добавил поле с целью ЛР и подсветить слова: знакомство, HTML, CSS(находиться внутри разворачивающегося списка с информацией).

- Запрограммировал операцию смены знака +/-;
- Запрограммировал операцию вычисления процента %;
- Добавил кнопку стирания введенной цифры (backspace);
- Сделал смену цвета фона по кнопке;
- Запрограммировал операцию вычисления квадратного корня √;
- Запрограммировал операцию возведения в квадрат x²;
- Запрограммировал операцию вычисления факториала x!;
- Добавил кнопку, которая за раз добавляет сразу три нуля (000);
- Запрограммировал накапливаемое сложtние;
- Запрограммировал накапливаемое вычитание;
- Сделал смену цвета окна вывода результата по кнопке.

## Задание с практики

- Добавить изменение цвета фона в зависимости от темы системы
- Исправить работу с факториалом
- Исправить работу с процентами


# JS

```
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
```

# HTML-code

```
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8"/>
    <title>Калькулятор</title>
    <link rel="stylesheet" type="text/css" href="style.css"> 
    <script type="text/javascript" src="script.js"></script>
</head>

<body>
    <div class="calculator-container"> 
    
    <!-- блок с экраном калькулятора, где будет выводиться результат вычислений. -->
    <div id="result" class="result">0</div>
        <!--горизонтальный ряд из четырех кнопок-->
        <button id="btn_op_clear" class="my-btn secondary">C</button>  
        <button id="btn_op_sign" class="my-btn secondary">+/-</button>
        <button id="btn_op_percent" class="my-btn secondary">%</button>
        <button id="btn_op_div" class="my-btn primary">/</button>

        <button id="btn_digit_7" class="my-btn">7</button>
        <button id="btn_digit_8" class="my-btn">8</button>
        <button id="btn_digit_9" class="my-btn">9</button>
        <button id="btn_op_mult" class="my-btn primary">x</button>

        <button id="btn_digit_4" class="my-btn">4</button>
        <button id="btn_digit_5" class="my-btn">5</button>
        <button id="btn_digit_6" class="my-btn">6</button>
        <button id="btn_op_minus" class="my-btn primary">-</button>

        <button id="btn_digit_1" class="my-btn">1</button>
        <button id="btn_digit_2" class="my-btn">2</button>
        <button id="btn_digit_3" class="my-btn">3</button>
        <button id="btn_op_plus" class="my-btn primary">+</button>

        <button id="btn_op_1_zeros" class="my-btn">0</button>
        <button id="btn_digit_dot" class="my-btn">.</button>
        <button id="btn_op_equal" class="my-btn primary execute">=</button>
        
        <button id="btn_op_sqrt" class="my-btn">√</button>
        <button id="btn_op_square" class="my-btn">x²</button>
        <button id="btn_op_backspace" class="my-btn">←</button>

        <button id="btn_op_fact" class="my-btn">x!</button>
        <button id="btn_op_3_zeros" class="my-btn">000</button>
        <button id="btn_op_2_zeros" class="my-btn">00</button>
        <button id="btn_op_1_zeros" class="my-btn">0</button>

        <button id="theme-btn" class="my-btn change_topic">Сменить тему</button>
        <a href="https://github.com/Pavlushechko?tab=projects" class="my-btn link-btn">GitHub</a>

        <select class="dropdown">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
        </select>
        <div class="goal">
            Цель ЛР: <mark>знакомство</mark> с <mark>HTML</mark>, <mark>CSS</mark>.
        </div>
        <details id="dit">
            <summary>Автор</summary>
            ФИО: Криворучко Павел Сергеевич, Группа: Ис-22
        </details>
    </div>
    </div>
    <div class="name_bottom">ЛР выполнена Криворучко Павлом Сергеевичем</div>
</body>
</html>
```

# CSS

```
body {
  background-image: url('background.jpg');
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
}

.calculator-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* 4 колонки одинаковой ширины, которые автоматически подстраиваются */
  grid-template-rows: auto 1fr;
  gap: 5px;
  background-color: #1f1f1f;
  border-radius: 7px;
  width: 100%;
  max-width: 232.5px; /* Максимальная ширина */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 5px;
}

/* Поле вывода результата */
.result {
  background: rgb(73, 73, 73);
  color: #00ff00;
  font-size: 2rem;
  border-radius: 10px;
  text-align: right;
  grid-column: 1/-1;
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  /* Растягиваем поле результата на все 4 колонки */
}

#result {
  background-color: gray; /* Начальный цвет */
  transition: background-color 0.5s ease; /* Плавная смена цвета */
}

/* Базовый стиль кнопок */
.my-btn {
  height: 50px;
  border: none;
  background: #9ea7a7;
  color: white;
  font-size: 1.5rem;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Эффект при наведении */
.my-btn:hover {
  filter: brightness(1.2); /* Увеличиваем яркость на 20% при наведении */
}

/* Эффект при нажатии */
.my-btn:active {
  filter: brightness(1.4); /* Увеличиваем яркость на 40% при нажатии */
}

/* Цвета для кнопок операций */
.my-btn.primary {
  background: #e0db49;
}

.my-btn.secondary {
  background: #a1e1ec;
}

/* Стиль кнопки равенства (=) */
.my-btn.execute {
  background: #3e8b3e;
  grid-column: span 2;
  width: 100%;
}

#btn_op_backspace{
  grid-column: span 2;
}

.my-btn.change_topic,
.my-btn.link-btn {
  grid-column: span 2;
  width: 100%;
}

.link-btn {
  text-decoration: none;
  color: white;
  background-color: #4b4b4b;
}

.link-btn:hover {
  background-color: #3e8b3e;
  filter: brightness(1.1);
}

/* Эффект при нажатии */
.link-btn:active {
  filter: brightness(1.4); /* Увеличиваем яркость на 40% при нажатии */
}

#dit, .goal, .dropdown, .name_bottom {
  grid-column: 1/-1;
  color: white;
}


.goal {
  font-size: 1.2rem;
}


.dropdown {
  background-color: #4b4b4b;
  border: none;
  border-radius: 5px;
}


.name_bottom {
  position: absolute;  /* Закрепляем элемент относительно родительского контейнера */
  bottom: 10px;        /* Отступ от нижнего края контейнера */
  left: 10px;          /* Отступ от левого края контейнера */
  font-size: 1rem;     /* Размер шрифта */
  color: white;        /* Цвет текста */
}
```