window.addEventListener('load', function () {

  axios.get('https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=INR')
  .then(function (response) {
    var btc = response.data[0].price_inr;
    btc = Math.round(btc *100)/100;
    document.querySelector('.btc-value').textContent = btc;
  })
  axios.get('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=INR')
  .then(function (response) {
    var eth = response.data[0].price_inr;
    eth = Math.round(eth *100)/100;
    document.querySelector('.eth-value').textContent = eth;
  })
  
  .catch(function (error) {
    console.log(error);
  });
})