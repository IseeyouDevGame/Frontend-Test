import React, { useState } from 'react';
import { Star, Heart, Info } from 'lucide-react';
import type { Anime } from '../types/anilist';
import { AnimeModal } from './AnimeModal';

interface AnimeCardProps {
  anime: Anime;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}
export function AnimeCard({ anime, isFavorite, onToggleFavorite }: AnimeCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
        <div className="relative">
          <img
            src={anime.coverImage.large}
            alt={anime.title.english || anime.title.romaji}
            className="w-full h-64 object-cover sm:h-48 md:h-64 lg:h-72"  // Adjust height for different screen sizes
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="p-2 rounded-full bg-white text-gray-600 hover:bg-purple-500 hover:text-white transition-colors duration-200 shadow-md"
            >
              <Info size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              className={`p-2 rounded-full ${
                isFavorite
                  ? 'bg-red-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
              } transition-colors duration-200 shadow-md`}
            >
              <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">
            {anime.title.english || anime.title.romaji}
          </h3>
          <div className="flex items-center mb-2">
            <Star className="text-yellow-400 mr-1" size={16} />
            <span className="text-sm">{anime.averageScore / 10}/10</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {anime.genres.slice(0, 3).map((genre) => (
              <span
                key={genre}
                className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>
          <p
            className="text-gray-600 text-sm line-clamp-3"
            dangerouslySetInnerHTML={{ __html: anime.description || 'No description available.' }}
          />
        </div>
      </div>
      {showModal && <AnimeModal anime={anime} onClose={() => setShowModal(false)} />}
    </>
  );
}
