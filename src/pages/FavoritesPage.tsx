import React from 'react';
import { AnimeCard } from '../components/AnimeCard';
import { useFavorites } from '../hooks/useFavorites';

export function FavoritesPage() {
  const { favorites, isFavorite, removeFavorite } = useFavorites();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Favorite Anime</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">You haven't added any favorites yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((anime) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              isFavorite={isFavorite(anime.id)}
              onToggleFavorite={() => removeFavorite(anime.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}