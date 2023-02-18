let displayValue = document.getElementById("display");
const btns = document.querySelectorAll("button");
const equalBtn = document.getElementById("equal");
const decimalBtn = document.getElementById("decimal").textContent;
let clearBtn = document.getElementById("clear").textContent;
let operator = null;
let firstValue = null;
let waitingForSecondOperand = false;

displayValue.textContent = 0;

btns.forEach((btn) => {
  btn.addEventListener("click", keyClick);
});

function keyClick(e) {
  let clickedkey = e.target;
  if (clickedkey.classList.contains("numbers")) {
    inputDigit(clickedkey);
  }

  if (clickedkey.classList.contains("operator")) {
    handleOperator(clickedkey);
    console.log(waitingForSecondOperand);
    console.log(displayValue.textContent);
  }

  if (clickedkey.classList.contains("decimal")) {
    inputDecimal(clickedkey.textContent);
    console.log(decimalBtn);
  }

  if (clickedkey.classList.contains("clear")) {
    displayValue.textContent = 0;
    console.log(clearBtn);
  }

  if (clickedkey.classList.contains("equal")) {
    console.log("hello");
    handleOperator(clickedkey);
  }
}

//show all digits clicked and not 1 digit at the time for examplee 123
function inputDigit(digit) {
  if (waitingForSecondOperand === true) {
    displayValue.textContent = digit.value;
    waitingForSecondOperand = false;
  } else {
    if (displayValue.textContent === "0") {
      displayValue.textContent = digit.value;
    } else {
      displayValue.textContent += digit.value;
    }
  }
}

//converts displayValue string to a number and store it into the firstValue
function handleOperator(nextValue) {
  const inputValue = Number(displayValue.textContent);
  // verify that `firstValue` is null and that the `inputValue` is a number and saves it on firstValue
  if (firstValue === null && Number(inputValue)) {
    firstValue = inputValue;
    console.log(`I'm the fiirst value: ${firstValue}`);
  } else if (operator) {
    console.log(operator.textContent);
    const result = operate(firstValue, inputValue, operator.textContent);
    displayValue.textContent = String(result);
    firstValue = result;
    console.log(`I'm the result value: ${firstValue}`);
  }

  waitingForSecondOperand = true;
  operator = nextValue;
}

//decimal: if displayValue doesn't contain a dot, add it
function inputDecimal(dot) {
  if (!displayValue.textContent.includes(dot)) {
    displayValue.textContent += dot;
  }
}

//when clicking on = execute operator function based on the clicked operator
function operate(firstValue, secondValue, operator) {
  if (operator === "+") {
    return firstValue + secondValue;
  } else if (operator === "-") {
    return firstValue - secondValue;
  } else if (operator === "*") {
    return firstValue * secondValue;
  } else if (operator === "/") {
    return firstValue / secondValue;
  }

  return secondValue;
}
