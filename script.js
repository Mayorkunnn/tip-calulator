import './style.css';
// Rest of your script

class TipCalculator {
  constructor() {
    this.billInput = document.getElementById('input__bill');
    this.personInput = document.getElementById('input__people');
    this.tipInput = document.getElementById('input__tip');
    this.tipButton = document.querySelectorAll('.tip__button');
    this.tipAmount = document.getElementById('tip__amount');
    this.totalAmount = document.getElementById('tip__total');
    this.errorMessage = document.querySelector('.error__message');
    this.inputs = document.querySelectorAll('.input');
    this.tipContainer = document.querySelector('.tips');
    this.resetButton = document.querySelector('.reset--button');

    this.init();
    this.hideErrorMessage();
    this.attachEventListeners();
  }

  init() {
    this.resetFields();
    // this.displayResults();
  }

  resetFields() {
    this.billInput.value = '';
    this.personInput.value = '';
    this.tipInput.value = '';
    this.tipAmount.textContent = '$0.00';
    this.totalAmount.textContent = '$0.00';
  }

  displayResults() {
    const bill = parseFloat(this.billInput.value);
    const people = parseInt(this.personInput.value);
    const tip = parseFloat(this.tipInput.value);

    if (isNaN(bill) || bill < 1) {
      this.showErrorMessage(this.billInput);
      return;
    }

    if (isNaN(people) || people < 1) {
      this.showErrorMessage(this.personInput);
      return;
    }

    this.hideErrorMessage();

    if (bill && people && tip) {
      const discount = (bill * tip) / 100;
      const tipAmount = discount / people;
      const totalAmount = (bill + discount) / people;

      this.tipAmount.textContent = `$${tipAmount.toFixed(2)}`;
      this.totalAmount.textContent = `$${totalAmount.toFixed(2)}`;
    }
  }

  showErrorMessage(inputElement) {
    const errorMessage = inputElement.nextElementSibling.nextElementSibling;
    errorMessage.textContent = 'Invalid Input';
    errorMessage.classList.remove('hidden');
  }

  hideErrorMessage() {
    this.errorMessage.classList.add('hidden');
    this.billInput.nextElementSibling.nextElementSibling.classList.add(
      'hidden'
    );
    this.personInput.nextElementSibling.nextElementSibling.classList.add(
      'hidden'
    );
  }

  attachEventListeners() {
    this.tipContainer.addEventListener('click', e => {
      const clicked = e.target.closest('button');
      if (!clicked) return;

      const dataNum = clicked.dataset.num;
      [...clicked.parentElement.children].forEach(t => {
        if (t.classList.contains('tip__button')) {
          t.style.backgroundColor = `var(--color-buttonandtext)`;
        }
      });

      this.tipInput.value = dataNum;
      clicked.style.backgroundColor = `var(--color-reset)`;
    });

    this.inputs.forEach(input => {
      input.addEventListener('focus', e => {
        const clicked = e.target;
        clicked.nextElementSibling.style.opacity = 0;
      });
    });

    document.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        const billValue = parseFloat(this.billInput.value);
        const personValue = parseInt(this.personInput.value);

        if (isNaN(billValue) || billValue < 1) {
          this.showErrorMessage(this.billInput);
          return;
        }

        if (isNaN(personValue) || personValue < 1) {
          this.showErrorMessage(this.personInput);
          return;
        }

        this.displayResults();
      }
    });

    this.resetButton.addEventListener('click', () => {
      this.init();
      this.defaultButton();
      this.inputs.forEach(input => {
        input.nextElementSibling.style.opacity = 100;
      });
    });
  }

  defaultButton() {
    this.tipButton.forEach(button => {
      button.style.backgroundColor = `var(--color-buttonandtext)`;
    });
  }
}

const tipCalculator = new TipCalculator();
