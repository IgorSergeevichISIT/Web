const OPERATIONS = ["+", "-", "%", "*", "/"];
const FONT_SIZES = ["3.8rem", "2rem", "1.7rem"];
const LENGTHS = [0, 5, 12];

window.onload = function () {
    let nextPosFont = 1;
    let isAnimated = false;
    const outputElement = document.getElementById("result");
    outputElement.innerHTML = "0";

    const clearButton = document.getElementById("btn_clear");
    const backButton = document.getElementById("btn_back");
    const resultButton = document.getElementById("btn_equal");
    const buttonTheme = document.getElementById("btn_them");
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');
    const operationButtons = document.querySelectorAll('[id ^= "btn_op_"]');

    // Функция для добавления обработчиков событий
    const addEventButton = (buttons, func) => {
        buttons.forEach(button => button.addEventListener("click", () => func(button.textContent)));
    };

    // Очистка результата
    const clearResult = () => {
        outputElement.innerHTML = "0";
        nextPosFont = 1;
        outputElement.style.fontSize = FONT_SIZES[0];
    };

    // Удаление последнего символа
    const backSymbol = () => {
        if (outputElement.innerHTML.length === 1) outputElement.innerHTML = "0";
        else outputElement.innerHTML = outputElement.innerHTML.substring(0, outputElement.innerHTML.length - 1);
        checkLenResult();
    };

    // Вычисление результата
    const getResult = () => {
        if (outputElement.innerHTML[outputElement.innerHTML.length - 1] === '.') return;
        outputElement.innerHTML = eval(outputElement.innerHTML);
        if (outputElement.innerHTML === "NaN") outputElement.innerHTML = "0";
        checkLenResult();
    };

    // Смена темы
    const changeTheme = () => {
        if (isAnimated) return;
        const infos = document.getElementsByClassName("info");
        if (document.body.style.backgroundImage === 'url("back.jpg")') {
            document.body.style.backgroundImage = 'url("back (1).jpg")';
            outputElement.style.background = "#F8F4FF";
            outputElement.style.color = "rgb(67, 65, 55)";
            Array.from(infos).forEach(info => info.style.color = "rgb(255, 255, 255)");
            digitButtons.forEach(button => {
                button.style.background = "#F8F4FF";
                button.style.color = "rgb(67, 65, 55)";
            });
        } else {
            document.body.style.backgroundImage = 'url("back.jpg")';
            outputElement.style.background = "rgb(67, 65, 55)";
            outputElement.style.color = "#FFFFFF";
            Array.from(infos).forEach(info => info.style.color = "rgb(0, 0, 0)");
            digitButtons.forEach(button => {
                button.style.background = "rgb(67, 65, 55)";
                button.style.color = "#FFFFFF";
            });
        }
    };

    // Проверка длины результата и изменение размера шрифта
    const checkLenResult = () => {
        if (outputElement.innerHTML.length > LENGTHS[nextPosFont]) {
            outputElement.style.fontSize = FONT_SIZES[nextPosFont];
            nextPosFont++;
        } else if (outputElement.innerHTML.length <= LENGTHS[nextPosFont - 1]) {
            if (nextPosFont > 1) nextPosFont--;
            outputElement.style.fontSize = FONT_SIZES[nextPosFont - 1];
        }
    };

    // Ввод цифры
    const writeNum = (num) => {
        if (outputElement.innerHTML === "0" && num !== "." || outputElement.innerHTML === "Infinity") {
            outputElement.innerHTML = num;
        } else {
            outputElement.innerHTML += num;
        }
        checkLenResult();
        outputElement.scrollLeft = outputElement.scrollWidth;
    };

    // Ввод операции
    const writeOperation = (operation) => {
        if (operation === "x") operation = "*";
        if (outputElement.innerHTML[outputElement.innerHTML.length - 1] === '.') return;
        outputElement.innerHTML += operation;
        checkLenResult();
        outputElement.scrollLeft = outputElement.scrollWidth;
    };

    // Добавление обработчиков событий
    addEventButton(digitButtons, writeNum);
    addEventButton(operationButtons, writeOperation);
    clearButton.addEventListener("click", clearResult);
    backButton.addEventListener("click", backSymbol);
    buttonTheme.addEventListener("click", changeTheme);
    resultButton.addEventListener("click", getResult);
    document.body.addEventListener("transitionend", () => isAnimated = false);
    document.body.addEventListener("transitionrun", () => isAnimated = true);
};