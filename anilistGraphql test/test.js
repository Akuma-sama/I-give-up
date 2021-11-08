const fetch = require('node-fetch');

const query = `
query ($search: String, $type: MediaType) {
    Media(search: $search, type: $type) {
        id
        siteUrl
    }
}
`;

const variables = {
    'search': "tpn",
    'type': 'ANIME'
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

// Use fetch because axios gives a list of long json that has no relation to what we need
fetch(url, options).then(handleResponse)
                   .then(handleData)
                   .catch(handleError);

                   
function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    console.log(data['data']['Media']['id']);
}

function handleError(error) {
    console.log(error);
}