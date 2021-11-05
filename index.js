const PORT = 8000;
const express = require('express');
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.get('/', async (req, res) => {

    axios.get("https://myanimelist.net/topanime.php")
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const json = [];

            $('//*[@id="#area5114"]', html).each(function () {
                const title = $(this).text();
                const url = $(this).attr('href');

                json.push({
                    title: title,
                    url: url
                });
            });
            res.json(json);
        }).catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));