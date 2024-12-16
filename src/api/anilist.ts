import { SEARCH_ANIME, TRENDING_ANIME } from './queries';

export async function searchAnime(query: string) {
  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: SEARCH_ANIME,
        variables: { search: query }
      })
    });

    const data = await response.json();
    
    if (data.errors) {
      console.error('AniList API Errors:', data.errors);
      throw new Error(data.errors[0].message);
    }

    if (!data.data?.Page?.media) {
      console.error('Unexpected API response:', data);
      throw new Error('Invalid API response format');
    }

    return data.data.Page.media;
  } catch (error) {
    console.error('Error fetching anime:', error);
    throw error;
  }
}

export async function getTrendingAnime() {
  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: TRENDING_ANIME
      })
    });

    const data = await response.json();
    
    if (data.errors) {
      console.error('AniList API Errors:', data.errors);
      throw new Error(data.errors[0].message);
    }

    return data.data.Page.media;
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    throw error;
  }
}