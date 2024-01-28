const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".deleteBtn");
const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
// small display displays previous value
const previousOperand = document.querySelector(".previous-operand");
// large display displays current value
const currentOperand = document.querySelector(".current-operand");
const equal = document.querySelector(".equal");
const decimalBtn = document.querySelector(".decimal");

// adds decimal to current value
const decimal = () => {
  if (!currentValue.includes(".")) {
    currentValue += ".";
  }
};

decimalBtn.addEventListener("click", () => {
  decimal();
  currentOperand.textContent = currentValue;
});

// Odin Project Calculator Step By Step

// Step 1 - functions for all of the basic math operators
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Step 2 - Create three variables for each of the parts of a calculator operation
let operatorValue = "";
let previousValue = "";
let currentValue = "";
let result = "";
// Step 3 - Create a new function operate that takes an operator and 2 numbers

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "x":
      return multiply(num1, num2);
    case "÷": {
      if (num2 === 0) {
        return "Invalid Action";
      }
      return divide(num1, num2);
    }
    default:
      return "Invalid Operator";
  }
}

// Step 4 - Create a basic HTML calculator with buttons

// Step 5 - Create the functions that populate the display when you click the number buttons

// handles / updates current number value
const handleNumber = (num) => {
  if (currentValue.length <= 15) {
    currentValue += num;
  }
};

// listens for click of each number buttons and updates display of current value
numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
    currentOperand.textContent = currentValue;
  });
});

// similar like handleNumber function above but this handles operators
const handleOperator = (op) => {
  operatorValue = op;
  previousValue = currentValue;
  currentValue = "";
};

// listens for click of each operators and adds to current value and updates display
operators.forEach((op) => {
  op.addEventListener("click", function (e) {
    if (currentValue !== "") {
      handleOperator(e.target.textContent);
      previousOperand.textContent = previousValue + " " + operatorValue;
      currentOperand.textContent = "";
    }
  });
});

// Step 6 - Make the calculator work!

equal.addEventListener("click", equals);

function equals() {
  if (currentValue !== "" && previousValue !== "" && operatorValue !== "") {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);
    result = operate(operatorValue, previousValue, currentValue);
    previousOperand.textContent = "";
    currentOperand.textContent = result;
  }
}

// Step 7

// clear button resets everything
clearBtn.addEventListener("click", clearAll);

function clearAll() {
  previousValue = "";
  currentValue = "";
  operatorValue = "";
  previousOperand.textContent = "";
  currentOperand.textContent = "";
  result = "";
}

// Delete button
deleteBtn.addEventListener("click", deleteNumber);

function deleteNumber() {
  currentValue = currentValue.toString().slice(0, -1);
  currentOperand.textContent = currentValue;
}
