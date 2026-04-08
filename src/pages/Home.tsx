import { useEffect, useState } from "react";
import { PetCard } from "../components/PetCard";
import { getPets, type Pet } from "../services/api";

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPets() {
      try {
        const data = await getPets();
        setPets(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load pets");
      } finally {
        setLoading(false);
      }
    }

    loadPets();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Pets</h1>
          <p className="text-gray-600">Explore adorable pets from our community</p>
        </div>

        {loading && (
          <div className="bg-white rounded-lg p-6 shadow-sm text-gray-600">
            Loading pets...
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-50 text-red-700 rounded-lg p-6 shadow-sm">
            {error}
          </div>
        )}

        {!loading && !error && pets.length === 0 && (
          <div className="bg-white rounded-lg p-6 shadow-sm text-gray-600">
            No pets found yet.
          </div>
        )}

        {!loading && !error && pets.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}