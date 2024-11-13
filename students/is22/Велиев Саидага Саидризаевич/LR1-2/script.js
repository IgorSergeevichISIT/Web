window.onload = function () {
    let colors = ["rgb(31, 31, 31)", "rgb(255, 255, 255)"];
    let a = '';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;
    let last = []

    let outputElement = document.getElementById("result");
    const digitButtons = document.querySelectorAll('[id^="btn_digit_"]');

    function upd_disp() {
        // Обновляем отображение текущего выражения
        if (selectedOperation) {
            outputElement.innerHTML = `${a} ${selectedOperation} ${b}`;
        } else {
            outputElement.innerHTML = a || '0'; // Показываем 0, если a пусто
        }
    }

    function onDigitButtonClicked(digit) {
        if(outputElement.innerHTML == "Infinity" && digit == '.') return;
        else if(outputElement.innerHTML == "Infinity" && digit != '.') a = '';
        else if(digit == '.' && a == '') a += 0;
        else if((a == '0' || b == '0') && digit == '0') return;

        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) 
            {
                if(a == '0' && digit != '0' && digit != '.') a = ''
                a += digit;
                upd_disp();
                last = [];
            }
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit) && b != '')) 
                {
                if(b == '0' && digit != '0' && digit != '.') b = ''
                b += digit;
                upd_disp();
            }
        }
        outputElement.scrollLeft = outputElement.scrollWidth;
    }

    digitButtons.forEach(button => {
        button.onclick = function () {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        };
    });

    function setOperation(op) {
        if (a === '') return;
        selectedOperation = op;
        upd_disp();
    }

    function getEqual(selectedOperation,a,b)
    {
        expr = 0;
        switch (selectedOperation) {
            case 'x':
                expr = (+a) * (+b);
                break;
            case '+':
                expr = (+a) + (+b);
                break;
            case '-':
                expr = (+a) - (+b);
                break;
            case '/':
                expr = (+a) / (+b);
                break;
        }
        return expr;
    }

    document.getElementById("btn_op_mult").onclick = function () { setOperation('x'); };
    document.getElementById("btn_op_plus").onclick = function () { setOperation('+'); };
    document.getElementById("btn_op_minus").onclick = function () { setOperation('-'); };
    document.getElementById("btn_op_div").onclick = function () { setOperation('/'); };

    document.getElementById("btn_op_clear").onclick = function () {
        a = '';
        b = '';
        selectedOperation = null;
        expressionResult = '';
        outputElement.innerHTML = '0'; // Обновляем на 0
    };

    document.getElementById("btn_op_sign").onclick = function () {
        if (!selectedOperation) {
            a = (-a).toString();
            upd_disp();
        } else {
            b = (-b).toString();
            upd_disp();
        }
    };

    document.getElementById("btn_op_percent").onclick = function () {
        if (!selectedOperation) {
            a = (a / 100).toString();
            upd_disp();
        } else {
            b = (b / 100).toString();
            upd_disp();
        }
    };

    document.getElementById("btn_op_backspace").onclick = function () {
        if (!selectedOperation) {
            a = a.slice(0, -1);
            upd_disp();
        } else {
            b = b.slice(0, -1);
            upd_disp();
        }
    };

    document.getElementById("btn_op_sqrt").onclick = function () {
        if (!selectedOperation) {
            a = Math.sqrt(a).toString();
            upd_disp();
        }
    };

    document.getElementById("btn_op_square").onclick = function () {
        if (!selectedOperation) {
            a = Math.pow(a, 2).toString();
            upd_disp();
        }
    };

    
document.getElementById("btn_op_factorial").onclick = function() {
    function factorial(n) {
        if(n > 170) return outputElement.innerHTML = "Infinity";
        return ((n != 1) ? n * factorial(n - 1) : 1);
    }

    if (!selectedOperation && a !== '') {
        a = factorial(a).toString();
        if(a == "Infinity")
        {
            a = '';
            return;
        }
        outputElement.innerHTML = a;
    } else if (b !== '') {
        b = factorial(b).toString();
        if(b == "Infinity")
        {
            a = '';
            b = '';
            selectedOperation = null;
            return;
        }
        expressionString = a + ' ' + selectedOperation + ' ' + b;
        outputElement.innerHTML = expressionString;
    }
}

    document.getElementById("btn_op_triple_zero").onclick = function () {
        if (!selectedOperation && a != '') {
            a += '000';
            upd_disp();
        } else if (b != ''){
            b += '000';
            upd_disp();
        }
    };

    document.getElementById("change-theme").onclick = function () {
        let changebutton = document.getElementsByClassName("all_ground")[0];

        if (changebutton.style.backgroundColor === colors[0]) {
            changebutton.style.backgroundColor = colors[1];
        } else {
            changebutton.style.backgroundColor = colors[0];
        }
    };

    document.getElementById("btn_op_change_result_color").onclick = function () {
        outputElement.style.color = outputElement.style.color === 'red' ? 'black' : 'red';
    };

    document.getElementById("btn_op_equal").onclick = function () 
    {
        if(last.length === 2)
        {
            expressionResult = getEqual(last[0],a,last[1])
            a = expressionResult.toString();
            outputElement.innerHTML = a;
        }

        if (a === '' || b === '' || !selectedOperation) return;
        expressionResult = getEqual(selectedOperation,a,b)
        a = expressionResult.toString();
        last.push(selectedOperation);
        last.push(b);
        b = '';
        selectedOperation = null;
        outputElement.innerHTML = a;
    };
};
