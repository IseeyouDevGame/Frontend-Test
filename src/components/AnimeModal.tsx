import React from 'react';
import { X, Calendar, Users } from 'lucide-react';
import type { Anime } from '../types/anilist';

interface AnimeModalProps {
  anime: Anime;
  onClose: () => void;
}
export function AnimeModal({ anime, onClose }: AnimeModalProps) {
  const formatDate = (date: { year: number; month: number; day: number }) => {
    if (!date.year) return 'TBA';
    return new Date(date.year, date.month - 1, date.day).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto sm:max-w-md">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">{anime.title.english || anime.title.romaji}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8 sm:grid-cols-1">
            <div>
              <img
                src={anime.coverImage.large}
                alt={anime.title.english || anime.title.romaji}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Calendar size={20} />
                  Broadcast Information
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p>Season: {anime.season} {anime.seasonYear}</p>
                  <p>Status: {anime.status}</p>
                  <p>Episodes: {anime.episodes || 'TBA'}</p>
                  <p>Start Date: {formatDate(anime.startDate)}</p>
                  <p>End Date: {formatDate(anime.endDate)}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Synopsis</h3>
                <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: anime.description }} />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Users size={20} />
                  Main Characters
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {anime.characters?.nodes.map((character) => (
                    <div key={character.id} className="text-center">
                      <img
                        src={character.image.medium}
                        alt={character.name.full}
                        className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
                      />
                      <p className="text-sm font-medium">{character.name.full}</p>
                      {character.age && (
                        <p className="text-xs text-gray-500">Age: {character.age}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
