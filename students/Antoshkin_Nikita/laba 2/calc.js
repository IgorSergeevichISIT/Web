let a = ''; // first number
let b = ''; // secont number
let sign = ''; // знак операции
let finish  = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.','000'];
const action = ['-', '+', 'X', '/', '+/-', '%', '<=', '√','x²','!'];

// экран 
const out = document.querySelector('.calc-screen p');

function clearAll () {
    a = ''; // first number and result
    b = ''; // second number 
    sign = ''; // знак
    finish = false;
    out.textContent = 0;
}

function factorial(n){
    var result = 1;
    while(n){
        result *= n--;
    }
    return result;
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    // нажата не кнопка
    if(!event.target.classList.contains('btn')) return;
    // нажата кнопка clearAll ac
    if(event.target.classList.contains('ac')) return;

    out.textContent = '';
    // получаю нажатую кнопку
    const key = event.target.textContent;

    // если нажата клавиша 0-9 или .
    if (digit.includes(key)) {
        if (b ==='' && sign === '') {
            a += key;
            
            out.textContent = a;
        }
        else if (a!=='' && b!=='' && finish) {
            b = key;
            finish = false;
            out.textContent = b;
        }
        else {
            b += key;
            out.textContent = b;
        }
        console.table(a, b , sign);
        return;
    }

     // если нажата клавиша + - / *
     if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        console.table(a, b , sign);
        return;
    }

    // нажата =
    if (key === '=') {
        if (b ==='') b = a;
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
                    case "+/-" :
                    if (a !== '') {
                        a = String(-a);
                        out.textContent = a;
                    } else {
                        b = String(-b);
                        out.textContent = b;
                    }
                    break;

                    case "%" :
                    if (a !== '') {
                        a = String(a / 100);
                        out.textContent = a;
                    } else {
                        b = String(b / 100);
                        out.textContent = b;
                    } 
                    case "<=":
                    if (a !== '' && a.length>0) {
                        a=a.slice(0,-1);
                        out.textContent = a;
                    } else {
                        b=b.slice(0,-1);
                        out.textContent = b;
                    }
                    case"√":
                    if (a!==''){
                        a=Math.sqrt(a);
                        out.textContent = a;
                    } else {
                        b=Math.sqrt(b);
                        out.textContent = b;
                    }
                    case "x²":
                        if (a!==''){
                            a=a*a;
                            out.textContent = a;
                        } else {
                            b=b*b;
                            out.textContent = b; 
                        }
                    case "!":
                        if (a!=='' && a > 0) {
                            a= factorial(a);
                            out.textContent = a;
                        }
                   


        }
        finish = true;
        out.textContent = a;
        console.table(a, b , sign);
    }

}


function darkmode() {
    const body =document.body
    const wasDarkmode = localStorage.getItem('darkmode') ==='true'

    localStorage.setItem('darkmode', !wasDarkmode)
    body.classList.toggle('dark-mode', !wasDarkmode)
}

document.querySelector('.moon').addEventListener('click',darkmode)

function onload(){
    document.body.classList.toggle('dark-mode', localStorage.getItem('darkmode') ==='true')
}

document.addEventListener('DOMContentLoaded',onload)