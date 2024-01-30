// Basic variables to store values
let operatorValue = "";
let previousValue = "";
let currentValue = "";

// display divs
const previousOperand = document.querySelector(".previous-operand");
const currentOperand = document.querySelector(".current-operand");

// clear button runs clearAll function on click
const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", clearAll);

// clearAll function resets everything
function clearAll() {
  previousValue = "";
  currentValue = "";
  operatorValue = "";
  previousOperand.textContent = "";
  currentOperand.textContent = "";
}

// delete buttons runs deleteNumber function on click
const deleteBtn = document.querySelector(".deleteBtn");
deleteBtn.addEventListener("click", deleteNumber);

// deleteNumber function removes the last number from the currentValue
function deleteNumber() {
  if (currentValue !== "") {
    currentValue = currentValue.slice(0, -1);
    currentOperand.textContent = currentValue;
    if (currentValue === "") {
      currentDisplayNumber.textContent = "";
    }
  }
  if (currentValue === "" && previousValue !== "" && operatorValue === "") {
    previousValue = previousNum.slice(0, -1);
    currentOperand.textContent = previousValue;
  }
}

// decimal button adds a "." to the current value
const decimalBtn = document.querySelector(".decimal");
decimalBtn.addEventListener("click", () => {
  decimal();
});
const decimal = () => {
  if (!currentValue.includes(".")) {
    currentValue += ".";
    currentOperand.textContent = currentValue;
  }
};

// selects all button with class of number
const numberButtons = document.querySelectorAll(".number");
// iterates over each number and updates handlenNumber
numberButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  });
});

// updates number on display and values
const handleNumber = (num) => {
  if (previousValue !== "" && currentValue !== "" && operatorValue === "") {
    previousValue = "";
    currentOperand.textContent = currentValue;
  }
  if (currentValue.length <= 15) {
    currentValue += num;
    currentOperand.textContent = currentValue;
  }
};

// selects all buttons with class of operators
const operators = document.querySelectorAll(".operator");

// iterates over each operator button and handlesOperator
operators.forEach((op) => {
  op.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  });
});

// updates operatorValue and displays operators
const handleOperator = (op) => {
  if (previousValue === "") {
    previousValue = currentValue;
    operatorCheck(op);
  } else if (currentValue === "") {
    operatorCheck(op);
  } else {
    operate();
    operatorValue = op;
    currentOperand.textContent = "";
    previousOperand.textContent = previousValue + " " + operatorValue;
  }
};

const operatorCheck = (txt) => {
  operatorValue = txt;
  previousOperand.textContent = previousValue + " " + operatorValue;
  currentOperand.textContent = "";
  currentValue = "";
};

// equal button
const equal = document.querySelector(".equal");
// event listener that runs operate function on click
equal.addEventListener("click", equals);
function equals() {
  if (currentValue !== "" && previousValue !== "") {
    operate();
  }
}
// operate function
const operate = () => {
  // converts the values from string to number to evaluate
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  // basic math functions
  if (operatorValue === "+") {
    previousValue += currentValue;
  } else if (operatorValue === "-") {
    previousValue -= currentValue;
  } else if (operatorValue === "x") {
    previousValue *= currentValue;
  } else if (operatorValue === "÷") {
    // throws error when divided by 0
    if (currentValue <= 0) {
      previousValue = "ERROR";
      displayResult();
      return;
    }
    previousValue /= currentValue;
  }

  // rounds the number when divided by lengthy numbers ex: 1/3
  previousValue = roundNumber(previousValue);
  // converts from number to string to display and runs displayResult function
  previousValue = previousValue.toString();
  displayResult();
};
 
// roundNumber function
const roundNumber = (num) => {
  return Math.round(num * 100000) / 100000;
};

// display result function
const displayResult = () => {
  if (previousValue.length <= 15) {
    currentOperand.textContent = previousValue;
  } else {
    currentOperand.textContent = previousValue;
  }
  previousOperand.textContent = "";
  operatorValue = "";
  currentValue = "";
};

// Keyboard functions

// listens for key press
window.addEventListener("keydown", handleKeyPress);

function handleKeyPress(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key);
  }
  if (
    e.key === "Enter" ||
    (e.key === "=" && currentNum != "" && previousNum != "")
  ) {
    operate();
  }
  if (e.key === "+" || e.key === "-") {
    handleOperator(e.key);
  }
  if (e.key === "/") {
    handleOperator("÷");
  }
  if (e.key === "*") {
    handleOperator("x");
  }
  if (e.key === ".") {
    decimal();
  }
  if (e.key === "Backspace") {
    deleteNumber();
  }
}
