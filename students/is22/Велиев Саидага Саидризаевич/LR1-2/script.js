window.onload = function () {
    let colors = ["rgb(31, 31, 31)", "rgb(255, 255, 255)"];
    let a = '';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;

    let outputElement = document.getElementById("result");
    const digitButtons = document.querySelectorAll('[id^="btn_digit_"]');

    function updateDisplay() {
        // Обновляем отображение текущего выражения
        if (selectedOperation) {
            outputElement.innerHTML = `${a} ${selectedOperation} ${b}`;
        } else {
            outputElement.innerHTML = a || '0'; // Показываем 0, если a пусто
        }
    }

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit;
                updateDisplay();
            }
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit;
                updateDisplay();
            }
        }
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
        updateDisplay();
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
            updateDisplay();
        } else {
            b = (-b).toString();
            updateDisplay();
        }
    };

    document.getElementById("btn_op_percent").onclick = function () {
        if (!selectedOperation) {
            a = (a / 100).toString();
            updateDisplay();
        } else {
            b = (b / 100).toString();
            updateDisplay();
        }
    };

    document.getElementById("btn_op_backspace").onclick = function () {
        if (!selectedOperation) {
            a = a.slice(0, -1);
            updateDisplay();
        } else {
            b = b.slice(0, -1);
            updateDisplay();
        }
    };

    document.getElementById("btn_op_sqrt").onclick = function () {
        if (!selectedOperation) {
            a = Math.sqrt(a).toString();
            updateDisplay();
        }
    };

    document.getElementById("btn_op_square").onclick = function () {
        if (!selectedOperation) {
            a = Math.pow(a, 2).toString();
            updateDisplay();
        }
    };

    document.getElementById("btn_op_factorial").onclick = function () {
        if (!selectedOperation) {
            let result = 1;
            for (let i = 1; i <= a; i++) {
                result *= i;
            }
            a = result.toString();
            updateDisplay();
        }
    };

    document.getElementById("btn_op_triple_zero").onclick = function () {
        if (!selectedOperation) {
            a += '000';
            updateDisplay();
        } else {
            b += '000';
            updateDisplay();
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

    document.getElementById("btn_op_equal").onclick = function () {
        if (a === '' || b === '' || !selectedOperation) return;

        switch (selectedOperation) {
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

        a = expressionResult.toString();
        b = '';
        selectedOperation = null;
        outputElement.innerHTML = a; // Показываем результат
    };
};
