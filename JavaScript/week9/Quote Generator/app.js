// const Quote = require('inspirational-quotes');
 
// console.log(Quote.getRandomQuote());
 
// console.log(Quote.getQuote());

const axios = require('axios');
axios.get('https://quotes.rest/qod')
    .then((response) => {
        console.log(response.data.contents.quotes[0].quote)

    })
    .catch(console.error);