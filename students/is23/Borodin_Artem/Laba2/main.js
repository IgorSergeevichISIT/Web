"use strict";
/**
 * Калькулятор на TypeScript - Лабораторная работа №2
 * Автор: Бородин Артём
 * Группа: ИС-23
 *
 * Реализованные задания:
 * 1. Смена знака +/-
 * 2. Вычисление процента %
 * 3. Кнопка стирания цифры (Backspace)
 * 4. Смена цвета фона
 * 5. Квадратный корень √
 * 6. Возведение в квадрат x²
 * 7. Факториал x!
 * 8. Кнопка добавления трех нулей (000)
 * 9. Накапливаемое сложение
 * 10. Накапливаемое вычитание
 * 11. Смена цвета окна вывода результата
 * 12. Индивидуальная операция: логарифм по основанию 2 (log₂)
 */
class Calculator {
    constructor() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.shouldResetDisplay = false;
        this.resultColorIndex = 0;
        this.bgColorIndex = 0;
        this.hasError = false; // Флаг для отслеживания состояния ошибки
        // Массивы цветов для смены
        this.resultColors = ['#00ff00', '#ff00ff', '#00ffff', '#ffff00', '#ff6600'];
        this.bgColors = ['#1a1a1a', '#2d2d2d', '#1a3a1a', '#3a1a1a', '#1a1a3a'];
        this.display = document.getElementById('result');
        this.initializeEventListeners();
    }
    /**
     * Инициализация всех обработчиков событий для кнопок
     */
    initializeEventListeners() {
        // Цифры (0-9)
        for (let i = 0; i <= 9; i++) {
            const btn = document.getElementById(`btn_digit_${i}`);
            if (btn) {
                btn.addEventListener('click', () => this.appendDigit(i.toString()));
            }
        }
        // Операции
        const operations = [
            { id: 'btn_op_plus', op: '+' },
            { id: 'btn_op_minus', op: '-' },
            { id: 'btn_op_mult', op: '*' },
            { id: 'btn_op_div', op: '/' },
            { id: 'btn_op_equal', op: '=' },
        ];
        operations.forEach(({ id, op }) => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', () => {
                    if (op === '=') {
                        this.calculate();
                    }
                    else {
                        this.setOperation(op);
                    }
                });
            }
        });
        // Точка (запятая)
        const dotBtn = document.getElementById('btn_digit_dot');
        if (dotBtn) {
            dotBtn.addEventListener('click', () => this.appendDot());
        }
        // Очистка (C)
        const clearBtn = document.getElementById('btn_op_clear');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clear());
        }
        // Задание 1: Смена знака +/-
        const signBtn = document.getElementById('btn_op_sign');
        if (signBtn) {
            signBtn.addEventListener('click', () => this.toggleSign());
        }
        // Задание 2: Процент %
        const percentBtn = document.getElementById('btn_op_percent');
        if (percentBtn) {
            percentBtn.addEventListener('click', () => this.calculatePercent());
        }
        // Задание 3: Backspace (стирание последней цифры)
        const backspaceBtn = document.getElementById('btn_op_backspace');
        if (backspaceBtn) {
            backspaceBtn.addEventListener('click', () => this.backspace());
        }
        // Задание 4: Смена цвета фона
        const bgColorBtn = document.getElementById('btn_change_bg_color');
        if (bgColorBtn) {
            bgColorBtn.addEventListener('click', () => this.changeBackgroundColor());
        }
        // Задание 5: Квадратный корень √
        const sqrtBtn = document.getElementById('btn_op_sqrt');
        if (sqrtBtn) {
            sqrtBtn.addEventListener('click', () => this.calculateSquareRoot());
        }
        // Задание 6: Возведение в квадрат x²
        const squareBtn = document.getElementById('btn_op_square');
        if (squareBtn) {
            squareBtn.addEventListener('click', () => this.calculateSquare());
        }
        // Задание 7: Факториал x!
        const factorialBtn = document.getElementById('btn_op_factorial');
        if (factorialBtn) {
            factorialBtn.addEventListener('click', () => this.calculateFactorial());
        }
        // Задание 8: Три нуля (000)
        const zeroZeroZeroBtn = document.getElementById('btn_digit_000');
        if (zeroZeroZeroBtn) {
            zeroZeroZeroBtn.addEventListener('click', () => this.appendDigit('000'));
        }
        // Задание 11: Смена цвета окна вывода результата
        const resultColorBtn = document.getElementById('btn_op_change_result_color');
        if (resultColorBtn) {
            resultColorBtn.addEventListener('click', () => this.changeResultColor());
        }
    }
    /**
     * Проверка состояния ошибки: если есть Infinity, Error или NaN, блокируем ввод
     */
    isErrorState() {
        return this.currentValue === 'Error' || this.currentValue === 'Infinity' || this.currentValue === 'NaN';
    }
    /**
     * Добавление цифры к текущему значению
     * Задания 9 и 10: Накапливаемое сложение и вычитание
     */
    appendDigit(digit) {
        // Блокировка ввода, если есть ошибка - можно только нажать "С"
        if (this.isErrorState()) {
            return;
        }
        if (this.shouldResetDisplay) {
            this.currentValue = digit;
            this.shouldResetDisplay = false;
        }
        else {
            // Предотвращение добавления нескольких нулей в начало
            if (this.currentValue === '0' && digit !== '000') {
                this.currentValue = digit;
            }
            else {
                this.currentValue += digit;
            }
        }
        this.updateDisplay();
    }
    /**
     * Добавление точки (запятой) к числу
     */
    appendDot() {
        // Блокировка ввода, если есть ошибка
        if (this.isErrorState()) {
            return;
        }
        if (this.shouldResetDisplay) {
            this.currentValue = '0.';
            this.shouldResetDisplay = false;
        }
        else if (!this.currentValue.includes('.')) {
            this.currentValue += '.';
        }
        this.updateDisplay();
    }
    /**
     * Установка операции
     * Задания 9 и 10: Накапливаемое сложение и вычитание реализуются здесь
     */
    setOperation(op) {
        // Блокировка операций, если есть ошибка
        if (this.isErrorState()) {
            return;
        }
        if (this.operation !== null && !this.shouldResetDisplay) {
            // Если уже есть операция, вычисляем промежуточный результат
            this.calculate();
        }
        this.previousValue = this.currentValue;
        this.operation = op;
        this.shouldResetDisplay = true;
    }
    /**
     * Вычисление результата
     * Задания 9 и 10: Здесь реализуется логика накапливаемого сложения и вычитания
     */
    calculate() {
        if (this.operation === null || this.previousValue === '')
            return;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        let result;
        switch (this.operation) {
            case '+':
                // Задание 9: Накапливаемое сложение
                result = prev + current;
                break;
            case '-':
                // Задание 10: Накапливаемое вычитание
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = current !== 0 ? prev / current : 0;
                break;
            default:
                return;
        }
        this.currentValue = result.toString();
        this.operation = null;
        this.previousValue = '';
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }
    /**
     * Очистка калькулятора
     * Единственная операция, которая работает при состоянии ошибки
     */
    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.shouldResetDisplay = false;
        this.hasError = false; // Сбрасываем флаг ошибки
        this.updateDisplay();
    }
    /**
     * Задание 1: Смена знака +/-
     */
    toggleSign() {
        // Блокировка операции, если есть ошибка
        if (this.isErrorState()) {
            return;
        }
        const value = parseFloat(this.currentValue);
        this.currentValue = (value * -1).toString();
        this.updateDisplay();
    }
    /**
     * Задание 2: Вычисление процента %
     */
    calculatePercent() {
        // Блокировка операции, если есть ошибка
        if (this.isErrorState()) {
            return;
        }
        const value = parseFloat(this.currentValue);
        const result = value / 100;
        this.currentValue = result.toString();
        this.updateDisplay();
    }
    /**
     * Задание 3: Backspace (удаление последней цифры)
     */
    backspace() {
        // Блокировка операции, если есть ошибка
        if (this.isErrorState()) {
            return;
        }
        if (this.currentValue.length > 1) {
            this.currentValue = this.currentValue.slice(0, -1);
        }
        else {
            this.currentValue = '0';
        }
        this.updateDisplay();
    }
    /**
     * Задание 4: Смена цвета фона
     */
    changeBackgroundColor() {
        const wrapper = document.querySelector('.calculator-wrapper');
        if (wrapper) {
            const color = this.bgColors[this.bgColorIndex];
            if (color) {
                wrapper.style.backgroundColor = color;
            }
            this.bgColorIndex = (this.bgColorIndex + 1) % this.bgColors.length;
        }
    }
    /**
     * Задание 5: Квадратный корень √
     */
    calculateSquareRoot() {
        // Блокировка операции, если есть ошибка
        if (this.isErrorState()) {
            return;
        }
        const value = parseFloat(this.currentValue);
        if (value >= 0) {
            this.currentValue = Math.sqrt(value).toString();
        }
        else {
            this.currentValue = 'Error';
        }
        this.updateDisplay();
    }
    /**
     * Задание 6: Возведение в квадрат x²
     */
    calculateSquare() {
        // Блокировка операции, если есть ошибка
        if (this.isErrorState()) {
            return;
        }
        const value = parseFloat(this.currentValue);
        this.currentValue = (value * value).toString();
        this.updateDisplay();
    }
    /**
     * Задание 7: Факториал x!
     */
    calculateFactorial() {
        // Блокировка операции, если есть ошибка
        if (this.isErrorState()) {
            return;
        }
        const value = parseInt(this.currentValue);
        if (value < 0) {
            this.currentValue = 'Error';
        }
        else if (value === 0 || value === 1) {
            this.currentValue = '1';
        }
        else {
            let result = 1;
            for (let i = 2; i <= value; i++) {
                result *= i;
            }
            this.currentValue = result.toString();
        }
        this.updateDisplay();
    }
    /**
     * Задание 11: Смена цвета окна вывода результата
     */
    changeResultColor() {
        const color = this.resultColors[this.resultColorIndex];
        if (color) {
            this.display.style.color = color;
        }
        this.resultColorIndex = (this.resultColorIndex + 1) % this.resultColors.length;
    }
    /**
     * Задание 12: Индивидуальная операция - логарифм по основанию 2 (log₂)
     * Эта операция может быть добавлена позже через отдельную кнопку
     */
    calculateLog2() {
        // Блокировка операции, если есть ошибка
        if (this.isErrorState()) {
            return;
        }
        const value = parseFloat(this.currentValue);
        if (value > 0) {
            this.currentValue = Math.log2(value).toString();
        }
        else {
            this.currentValue = 'Error';
        }
        this.updateDisplay();
    }
    /**
     * Обновление дисплея
     */
    updateDisplay() {
        this.display.textContent = this.currentValue;
    }
}
// Инициализация калькулятора при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
    console.log('Калькулятор инициализирован успешно!');
});
//# sourceMappingURL=main.js.map