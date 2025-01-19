import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2, Clock, Siren as Fire, Award } from 'lucide-react';

const FoodDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-300">Food item not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/90 to-green-900/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Menu</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="relative">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-[400px] object-cover rounded-xl shadow-2xl"
            />
            <div className="absolute top-4 right-4 flex space-x-4">
              <button className="p-2 bg-black/50 rounded-full text-gray-300 hover:text-green-400 transition-colors duration-300">
                <Heart className="h-6 w-6" />
              </button>
              <button className="p-2 bg-black/50 rounded-full text-gray-300 hover:text-green-400 transition-colors duration-300">
                <Share2 className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
            <h1 className="text-3xl font-bold text-green-400 mb-4">{item.name}</h1>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">20-30 min</span>
              </div>
              <div className="flex items-center space-x-2">
                <Fire className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">{item.calories} cal</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">4.8 ★</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-green-400 mb-2">Description</h2>
              <p className="text-gray-300">
                {item.description || 'A delicious and nutritious meal prepared with the finest ingredients.'}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-green-400 mb-2">Ingredients</h2>
              <ul className="grid grid-cols-2 gap-2">
                {['Fresh vegetables', 'Organic herbs', 'Premium spices', 'Quality protein'].map((ingredient, index) => (
                  <li key={index} className="text-gray-300 flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between mt-8">
              <div>
                <p className="text-gray-400 text-sm">Price</p>
                <p className="text-2xl font-bold text-green-400">$12.99</p>
              </div>
              <button
                className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;