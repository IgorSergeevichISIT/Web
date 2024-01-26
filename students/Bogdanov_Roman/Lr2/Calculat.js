let a = '';
let b = '';
let sign = '';
let finish = false;


const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/', '+/-', '%'];

//экран
const out = document.querySelector('.calcul-screen p')


function changeResultColor() {
    const resultScreen = document.querySelector('.calcul-screen p');
    const currentColor = resultScreen.style.backgroundColor;

    // Измените цвет на другой по вашему выбору
    resultScreen.style.backgroundColor = currentColor === 'green' ? 'blue' : 'green';
}


function clearAll() {
    a = ''; // first number and result
    b = ''; // second number 
    sign = ''; // знак
    finish = false;
    out.textContent = 0;
}
function factorial(u) {
    if (u === 0 || u === 1) {
        return 1;
    } else {
        return u * factorial(u - 1);
    }
}

document.querySelector('.change-color-btn').onclick = changeResultColor;
document.querySelector('.ac').onclick = clearAll;
document.querySelector('.but').onclick = (event) => {
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

    if (key === '+=') {
        if (a !== '' && b === '') {
            accumulator += parseFloat(a);
            clearAll();
            out.textContent = accumulator;
        }
        return;
    }

    //Нажат корень
    if (key === '√') {
        if (a !== '' && b === '') {
            a = Math.sqrt(parseFloat(a));
            out.textContent = a.toFixed(8);
        }
        return;
    }
    //
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
    // нажата кнопка x²
    if (key === 'x²') {
        if (a !== '' && b === '') {
            a = Math.pow(parseFloat(a), 2);
            out.textContent = a;
        }
        return;
    }
    // нажата кнопка x!
    if (key === 'x!') {
        if (a !== '' && b === '') {
            a = factorial(parseInt(a));
            out.textContent = a;
        }
        return;
    }


    //Добавление нулей
    if (key === '000') {
        if (a !== '' && b === '') {
            a += '000';
            out.textContent = a;
        }
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
                if (b !== '') {
                    a = String(parseFloat(b) * (parseFloat(a) / 100));
                    out.textContent = a;
                } else {
                    a = String(parseFloat(a) / 100);
                    out.textContent = a;
                }
                break;

        }
        finish = true;
        out.textContent = a;
        console.table(a, b, sign);
    }

}

function darkmode() {
    const body = document.body
    const wasDarkmode = localStorage.getItem('darkmode') === 'true'

    localStorage.setItem('darkmode', !wasDarkmode)
    body.classList.toggle('dark-mode', !wasDarkmode)
}

document.querySelector('.nthem').addEventListener('click', darkmode)

function onload() {
    document.body.classList.toggle('dark-mode', localStorage.getItem('darkmode') === 'true')
}

document.addEventListener('DOMContentLoaded', onload)