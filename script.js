// console.log("hello world");

class Calculator {
    // Class constructor
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        // Clears the 'output' space as soon as the new calculator is created
        this.clear()
    }

    // Functions for the calculator

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number) {
        // This will make sure the period or the dot is entered only one time in a number
        if (number === '.' && this.currentOperand.includes('.')) return

        // This line will add a new number behind the first number everytime a button is clicked
        // .toString is used so that it will append behind the existing number
        // If not, the numbers will add up, instead of just displaying
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        // Check to block the operation if there's no currentOperand to work with
        if (this.currentOperand === '') return

        // Check to see if there's already an calculation done first, between previousOperand and currentOperand before any more calculation is made
        if (this.previousOperand !== '') {
            this.compute()
        }

        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation 
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        // Check if the user actually enters something
        if (isNaN(prev) || isNaN(current)) return

        // Computations
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev + current
                break
            default: 
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    // Function to display the number in the comma form like '55,555,555'
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        // Add operation symbol after the previousOperand(the top one)
        if (this.operation !== null && this.operation !== undefined) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButtons = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// Event listener for the number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
})

// Event listener for the operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay()
    })
})

// Event listener for the equal button
equalsButtons.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

// Event listener for the clear button
allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

// Event listener for the delete button
deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})