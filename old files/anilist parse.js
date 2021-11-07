const axios = require("axios");
const cheerio = require("cheerio");

links = [
    'https://anilist.co/anime/133965/Komisan-wa-Komyushou-desu/',
    'https://anilist.co/anime/131573/Jujutsu-Kaisen-0/',
    'https://anilist.co/anime/9253/SteinsGate/'

];

for(let i=0; i<links.length; i++) {
    axios.get(links[i])
        .then( response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const linkData = [{data: links[i]}];

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

            console.log(linkData);

        }).catch(error => console.log(error));
};