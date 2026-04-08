import { pets as localPets } from '../data/pets';

export type Pet = {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: number;
  owner: string;
  bio: string;
  tags: string[];
  image: string;
  likes: number;
  followers: number;
  createdAt: string;
};

type RawPet = {
  id?: string;
  name?: string;
  type?: string;
  breed?: string;
  age?: number | string;
  owner?: string;
  bio?: string;
  tags?: string[];
  image?: string;
  imageUrl?: string;
  likes?: number;
  followers?: number;
  createdAt?: string;
};

const GET_PETS_URL =
  "https://prod-06.spaincentral.logic.azure.com:443/workflows/f8b22554341f40dba49f0c8dbeb0f7e0/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=ndB6NObaCsAF0LqMxv1HK5WXSOZnsGQ3A7_IjC995XE";

const POST_PET_URL =
  "https://prod-02.spaincentral.logic.azure.com:443/workflows/8c08cd844c664f3cafe452dbb98c2f66/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=edqoFmRTO_SKlMVDfJbQuvYozNFwqIyFm0-2rzwrEyA";

const UPLOAD_IMAGE_URL = "https://prod-19.spaincentral.logic.azure.com:443/workflows/f6b979f1a7124718ab430810b23b6cf3/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=3RAJUschXkR3nptO80gXO2Lc7k-7K_zaCwGnRwnV5Xw";

const PLACEHOLDER_IMAGE =
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

function normalizePet(raw: RawPet): Pet {
  const localMatch = (localPets as any[]).find((pet) => {
    const sameId = raw.id && pet.id === raw.id;
    const sameName =
      raw.name &&
      pet.name &&
      String(pet.name).toLowerCase() === String(raw.name).toLowerCase();

    return sameId || sameName;
  });

  const chosenImage =
    raw.imageUrl && !raw.imageUrl.includes('example.com')
      ? raw.imageUrl
      : raw.image && !raw.image.includes('example.com')
      ? raw.image
      : localMatch?.image
      ? localMatch.image
      : PLACEHOLDER_IMAGE;

  return {
    id: raw.id ?? String(Date.now()),
    name: raw.name ?? 'Unknown',
    type: raw.type ?? 'Pet',
    breed: raw.breed ?? 'Unknown',
    age: Number(raw.age ?? 0),
    owner: raw.owner ?? 'Unknown',
    bio: raw.bio ?? 'No bio yet',
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    image: chosenImage,
    likes: Number(raw.likes ?? 0),
    followers: Number(raw.followers ?? 0),
    createdAt: raw.createdAt ?? new Date().toISOString(),
  };
}

export async function getPets(): Promise<Pet[]> {
  const response = await fetch(GET_PETS_URL, {
    method: "GET",
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Failed to fetch pets: ${response.status} ${text}`);
  }

  const data = JSON.parse(text);

  if (!Array.isArray(data)) {
    return [];
  }

  return data.map(normalizePet);
}

export async function createPet(pet: Pet) {
  const payload = {
    id: pet.id,
    name: pet.name,
    type: pet.type,
    breed: pet.breed,
    age: pet.age,
    owner: pet.owner,
    bio: pet.bio,
    tags: pet.tags,
    image: pet.image,
    likes: pet.likes,
    followers: pet.followers,
    createdAt: pet.createdAt,
  };

  const response = await fetch(POST_PET_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Failed to create pet: ${response.status} ${text}`);
  }

  return JSON.parse(text);
}

export async function uploadImage(
  fileName: string,
  contentType: string,
  dataUri: string
): Promise<{ imageUrl: string }> {
  const response = await fetch(UPLOAD_IMAGE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileName,
      contentType,
      dataUri,
    }),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Failed to upload image: ${response.status} ${text}`);
  }

  return JSON.parse(text);
}


export async function deletePet(id: string) {
  const response = await fetch("https://prod-09.spaincentral.logic.azure.com:443/workflows/8de2432972e441d9b61cd0b7d1bd7b82/triggers/When_an_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_an_HTTP_request_is_received%2Frun&sv=1.0&sig=WWuho-7s5pj5g1IICbsFRCzmFctMbEyZ7QSE9WCcxrc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Failed to delete pet: ${response.status} ${text}`);
  }

  return JSON.parse(text);
}