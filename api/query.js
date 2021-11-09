const query = `
query ($search: String, $type: MediaType) {
    Media(search: $search, type: $type) {
        id
        siteUrl
    }
}
`;

module.exports = query;