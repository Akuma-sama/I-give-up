const axios = require("axios");
const cheerio = require("cheerio")

const links = [
    'https://www.amazon.com/dp/1984877925/ref=s9_acsd_ri_bw_c2_x_3_i?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=merchandised-search-10&pf_rd_r=0VT242Z9DQVF9QJCW1YB&pf_rd_t=101&pf_rd_p=ec1034ac-997c-47fd-8075-3a3a4b4c3aa3&pf_rd_i=283155',
    'https://www.amazon.com/Black-Clover-Vol-27/dp/1974725146/ref=sr_1_1?keywords=black+clover+manga&qid=1636150410&sr=8-1',
    'https://www.amazon.com/Program-Suzanne-Young/dp/1442445815/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=1636162513&sr=1-1',
    'https://www.amazon.com/Apple-MacBook-MJLQ2LL-15-inch-Processor/dp/B082XG7VBP/ref=sr_1_18?keywords=macbook+pro&qid=1636163436&sr=8-18',
    'https://www.amazon.com/Gskyer-Telescope-AZ-Astronomical-Refracting/dp/B081RJ8DW1/ref=zg-bs_photo_2/135-7110043-2348340?pd_rd_w=8OxBq&pf_rd_p=1e7b1982-fb44-47aa-b1ce-d356a8609d66&pf_rd_r=TGVJSHM1KXTYR8SGM9E5&pd_rd_r=8c09ae9c-3590-4e9d-8e6b-7c88ca091585&pd_rd_wg=OtYU0&pd_rd_i=B081RJ8DW1&psc=1'
]

// for(let i=0; i<links.length; i++) {
    axios.get(links[1])
        .then( response => {
            const html = response.data;
            // console.log(html);
            const $ = cheerio.load(html);
            // const linkData = []

            const title = $('.a-size-extra-large').text() 
                || $('#title').text();

            const price = $('#price').text() 
                || $('.header-price').children('.a-offscreen').text()
                || $('.a-text-price').children('.a-offscreen').text()
            
            console.log(title);
            console.log(price);

            // linkData.push({
            //     title: title,
            //     price: price,
            // })
            // console.log(linkData)
        }).catch(error => console.log(error));
// }