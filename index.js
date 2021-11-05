const axios = require("axios");
const cheerio = require("cheerio")

axios.get("https://www.amazon.com/Black-Clover-Vol-27/dp/1974725146/ref=sr_1_1?keywords=black+clover+manga&qid=1636150410&sr=8-1")
    .then( response => {
        const html = response.data;
        // console.log(html);
        const $ = cheerio.load(html);
        const title = $('.a-size-extra-large').text();
        const price = $('#price').text();
        console.log(title);
        console.log(price);
    });