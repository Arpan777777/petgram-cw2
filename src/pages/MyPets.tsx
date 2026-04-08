import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { PetCard } from '../components/PetCard';
import { useAuth } from '../context/AuthContext';
import { getPets, createPet, deletePet, type Pet } from '../services/api';

export default function MyPets() {
  const { user, isAuthenticated } = useAuth();
  const [myPets, setMyPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editBreed, setEditBreed] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editTags, setEditTags] = useState('');

  useEffect(() => {
    async function loadMyPets() {
      if (!isAuthenticated || !user) {
        setMyPets([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const allPets = await getPets();
        const userPets = allPets.filter((pet) => pet.owner === user.username);
        setMyPets(userPets);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load your pets');
      } finally {
        setLoading(false);
      }
    }

    loadMyPets();
  }, [isAuthenticated, user]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this pet?');
    if (!confirmed) return;

    try {
      setDeletingId(id);
      await deletePet(id);
      setMyPets((prev) => prev.filter((pet) => pet.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete pet');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditOpen = (pet: Pet) => {
    setEditingPet(pet);
    setEditName(pet.name);
    setEditType(pet.type);
    setEditAge(String(pet.age));
    setEditBreed(pet.breed);
    setEditBio(pet.bio);
    setEditTags(pet.tags.join(', '));
  };

  const handleEditClose = () => {
    setEditingPet(null);
    setEditName('');
    setEditType('');
    setEditAge('');
    setEditBreed('');
    setEditBio('');
    setEditTags('');
  };

  const handleSaveEdit = async () => {
    if (!editingPet) return;

    try {
      setSavingEdit(true);
      setError('');

      const updatedPet: Pet = {
        ...editingPet,
        name: editName || editingPet.name,
        type: editType || editingPet.type,
        age: Number(editAge || editingPet.age || 0),
        breed: editBreed || editingPet.breed,
        bio: editBio || editingPet.bio,
        tags: editTags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      await createPet(updatedPet);

      setMyPets((prev) =>
        prev.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet))
      );

      handleEditClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update pet');
    } finally {
      setSavingEdit(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Pets</h1>
          <p className="text-gray-600">Manage and view your pet profiles</p>
        </div>

        {loading && (
          <div className="bg-white rounded-lg p-6 shadow-sm text-gray-600">
            Loading your pets...
          </div>
        )}

        {!loading && !error && myPets.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myPets.map((pet) => (
              <div key={pet.id} className="space-y-3">
                <PetCard pet={pet} />

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleEditOpen(pet)}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(pet.id)}
                    disabled={deletingId === pet.id}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {deletingId === pet.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-50 text-red-700 rounded-lg p-6 shadow-sm">
            {error}
          </div>
        )}

        {!loading && !error && myPets.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg">
            <p className="text-gray-500 mb-4">You haven't added any pets yet</p>
            <Link to="/upload">
              <button className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                Add Your First Pet
              </button>
            </Link>
          </div>
        )}
      </div>

      {editingPet && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Edit Pet</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pet Name
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={editType}
                  onChange={(e) => setEditType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                >
                  <option value="">Select type</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="rabbit">Rabbit</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Breed
              </label>
              <input
                type="text"
                value={editBreed}
                onChange={(e) => setEditBreed(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                rows={4}
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                value={editTags}
                onChange={(e) => setEditTags(e.target.value)}
                placeholder="cute, friendly, playful"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSaveEdit}
                disabled={savingEdit}
                className="flex-1 px-4 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-60"
              >
                {savingEdit ? 'Saving...' : 'Save Changes'}
              </button>

              <button
                onClick={handleEditClose}
                disabled={savingEdit}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}