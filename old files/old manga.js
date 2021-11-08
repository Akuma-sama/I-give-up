// app.get('/manga/:anilistId/:name?', async (req, res) => {
//     const anilistId = req.params.anilistId;
//     let name = req.params.name;
//     let fSlash = '/';
//     if (name == undefined) {
//         name = "";
//         fSlash = "";
//     };
//     const BASE = "https://anilist.co/manga"
//     const url = `${BASE}/${anilistId}${fSlash}${name}`

//     axios.get(url)
//         .then(response => {
//             const html = response.data;
//             const $ = cheerio.load(html);
//             const linkData = [{
//                 dataFor: url
//             }];

//             $('.data-set', html).each(function () {
//                 const type = $(this).children('.type').text();
//                 const value = $(this).children('.value').text();
//                 linkData.push({
//                     type: type,
//                     value: value
//                 });
//             });

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
//             res.json(linkData);

//         }).catch(error => console.log(error));
// });