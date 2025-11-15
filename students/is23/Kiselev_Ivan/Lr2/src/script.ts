const output = document.getElementById("Output") as HTMLDivElement;
const operOutput = document.getElementById("CurrentOperation") as HTMLDivElement;
const firstNumber = document.getElementById("LastNumber") as HTMLDivElement;

const numberContainer = document.querySelector(".numButtons") as HTMLElement;
const operationContainer = document.querySelector(".operButtons") as HTMLElement;

const numberButtons = Array.from(numberContainer.children) as HTMLElement[];
const operButtons = Array.from(operationContainer.children) as HTMLElement[];

let isThatFirstNumber: boolean = true;
let div1: string = "0";
let div2: string = "0";


for (const button of numberButtons) {
  button.addEventListener('click', function () {
    const number = button.textContent;
    if (!number) return;

    const currentOutput = output.textContent;
    const shouldReset = currentOutput === "0" || 
                        currentOutput === "000" || 
                        currentOutput === "Ошибка: деление на ноль" || 
                        currentOutput === "Ошибка: корень из отрицательного числа" ||
                        currentOutput === "Ошибка: факториал только для целых неотрицательных чисел" ||
                        currentOutput === "Infinity" ||
                        currentOutput?.startsWith("Infinity") ||
                        currentOutput?.startsWith("Ошибка:");
    
    if (shouldReset) {
      output.textContent = "";
      if (isThatFirstNumber) {
        div1 = "";
      } else {
        div2 = "";
      }
    }

    if (output.textContent?.startsWith("Infinity") || output.textContent?.startsWith("Ошибка:")) {
      return; 
    }

    if (isThatFirstNumber) {
      div1 += number;
      output.textContent = div1;
    } else {
      div2 += number;
      output.textContent = div2;
    }
  });
}

for (const button of operButtons) {
  button.addEventListener('click', function () {
    const buttonText = button.textContent;
    if (!buttonText) return;

    switch (buttonText) {
      case "C":
        handleClear();
        break;

      case "CE":
        handleFullClear();
        break;

      case "<--":
        handleBackspace();
        break;

      case "-n":
        handleNegative();
        break;

      case "=":
        if (isThatFirstNumber) return;
        operation(operOutput.textContent);
        break;

      case "n*2":
        handleSquare();
        break;

      case "√(n)":
        handleSquareRoot();
        break;

      case "!n":
        handleFactorial();
        break;

      default:
        handleOperator(buttonText);
        break;
    }
  });
}


function handleClear(): void {
  if (isThatFirstNumber) {
    div1 = "0";
  } else {
    div2 = "0";
  }
  output.textContent = "0";
}

function handleFullClear(): void {
  div1 = "0";
  div2 = "0";
  output.textContent = "0";
  operOutput.textContent = "";
  firstNumber.textContent = "";
  isThatFirstNumber = true;
}

function handleBackspace(): void {
  if (isThatFirstNumber) {
    if (div1.length > 1) {
      div1 = div1.slice(0, -1);
      if (div1 === "-") {
        div1 = "0";
      }
    } else {
      div1 = "0";
    }
    output.textContent = div1;
  } else {
    if (div2.length > 1) {
      div2 = div2.slice(0, -1);
      if (div2 === "-") {
        div2 = "0";
      }
    } else {
      div2 = "0";
    }
    output.textContent = div2;
  }
}

function handleSquare(): void {
  const num = Number(isThatFirstNumber ? div1 : div2);
  const result = num * num;
  if (isThatFirstNumber) {
    div1 = result.toString();
    output.textContent = div1;
  } else {
    div2 = result.toString();
    output.textContent = div2;
  }
}

function handleSquareRoot(): void {
  const num = Number(isThatFirstNumber ? div1 : div2);
  if (num < 0) {
    output.textContent = "Ошибка: корень из отрицательного числа";
    return;
  }
  const result = Math.sqrt(num);
  if (isThatFirstNumber) {
    div1 = result.toString();
    output.textContent = div1;
  } else {
    div2 = result.toString();
    output.textContent = div2;
  }
}

function handleFactorial(): void {
  const num = Number(isThatFirstNumber ? div1 : div2);
  if (num < 0 || !Number.isInteger(num)) {
    output.textContent = "Ошибка: факториал только для целых неотрицательных чисел";
    return;
  }
  const result = factorial(num);
  if (isThatFirstNumber) {
    div1 = result.toString();
    output.textContent = div1;
  } else {
    div2 = result.toString();
    output.textContent = div2;
  }
}

function handleNegative(): void {
  let currentNumber: string;
  if (isThatFirstNumber) {
    currentNumber = div1;

    if (currentNumber === "0" || /^0+$/.test(currentNumber)) {
      return; 
    }

    if (currentNumber.startsWith('-')) {
      div1 = currentNumber.substring(1);
    } else {
      div1 = '-' + currentNumber;
    }
    output.textContent = div1;
  } else {
    currentNumber = div2;

    if (currentNumber === "0" || /^0+$/.test(currentNumber)) {
      return; 
    }

    if (currentNumber.startsWith('-')) {
      div2 = currentNumber.substring(1);
    } else {
      div2 = '-' + currentNumber;
    }
    output.textContent = div2;
  }
}

function handleOperator(operator: string): void {
  if (isThatFirstNumber) {
    isThatFirstNumber = false;
    operOutput.textContent = operator;
    firstNumber.textContent = div1;
    output.textContent = div2;
  }
}

function operation(oper: string | null): void {
  if (!oper) return;

  let result: number;
  const num1 = Number(div1);
  const num2 = Number(div2);

  switch (oper) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        output.textContent = "Ошибка: деление на ноль";
        return;
      }
      result = num1 / num2;
      break;
    default:
      return;
  }

  div1 = result.toString();
  div2 = "0";
  output.textContent = div1;
  operOutput.textContent = "";
  firstNumber.textContent = "";
  isThatFirstNumber = true;
}

function factorial(n: number): number {
  if (n === 0 || n === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}