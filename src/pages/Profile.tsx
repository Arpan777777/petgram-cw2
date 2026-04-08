import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { User, Settings, Heart, Upload as UploadIcon, Grid } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PetCard } from '../components/PetCard';

export default function Profile() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [myPets, setMyPets] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'posts' | 'uploads' | 'liked'>('posts');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Load user's pets from localStorage
    const petsJSON = localStorage.getItem('petgram_pets');
    if (petsJSON && user) {
      const allPets = JSON.parse(petsJSON);
      const userPets = allPets.filter((pet: any) => pet.ownerId === user.id);
      setMyPets(userPets);
    }
  }, [user, isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    { label: 'Posts', value: myPets.length.toString() },
    { label: 'Followers', value: '0' },
    { label: 'Following', value: '0' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="h-48 bg-gradient-to-r from-pink-400 to-purple-400" />
          
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16">
              <div className="flex-shrink-0">
                <div className="size-32 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                  <User className="size-16 text-gray-400" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{user?.username}</h1>
                    <p className="text-gray-600">{user?.email}</p>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Settings className="size-5" />
                    Edit Profile
                  </button>
                </div>

                <p className="text-gray-700 mb-6">
                  🐾 Passionate about pets | Sharing adorable moments
                </p>

                <div className="flex gap-8">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 ${
                activeTab === 'posts'
                  ? 'border-pink-500 text-pink-500 font-semibold'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid className="size-5" />
              Posts
            </button>
            <button
              onClick={() => setActiveTab('uploads')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 ${
                activeTab === 'uploads'
                  ? 'border-pink-500 text-pink-500 font-semibold'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <UploadIcon className="size-5" />
              Uploads
            </button>
            <button
              onClick={() => setActiveTab('liked')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 ${
                activeTab === 'liked'
                  ? 'border-pink-500 text-pink-500 font-semibold'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Heart className="size-5" />
              Liked
            </button>
          </div>

          {myPets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myPets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Grid className="size-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">No posts yet</p>
              <p className="text-gray-400 mb-6">Start sharing your adorable pets with the community</p>
              <Link to="/upload">
                <button className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                  Create Your First Post
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}