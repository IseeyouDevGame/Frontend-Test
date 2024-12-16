import React, { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { AnimeCard } from '../components/AnimeCard';
import { searchAnime, getTrendingAnime } from '../api/anilist';
import { Loader2, AlertCircle } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { useSearchPersistence } from '../hooks/useSearchPersistence';
import type { Anime } from '../types/anilist';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useSearchPersistence('');
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [trendingAnime, setTrendingAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchTrendingAnime = async () => {
      try {
        const trending = await getTrendingAnime();
        setTrendingAnime(trending);
      } catch (error) {
        console.error('Error fetching trending anime:', error);
      }
    };

    fetchTrendingAnime();

    // If there's a persisted search query, perform the search
    if (searchQuery.trim()) {
      handleSearch();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const results = await searchAnime(searchQuery);
      setAnimeList(results);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch anime';
      setError(errorMessage);
      setAnimeList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (anime: Anime) => {
    if (isFavorite(anime.id)) {
      removeFavorite(anime.id);
    } else {
      addFavorite(anime);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <p className="text-gray-600 mb-8">
          Discover your next favorite anime
        </p>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleSearch}
        />
      </div>

      {error && (
        <div className="flex items-center justify-center gap-2 text-red-600 mb-6">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin text-purple-600" size={32} />
        </div>
      ) : animeList.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-6">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {animeList.map((anime) => (
              <AnimeCard
                key={anime.id}
                anime={anime}
                isFavorite={isFavorite(anime.id)}
                onToggleFavorite={() => handleToggleFavorite(anime)}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingAnime.map((anime) => (
              <AnimeCard
                key={anime.id}
                anime={anime}
                isFavorite={isFavorite(anime.id)}
                onToggleFavorite={() => handleToggleFavorite(anime)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}