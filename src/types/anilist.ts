export interface Anime {
  id: number;
  title: {
    english: string;
    native: string;
    romaji: string;
  };
  coverImage: {
    large: string;
    medium: string;
  };
  description: string;
  averageScore: number;
  episodes: number;
  status: string;
  genres: string[];
  season: string;
  seasonYear: number;
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  endDate: {
    year: number;
    month: number;
    day: number;
  };
  characters: {
    nodes: Character[];
  };
}

export interface Character {
  id: number;
  name: {
    full: string;
  };
  image: {
    medium: string;
  };
  gender: string;
  age: string;
}