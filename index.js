const PORT = 8000;
const express = require('express');
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

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
        },
        // {
        //     '/genre/anime/:genre': 'input a genre and get a random site, you can do the data requests with the previous endpoints',
        //     'example': [
        //         '/genre/anime/horror',
        //         '/genre/anime/mystery',
        //         '/genre/anime/comedy'
        //     ]
        // },
        // {
        //     '/genre/manga/:genre': 'input a genre and get a random site, you can do the data requests with the previous endpoints',
        //     'example': [
        //         '/genre/manga/horror',
        //         '/genre/manga/mystery',
        //         '/genre/manga/comedy'
        //     ]
        // }
    ];
    res.json(start);
});

app.get('/anime/:anilistId/:name?', async (req, res) => {
    const anilistId = req.params.anilistId;
    let name = req.params.name;
    let fSlash = '/';
    if (name == undefined) {
        name = "";
        fSlash = "";
    };
    const BASE = "https://anilist.co/anime"
    const url = `${BASE}/${anilistId}${fSlash}${name}`
    // console.log(url);

    axios.get(url)
    .then( response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const linkData = [{dataFor: url}];

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

app.get('/manga/:anilistId/:name?', async (req, res) => {
    const anilistId = req.params.anilistId;
    let name = req.params.name;
    let fSlash = '/';
    if (name == undefined) {
        name = "";
        fSlash = "";
    };
    const BASE = "https://anilist.co/manga"
    const url = `${BASE}/${anilistId}${fSlash}${name}`
    // console.log(url);

    axios.get(url)
    .then( response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const linkData = [{dataFor: url}];

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

//#region Genre refuses to work Gives the same info at a constant. I may have to use https://graphql.anilist.co/ but I am too lazy right now.

// app.get('/genre/anime/:genreId?', async (req, res) => {
//     let genre = req.params.genreId;
//     genre = genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase();

//     const BASE = "https://anilist.co/search/anime?genres=";
//     const url = `${BASE}${genre}`;
//     console.log(url);

//     axios.get(url)
//         .then(response => {
//             const html = response.data;
//             const $ = cheerio.load(html);
//             const BASE = 'https://anilist.co';
//             const links = [];

//             $('.media-card').each(function () {
//                 const newURL = $(this).children('.cover').attr('href');

//                 // console.log(newURL);
//                 links.push({
//                     URL: `${BASE}${newURL}`
//                 });
//             });
//             res.json(links);
//         });
// });

// app.get('/genre/manga/:genreId', async (req, res) => {
//     let genre = req.params.genreId;
//     genre = genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase();

//     const BASE = "https://anilist.co/search/manga?genres=";
//     const url = `${BASE}${genre}`;

//     axios.get(url)
//         .then(response => {
//             const html = response.data;
//             const $ = cheerio.load(html);
//             const BASE = 'https://anilist.co';
//             const links = [];

//             $('.media-card').each(function () {
//                 const newURL = $(this).children('.cover').attr('href');

//                 links.push({
//                     URL: `${BASE}${newURL}`
//                 });
//             });
//         res.json(links);
//         });
// });

//#endregion

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));