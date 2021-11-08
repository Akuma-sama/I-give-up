const PORT = 8000;
const express = require('express');
const axios = require("axios");
const cheerio = require("cheerio");
const fetch = require('node-fetch');
const app = express();

// This is just basic info. When I complete the endpoints, I will make an html/css file for this.
app.get('/', async (req, res) => {
    const start = [
        'Hello, this is an attempted anilist api. More coming soon',
        'Documentation',
        {
            '/anime/:anilistId': 'input the id and name or just the id to receive data',
            'example': [
                '/anime/133965/Komisan-wa-Komyushou-desu/',
                '/anime/131573/Jujutsu-Kaisen-0/',
                '/anime/9253'
            ]
        },
        {
            '/manga/:anilistId': 'input the id and name or just the id to receive data',
            'example': [
                '/manga/101517/Jujutsu-Kaisen/',
                '/manga/87216/Kimetsu-no-Yaiba/',
                '/manga/105097'
            ]
        }
    ];
    res.json(start);
});

const query = `
query ($search: String, $type: MediaType) {
    Media(search: $search, type: $type) {
        id
        siteUrl
    }
}
`;

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

app.get('/:type/:name', async (req, res) => {
    const name = req.params.name;
    const type = req.params.type;
    let anilistId;

    const variables = {  // variables for query
        'search': name,
        'type': type.toUpperCase()
    }

    const url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

    fetch(url, options).then(handleResponse)
        .then(handleData)
        .catch(handleError);

    //#region handle functions
    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

    function handleData(data) {
        anilistId = data['data']['Media']['id'];
    }

    function handleError(error) {
        console.log(error);
    }
    //#endregion

    sleep(500).then(() => {
        const BASE = `https://anilist.co/${type}`
        const newUrl = `${BASE}/${anilistId}`

        axios.get(newUrl)
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html);
                const linkData = [{
                    dataFor: url
                }];

                $('.data-set', html).each(function () {
                    const type = $(this).children('.type').text();
                    const value = $(this).children('.value').text();
                    linkData.push({
                        type: type,
                        value: value
                    });
                });

                $('.tags', html).each(function () {
                    const tagNames = $(this).children('.tag').children('.name').text();
                    linkData.push({
                        tags: tagNames,
                    });
                });

                const coverURL = $('.cover').attr('src');
                const description = $('.description').text();
                linkData.push({
                    coverURL,
                    description
                });
                res.json(linkData)

            }).catch(error => console.log(error));
    });
});


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));