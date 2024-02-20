import { Seguro_backend } from 'declarations/Seguro_backend';   

function Insurance(brand, year, type) {
        this.brand = brand;
        this.year = year;
        this.type = type;
    }

    Insurance.prototype.quoteInsurance = async function () {

        let amount;
        const base = 2000;

        switch (this.brand) {
            case '1':
                amount = await Seguro_backend.amountBrand(base, 1.15);
                break;
            case '2':
                amount = await Seguro_backend.amountBrand(base, 1.05);
                break;
            case '3':
                amount = await Seguro_backend.amountBrand(base, 1.35);

                break;

            default:
                break;
        }

        let difference = new Date().getFullYear() - this.year;

        amount = await Seguro_backend.amountType(amount, difference, this.type);
        return amount;
    }


    function UI() { }

    UI.prototype.generateYears = () => {
        const max = new Date().getFullYear();
        const min = max - 20;
        const selectYear = document.querySelector('#year');

        for (let i = max; i > min; i--) {
            const option = document.createElement('option');
            option.textContent = i;
            option.value = i;
            selectYear.appendChild(option);
        }
    }

    UI.prototype.generateMessages = (message, type) => {
        const div = document.createElement('div');
        if (type === 'error') {
            div.classList.add('error');
        } else {
            div.classList.add('correcto');
        }
        div.classList.add('mensaje', 'mt-10');
        div.textContent = message;
        const form = document.querySelector('#cotizar-seguro');
        form.insertBefore(div, document.querySelector('#resultado'));

        setTimeout(() => {
            div.remove();
        }, 3000);
    }

    UI.prototype.showResult = async (total, insurance) => {

        const { brand, year, type } = insurance;

        const textBrand = await Seguro_backend.textBrand(brand.toString());

        const div = document.createElement('div');
        div.classList.add('mt-10');

        div.innerHTML = `
          <p class='header'>Your summary</p>
          <p class="font-bold">Total: <span class="font-normal">${total}</span></p>
          <p class="font-bold">Marca: <span class="font-normal">${textBrand}</span></p>
          <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
          <p class="font-bold">Tipo: <span class="font-normal capitalize">${type}</span></p>
  
      `
        const result = document.querySelector('#resultado');

        const spinner = document.querySelector('#cargando');
        spinner.style.display = 'block';

        setTimeout(() => {
            spinner.style.display = 'none';
            result.appendChild(div);
        }, 3000);
    }

    const ui = new UI();

    document.addEventListener('DOMContentLoaded', () => {
        ui.generateYears();

    });


    eventListeners();
    function eventListeners() {
        const form = document.querySelector('#cotizar-seguro');
        form.addEventListener('submit', quoteInsurance);
    }

    async function quoteInsurance(e) {
        e.preventDefault();

        const marca = document.querySelector('#marca').value;

        const year = document.querySelector('#year').value;

        const tipo = document.querySelector('input[name="tipo"]:checked').value;

        if (marca === '' || year === '' || tipo === '') {
            ui.generateMessages('All fields must be filled out', 'error');
            return;
        }

        ui.generateMessages('Quoting...', 'correcto');

        const results = document.querySelector('#resultado div');
        if (results != null) {
            results.remove();
        }

        const insurance = new Insurance(marca, year, tipo);
        const total = await insurance.quoteInsurance();

        ui.showResult(total, insurance);
    }