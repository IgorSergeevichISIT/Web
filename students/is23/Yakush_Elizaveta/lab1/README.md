# Лабораторная работа №1
## Веб-калькулятор (HTML + CSS)

---

## Цель работы

Знакомство с возможностями **HTML**, **CSS**, а также стилизацией интерфейса веб-приложений.

---

## Задание

Доработать внешний вид калькулятора:
- изменить цветовую палитру
- реализовать тёмную тему
- изменить кнопки и шрифты
- добавить дополнительные элементы интерфейса

---

## Выполненные задания

- Изменена цветовая палитра калькулятора
- Реализована тёмная тема
- Кнопки сделаны квадратными
- Изменён цвет и размер поля вывода
- Добавлена кнопка смены темы
- Добавлено изображение на фон
- Добавлена кнопка со ссылкой на GitHub
- Добавлены выпадающий список и блок с деталями автора
- Добавлена подпись «ЛР выполнена ФИО»
- Калькулятор выровнен по центру страницы
- Использована стилистика сайта **82box.ru**

---

## Скриншоты

### Общий вид калькулятора
[Снимок экрана 2025-12-13 в 10.00.07.png](..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2Fvar%2Ffolders%2Fvv%2Fxg0391l55fd7mk2lcrngwdlm0000gn%2FT%2FTemporaryItems%2FNSIRD_screencaptureui_Y4WH0o%2F%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202025-12-13%20%D0%B2%2010.00.07.png)

---

## Код работы

### HTML

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Калькулятор</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="calculator-container">

    <!-- Кнопка смены темы -->
    <a class="theme-btn">Сменить тему</a>

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
<div class="calculator-container-buttons">
            <button class="my-btn secondary">C</button>
            <button class="my-btn secondary">+/-</button>
            <button class="my-btn secondary">%</button>
            <button class="my-btn">/</button>
            <button class="my-btn">7</button>
            <button class="my-btn">8</button>
            <button class="my-btn">9</button>
            <button class="my-btn primary">x</button>
            <button class="my-btn">4</button>
            <button class="my-btn">5</button>
            <button class="my-btn">6</button>
            <button class="my-btn primary">-</button>
            <button class="my-btn">1</button>
            <button class="my-btn">2</button>
            <button class="my-btn">3</button>
            <button class="my-btn primary">+</button>
            <button class="my-btn">0</button>
            <button class="my-btn">.</button>
            <button class="my-btn primary execute">=</button>
</div>


    <!-- Подпись внизу -->
    <footer class="footer-text">
        ЛР выполнена Якуш Елизаветой Анатольевной
    </footer>
</div>
</body>
</html>
```

### CSS

```css
/* Фон страницы с изображением и тема*/
body {
    background-image: url('./images/rjnbr.png');
    background-size: cover;
    background-position: center;
    margin: 0;
    background-color: #1b1b2f;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    /*высота стр = высоте экрана*/
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
.calculator-container-buttons{
    display: grid; /* включаем grid */
    grid-template-columns: repeat(4, 1fr); /* 4 равных столбца */
    grid-template-rows: repeat(5, 1fr); /* 5 равных столбца */
}

    /* базовый стиль кнопок */

    .my-btn {
        margin: 5px 5px 5px 5px; /* отступы между кнопками */
        width: 60px;
        height: 60px; /* размер кнопок */
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
        width: 130px; /*ширина кнопик*/
        grid-column: span 2;
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
        background: linear-gradient(145deg, #2C2C54, #1F1F3A);
        color: #B0E0E6;
        font-size: 1.8rem;
        font-family: 'Courier New', Courier, monospace;
        font-weight: 400;
        border-radius: 10px; /* скругление */
        line-height: 70px; /*  текст по центру окошка вывода */
    }

    /* надпись внизу */

    .footer-text {
        color: #FFB6C1;
        text-align: center;
        margin-top: 20px;
        font-family: 'Arial', Helvetica, sans-serif;
        font-size: 1rem;
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
```