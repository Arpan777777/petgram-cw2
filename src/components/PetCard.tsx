import { Link } from 'react-router';
import { Heart, Eye } from 'lucide-react';
import { type Pet } from '../services/api';

type PetCardProps = {
  pet: Pet;
};

export function PetCard({ pet }: PetCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/pet/${pet.id}`}>
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
  src={pet.image}
  alt={pet.name}
  onError={(e) => {
  e.currentTarget.src =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em"
          font-family="Arial, sans-serif" font-size="36" fill="#9ca3af">
          PetGram
        </text>
      </svg>
    `);
}}
  className="w-full h-full object-cover hover:scale-105 transition-transform"
/>

        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-xl">{pet.name}</h3>
            <p className="text-gray-600">
              {pet.breed} • {pet.age} yr
            </p>
          </div>
          <button className="text-pink-500 hover:text-pink-600">
            <Heart className="size-5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {pet.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-pink-100 text-pink-600"
            >
              #{tag}
            </span>
          ))}
        </div>

        <Link
          to={`/pet/${pet.id}`}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
        >
          <Eye className="size-4" />
          View Profile
        </Link>
      </div>
    </div>
  );
}