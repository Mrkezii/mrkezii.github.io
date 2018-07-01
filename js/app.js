const fetchCurrencies = () => {
  fetch("https://free.currencyconverterapi.com/api/v5/currencies")
    .then(res => res.json())
    .then(res => Object.values(res.results))
    .then(result => render(result))
    .catch(err => console.log(err));
};


const render = (data) => {
  const currencyInputFrom = document.getElementById("currency-from");
  const currencyInputTo = document.getElementById("currency-to");
  data.map(currency => {
    const option = document.createElement('option');
    option.value = currency.id;
    option.text = currency.id;
    currencyInputFrom.options.add(option);
  });
  data.map(currency => {
    const option = document.createElement('option');
    option.value = currency.id;
    option.text = currency.id;
    currencyInputTo.options.add(option);
  });


}

const submit = () => {
  const currencyInputFrom = document.getElementById("currency-from");
  const currencyInputTo = document.getElementById("currency-to");
  const inputValue = document.getElementById("input-currency");
  const outputValue = document.getElementById("conversion");
  const button = document.getElementById("submit");
  const convertFrom = currencyInputFrom.value;
  const convertTo = currencyInputTo.value;
  const key = `${convertFrom}_${convertTo}`;
  console.log(outputValue)
  button.innerText = "loading...";
  fetch(
    `https://free.currencyconverterapi.com/api/v5/convert?q=${key}&compact=ultra`
  )
    .then(res => res.json())
    .then(res => res)
    .then(res => {
      const convert = res[key] * inputValue.value;
      outputValue.innerText = convert.toFixed(2);
      button.innerText = "convert currency";

    })
    .catch(err => {
      button.innerText = "convert currency";
    });

}
