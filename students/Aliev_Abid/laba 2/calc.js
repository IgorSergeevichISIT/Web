let a = ''; // first number
let b = ''; // secont number
let sign = ''; // знак операции
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/', '+/-', '%', '√', 'Х²', '!'];

// экран 
const out = document.querySelector('.calc-screen p');

function clearAll() {
    a = ''; // first number and result
    b = ''; // second number 
    sign = ''; // знак
    finish = false;
    out.textContent = 0;
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    // нажата не кнопка
    if (!event.target.classList.contains('btn')) return;
    // нажата кнопка clearAll ac
    if (event.target.classList.contains('ac')) return;

    out.textContent = '';
    // получаю нажатую кнопку
    const key = event.target.textContent;

    // если нажата клавиша 0-9 или .
    if (digit.includes(key)) {
        if (b === '' && sign === '') {
            a += key;

            out.textContent = a;
        }
        else if (a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        }
        else {
            b += key;
            out.textContent = b;
        }
        console.table(a, b, sign);
        return;
    }

    // если нажата клавиша + - / *
    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        console.table(a, b, sign);
        return;
    }

    // нажата =
    if (key === '=') {
        if (b === '') b = a;
        switch (sign) {
            case "+":
                a = (+a) + (+b);
                break;
            case "-":
                a = a - b;
                break;
            case "X":
                a = a * b;
                break;
            case "/":
                if (b === '0') {
                    out.textContent = 'Ошибка';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = a / b;
                break;
            case "+/-":
                if (a !== '') {
                    a = String(-a);
                    out.textContent = a;
                } else {
                    b = String(-b);
                    out.textContent = b;
                }
                break;

            case "%":
                if (a !== '') {
                    a = String(a / 100);
                    out.textContent = a.toFixed(2);
                } else {
                    b = String(b / 100);
                    out.textContent = b.toFixed(2);
                }
            case "√":
                if (a !== '') {
                    a = Math.sqrt(a);
                    out.textContent = a.toFixed(2);
                }
                break;

            case "Х²":
                if (a !== '') {
                    a = a * a;
                    out.textContent = a;
                }
                break;
        }
        finish = true;
        out.textContent = a;
        console.table(a, b, sign);
    }

    if (event.target.classList.contains('backspase')) {
        if (!finish) {
            let str = '';
            if (b !== '') {
                str = b.slice(0, -1);
                b = str;
            } else if (sign !== '') {
                sign = '';
            } else {
                str = a.slice(0, -1);
                a = str;
            }
            out.textContent = str || '0';
        }
        return;

        document.querySelector('.backspase').onclick = backspase;
    }
    if (event.target.classList.contains('000')) {
        if (key === '000') {
            if (a !== '' && b === '') {
                a += '000';
                out.textContent = a;
            }
            return;
        }
    }
    if (event.target.classList.contains('!')) {
        if (key === 'x!') {
            if (a !== '' && b === '') {
                a = factorial(parseInt(a));
                out.textContent = a.toFixed(2);
            }
            return;
        }
    }
}

function darkmode() {
    const body = document.body
    const wasDarkmode = localStorage.getItem('darkmode') === 'true'

    localStorage.setItem('darkmode', !wasDarkmode)
    body.classList.toggle('dark-mode', !wasDarkmode)
}

document.querySelector('.nt').addEventListener('click', darkmode)

function onload() {
    document.body.classList.toggle('dark-mode', localStorage.getItem('darkmode') === 'true')
}

document.addEventListener('DOMContentLoaded', onload)