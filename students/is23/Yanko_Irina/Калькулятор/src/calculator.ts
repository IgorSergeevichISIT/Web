class Calculator {
    private currentInput: string = '0';
    private previousInput: string = '';
    private operation: string | null = null;
    private shouldResetScreen: boolean = false;
    private accumulatedValue: number = 0;
    private resultColor: string = 'gold';
    private backgroundColor: string = '#111';

    private resultElement: HTMLElement;
    private themeToggle: HTMLButtonElement;

    constructor() {
        this.resultElement = document.getElementById('result')!;
        this.themeToggle = document.getElementById('themeToggle') as HTMLButtonElement;
        
        this.initializeTheme();
        this.attachEventListeners();
        this.updateDisplay();
    }

    private initializeTheme(): void {
        const savedTheme = localStorage.getItem('calculatorTheme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            this.themeToggle.textContent = 'Тёмная тема';
        } else {
            this.themeToggle.textContent = 'Светлая тема';
        }
    }

    private attachEventListeners(): void {
        // Цифровые кнопки
        for (let i = 0; i <= 9; i++) {
            const button = document.getElementById(`btn_digit_${i}`);
            if (button) {
                button.addEventListener('click', () => this.handleDigit(i.toString()));
            }
        }

        // Базовые операции
        this.addListener('btn_op_plus', () => this.handleOperation('+'));
        this.addListener('btn_op_minus', () => this.handleOperation('-'));
        this.addListener('btn_op_mult', () => this.handleOperation('*'));
        this.addListener('btn_op_div', () => this.handleOperation('/'));
        
        // Специальные операции
        this.addListener('btn_op_equal', () => this.handleEquals());
        this.addListener('btn_op_clear', () => this.handleClear());
        this.addListener('btn_op_sign', () => this.handleSign());
        this.addListener('btn_op_percent', () => this.handlePercent());
        this.addListener('btn_digit_dot', () => this.handleDecimal());

        // Новые операции
        this.addListener('btn_op_backspace', () => this.handleBackspace());
        this.addListener('btn_op_sqrt', () => this.handleSquareRoot());
        this.addListener('btn_op_square', () => this.handleSquare());
        this.addListener('btn_op_factorial', () => this.handleFactorial());
        this.addListener('btn_op_custom', () => this.handleCustomOperation());
        this.addListener('btn_triple_zero', () => this.handleTripleZero());
        this.addListener('btn_accumulate_plus', () => this.handleAccumulatePlus());
        this.addListener('btn_accumulate_minus', () => this.handleAccumulateMinus());
        this.addListener('btn_result_color', () => this.changeResultColor());
        this.addListener('btn_bg_color', () => this.changeBackgroundColor());

        // Переключение темы
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Обработка клавиатуры
        document.addEventListener('keydown', (e: KeyboardEvent) => this.handleKeyboardInput(e));
    }

    private addListener(id: string, handler: () => void): void {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', handler);
        } else {
            console.log(`Кнопка ${id} не найдена`);
        }
    }

    private handleDigit(digit: string): void {
        if (this.shouldResetScreen) {
            this.currentInput = '';
            this.shouldResetScreen = false;
        }
        
        if (this.currentInput === '0') {
            this.currentInput = digit;
        } else {
            this.currentInput += digit;
        }
        
        this.updateDisplay();
    }

    private handleOperation(op: string): void {
        if (this.operation !== null) {
            this.handleEquals();
        }
        
        this.previousInput = this.currentInput;
        this.operation = op;
        this.shouldResetScreen = true;
    }

    private handleEquals(): void {
        if (this.operation === null || this.shouldResetScreen) return;

        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        
        if (isNaN(prev) || isNaN(current)) return;

        let result: number;

        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    this.showError();
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }

        result = Math.round(result * 100000000) / 100000000;
        this.currentInput = result.toString();
        this.operation = null;
        this.previousInput = '';
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    private showError(): void {
        this.currentInput = 'Ошибка';
        this.operation = null;
        this.previousInput = '';
        this.shouldResetScreen = true;
        this.updateDisplay();
    }

    private handleClear(): void {
        this.currentInput = '0';
        this.previousInput = '';
        this.operation = null;
        this.accumulatedValue = 0;
        this.updateDisplay();
    }

    private handleSign(): void {
        const num = parseFloat(this.currentInput);
        if (!isNaN(num)) {
            this.currentInput = (num * -1).toString();
            this.updateDisplay();
        }
    }

    private handlePercent(): void {
        const num = parseFloat(this.currentInput);
        if (!isNaN(num)) {
            this.currentInput = (num / 100).toString();
            this.updateDisplay();
        }
    }

    private handleDecimal(): void {
        if (this.shouldResetScreen) {
            this.currentInput = '0';
            this.shouldResetScreen = false;
        }
        
        if (!this.currentInput.includes('.')) {
            this.currentInput += '.';
        }
        
        this.updateDisplay();
    }

    // НОВЫЕ ФУНКЦИИ

    private handleBackspace(): void {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        this.updateDisplay();
    }

    private handleSquareRoot(): void {
        const num = parseFloat(this.currentInput);
        if (!isNaN(num) && num >= 0) {
            const result = Math.sqrt(num);
            this.currentInput = this.formatResult(result);
            this.shouldResetScreen = true;
            this.updateDisplay();
        } else {
            this.showError();
        }
    }

    private handleSquare(): void {
        const num = parseFloat(this.currentInput);
        if (!isNaN(num)) {
            const result = num * num;
            this.currentInput = this.formatResult(result);
            this.shouldResetScreen = true;
            this.updateDisplay();
        }
    }

    private handleFactorial(): void {
        const num = parseInt(this.currentInput);
        if (!isNaN(num) && num >= 0 && num <= 20) {
            let result = 1;
            for (let i = 2; i <= num; i++) {
                result *= i;
            }
            this.currentInput = result.toString();
            this.shouldResetScreen = true;
            this.updateDisplay();
        } else {
            this.showError();
        }
    }

    private handleCustomOperation(): void {
        const num = parseFloat(this.currentInput);
        if (!isNaN(num)) {
            const result = num * num * num;
            this.currentInput = this.formatResult(result);
            this.shouldResetScreen = true;
            this.updateDisplay();
        }
    }

    private handleTripleZero(): void {
        if (this.shouldResetScreen) {
            this.currentInput = '';
            this.shouldResetScreen = false;
        }
        
        if (this.currentInput === '0') {
            this.currentInput = '000';
        } else {
            this.currentInput += '000';
        }
        
        this.updateDisplay();
    }

    private handleAccumulatePlus(): void {
        const current = parseFloat(this.currentInput);
        if (!isNaN(current)) {
            this.accumulatedValue += current;
            this.currentInput = this.formatResult(this.accumulatedValue);
            this.shouldResetScreen = true;
            this.updateDisplay();
        }
    }

    private handleAccumulateMinus(): void {
        const current = parseFloat(this.currentInput);
        if (!isNaN(current)) {
            this.accumulatedValue -= current;
            this.currentInput = this.formatResult(this.accumulatedValue);
            this.shouldResetScreen = true;
            this.updateDisplay();
        }
    }

    private changeResultColor(): void {
        const colors = ['gold', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#fd79a8', '#a29bfe'];
        const currentIndex = colors.indexOf(this.resultColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        this.resultColor = colors[nextIndex];
        
        this.resultElement.style.color = this.resultColor;
        this.resultElement.style.borderColor = this.resultColor;
    }

    private changeBackgroundColor(): void {
        const colors = ['#111', '#1a1a1a', '#2d1b69', '#1b5e20', '#b71c1c', '#0d47a1', '#4a148c', '#004d40'];
        const currentIndex = colors.indexOf(this.backgroundColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        this.backgroundColor = colors[nextIndex];
        
        this.resultElement.style.backgroundColor = this.backgroundColor;
    }

    private formatResult(result: number): string {
        const rounded = Math.round(result * 100000000) / 100000000;
        return rounded.toString();
    }

    private handleKeyboardInput(e: KeyboardEvent): void {
        const key = e.key;
        
        if (key >= '0' && key <= '9') {
            this.handleDigit(key);
            return;
        }
        
        switch (key) {
            case '+':
                e.preventDefault();
                this.handleOperation('+');
                break;
            case '-':
                e.preventDefault();
                this.handleOperation('-');
                break;
            case '*':
                e.preventDefault();
                this.handleOperation('*');
                break;
            case '/':
                e.preventDefault();
                this.handleOperation('/');
                break;
            case 'Enter':
            case '=':
                e.preventDefault();
                this.handleEquals();
                break;
            case 'Escape':
            case 'Delete':
                e.preventDefault();
                this.handleClear();
                break;
            case '.':
            case ',':
                e.preventDefault();
                this.handleDecimal();
                break;
            case '%':
                e.preventDefault();
                this.handlePercent();
                break;
            case 'Backspace':
                e.preventDefault();
                this.handleBackspace();
                break;
        }
    }

    private updateDisplay(): void {
        let displayValue = this.currentInput;
        
        if (displayValue.length > 12) {
            if (displayValue.includes('.')) {
                displayValue = displayValue.substring(0, 12);
            } else {
                const num = parseFloat(displayValue);
                if (!isNaN(num)) {
                    displayValue = num.toExponential(6);
                }
            }
        }
        
        this.resultElement.textContent = displayValue;
        this.resultElement.style.color = this.resultColor;
        this.resultElement.style.borderColor = this.resultColor;
        this.resultElement.style.backgroundColor = this.backgroundColor;
    }

    private toggleTheme(): void {
        const isLightTheme = document.body.classList.toggle('light-theme');
        
        if (isLightTheme) {
            this.themeToggle.textContent = 'Тёмная тема';
            localStorage.setItem('calculatorTheme', 'light');
        } else {
            this.themeToggle.textContent = 'Светлая тема';
            localStorage.setItem('calculatorTheme', 'dark');
        }
    }
}

// Инициализация калькулятора
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});

const dd: [number,string] = [1,"swf"];