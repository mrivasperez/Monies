// --- DOCUMENT ELEMENTS ---
const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swapBtn = document.getElementById('swap');
// const ratesBtn = document.getElementById('codes')

// --- FUNCTIONS ---
// Fetch exchange rates and update the DOM
function calculate() {
    // get values of currency elements
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        // get results in json
        .then(res => res.json())
        // do thing with data
        .then(data => {
        const rate = data.rates[currency_two];
        rateEl.innerText = `1 #{currency_one} = ${rate} ${currency_two}`;
        amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        });
}

// --- EVENT LISTENERS ---
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_one.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);
swapBtn.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    //set value to currency 2 value
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
})

// ratesBtn.addEventListener('click', function(){
//     alert('clicked');
//     var table = document.getElementById("code-table");
//     table.classList.toggle("hidden");
// });
// --- CALL CALCULATE ON PAGE LOAD ---
calculate();