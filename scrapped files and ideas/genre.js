// #region Genre refuses to work Gives the same info at a constant. Genre may have to be tossed.

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

// #endregion