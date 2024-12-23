document.addEventListener('DOMContentLoaded', function() {
    let a = '';
    let b = '';
    let expressionResult = '';
    let selectedOperation = null;
    
    // Окно вывода результата
    const outputElement = document.getElementById("result");

    // Переменная для хранения текущего выражения
    let currentExpression = '';

    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

    function updateOutput() {
        if (currentExpression.length > 8) {
            outputElement.innerHTML = currentExpression.slice(0, 8) + '...';
        } else {
            outputElement.innerHTML = currentExpression || '0';
        }
    }

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                if (a === '0' && digit !== '.') {
                    return;
                } else {
                    a += digit;
                }
                currentExpression += digit;
            }
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                if (b === '0' && digit !== '.') {
                    return;
                } else {
                    b += digit;
                }
                currentExpression += digit;
            }
        }
        updateOutput();
    }

    function setOperation(operation) {
        if (currentExpression.length > 0 && !isOperator(currentExpression.trim().slice(-1))) {
            performOperation();
            selectedOperation = operation;
            currentExpression += ` ${operation} `;
            updateOutput();
        }
    }

    function isOperator(char) {
        return ['+', '-', 'x', '/'].includes(char);
    }

    // Установка колбек-функций на кнопки циферблата
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    // Функция для выполнения операции
    function performOperation() {
        if (a === '' || !selectedOperation) return;

        if (b === '') {
            return;
        }

        switch(selectedOperation) { 
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
        currentExpression = a;
        updateOutput();
    }

    // Установка колбек-функций для кнопок операций
document.getElementById("btn_op_mult").onclick = function() { setOperation('x'); };
document.getElementById("btn_op_plus").onclick = function() { setOperation('+'); };
document.getElementById("btn_op_minus").onclick = function() { setOperation('-'); };
document.getElementById("btn_op_divide").onclick = function() { setOperation('/'); };

    // Кнопка смены знака
    document.getElementById("btn_op_sign").onclick = function() {
        if (a !== '') {
            a = (-1 * parseFloat(a)).toString();
            outputElement.innerHTML = a;
        } else if (b !== '') {
            b = (-1 * parseFloat(b)).toString();
            outputElement.innerHTML = b;
        }
    };

    // Кнопка вычисления процента
    document.getElementById("btn_op_percent").onclick = function() {
        if (selectedOperation) {
            if (b !== '') {
                const percentage = parseFloat(b) / 100;
                b = (parseFloat(a) * percentage).toString();
                outputElement.innerHTML = (parseFloat(a) - parseFloat(b)).toString();
                a = outputElement.innerHTML;
                currentExpression = a;
            }
        } else {
            if (a !== '') {
                a = (parseFloat(a) / 100).toString();
                outputElement.innerHTML = a;
            }
        }
    };

    // Кнопка стирания последней цифры
    document.getElementById("btn_op_backspace").onclick = function() {
        if (!selectedOperation) {
            a = a.slice(0, -1);
            outputElement.innerHTML = a.length > 0 ? a : '0'; 
        } else {
            b = b.slice(0, -1);
            outputElement.innerHTML = b.length > 0 ? b : '0'; 
        }
    };

    // Кнопка смены цвета фона
    document.getElementById("btn_color_change").onclick = function() {
        const colors = ['#2B5257', '#4A9B8E', '#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#E67E22', '#E74C3C'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.querySelector('.button-container').style.backgroundColor = randomColor;
    };

    // Кнопка смены цвета окна вывода результата
    document.getElementById("btn_result_color_change").onclick = function() {
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#E67E22', '#E74C3C', '#2B5257', '#4A9B8E'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        outputElement.style.backgroundColor = randomColor;
    };

    // Кнопка вычисления квадратного корня
    document.getElementById("btn_op_sqrt").onclick = function() {
        if (a !== '') {
            a = Math.sqrt(parseFloat(a)).toString();
            outputElement.innerHTML = a;
        } else if (b !== '') {
            b = Math.sqrt(parseFloat(b)).toString();
            outputElement.innerHTML = b;
        }
    };

    // Кнопка возведения в квадрат
    document.getElementById("btn_op_square").onclick = function() {
        if (a !== '') {
            a = Math.pow(parseFloat(a), 2).toString();
            outputElement.innerHTML = a;
        } else if (b !== '') {
            b = Math.pow(parseFloat(b), 2).toString();
            outputElement.innerHTML = b;
        }
    };

    // Функция для вычисления факториала
    function factorial(n) {
        if (n < 0) return undefined;
        if (n === 0 || n === 1) return 1;
        
       let result = 1;
       for (let i=2; i <= n; i++) {
           result *= i;
       }
       return result;
   }

   // Кнопка вычисления факториала
   document.getElementById("btn_op_factorial").onclick = function() {
       if (a !== '') {
           a = factorial(parseInt(a)).toString();
           outputElement.innerHTML = a;
       } else if (b !== '') {
           b = factorial(parseInt(b)).toString();
           outputElement.innerHTML = b;
       }
   };

   // Кнопка добавления трех нулей
   document.getElementById("btn_op_add_three_zeros").onclick = function() {
       if (!selectedOperation) {
           a += "000";
           outputElement.innerHTML = a;
       } else {
           b += "000";
           outputElement.innerHTML = b;
       }
   };

   document.getElementById("btn_op_clear").onclick = function() { 
       a = '';
       b = '';
       selectedOperation = null;
       expressionResult = '';
       currentExpression= '';
       outputElement.innerHTML= '0';
   };

   // Кнопка расчёта результата
   document.getElementById("btn_op_equal").onclick= function() { 
       performOperation();
       outputElement.innerHTML= a;
   };

// Смена темы
function toggleTheme() {
    const body = document.body;
    const themeToggleSound = document.getElementById('themeToggleSound');
    const themeToggleOffSound = document.getElementById('themeToggleOffSound');
    if (body.classList.contains('night')) {
        body.classList.remove('night');
        if (!themeToggleOffSound.paused) {
            themeToggleOffSound.pause();
            themeToggleOffSound.currentTime = 0;
        }
        themeToggleSound.play();
    } else {
        body.classList.add('night');
        if (!themeToggleSound.paused) {
            themeToggleSound.pause();
            themeToggleSound.currentTime = 0;
        }
        themeToggleOffSound.play();
    }
}
document.getElementById('btn_theme_toggle').addEventListener('click', toggleTheme);

document.getElementById('btn_do_not_press').addEventListener('click', function() {
    document.body.style.backgroundImage = "url('creepy.jpg')";
    
    document.querySelector('.button-container').style.display = 'none';
    
    const dropdownContainer = document.querySelector('.dropdown-container');
    if (dropdownContainer) {
        dropdownContainer.style.display = 'none';
    }

    this.style.display = 'none';

    const hiddenContent = document.getElementById('hiddenContent');
    hiddenContent.style.display = 'flex';
    
    const continueButton = document.getElementById('continueButton');
    continueButton.style.display = 'block';

    continueButton.addEventListener('click', function() {
        const continueSound = document.getElementById('continueSound');
        continueSound.play();
        continueButton.style.display = 'none';

        const questionContainer = document.getElementById('questionContainer');
        questionContainer.style.display = 'flex';

        document.getElementById('btn_yes').onclick = function() {
            const notAloneMessage = document.getElementById('notAloneMessage');
            notAloneMessage.style.display = 'block';
            questionContainer.style.display = 'none';

            const playQuestionContainer = document.getElementById('playQuestionContainer');
            playQuestionContainer.style.display = 'flex';


            document.getElementById('btn_play_yes').onclick = function() {
                alert("Пароли были похищены!");
                alert("Давай поиграем в прятки? Ты водишь.");
                playQuestionContainer.style.display = 'none';

                setTimeout(function() {
                    alert("Не смотри в шкафу.");
                    
                    setTimeout(function() {
                        const foundMessageContainer = document.createElement('div');
                        foundMessageContainer.style.position = 'fixed';
                        foundMessageContainer.style.top = '50%';
                        foundMessageContainer.style.left = '50%';
                        foundMessageContainer.style.transform = 'translate(-50%, -50%)';
                        foundMessageContainer.style.color = '#ffffff';
                        foundMessageContainer.style.fontSize = '2rem';
                        foundMessageContainer.innerText = "Нашёл?";
                        
                        const noButton = document.createElement('button');
                        noButton.innerText = "Нет";
                        noButton.style.marginTop = '20px';
                        noButton.style.padding = '10px 20px';
                        noButton.style.fontSize = '1.5rem';
                        
                        noButton.onclick = function() {
                            const myTurnMessage = document.createElement('div');
                            myTurnMessage.innerText = "Теперь моя очередь искать.";
                            myTurnMessage.style.position = 'fixed';
                            myTurnMessage.style.top = '50%';
                            myTurnMessage.style.left = '50%';
                            myTurnMessage.style.transform = 'translate(-50%, -50%)';
                            myTurnMessage.style.color = '#ffffff';
                            myTurnMessage.style.fontSize = '2rem';
                            document.body.appendChild(myTurnMessage);
                            foundMessageContainer.remove();
                        };

                        foundMessageContainer.appendChild(noButton);
                        document.body.appendChild(foundMessageContainer);
                    }, 5000);
                }, 3000);
            };

            document.getElementById('btn_play_no').onclick = function() {
                notAloneContainer.style.display = 'block';
                playQuestionContainer.style.display = 'none';
            };
        };

        document.getElementById('btn_no').onclick = function() {
            const notAloneContainer = document.getElementById('notAloneContainer');
            notAloneContainer.style.display = 'block';
            questionContainer.style.display = 'none';
        };
    });
});
});