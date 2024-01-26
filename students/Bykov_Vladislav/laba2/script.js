window.onload = function () {
  let a = "";
  let b = "";
  let expressionResult = "";
  let selectedOperation = null;

  outputElement = document.getElementById("result");

  digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

  function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
      if (digit != "." || (digit == "." && !a.includes(digit))) {
        a += digit;
      }
      outputElement.innerHTML = a;
    } else {
      if (digit != "." || (digit == "." && !b.includes(digit))) {
        b += digit;
        outputElement.innerHTML = b;
      }
    }
  }
  document.getElementById("btn_swap_color").onclick = function () {
    const bodyElement = document.querySelector(".tema");
    const currentBackgroundColor =
      getComputedStyle(bodyElement).backgroundColor;

    let newBackgroundColor;
    if (currentBackgroundColor === "rgb(255, 254, 251)") {
      newBackgroundColor = "rgb(55, 67, 87)";
    } else {
      newBackgroundColor = "rgb(255, 254, 251)";
    }

    bodyElement.style.backgroundColor = newBackgroundColor;
  };
  document.getElementById("btn_swap_colorR").onclick = function () {
    const bodyElement = document.querySelector(".result");
    const currentBackgroundColor =
      getComputedStyle(bodyElement).backgroundColor;
    const currentTextColor = getComputedStyle(bodyElement).color;

    let newBackgroundColor, newTextColor;
    if (currentBackgroundColor === "rgb(255, 255, 255)") {
      newBackgroundColor = "rgb(84, 105, 117)";
      newTextColor = "rgb(225, 225, 225)";
    } else {
      newBackgroundColor = "rgb(255, 255, 255)";
      newTextColor = "rgb(0, 0, 0)";
    }
    bodyElement.style.backgroundColor = newBackgroundColor;
    bodyElement.style.color = newTextColor;
  };
  document.getElementById("btn_op_sign").onclick = function () {
    if (selectedOperation === null) {
      if (a !== "") {
        a = (-a).toString();
        outputElement.innerHTML = a;
      }
    } else {
      if (b !== "") {
        b = (-b).toString();
        outputElement.innerHTML = b;
      }
    }
  };
  document.getElementById("btn_op_percent").onclick = function () {
    if (selectedOperation === null) {
      if (a !== "") {
        a = (parseFloat(a) / 100).toString();
        outputElement.innerHTML = a;
      }
    } else {
      if (b !== "") {
        b = ((parseFloat(b) * parseFloat(a)) / 100).toString();
        outputElement.innerHTML = b;
      }
    }
  };
  document.getElementById("btn_backspace").onclick = function () {
    if (selectedOperation === null) {
      a = a.slice(0, -1);
      outputElement.innerHTML = a;
    } else {
      b = b.slice(0, -1);
      outputElement.innerHTML = b;
    }
  };
  document.getElementById("btn_sqrt").onclick = function () {
    if (selectedOperation === null) {
      a = Math.sqrt(parseFloat(a)).toString();
      outputElement.innerHTML = a;
    } else if (b !== "") {
      b = Math.sqrt(parseFloat(b)).toString();
      outputElement.innerHTML = b;
    }
  };
  document.getElementById("btn_square").onclick = function () {
    if (selectedOperation === null) {
      a = Math.pow(parseFloat(a), 2).toString();
      outputElement.innerHTML = a;
    } else if (b !== "") {
      b = Math.pow(parseFloat(b), 2).toString();
      outputElement.innerHTML = b;
    }
  };
  document.getElementById("btn_factorial").onclick = function () {
    if (selectedOperation === null && a !== "") {
      a = calculateFactorial(parseFloat(a)).toString();
      outputElement.innerHTML = a;
    } else if (b !== "") {
      b = calculateFactorial(parseFloat(b)).toString();
      outputElement.innerHTML = b;
    }
  };
  document.getElementById("btn_factorial").onclick = function () {
    if (a) {
      a = calculateFactorial(parseFloat(a)).toString();
      outputElement.innerHTML = a;
    } else if (b !== "") {
      b = calculateFactorial(parseFloat(b)).toString();
      outputElement.innerHTML = b;
    }
  };

  function calculateFactorial(number) {
    if (number < 0) {
      return "Error";
    } else if (number === 0) {
      return "1";
    } else {
      let result = 1;
      for (let i = 1; i <= number; i++) {
        result *= i;
      }
      return result;
    }
  }
  document.getElementById("btn_add_zeros").onclick = function () {
    if (selectedOperation === null) {
      a += "000";
      outputElement.innerHTML = a;
    } else {
      b += "000";
      outputElement.innerHTML = b;
    }
  };
  digitButtons.forEach((button) => {
    button.onclick = function () {
      const digitValue = button.innerHTML;
      onDigitButtonClicked(digitValue);
    };
  });

  document.getElementById("btn_op_mult").onclick = function () {
    if (a === "") return;
    selectedOperation = "x";
  };
  document.getElementById("btn_op_plus").onclick = function () {
    if (a === "") return;

    if (selectedOperation === "+") {
      expressionResult = +a + +b;
      a = expressionResult.toString();
      b = "";
      outputElement.innerHTML = a;
    } else {
      selectedOperation = "+";
    }
  };
  document.getElementById("btn_op_minus").onclick = function () {
    if (a === "") return;

    if (selectedOperation === "-") {
      expressionResult = +a - +b;
      a = expressionResult.toString();
      b = "";
      outputElement.innerHTML = a;
    } else {
      selectedOperation = "-";
    }
  };
  document.getElementById("btn_op_div").onclick = function () {
    if (a === "") return;
    selectedOperation = "/";
  };

  document.getElementById("btn_op_clear").onclick = function () {
    a = "";
    b = "";
    selectedOperation = "";
    expressionResult = "";
    outputElement.innerHTML = 0;
  };

  document.getElementById("btn_op_equal").onclick = function () {
    if (a === "" || b === "" || !selectedOperation) return;

    switch (selectedOperation) {
      case "x":
        expressionResult = +a * +b;
        break;
      case "+":
        expressionResult = +a + +b;
        break;
      case "-":
        expressionResult = +a - +b;
        break;
      case "/":
        expressionResult = +a / +b;
        break;
    }

    a = expressionResult.toString();
    b = "";
    selectedOperation = null;

    outputElement.innerHTML = a;
  };
};
