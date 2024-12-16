export const SEARCH_ANIME = `
  query ($search: String) {
    Page(page: 1, perPage: 10) {
      media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          english
          native
          romaji
        }
        coverImage {
          large
          medium
        }
        description
        averageScore
        episodes
        status
        genres
        season
        seasonYear
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        characters(perPage: 6, sort: ROLE) {
          nodes {
            id
            name {
              full
            }
            image {
              medium
            }
            gender
            age
          }
        }
      }
    }
  }
`;

export const TRENDING_ANIME = `
  query {
    Page(page: 1, perPage: 12) {
      media(type: ANIME, sort: TRENDING_DESC, status: RELEASING) {
        id
        title {
          english
          native
          romaji
        }
        coverImage {
          large
          medium
        }
        description
        averageScore
        episodes
        status
        genres
        season
        seasonYear
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        characters(perPage: 6, sort: ROLE) {
          nodes {
            id
            name {
              full
            }
            image {
              medium
            }
            gender
            age
          }
        }
      }
    }
  }
`;