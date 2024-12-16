import React from 'react';
import { Tv, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
export function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Tv className="text-purple-600" />
            <span className="font-bold text-xl">AniList Explorer</span>
          </Link>
          <div className="hidden sm:flex items-center gap-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md ${location.pathname === '/' ? 'text-purple-600 bg-purple-50' : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'}`}
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${location.pathname === '/favorites' ? 'text-purple-600 bg-purple-50' : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'}`}
            >
              <Heart size={18} />
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
