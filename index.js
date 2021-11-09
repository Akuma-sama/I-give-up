const PORT = process.env.PORT || 8000;
const express = require('express');
const rateLimit = require('express-rate-limit')
const axios = require("axios");
const cheerio = require("cheerio");
const fetch = require('node-fetch');
const app = express();

const limit = rateLimit({
    windowMs: 1000 * 60 * 30,
    max: 100,
    message: {
        'Limit Reached': {
            'time': '30 minutes',
            'max requests': 100,
        }
    }
});

const query = `
query ($search: String, $type: MediaType) {
    Media(search: $search, type: $type) {
        id
        siteUrl
    }
}
`;

// This is just basic info. When I complete the endpoints, I will make an html/css file for this.
app.get('/', async (req, res) => {
    const start = [
        'Hello, this is an attempted anilist api. More coming soon',
        'Documentation',
        'If there is any faults in the data, it is an anilist error.',
        {
            '/:type/:anilistName': 'input the id and name or just the id to receive data',
            'example': [
                '/anime/Komisan wa Komyushou desu',
                '/anime/Jujutsu Kaisen 0',
                '/manga/Jujutsu Kaisen',
                '/manga/Kimetsu no Yaiba'
            ]
        },
    ];
    res.json(start);
});

app.get('/:type/:name', limit, async (req, res) => {
    let name = req.params.name;
    name = name.replace(/[-]+/g, " ")
    const type = req.params.type;
    let anilistId;

    const variables = { // variables for query
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

    fetch(url, options)
        .then(handleResponse)
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

    // I have the sleep there because my `newUrl` would be undefined. `localhost:8000/anime/undefined` and I would get a list of errors. 
    // I found that if I halted my program, it would allow time for `handleData()` to work and give me the id so the link would be 
    // `localhost:8000/anime/{anilistId}`
    sleep(500).then(() => {
        const BASE = `https://anilist.co/${type}`
        const newUrl = `${BASE}/${anilistId}`

        axios.get(newUrl)
            .then(response => {
                const html = response.data;
                const $ = cheerio.load(html);

                let dataSet = [];
                $('.data-set', html).each(function () {
                    let type = $(this).children('.type').text();
                    let value = $(this).children('.value').text();
                    type = type.replace(/[\r|\n]+/g, " ");
                    value = value.replace(/[\r|\n]+/g, "");

                    dataSet.push({
                        type: type,
                        value: value
                    });
                });

                let tags = [];
                $('.tags', html).each(function () {
                    let tagNames = $(this).children('.tag').children('.name').text();
                    tagNames = tagNames.replace(/[\r|\n]+/g, ", ")
                    tagNames = tagNames.replace(", ", "")
                    tags.push(tagNames);
                });

                const coverURL = $('.cover').attr('src');
                let description = $('.description').text();
                description = description.replace(/[\r|\n|"\\"]+/g, "");
                description = description.replace(/\)+/g, ") ");

                const linkData = {
                    'URL': newUrl,
                    'cover': coverURL,
                    'data-set': dataSet,
                    'tags': tags,
                    'description': description,
                };
                res.json(linkData)

            }).catch(error => {
                const err = [
                    error.name,
                    error.message
                ];
                res.json(err);
            });
    });
});

//#region Error handling
app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
});
//#endregion

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
};