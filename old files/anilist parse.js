const axios = require("axios");
const cheerio = require("cheerio");

links = [
    'https://anilist.co/anime/133965/',
    'https://anilist.co/anime/131573/',
    'https://anilist.co/anime/9253/'

];
//#region 
// for(let i=0; i<links.length; i++) {
    axios.get(links[0])
        .then( response => {
            const html = response.data;
            const $ = cheerio.load(html);

            let data_set = [];
            $('.data-set', html).each(function () {
                let type = $(this).children('.type').text();
                type = type.replace(/[\r|\n]+/g, " ");
                let value = $(this).children('.value').text();
                value = value.replace(/[\r|\n]+/g, "");

                data_set.push(
                    {
                        type: type,
                        value: value
                    }
                );
            });

            let tags = [];
            $('.tags', html).each(function () {
                let tagNames = $(this).children('.tag').children('.name').text();
                tagNames = tagNames.replace(/[\r|\n]+/g, ", ")
                tags.push(tagNames);
            });

            const coverURL = $('.cover').attr('src');
            let description = $('.description').text();
            description = description.replace(/[\r|\n]+/g, "");

            const linkData = {
                'URL': links[0],
                'cover': coverURL,
                'data-set': data_set,
                'tags': tags,
                'description': description
            };
            console.log(linkData);

        }).catch(error => console.log(error));
// };
//#endregion








// Didnt work and made no sense
// axios.get(links[0])
//     .then( response => {
//         const html = response.data;
//         const $ = cheerio.load(html);
//         // All the data variables so they are local to this function
//         let link;
//         let title;
//         let nativeTitle;
//         let description;
//         let status;
//         let episodeDuration;
//         let season;
//         let averageScore;
//         let studio;
//         let source;
//         let genre;
//         let tags;

//         // title
//         title = $('.content').text();

//         console.log(title);

//     }).catch(error => console.log(error));