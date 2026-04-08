export interface Pet {
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
}

export const pets: Pet[] = [
  {
    id: "1",
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    age: 3,
    owner: "Sarah Johnson",
    bio: "Loves playing fetch and swimming! Always happy to make new friends at the dog park.",
    tags: ["playful", "friendly", "energetic"],
    image: "https://images.unsplash.com/photo-1734966213753-1b361564bab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjByZXRyaWV2ZXIlMjBkb2clMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzE4MzE2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 1247,
    followers: 523
  },
  {
    id: "2",
    name: "Whiskers",
    type: "Cat",
    breed: "Tabby",
    age: 2,
    owner: "Mike Chen",
    bio: "Independent and curious. Expert napper and window watcher. Occasionally accepts pets.",
    tags: ["curious", "independent", "calm"],
    image: "https://images.unsplash.com/photo-1719305406153-b0d36aa305ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWJieSUyMGNhdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTgxNzY2MHww&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 892,
    followers: 341
  },
  {
    id: "3",
    name: "Snowball",
    type: "Rabbit",
    breed: "Dutch",
    age: 1,
    owner: "Emily Davis",
    bio: "Fluffy and adorable! Loves carrots and hopping around the garden. Super soft and cuddly.",
    tags: ["cute", "gentle", "fluffy"],
    image: "https://images.unsplash.com/photo-1622349817799-067c32295df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWJiaXQlMjBidW5ueSUyMHBldHxlbnwxfHx8fDE3NzE3NzIzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 643,
    followers: 287
  },
  {
    id: "4",
    name: "Nibbles",
    type: "Hamster",
    breed: "Syrian",
    age: 1,
    owner: "Alex Kim",
    bio: "Tiny but mighty! Running wheel champion and professional food stasher. Always on an adventure.",
    tags: ["tiny", "active", "adorable"],
    image: "https://images.unsplash.com/photo-1548412342-98d0d2a49205?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1zdGVyJTIwcGV0fGVufDF8fHx8MTc3MTc4MDk2M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 431,
    followers: 198
  },
  {
    id: "5",
    name: "Cooper",
    type: "Dog",
    breed: "Beagle",
    age: 4,
    owner: "Jessica Brown",
    bio: "Professional sniffer and treat enthusiast. Loves long walks and following interesting scents!",
    tags: ["curious", "playful", "friendly"],
    image: "https://images.unsplash.com/photo-1631048905843-88f82fba8fd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFnbGUlMjBkb2d8ZW58MXx8fHwxNzcxODgyNjE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 1034,
    followers: 456
  },
  {
    id: "6",
    name: "Luna",
    type: "Cat",
    breed: "Siamese",
    age: 3,
    owner: "David Martinez",
    bio: "Elegant and talkative. Has strong opinions about everything. Queen of the household.",
    tags: ["elegant", "vocal", "regal"],
    image: "https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWFtZXNlJTIwY2F0fGVufDF8fHx8MTc3MTc5MzAwOHww&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 1521,
    followers: 678
  },
  {
    id: "7",
    name: "Max",
    type: "Dog",
    breed: "Corgi",
    age: 2,
    owner: "Rachel Lee",
    bio: "Short legs, big heart! Professional food beggar and cuddle expert. Makes everyone smile.",
    tags: ["cute", "friendly", "loyal"],
    image: "https://images.unsplash.com/photo-1713575029300-cdb14999ff65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JnaSUyMGRvZ3xlbnwxfHx8fDE3NzE3OTA0NTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 2103,
    followers: 891
  },
  {
    id: "8",
    name: "Fluffy",
    type: "Cat",
    breed: "Persian",
    age: 5,
    owner: "Tom Wilson",
    bio: "Living cloud of softness. Requires daily brushing and constant admiration. Worth it.",
    tags: ["fluffy", "calm", "majestic"],
    image: "https://images.unsplash.com/photo-1585137173132-cf49e10ad27d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzaWFuJTIwY2F0fGVufDF8fHx8MTc3MTg4NjAwNHww&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 987,
    followers: 432
  },
  {
    id: "9",
    name: "Rio",
    type: "Bird",
    breed: "Parrot",
    age: 6,
    owner: "Linda Garcia",
    bio: "Colorful chatterbox! Loves learning new words and singing. Life of the party!",
    tags: ["colorful", "smart", "vocal"],
    image: "https://images.unsplash.com/photo-1699721770122-c60db6612c44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJyb3QlMjBiaXJkJTIwcGV0fGVufDF8fHx8MTc3MTg4NjAwNHww&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 756,
    followers: 324
  }
];
