import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Upload as UploadIcon, Image, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createPet, uploadImage, type Pet } from '../services/api';

export default function Upload() {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [bio, setBio] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearPreview = () => {
    setPreview(null);
    setSelectedFile(null);
  };

  const handleSubmit = async () => {
    setError('');

    if (!petName || !petType || !preview || !selectedFile) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);

      const uploaded = await uploadImage(
        selectedFile.name,
        selectedFile.type || 'image/jpeg',
        preview
      );

      const newPet: Pet = {
        id:
          typeof crypto !== 'undefined' && 'randomUUID' in crypto
            ? crypto.randomUUID()
            : Date.now().toString(),
        name: petName,
        type: petType,
        age: Number(age || 0),
        breed: breed || 'Mixed',
        bio: bio || 'No bio yet',
        tags: tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
        image: uploaded.imageUrl,
        owner: user?.username || 'Unknown',
        likes: 0,
        followers: 0,
        createdAt: new Date().toISOString(),
      };

      await createPet(newPet);

      alert('Pet profile published successfully!');

      setPreview(null);
      setSelectedFile(null);
      setPetName('');
      setPetType('');
      setAge('');
      setBreed('');
      setBio('');
      setTags('');

      navigate('/my-pets');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to publish pet profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Pet Photo</h1>
          <p className="text-gray-600">Share your adorable pet with the community</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          {!preview ? (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:border-pink-500 transition-colors">
              <UploadIcon className="size-16 text-gray-400 mb-4" />
              <p className="text-lg font-semibold text-gray-700 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="space-y-6">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={clearPreview}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                  type="button"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="space-y-4">
                {error && (
                  <div className="rounded-lg bg-red-50 px-4 py-3 text-red-700">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pet Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your pet's name"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type *
                    </label>
                    <select
                      value={petType}
                      onChange={(e) => setPetType(e.target.value)}
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
                      placeholder="Age in years"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
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
                    placeholder="Enter breed"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    placeholder="Tell us about your pet..."
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    placeholder="playful, friendly, cute (comma-separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Image className="size-5" />
                  {isSubmitting ? 'Publishing...' : 'Publish Pet Profile'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}