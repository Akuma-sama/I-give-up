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
            let linkData = [{data: links[0]}];

            $('.data-set', html).each(function () {
                const type = $(this).children('.type').text();
                const value = $(this).children('.value').text();
                let i=0
                i++
                linkData.push({
                    i: {
                        type: type,
                        value: value
                    }
                });
            });

//             $('.tags', html).each(function () {
//                 const tagNames = $(this).children('.tag').children('.name').text();
//                 linkData.push({
//                     tags: tagNames,
//                 });
//             });

//             const coverURL = $('.cover').attr('src');
//             const description = $('.description').text();
//             linkData.push({
//                 coverURL,
//                 description
//             });

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