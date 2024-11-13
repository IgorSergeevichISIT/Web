window.onload = function() {
    let a = '';
    let b = '';
    let currentNumber = '';
    let SaveOperation = null;
    let isResultDisplayed = false;
    let lastOperation = null; 
    let lastB = ''; 
    

    const outputElement = document.getElementById("result"); 
    const digitButtons = document.querySelectorAll('[id^="btn_digit_"]');

    function updateDisplay() {
        if (SaveOperation) {
            outputElement.innerHTML = `${a} ${SaveOperation} ${b}`;
        } else {
            outputElement.innerHTML = a || '0'; 
        }
        ChangeFontSize(); // Вызов функции для изменения размера шрифта
    }
    
    function ChangeFontSize() {
        let currentFontSize = 40; // Задаем начальный размер шрифта
        outputElement.style.fontSize = currentFontSize + "px";
    
        // Уменьшаем шрифт, если текст не помещается в контейнер
        while (outputElement.scrollWidth > outputElement.clientWidth && currentFontSize > 10) {
            currentFontSize -= 2; // Уменьшаем размер шрифта
            outputElement.style.fontSize = currentFontSize + "px";
        }
    }
    
    // Добавляем обработчики событий для кнопок с цифрами
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digit = button.innerHTML; 
            if (isResultDisplayed) {
               a = digit;
                currentNumber = a;
                isResultDisplayed = false;
            } else {
                if (!SaveOperation) {
                    
                    a += digit;
                    currentNumber = a;
                } else {
                    
                    b += digit;
                    currentNumber = b;
                }
            }
            updateDisplay(); 
        };
    });

    
    // Добавляем функцию очистки

    document.getElementById("btn_op_clear").onclick = function () {
            a = '';
            b = '';
            currentNumber = '';
            SaveOperation = null;
            outputElement.innerHTML = '0';
            isResultDisplayed = false; 
    };


    // Добавляем 3 нуля
    document.getElementById("btn_op_tripple_zero").onclick = function () {
        if (!SaveOperation && a!="") {
            a += '000';
            updateDisplay();
        } else if (b != ""){
            b += '000';
            updateDisplay();
        }
    };

    // установка колбек-функций для кнопок операций
document.getElementById("btn_op_mult").onclick = function() { 
    if (a === '') return
    SaveOperation = 'x'
}
document.getElementById("btn_op_plus").onclick = function() { 
    if (a === '') return
    SaveOperation = '+'
}
document.getElementById("btn_op_minus").onclick = function() { 
    if (a === '') return
    SaveOperation = '-'
}
document.getElementById("btn_op_div").onclick = function() { 
    if (a === '') return
    SaveOperation = '/'
}

// вывод через кнопку = 

document.getElementById("btn_op_equal").onclick = function() {
    if (a === '' || (!b && !lastB) || (!SaveOperation && !lastOperation)) {
        return;
    }
    if (b === '' && lastB !== '') {
        b = lastB;
        SaveOperation = lastOperation;
    } else {
        lastB = b;
        lastOperation = SaveOperation;
    }

    switch(SaveOperation) { 
        case 'x':
            currentNumber = parseFloat(a) * parseFloat(b);
            break;
        case '+':
            currentNumber = parseFloat(a) + parseFloat(b);
            break;
        case '-':
            currentNumber = parseFloat(a) - parseFloat(b);
            break;
        case '/':
            currentNumber = parseFloat(a) / parseFloat(b);
            break;
    }

    // Обновляем значение `a` с результатом, оставляя `b` и операцию для повторения
    a = currentNumber.toString(); 
    b = ''; 
    SaveOperation = null; 
    updateDisplay();
    isResultDisplayed = true; 
};

    // вывод степени

    document.getElementById("btn_op_kvadrat").onclick =  function() {
        if (a === '' ) {
            return;
        }
         else {
            currentNumber = parseFloat(a) * parseFloat(a)
         }
         a = currentNumber.toString(); 
         b = ''; 
         SaveOperation = null;
         updateDisplay();
         isResultDisplayed = true; 
         };

    // вывод корня
    document.getElementById("btn_op_koren").onclick =  function() {
        if (a === '') {
            return; 
        } else {
            currentNumber = Math.sqrt(parseFloat(a)); 
        }
    
        a = currentNumber.toString(); 
        b = ''; 
        SaveOperation = null; 
        updateDisplay();
        isResultDisplayed = true;
    };

    // вывод факториала
    document.getElementById("btn_op_factorial").onclick = function () {
        let fontSize = "16px"
        if (a === '') {
            return; 
        } else {
            const num = parseInt(a); 
            
            if (num > 170) { 
                outputElement.innerHTML = ("значение слишком большое");
                outputElement.style.fontSize = fontSize
                a = ""; 
                return; 
            }
            
            let result = 1;
            for (let i = 1; i <= num; i++) {
                result *= i; 
            }
    
            a = result.toString(); 
            b = ''; 
            SaveOperation = null; 
            updateDisplay(); 
            isResultDisplayed = true; 
            
        }
    };

    // вывод %
    document.getElementById("btn_op_percent").onclick = function () {
        if (a === '' || b === '') {
            return;
        }
    
        const percent = parseFloat(b); 
        const number = parseFloat(a); 
    
        currentNumber = (percent * number ) / 100;
    
        a = currentNumber.toString(); 
        b = '';
        SaveOperation = null; 
        updateDisplay(); 
        isResultDisplayed = true; 
    };

   // смена фона

   let colorIndex = 0; 
const colors = ["#FF5733", "#33FF57", "#3357FF", "#F0E68C", "#FFD700", "#3e060690"]; 

document.getElementById("btn_change_fon").onclick = function () {
    document.getElementById("fon").style.backgroundColor = colors[colorIndex];

    colorIndex++; 
    if (colorIndex >= colors.length) {
        colorIndex = 0; 
    }
};

// смена цвета окна результата

let colorss = 0; 
const colorsResult = ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF", "#e7e3dd"]; 

document.getElementById("btn_change_result").onclick = function () {
    document.getElementById("result").style.backgroundColor = colorsResult[colorss];

    colorss++; 
    if (colorss >= colorsResult.length) {
        colorss = 0; 
    }
};

// смена знаков

document.getElementById("btn_op_sign").onclick = function () {
    if (!SaveOperation) {
        a = (-a).toString();
        updateDisplay();
    } else {
        b = (-b).toString();
        updateDisplay();
    }
};

// backspace

document.getElementById("backspace").onclick = function () {
    if (!SaveOperation) {
        a = a.slice(0, -1);  
        if (a === '') {
            a = '0';  
        }
    } else {
        b = b.slice(0, -1);  
        if (b === '') {
            b = '0';  
        }
        
        if (b === '0') {
            SaveOperation = null;  
        }
    }
    updateDisplay();
    isResultDisplayed = true; 

    // Работа с запятой
};
document.getElementById("btn_digit_.").onclick = function () {
    if (SaveOperation === null ) { 
        if (a === '' )
        {
            a = parseFloat(0)
            a += '.'; 
            updateDisplay();
        }
            
         if  (!a.includes('.')) {
           
            a += '.'; 
            updateDisplay();
        }
    } else { 
        if (b !== "" && !b.includes('.')) { 
            b += '.'; 
            updateDisplay();
        }
    }
};

    // работа с нулем
    document.getElementById("btn_digit_0").onclick = function () {
        
    if (a !== '' && SaveOperation === null ) {
        a += '0';
        updateDisplay();
    } 
    if (SaveOperation !== null && b === '') {
        b += '0';
        updateDisplay();
      } else {
        if ( b !=='')
        {
            b += '0';
            updateDisplay();
        }
        }
    }
};

  
