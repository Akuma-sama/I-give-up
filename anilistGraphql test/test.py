import requests

# query = '''
# query ($id: Int) { # Define which variables will be used in the query (id)
#   Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
#     id
#     title {
#       romaji
#       english
#       native
#     }
#   }
# }
# '''

# variables = {
#     'search': "Naruto"
# }
# url = 'https://graphql.anilist.co'

# response = requests.post(url, json={'query': query, 'variables': variables})
# print(response.json())

# query = '''
# query ($id: Int, $page: Int, $perPage: Int, $search: String) {
#     Page (page: $page, perPage: $perPage) {
#         pageInfo {
#             total
#             currentPage
#             lastPage
#             hasNextPage
#             perPage
#         }
#         media (id: $id, search: $search) {
#             id
#             title {
#                 english
#             }
#         }
#     }
# }
# '''
# variables = {
#     'search': 'Naruto',
#     # 'page': 1,
#     # 'perPage': 3
# }
# url = 'https://graphql.anilist.co'
# response = requests.post(url, json={'query': query, 'variables': variables})
# print(response.json())

query = '''
query ($search: String, $type: MediaType) {
    Media(search: $search, type: $type) {
        id
        siteUrl
        title {
            romaji
        }
        coverImage {
            large
        }
        status(version:2)
        description(asHtml: true)
        averageScore
    }
}
'''

variables = {
    'search': "The Promised Neverland",
    'type': 'ANIME'
}
url = 'https://graphql.anilist.co'

response = requests.post(url, json={'query': query, 'variables': variables})
print(response.json())