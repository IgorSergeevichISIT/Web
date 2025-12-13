# Лабораторная работа №2
## Расширенный калькулятор (HTML + CSS + JS)

---

## Цель работы

Доработка веб-калькулятора с добавлением новых функций для закрепления навыков программирования на JavaScript и работы с HTML/CSS.

---

## Задание

В рамках работы необходимо было добавить следующие функции:

- Смена знака числа (`+/-`)
- Вычисление процента (`%`)
- Кнопка стирания последней введённой цифры (backspace)
- Смена цвета фона по кнопке
- Вычисление квадратного корня (`√`)
- Возведение числа в квадрат (`x²`)
- Вычисление факториала (`x!`)
- Кнопка добавления сразу трёх нулей (`000`)
- Накапливаемое сложение
- Накапливаемое вычитание
- Смена цвета окна вывода результата по кнопке
- Индивидуальная операция, реализованная студентом

---

## Выполненные задания

- Реализована **смена знака числа** (`+/-`)
- Реализована **операция процента** (`%`)
- Добавлена кнопка **Backspace** для удаления последней цифры
- Реализована **смена цвета фона калькулятора** по кнопке
- Добавлена функция **вычисления квадратного корня** (`√`)
- Реализована функция **возведения в квадрат** (`x²`)
- Реализована функция **вычисления факториала** (`x!`)
- Добавлена кнопка для ввода **трёх нулей** (`000`)
- Реализованы операции **накапливаемого сложения и вычитания**
- Добавлена кнопка для **смены цвета окна вывода результата**
- **Индивидуальная операция**: перемешивание введённых чисел в случайном порядке (рандомизация)

---

## Скриншоты

### Общий вид калькулятора
![Снимок экрана 2025-12-13 в 10.28.45.png](..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2Fvar%2Ffolders%2Fvv%2Fxg0391l55fd7mk2lcrngwdlm0000gn%2FT%2FTemporaryItems%2FNSIRD_screencaptureui_qJPCjR%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202025-12-13%20%D0%B2%2010.28.45.png)

---

## Код работы

### HTML

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Калькулятор</title>
  <link rel="stylesheet" href="src/style.css">
</head>
<body>

<div class="calculator-container">

  <!-- Кнопка смены темы -->
  <button class="theme-btn" id="btn_op_color">Сменить тему</button>

  <!-- Кнопка со ссылкой на GitHub -->
  <a href="https://github.com/elizansk/" target="_blank" class="theme-btn">GitHub</a>

  <!-- Поле с выпадающим списком -->
  <select class="dropdown">
    <option>Выберите тему</option>
    <option>Тема 1</option>
    <option>Тема 2</option>
    <option>Тема 3</option>
  </select>

  <!-- Сворачивающиеся подробности -->
  <details class="details-box">
    <summary>Автор</summary>
    <p>Якуш Елизавета Анатольевна</p>
    <p>Группа: Иc-23</p>
  </details>

  <!-- Поле с целью ЛР -->
  <div class="goal-box">
    Цель данной лабораторной работы - <span class="highlight">знакомство</span>
    с инструментами построения пользовательских интерфейсов web-сайтов:
    <span class="highlight">HTML</span>, <span class="highlight">CSS</span>.
  </div>

  <!-- Экран калькулятора -->
  <div id="result" class="result">0</div>

  <!-- Кнопки калькулятора -->
  <div class="buttons">
    <div class="calculator-main">
      <!-- Левая колонка: цифры и базовые операции -->
      <div class="digits-column">
          <button id="btn_op_clear" class="my-btn secondary">C</button>
          <button id="btn_op_percent" class="my-btn primary">%</button>
          <button id="btn_op_sign" class="my-btn primary">+/-</button>
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
          <button id="btn_digit_0" class="my-btn">0</button>
          <button id="btn_digit_dot" class="my-btn">.</button>
          <button id="btn_op_equal" class="my-btn primary execute">=</button>
      </div>

      <!-- Правая колонка: новые функции и Backspace -->
      <div class="functions-column">
        <button id="btn_op_backspace" class="my-btn primary">⌫</button>
        <button id="btn_sqrt" class="my-btn secondary">√</button>
        <button id="btn_square" class="my-btn secondary">x²</button>
        <button id="btn_factorial" class="my-btn secondary">x!</button>
        <button id="btn_triple_zero" class="my-btn secondary">000</button>
      <button id="btn_acc_add" class="my-btn secondary">M+</button>
      <button id="btn_acc_sub" class="my-btn secondary">M-</button>
      <button id="btn_result_color" class="my-btn vertical-double">Цвет окна</button>
      <button id="btn_funny" class="my-btn funny">Сме шать</button>
  </div>
    </div>

    </div>
    <!-- Подпись внизу -->
    <footer class="footer-text">
        <div class="scroll-text">
            ЛР выполнена Якуш Елизаветой Анатольевной
        </div>
    </footer>


</div>
<script type="text/javascript" src="src/script.ts"></script>
</body>
</html>
```

### CSS

```CSS
/* Фон страницы с изображением */
body {
  background-image: url('../public/background.png');
  background-size: cover;
  background-position: center;
  margin: 0;
}

/* Тёмная тема */
body {
  background-color: #1b1b2f;
  display: flex;/*  для выравнивания содержимого */
  justify-content: center;
  align-items: center;
  min-height: 100vh;/* высота страницы равна высоте экрана */
}

/* кнопка смены темы */
.theme-btn {
  margin-bottom: 15px; /* отступ снизу */
  padding: 8px 16px; /*  высота и ширина */
  border-radius: 6px; /*  скругляем углы */
  background-color: #0000CD;
  color: #B0E0E6;
  font-family: 'Arial', sans-serif; /* шрифт */
  font-weight: 500; /* средняя толщина текста */
}

/*  контейнер калькулятора */
.calculator-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* базовый стиль кнопок */
.my-btn {
  margin: 5px 5px 5px 5px; /* отступы между кнопками */
  width: 60px; height: 60px; /* размер кнопок */
  border-radius: 8px; /* скругление */
  border: none; /* убираем контур */
  background-color: #0000CD;
  color: #B0E0E6;
  font-size: 1.6rem; /* размер цифр */
  font-family: 'Courier New', Courier, monospace; /*  шрифт */
}


/* первостепенные кнопки */
.my-btn.primary {
  background-color: #EE82EE;
  color: #B0E0E6;
}


/* второстепенные кнопки */
.my-btn.secondary {
  background-color: #EE82EE;
  color: #B0E0E6;
}

/* кнопка "=" */
.my-btn.execute {
  font-weight: 400;
  width: 130px;/*ширина кнопик*/
  grid-column: span 2;
}

.my-btn:active{
  box-shadow: 2px 2px 5px #ff0000;
}
/* меняем цвет при наведении */
.my-btn:hover {
  background-color: #00FFFF;
}

/* окно вывода результата */
.result {
  width: 280px;
  height: 70px;
  margin-bottom: 15px;
  padding: 0 15px;
    background-color: #2C2C54; /* начальный цвет */
  color: #B0E0E6;
  font-size: 1.8rem;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 400;
  border-radius: 10px; /* скругление */
  line-height: 70px; /*  текст по центру окошка вывода */
}
.result:hover {
  box-shadow: 0 0 15px #00ffff, 0 0 30px #00ffff, 0 0 45px #00ffff;
}
/* надпись внизу */
.footer-text {
  position: fixed;          /* закрепляем внизу экрана */
  bottom: 50px;                /* прижимаем к нижнему краю */
  left: 0;
  width: 100vw;             /* растягиваем на всю ширину окна */
  background: #EE82EE;         /* фон */
  color: white;             /* цвет текста */
  padding: 5px 0;
  white-space: nowrap;      /* чтобы текст не переносился */

}

.scroll-text {
  display: inline-block;
  animation: moveText 10s linear infinite; /* 15s — скорость */
  padding-left: 100%; /* начинаем за правым краем */
  transform: scale(1.2); /* увеличиваем размер текста на 20% */
}

@keyframes moveText {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(-100%);
  }
}


.footer-text:hover .scroll-text {
  animation-play-state: paused; /* пауза при наведении */
}


/* Кнопка GitHub и выпадающий список */
.dropdown {
  margin: 10px 0;
  padding: 6px;
  border-radius: 6px;
  font-size: 1rem;
  background-color: #0000CD;
  color: #B0E0E6;
}

.details-box {
  margin: 10px 0;
  padding: 5px 10px;
  border-radius: 6px;
  background-color: #0000CD;
  color: #B0E0E6;
  width: 250px;
}

/* Поле с целью ЛР */
.goal-box {
  margin: 10px 0;
  padding: 10px;
  border-radius: 6px;
  background-color: #0000CD;
  color: #B0E0E6;
  width: 280px;
  text-align: center;
}

/* Подсветка слов */
.highlight {
  color: #EE82EE;
  font-weight: bold;
}

/* Отступы между кнопками темы и GitHub */
.theme-btn {
  margin: 5px;
}
.calculator-main {
  display: flex;
  flex-direction: row; /* колонки горизонтально */
  gap: 10px;           /* отступ между колонками */
}

.functions-column {

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 10px;
}

.digits-column {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 10px;
}

.new-colomn {
  display: flex;
  flex-direction: column;
  gap: 10px;          /* расстояние между кнопками */
  align-items: flex-start; /* выравнивание по левому краю колонки */
}

.my-btn.vertical-double {
  height: 130px;       /* примерно 2 x 60px + небольшой отступ */
  font-size: 1.2rem;   /* уменьшаем шрифт, чтобы текст помещался */
  line-height: 1.2;    /* чтобы текст выровнялся по центру */
  padding: 5px;        /* небольшой внутренний отступ */
  grid-row: span 2;
  background-color: #EE82EE;
  color: #B0E0E6;
}
.my-btn.funny {
  font-size: 1rem;      /* уменьшаем шрифт */
  padding: 4px;         /* немного меньше внутренние отступы */
  line-height: 1.2;     /* более плотный текст */
  background-color: #EE82EE;
  color: #B0E0E6;
}
```

### TypeScript

```TypeScript

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
```