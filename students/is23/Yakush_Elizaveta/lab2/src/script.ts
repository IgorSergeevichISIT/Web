
window.onload = function (): void {
    //  Шаг 1: Инициализация переменных
    let a: string = '';                   // Первое число
    let b: string = '';                   // Второе число
    let expressionResult: string = '';    // Результат вычисления
    let selectedOperation: string | null = null; // Выбранная операция

    let backgroundColor: string = "#1b1b2f";


    // Шаг 2: Получение доступа к элементам калькулятора

    const outputElement = document.getElementById("result") as HTMLElement;
    const digitButtons = document.querySelectorAll('[id^="btn_digit_"]') as NodeListOf<HTMLButtonElement>;

    // Шаг 3: Функция обработки нажатия на цифровые кнопки
    function onDigitButtonClicked(digit: string): void {
        if (!selectedOperation) {
            if (digit !== '.' || (digit === '.' && !a.includes('.'))) {
                a += digit;
            }
            outputElement.innerHTML = a || '0';
        } else {
            if (digit !== '.' || (digit === '.' && !b.includes('.'))) {
                b += digit;
            }
            outputElement.innerHTML = b || '0';
        }
    }

    //  Шаг 4: Настройка обработчиков событий для кнопок
    digitButtons.forEach((button: HTMLButtonElement) => {

        button.onclick = function (): void {
            const digitValue: string = button.innerHTML;
            onDigitButtonClicked(digitValue);
        };
    });

    // Кнопки операций
    const btnOpMult = document.getElementById("btn_op_mult") as HTMLButtonElement;
    const btnOpPlus = document.getElementById("btn_op_plus") as HTMLButtonElement;
    const btnOpMinus = document.getElementById("btn_op_minus") as HTMLButtonElement;
    const btnOpDiv = document.getElementById("btn_op_div") as HTMLButtonElement;



    btnOpMult.onclick = function (): void {
        if (a === '') return;
        selectedOperation = 'x';
    };
    btnOpPlus.onclick = function (): void {
        if (a === '') return;
        selectedOperation = '+';
    };
    btnOpMinus.onclick = function (): void {
        if (a === '') return;
        selectedOperation = '-';
    };
    btnOpDiv.onclick = function (): void {
        if (a === '') return;
        selectedOperation = '/';
    };

    //Шаг 5: Кнопка очистки
    const btnOpClear = document.getElementById("btn_op_clear") as HTMLButtonElement;
    btnOpClear.onclick = function (): void {
        a = '';
        b = '';
        selectedOperation = null;
        expressionResult = '';
        outputElement.innerHTML = '0';
    };

    // Шаг 6: Кнопка равно
    const btnOpEqual = document.getElementById("btn_op_equal") as HTMLButtonElement;
    btnOpEqual.onclick = function (): void {
        if (a === '' || b === '' || !selectedOperation) return;

        let result: number = 0;

        switch (selectedOperation) {
            case 'x':
                result = (+a) * (+b);
                break;
            case '+':
                result = (+a) + (+b);
                break;
            case '-':
                result = (+a) - (+b);
                break;
            case '/':
                result = (+a) / (+b);
                break;
            default:
                return;
        }

        expressionResult = result.toString();
        a = expressionResult;
        b = '';
        selectedOperation = null;

        outputElement.innerHTML = a;
    };
    // Шаг 7: Кнопка смены знака (+/-)
    const btnOpSign = document.getElementById("btn_op_sign") as HTMLButtonElement;
    btnOpSign.onclick = function (): void {
        if (!selectedOperation) {
            if (a !== '') {
                a = String(+a * -1); // умножаем на -1
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = String(+b * -1); // умножаем на -1
                outputElement.innerHTML = b;
            }
        }
    };
   // Шаг 8: Кнопка процента (%)
    const btnOpPercent = document.getElementById("btn_op_percent") as HTMLButtonElement;
    btnOpPercent.onclick = function (): void {
        if (!selectedOperation) {
            if (a !== '') {
                a = String(+a / 100); // делим на 100
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = String(+b / 100); // делим на 100
                outputElement.innerHTML = b;
            }
        }
    };
// Шаг 9: Кнопка Backspace (стереть последнюю цифру)
    const btnOpBackspace = document.getElementById("btn_op_backspace") as HTMLButtonElement;
    btnOpBackspace.onclick = function (): void {
        if (!selectedOperation) {
            a = a.slice(0, -1);
            outputElement.innerHTML = a || '0';
        } else {
            b = b.slice(0, -1);
            outputElement.innerHTML = b || '0';
        }
    };
    //Шаг 10: Кнопка смены темы
    const btnOpColor = document.getElementById("btn_op_color") as HTMLButtonElement;
    btnOpColor.onclick = function (): void {
        const colors = ["#1b1b2f", "#2C2C54", "#1F1F3A", "#FFFAF0", "#FFE4E1"];
        const next = colors[(colors.indexOf(backgroundColor) + 1) % colors.length] || colors[0];
        backgroundColor = next;
        document.body.style.backgroundColor = next;

    };
    // Квадратный корень √
    const btnSqrt = document.getElementById("btn_sqrt") as HTMLButtonElement;
    btnSqrt.onclick = function (): void {
        if (!selectedOperation) {
            if (a !== '') {
                a = String(Math.sqrt(+a));
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = String(Math.sqrt(+b));
                outputElement.innerHTML = b;
            }
        }
    };

// Квадрат x²
    const btnSquare = document.getElementById("btn_square") as HTMLButtonElement;
    btnSquare.onclick = function (): void {
        if (!selectedOperation) {
            if (a !== '') {
                a = String(+a * +a);
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = String(+b * +b);
                outputElement.innerHTML = b;
            }
        }
    };

// Факториал x!
    function factorial(n: number): number {
        if (n < 0) return NaN; // отрицательный факториал не определен
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    const btnFactorial = document.getElementById("btn_factorial") as HTMLButtonElement;
    btnFactorial.onclick = function (): void {
        if (!selectedOperation) {
            if (a !== '') {
                a = String(factorial(Math.floor(+a))); // округляем до целого
                outputElement.innerHTML = a;
            }
        } else {
            if (b !== '') {
                b = String(factorial(Math.floor(+b)));
                outputElement.innerHTML = b;
            }
        }
    };

// Тройное ноль 000
    const btnTripleZero = document.getElementById("btn_triple_zero") as HTMLButtonElement;
    btnTripleZero.onclick = function (): void {
        if (!selectedOperation) {
            a += "000";
            outputElement.innerHTML = a;
        } else {
            b += "000";
            outputElement.innerHTML = b;
        }
    };
// Кнопки накапливаемого сложения и вычитания
    const btnAccAdd = document.getElementById("btn_acc_add") as HTMLButtonElement;
    const btnAccSub = document.getElementById("btn_acc_sub") as HTMLButtonElement;

// Накапливаемое сложение
    btnAccAdd.onclick = function (): void {
        if (a !== '') {
            let numA = +a;
            let prev = expressionResult !== '' ? +expressionResult : 0;
            expressionResult = (prev + numA).toString();
            a = expressionResult;
            outputElement.innerHTML = a;
        }
    };

// Накапливаемое вычитание
    btnAccSub.onclick = function (): void {
        if (a !== '') {
            let numA = +a;
            let prev = expressionResult !== '' ? +expressionResult : 0;
            expressionResult = (prev - numA).toString();
            a = expressionResult;
            outputElement.innerHTML = a;
        }
    };
    // Смена цвета окна результата
    const btnResultColor = document.getElementById("btn_result_color") as HTMLButtonElement;
    const resultElement = document.getElementById("result") as HTMLElement;
// Цвета, по которым будем переключаться
    const colors = ["#2C2C54", "#1F1F3A", "#FFFAF0", "#FFE4E1", "#B0E0E6"];
    let currentColorIndex = 0; // индекс текущего цвета
    btnResultColor.onclick = function (): void {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        resultElement.style.backgroundColor = colors[currentColorIndex];
    };

    // Индивидуальная операция
    const btnFunny = document.getElementById("btn_funny") as HTMLButtonElement;

    btnFunny.onclick = function (): void {
        let currentValue = outputElement.innerText;
        if (!currentValue || isNaN(Number(currentValue))) return;

        // Превращаем число в массив цифр
        let digits = currentValue.split('');

        // Перемешиваем массив случайным образом (алгоритм Фишера-Йетса)
        for (let i = digits.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [digits[i], digits[j]] = [digits[j], digits[i]];
        }

        // Выводим обратно
        outputElement.innerText = digits.join('');
    };

};







