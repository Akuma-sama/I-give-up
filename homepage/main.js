const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: "+(e.pageY - 10)+"px; left: "+(e.pageX - 10)+"px;")
})

function main () {
    const BASE = 'https://unofficial-anilist-parser.herokuapp.com';
    const typeElement = document.getElementById('type');
    const type = typeElement.value;
    // console.log(type);
    const nameElement = document.getElementById('name');
    const name = nameElement.value;
    // console.log(name);
    let link = `${BASE}/${type}/${name}`;
    link = link.replaceAll(" ", "%20");
    // console.log(link);
    document.getElementById('link').innerHTML = `<a class="link" href="${link}" target="_blank">${link}</a>`;
};