import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Plus, Minus, Heart, Share2, Info } from 'lucide-react';

const FoodSelection = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://hackathon-backend-srsa.onrender.com/api/foods/');
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  const toggleSelection = (item) => {
    const isSelected = selectedItems.some((selected) => selected._id === item._id);

    if (isSelected) {
      setSelectedItems(selectedItems.filter((selected) => selected._id !== item._id));
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (itemId, change) => {
    setSelectedItems(
      selectedItems.map((item) =>
        item._id === itemId
          ? { ...item, quantity: Math.max(item.quantity + change, 1) }
          : item
      )
    );
  };

  const calculateTotalCalories = () => {
    return selectedItems.reduce((acc, item) => acc + item.calories * item.quantity, 0);
  };

  const generateQRCode = async () => {
    try {
      
      const totalCalories = calculateTotalCalories();
      const qrData = {
        totalCalories,
        itemCount: selectedItems.length,
        foodItems: selectedItems.map(item => ({
          foodName: item.name,  // Send food name
          quantity: item.quantity,  // Send quantity
        })),
      };
  
      const response = await axios.post('https://hackathon-backend-srsa.onrender.com/api/scan/generate', { qrData });
      setQrCodeData(response.data.qrData); 
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = foodItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(foodItems.length / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-black/90 to-green-900/30 py-8 px-4 sm:px-6 lg:px-8 mt-[-100px]"
      style={{
        backgroundImage: "url('https://i.pinimg.com/736x/a4/65/d1/a465d1482810c23d32a0bd732632f36b.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-400 text-center mb-8 font-serif">
          Explore Our Food
        </h1>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
           
          </div>
        ) : (
          <>
            {/* Food Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentItems.map((item) => (
                <div
                  key={item._id}
                  className="relative group bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="relative aspect-w-16 aspect-h-9">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-green-400 mb-2">{item.name}</h3>
                    <p className="text-gray-300 text-sm mb-4">{item.calories} Calories</p>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => navigateToDetails(item)}
                        className="text-gray-300 hover:text-green-400 transition-colors duration-300"
                      >
                        <Info className="h-5 w-5" />
                      </button>

                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => toggleSelection(item)}
                          className="text-gray-300 hover:text-green-400 transition-colors duration-300"
                        >
                          <ShoppingCart className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    {selectedItems.some((selected) => selected._id === item._id) && (
                      <div className="mt-4 flex items-center justify-center space-x-4 bg-black/30 rounded-lg p-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(item._id, -1);
                          }}
                          className="text-green-400 hover:text-green-300 transition-colors duration-300"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-gray-300 font-medium">
                          {selectedItems.find((selected) => selected._id === item._id).quantity}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(item._id, 1);
                          }}
                          className="text-green-400 hover:text-green-300 transition-colors duration-300"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {currentItems.length === 0 && !isLoading && (
              <div className="text-center text-gray-300 mt-8">
                No food items found.
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-4 flex justify-center space-x-4 pb-20">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageClick(index + 1)}
                    className={`px-3 py-1 text-sm font-semibold rounded-md border border-white ${
                      currentPage === index + 1
                        ? 'bg-green-400 text-white'
                        : 'bg-transparent text-gray-300 hover:bg-green-300 hover:text-white'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {/* Selected Items Summary */}
        {selectedItems.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-black/95 border-t border-green-500/20 p-4 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <ShoppingCart className="h-6 w-6 text-green-400" />
                <div>
                  <p className="text-gray-300">
                    {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
                  </p>
                  <p className="text-green-400 font-semibold">
                    Total Calories: {calculateTotalCalories()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={generateQRCode}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
                >
                  Generate QR Code
                </button>
                <button
                  onClick={() =>
                    navigate('/cart', {
                      state: { selectedItems, totalCalories: calculateTotalCalories() },
                    })
                  }
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
                >
                  View Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* QR Code Modal */}
        {qrCodeData && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your QR Code</h2>
              <img src={qrCodeData} alt="QR Code" className="w-full h-auto" />

              <button
                onClick={() => setQrCodeData(null)}
                className="mt-4 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodSelection;