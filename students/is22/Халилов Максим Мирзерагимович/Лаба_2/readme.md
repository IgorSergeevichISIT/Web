# Скриншоты
### Калькулятор:
![alt text](calc.png)

# Выполненые задания
### Основные
- Ознакомился с HTML, CSS, JS
### Дополнительные
- Запрограммируйте операцию смены знака +/-;
- Запрограммируйте операцию вычисления процента %;
- Добавьте кнопку стирания введенной цифры назад (backspace). 
- Расположить кнопку можно, например, на месте нерабочих +/- и % кнопок;
- Сделайте смену цвета фона по кнопке;
- Запрограммируйте операцию вычисления квадратного корня √;
- Запрограммируйте операцию возведения в квадрат x²;
- Запрограммируйте операцию вычисления факториала x!;
- Добавьте кнопку, которая за раз добавляет сразу три нуля (000);
- Запрограммируйте накапливаемое сложние;
- Запрограммируйте накапливаемое вычитание;
- Сделайте смену цвета окна вывода результата по кнопке.
### Задание с практики
- Исправить работу с факториалом 
- Исправить работу с процентами

___

# JS-code
```JS
// файл script.js
window.onload = function(){ 

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    let last = ''
    let lastOper = null
    
    // окно вывода результата
    outputElement = document.getElementById("result")
    
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    function Update(){
        outputElement.innerHTML = ` ${a} ${selectedOperation} ${b}`
    }
    
    function onDigitButtonClicked(digit) {
        if (outputElement.innerHTML === "Infinity") { 
            outputElement.innerHTML = 0; 
            a = ''; 
            b = ''; 
            selectedOperation = null; 
        }
        
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
            }
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
            }
        }
        outputElement.innerHTML = selectedOperation ? `${a} ${selectedOperation} ${b}` : a;
        outputElement.scrollLeft = outputElement.scrollWidth;
        
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    });

    // Переключение тем
    const themeToggleButton = document.getElementById("theme-toggle");
        themeToggleButton.onclick = function() {
            document.body.classList.toggle("dark-theme");
            document.body.classList.toggle("light-theme");
        };
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
        Update();

    }

    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return
        selectedOperation = '+'
        Update();
    }

    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return
        selectedOperation = '-'
        Update();

    }

    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
        Update();

    }

    document.getElementById("btn_op_sign").onclick = function() {
        if(a === '') return
        if(!selectedOperation){
            a = a * (-1)
            outputElement.innerHTML = a
            
        }
        else{
            b = b * (-1)
            outputElement.innerHTML = b
        }
        Update()
    }

    document.getElementById("btn_op_percent").onclick = function() {
        if(a === '') return
        if (!selectedOperation){
            a = (+a) / 100
        }
        else{
            if(selectedOperation){
                b = (+b) / 100 * a 
            }
        }
        Update();
    }
    
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        last = ''
        lastOper = ''
        outputElement.innerHTML = 0
    }

    document.getElementById('btn_op_backspace').onclick = function() {
        if (!selectedOperation) {
            // Удаляем последний символ из 'a', если нет выбранной операции
            a = a;
        } else {
            // Если операция выбрана, проверяем содержимое 'b'
            if (b) {
                // Удаляем последний символ из 'b', если оно не пустое
                b = b;
            } else {
                // Если 'b' пустое, очищаем операцию
                selectedOperation = '';
            }
        }
        Update(); // Обновляем отображение
    };
    
    

    document.getElementById('btn_op_stepen').onclick = function(){
        a = a * a
        outputElement.innerHTML = a.toString()
        
    }
    document.getElementById('btn_op_coren').onclick = function(){
        a = Math.sqrt(a)
        a = a
        outputElement.innerHTML = a.toString()
    }
    document.getElementById('btn_op_factorial').onclick = function(){
        
        factorial = 1
        if(a > 100){
            outputElement.innerHTML = Infinity
            return;
        }

        while (a > 1){
            factorial *= a
            a -= 1
        }
        a = factorial
        outputElement.innerHTML = a.toString()

    }
    document.getElementById('btn_op_three_zero').onclick = function(){
        if(!selectedOperation){
            a = a * 1000
            outputElement.innerHTML = a
        }
        else{
            b = b * 1000 
            outputElement.innerHTML = b
        }
        outputElement.innerHTML = `${a} ${selectedOperation} ${b}`

    }
    
    // кнопка расчёта результата
    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' && expressionResult) {
            // Если `a` пустое, то приравниваем его к предыдущему результату
            a = expressionResult;
        }
    
        if (b === '' && last && lastOper) {
            b = last;
            selectedOperation = lastOper;
        }
    
        if (a === '' || b === '' || !selectedOperation)
            return;
    
        switch(selectedOperation) { 
            case 'x':
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
        
        // Обновляем `a` на результат для отображения
        a = expressionResult.toString()
        
        // Запоминаем последний операнд и операцию для накопления
        last = b;
        lastOper = selectedOperation;
    
        // Очищаем `b` и текущую операцию, чтобы быть готовыми к следующему вводу
        b = '';
        selectedOperation = '';
    
        // Отображаем результат на экране
        Update()
        outputElement.innerHTML = a;
    };
    
};
```

# HTML-code
``` html
<!DOCTYPE html>
<html lang="ru">
    <head>
        <meta charset="UTF-8">
        <title>Calculator</title>
        <link rel="stylesheet" href="style.css"/>
        <script type="text/javascript" src="script.js"></script>
    </head>


    <body>
        
        <button id="theme-toggle"></button>
        
        
        <div class="sloy">
            
            <div id="result">
                0
            </div>

            <div class="calc">

                <button id="btn_op_clear" class="my_but secondary">AC</button>
                <button id="btn_op_sign" class="my_but secondary">+/-</button>
                <button id="btn_op_percent" class="my_but secondary">%</button>
                <button id="btn_op_div" class="my_but primary">/</button>                
                
                <button id="btn_digit_7" class="my_but">7</button>
                <button id="btn_digit_8" class="my_but">8</button>
                <button id="btn_digit_9" class="my_but">9</button>
                <button id="btn_op_mult" class="my_but primary">x</button>
                
                
                <button id="btn_digit_4" class="my_but">4</button>
                <button id="btn_digit_5" class="my_but">5</button>
                <button id="btn_digit_6" class="my_but">6</button>
                <button id="btn_op_minus" class="my_but primary">-</button>
            

                <button id="btn_digit_1" class="my_but">1</button>
                <button id="btn_digit_2" class="my_but">2</button>
                <button id="btn_digit_3" class="my_but">3</button>
                <button id="btn_op_plus" class="my_but primary">+</button>
                
                <button id="btn_digit_0" class="my_but">0</button>
                <button id="btn_digit_dot" class="my_but">.</button>
                <button id="btn_op_equal" class="my_but primary execute" >=</button>

                <button id="btn_op_backspace" class="my_but primary"><–</button>
                <button id="btn_op_stepen" class="my_but primary">x²</button>
                <button id="btn_op_coren" class="my_but primary">√</button>
                <button id="btn_op_factorial" class="my_but primary">x!</button>
                <button id="btn_op_three_zero" class="my_but primary">000</button>

            </div>
            
        </div>
        
        <details id="info" >
            <summary> 
                <img src="info.png" alt="Информация" width="35px" > 
            </summary>
            <ul>
                <li>Халилов Максим ИС-22</li>
                <li><a href="https://github.com/Nixz69" target="_blank" id="github">Github</a></li>
            </ul>
        </details>

        <div class="ans">
            Лабараторная работа Халилов Максим 1: Знакоство <mark>HTML</mark> и <mark>CSS</mark>
        </div>
        
        
    </body>
</html>
```
# CSS
```css
body{
    margin: 0;
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
    user-select: none;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Verdana, sans-serif;
}


.my_but{
    margin: 5px 0 0 1px;
    color: #ffffff;
    background: rgb(95, 133, 131);
    border: 0;
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50px;
}


.dark-theme .my_but{
    background: #696868;
    color: white;
}

.dark-theme .primary{
    background: #3f3f3f;
    color: white;
}
.dark-theme .secondary{
    background: #3f3232;
}
.dark-theme .sloy{
    background: #ababab;
}
.dark-theme #result{
    background: #000;
    
}

.my_but:hover{
    background: rgb(95, 91, 91);
}
.my_but:active {
    filter: brightness(130%); /* увеличим интенсивность цвета для эффекта вспышки */
}
.primary {
    background: #537b5e;
}

.secondary {
    background: #64a560 ;
}

.execute {
    display: grid;
    grid-column: span 2 / span 2;
    place-items: center;
    width: 95%;
    
}

.sloy{
    border: solid 2px black;
    border-radius: 10px;
    background: #d5d5d5;
    user-select: none; 
    padding: 0 8px 15px 7px;
} 

@media (prefers-color-scheme: light) {
    .sloy {
        background-color: #ffffff;
    }
    .my_but {
        color: black; /* цвет текста */
    }
}

@media (prefers-color-scheme: dark) {
    .sloy {
        background-color: #444444;
    }
    .my_but {
        color: white; /* цвет текста */
    }
}
#result{
    width: 210px;
    height: 40px;
    margin: 15px 0px 10px 2px;
    padding: 5px 5px 0 0;
    background: #656565;
    color: white;
    text-align: right;
    font-size: 22px;
    font-weight: bold;
    border-radius: 5px;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    

}
.LR{
    color: rgb(196, 0, 173);
    font-size: 12px;
    
}
.link{
    color: black;
    text-decoration: none;
    color: white;
    
}
.detail{
    background: #444444;
    color: white;
    border: none;
}

.ans{
    position: absolute;
    bottom: 0px;
    color: white;
    font-size: 20px;
    font-weight: bold;
}

body{
    background-image: url(123.jpg);
    background-repeat: no-repeat;
    background-size: cover;
}
.calc
{
    display: grid;
    grid-template-columns: repeat(4,1fr);
}
#btn_op_three_zero{
    display: grid;
    grid-column: 2 / 4 ;
    width: 100%;
    place-items: center;
}
#theme-toggle{
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: none;
    background-image: url(dark-mode.png);
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    top: 20px;
    right: 20px;
}
#info{
    position: absolute;
    top: 5px;
    left: 5px;
    color: white;

}
summary {
    list-style: none; /* Убираем стандартный треугольник раскрытия */ 
}

#github{
    color: white;
    text-decoration: none;
}
#github:hover{
    color: #b5b5b5;
}
```

