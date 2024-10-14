// FoodApp.tsx
import React from "react";

interface FoodItem {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
}

const foodItems: FoodItem[] = [
  {
    id: 1,
    name: "Ribeye Steak",
    image: "path-to-your-steak-image",
    rating: 4.1,
    reviews: 250,
  },
  {
    id: 2,
    name: "Mexican Tortilla",
    image: "path-to-your-tortilla-image",
    rating: 4.0,
    reviews: 200,
  },
  {
    id: 3,
    name: "Lasagna",
    image: "path-to-your-lasagna-image",
    rating: 4.3,
    reviews: 300,
  },
  {
    id: 4,
    name: "Croissant",
    image: "path-to-your-croissant-image",
    rating: 4.0,
    reviews: 180,
  },
];

const FoodApp: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold">Hello, Avery Davis</div>
        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
          <img src="path-to-your-profile-image" alt="Profile" />
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-bold">What Do You Want To Eat Today?</h2>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Search food that you like..."
            className="w-full p-2 rounded-md border"
          />
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">
          All
        </button>
        <button className="bg-gray-200 px-4 py-2 rounded-md">Popular</button>
        <button className="bg-gray-200 px-4 py-2 rounded-md">
          Best Choice
        </button>
        <button className="bg-gray-200 px-4 py-2 rounded-md">Lunch</button>
        <button className="bg-gray-200 px-4 py-2 rounded-md">3+</button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {foodItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover rounded-md"
            />
            <div className="mt-2 flex justify-between items-center">
              <h3 className="font-bold">{item.name}</h3>
              <button className="bg-green-500 text-white p-2 rounded-full">
                +
              </button>
            </div>
            <div className="flex items-center text-sm mt-1">
              <span>{item.rating}</span>
              <span className="ml-2 text-yellow-400">★</span>
              <span className="ml-1 text-gray-500">({item.reviews})</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-around shadow-inner">
        <button className="text-green-500">🏠</button>
        <button className="text-gray-500">❤️</button>
        <button className="text-gray-500">🛒</button>
        <button className="text-gray-500">🔔</button>
        <button className="text-gray-500">👤</button>
      </div>
    </div>
  );
};

export default FoodApp;
