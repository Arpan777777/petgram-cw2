import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { Heart, Share2, MessageCircle, ArrowLeft, User } from 'lucide-react';
import { getPets, type Pet } from '../services/api';

export default function PetProfile() {
  const { id } = useParams();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadPet() {
      try {
        setLoading(true);
        setError('');

        const pets = await getPets();
        const foundPet = pets.find((p) => p.id === id) || null;

        setPet(foundPet);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load pet profile');
      } finally {
        setLoading(false);
      }
    }

    loadPet();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading pet profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-700 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link to="/" className="text-pink-500 hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Pet not found</h2>
          <Link to="/" className="text-pink-500 hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="size-5" />
          Back to Home
        </Link>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="aspect-[4/3] overflow-hidden bg-gray-100">
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
  className="w-full h-full object-cover"
/>

          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{pet.name}</h1>
                <p className="text-xl text-gray-600">
                  {pet.breed} • {pet.type} • {pet.age} years old
                </p>
              </div>
              <button className="p-3 rounded-full bg-pink-50 text-pink-500 hover:bg-pink-100 transition-colors">
                <Heart className="size-6" />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <User className="size-5 text-gray-400" />
              <span className="text-gray-600">Owner: {pet.owner}</span>
            </div>

            <p className="text-gray-700 text-lg mb-6">{pet.bio}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {pet.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-pink-50 text-pink-600 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-8 mb-8 pb-8 border-b border-gray-200">
              <div>
                <div className="text-2xl font-semibold text-gray-900">
                  {pet.likes.toLocaleString()}
                </div>
                <div className="text-gray-600">Likes</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-gray-900">
                  {pet.followers.toLocaleString()}
                </div>
                <div className="text-gray-600">Followers</div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                <Heart className="size-5" />
                Like
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <MessageCircle className="size-5" />
                Comment
              </button>
              <button className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 className="size-5" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}