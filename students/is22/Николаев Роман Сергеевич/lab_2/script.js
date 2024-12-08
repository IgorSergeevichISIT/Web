window.onload = function () {
    let example = ''
    let enteredDigit = false
    let isLightTheme = false

    let outputElement = document.getElementById("result_field")

    let digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    let opButtons = document.querySelectorAll('[id ^= "btn_op_"]')

    const resultElement = document.querySelector('.result');

    // Получить текущие размеры
    const computedStyle = getComputedStyle(resultElement);
    const width = computedStyle.width;
    const height = computedStyle.height;

    // Зафиксировать размеры
    resultElement.style.width = width;
    resultElement.style.height = height;

    function onDigitButtonClicked(digit) {
        if ((digit != '.') || (digit == '.' && !example.includes(digit))) {
            example += digit
        }
        outputElement.innerHTML = example
        enteredDigit = true
    }

    digitButtons.forEach(button => {
        button.onclick = function () {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    })

    function onOpButtonClicked(op) {
        if (enteredDigit) {
            example += op
        }
        else if(example !== ''){
            example = example.slice(0, -1) + op
        }
        outputElement.innerHTML = example
        enteredDigit = false
    }

    opButtons.forEach(button => {
        button.onclick = function () {
            const opValue = button.innerHTML
            onOpButtonClicked(opValue)
        }
    })

    // реализация кнопки "000"(задание 8)
    document.getElementById("btn_ooo").onclick = function () {
        if(enteredDigit){
            example += "000"
            outputElement.innerHTML = example
        }
    }

    document.getElementById("btn_clear").onclick = function () {
        example = ''
        enteredDigit = false
        outputElement.innerHTML = 0
    }

    document.getElementById("btn_equal").onclick = function () {
        if(enteredDigit){ 
            if (example.includes('/0')) {
                outputElement.innerHTML = "Error!";
                example = ''
            }
            else {
            example = eval(example)
            outputElement.innerHTML = example
            }
        }
    }

    function findLastNumber(example) {
        let i = example.length - 1
        let n = ''
        while (i >= 0 && (/\d/).test(example[i])) {
            n = example[i] + n
            i--
        }
        return n
    }

    function factorial(n) {
        if (n < 0) {
            return "Error"
        }
        if (n === 0 || n === 1) {
            return 1
        }
        return n * factorial(n - 1)
    }

    // операция смены знака(задание 1)
    document.getElementById("btn_act_sign").onclick = function () {
        if (enteredDigit) {
            sign = findLastNumber(example)
            sign = '('+(-sign)+')'
            example = example.replace(/(\d+(\.\d+)?)(?=\s*[^0-9]*$)/, "") + sign
            outputElement.innerHTML = example
        }
    }

    // реализация кнопки стирания(задание 3)
    document.getElementById("btn_del").onclick = function () {
        if (example.trim() !== "") {
            example = example.slice(0, -1)
            outputElement.innerHTML = example
        }
    }

    // реализация возведения в квадрат(задание 6)
    document.getElementById("btn_act_sqr").onclick = function () {
        if(enteredDigit){
            sqr = findLastNumber(example)
            sqr *= sqr
            example = example.replace(/(\d+(\.\d+)?)(?=\s*[^0-9]*$)/, "") + sqr
            outputElement.innerHTML = example
        }
    }

    // реализация нахождения факториала(задание 7)
    document.getElementById("btn_act_fac").onclick = function () {
        if(enteredDigit) {
            fac = findLastNumber(example)
            if (fac <= 100){
                fac = factorial(fac)
                example = example.replace(/(\d+(\.\d+)?)(?=\s*[^0-9]*$)/, "") + fac
                outputElement.innerHTML = example
            }
            else{
                outputElement.innerHTML = "Infinity"
            }
        }
    }

    // реализация вычисления квадратного конря(задание 5)
    document.getElementById("btn_act_sqrt").onclick = function () {
        if(enteredDigit) {
            sqrt = findLastNumber(example)
            sqrt = Math.sqrt(sqrt).toFixed(2);
            example = example.replace(/(\d+(\.\d+)?)(?=\s*[^0-9]*$)/, "") + sqrt
            outputElement.innerHTML = example
        }
    }

    // реализация кнопки смены темы(задание 4)
    document.getElementById("btn_toggle_background").onclick = function () {
        if (isLightTheme) {
            document.body.classList.remove('light-theme')
        } else {
            document.body.classList.add('light-theme')
        }
        isLightTheme = !isLightTheme
    }

    // операция выыисления процента(задание 2)
    document.getElementById("btn_percent").onclick = function () {
        if(enteredDigit){
            x = findLastNumber(example)
            let regex = new RegExp(x + "(?!.*" + x + ")", "g");
            let example_1 = example.replace(regex, "")
            example_1 = example_1.slice(0, -1)
            console.log(example_1)
            a = findLastNumber(example_1)
            perc = a * (x / 100)
            example = example.replace(/(\d+(\.\d+)?)(?=\s*[^0-9]*$)/, "") + perc

            outputElement.innerHTML = example
            
        }
    };

    //реализация кнопки смены цвета поля вывода(задание 11)
    document.getElementById("btn_color_result").onclick = function () {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        outputElement.style.backgroundColor = randomColor;
    };

    // реализация накапливаемых операций(для старой реализации кода через две переменные a и b)
    // document.getElementById("btn_op_equal").onclick = function() { 
    //     if (a === '' && expressionResult) {
    //         a = expressionResult;
    //     }
    
    //     if (b === '' && last && lastOper) {
    //         b = last;
    //         selectedOperation = lastOper;
    //     }
    
    //     if (a === '' || b === '' || !selectedOperation)
    //         return;
    
    //     switch(selectedOperation) { 
    //         case 'x':
    //             expressionResult = (+a) * (+b);
    //             break;
    //         case '+':
    //             expressionResult = (+a) + (+b);
    //             break;
    //         case '-':
    //             expressionResult = (+a) - (+b);
    //             break;
    //         case '/':
    //             expressionResult = (+a) / (+b);
    //             break;
    //     }
        
    //     a = expressionResult.toString()
        
    //     last = b;
    //     lastOper = selectedOperation;
    
    //     b = '';
    //     selectedOperation = '';
    
    //     Update()
    //     outputElement.innerHTML = a;
    // };
}