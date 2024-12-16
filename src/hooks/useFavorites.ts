import { useState, useEffect } from 'react';
import { Anime } from '../types/anilist';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Anime[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('animeFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addFavorite = (anime: Anime) => {
    const newFavorites = [...favorites, anime];
    setFavorites(newFavorites);
    localStorage.setItem('animeFavorites', JSON.stringify(newFavorites));
  };

  const removeFavorite = (animeId: number) => {
    const newFavorites = favorites.filter(anime => anime.id !== animeId);
    setFavorites(newFavorites);
    localStorage.setItem('animeFavorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (animeId: number) => {
    return favorites.some(anime => anime.id === animeId);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
}