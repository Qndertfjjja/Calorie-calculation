import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, Utensils } from 'lucide-react';

function Food() {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('https://hackathon-backend-srsa.onrender.com/api/foods');
        setFoods(response.data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };
    fetchFoods();
  }, []);

  return (
    <div className="min-h-screen bg-black/90 p-4 sm:p-6 md:p-8 relative mt-[-100px]">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-black/40 pointer-events-none" />
      
      {/* Header Section */}
      <div className="relative z-10 max-w-7xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Leaf className="w-8 h-8 text-green-400 mr-2" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white">
            Nature's Finest Selection
          </h2>
          <Leaf className="w-8 h-8 text-green-400 ml-2 transform rotate-180" />
        </div>
        <p className="text-green-300 text-lg max-w-2xl mx-auto">
          Discover our carefully curated collection of natural and healthy food options
        </p>
      </div>

      {/* Food Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {foods.map((food) => (
          <div 
            key={food._id}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-b from-green-900/40 to-black/60 backdrop-blur-sm border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:transform hover:scale-[1.02]"
          >
            <div className="aspect-w-16 aspect-h-9 overflow-hidden">
              <img 
                src={food.imageUrl} 
                alt={food.name}
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

            <div className="p-6 relative">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-green-400 transition-colors">
                    {food.name}
                  </h3>
                  <p className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900/40 text-green-300 border border-green-500/20">
                    {food.category}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-bold text-green-400">
                    {food.calories}
                  </span>
                  <span className="text-sm text-green-300">Calories</span>
                </div>
              </div>

              <div className="mt-4 flex items-center text-sm text-green-300/80">
                <Utensils className="w-4 h-4 mr-2" />
                <span>Nutritious & Delicious</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <div className="relative z-10 mt-12 text-center">
        <button 
          onClick={() => navigate('/food-selection')}
          className="group px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full font-medium hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-green-500/20 flex items-center mx-auto"
        >
          <span>Customize Your Selection</span>
          <Leaf className="w-5 h-5 ml-2 group-hover:rotate-45 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}

export default Food;