import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, Search, Plus, Minus } from "lucide-react";
import axios from 'axios';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("Search for food...");
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [qrCodeData, setQrCodeData] = useState(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const typeText = () => {
      const typingTimeout = setTimeout(() => {
        setCurrentPlaceholder("Search for food...");
      }, 2000);
      return () => clearTimeout(typingTimeout);
    };
    typeText();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 2) {
      fetchSearchResults(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(`https://hackathon-backend-srsa.onrender.com/api/foods/search?name=${query}`);
      const data = await response.json();
      if (response.ok) {
        setSearchResults(data);
      } else {
        console.error("Failed to fetch data:", data);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (item) => {
    const existingItem = selectedItems.find((i) => i.name === item.name);

    if (existingItem) {
      const updatedItems = selectedItems.map((i) =>
        i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
      );
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }

    setSearchQuery(item.name);
    setSelectedItem(item);
    setQuantity(1);
    setShowSuggestions(false);
  };

  const handleIncrement = (item) => {
    setQuantity(prev => prev + 1);
    const updatedItems = selectedItems.map((i) =>
      i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
    );
    setSelectedItems(updatedItems);
  };

  const handleDecrement = (item) => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      const updatedItems = selectedItems.map((i) =>
        i.name === item.name && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : i
      );
      setSelectedItems(updatedItems);
    }
  };

  const toggleMenu = () => {
    setIsMobile((prev) => !prev);
  };

  const calculateTotalCalories = () => {
    return selectedItems.reduce((total, item) => total + item.calories * item.quantity, 0);
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

  const handleCloseCard = () => {
    setSelectedItem(null);
    setQuantity(1);
  };

  return (
    <>
      <nav className="bg-black/40 backdrop-blur-sm border-b border-green-500/20 px-4 py-3 sticky top-0 z-50 transition-all duration-300 hover:bg-black/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src="Logo.png"
              alt="Company Logo"
              className="h-10 w-[200px] object-contain rounded-lg hover:opacity-80 transition-opacity duration-300"
            />
          </div>

          <div className="hidden md:flex relative mx-4 flex-1 max-w-xs" ref={searchRef}>
            <form onSubmit={handleSearch} className="w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder={currentPlaceholder}
                className="w-full bg-black/30 text-gray-300 placeholder-gray-500 border border-gray-600 rounded-lg py-1.5 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all duration-300 hover:bg-black/40"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors duration-300"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
            {showSuggestions && searchQuery && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto animate-fadeIn">
                {searchResults.length > 0 ? (
                  searchResults
                    .filter((item) => item.name !== selectedItem?.name)
                    .map((item, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 text-gray-300 hover:bg-green-500/10 cursor-pointer transition-colors duration-200 animate-slideIn"
                        style={{ animationDelay: `${index * 50}ms` }}
                        onClick={() => handleSuggestionClick(item)}
                      >
                        {item.name}
                      </div>
                    ))
                ) : (
                  <div className="px-4 py-2 text-gray-400 animate-fadeIn">No items found</div>
                )}
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-300 hover:text-green-400 transition-colors duration-300 ${isActive ? "text-green-400" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-gray-300 hover:text-green-400 transition-colors duration-300 ${isActive ? "text-green-400" : ""}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `text-gray-300 hover:text-green-400 flex items-center space-x-1 transition-colors duration-300 ${isActive ? "text-green-400" : ""}`
              }
            >
              <span>Cart</span>
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-gray-300 hover:text-green-400 flex items-center space-x-1 transition-colors duration-300 ${isActive ? "text-green-400" : ""}`
              }
            >
              <span>Login</span>
            </NavLink>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-300 hover:text-green-400 transition-colors duration-300"
          >
            {isMobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMobile && (
          <div className="absolute top-16 left-0 right-0 bg-black/90 p-4 animate-slideDown">
            <div className="flex flex-col space-y-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={currentPlaceholder}
                  className="w-full bg-black/30 text-gray-300 placeholder-gray-500 border border-gray-600 rounded-lg py-1.5 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              <NavLink
                to="/FoodList"
                onClick={() => setIsMobile(false)}
                className={({ isActive }) =>
                  `text-gray-300 hover:text-green-400 transition-colors duration-300 ${isActive ? "text-green-400" : ""}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setIsMobile(false)}
                className={({ isActive }) =>
                  `text-gray-300 hover:text-green-400 transition-colors duration-300 ${isActive ? "text-green-400" : ""}`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/cart"
                onClick={() => setIsMobile(false)}
                className={({ isActive }) =>
                  `text-gray-300 hover:text-green-400 flex items-center space-x-1 transition-colors duration-300 ${isActive ? "text-green-400" : ""}`
                }
              >
                <span>Cart</span>
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setIsMobile(false)}
                className={({ isActive }) =>
                  `text-gray-300 hover:text-green-400 flex items-center space-x-1 transition-colors duration-300 ${isActive ? "text-green-400" : ""}`
                }
              >
                <span>Login</span>
              </NavLink>
            </div>
          </div>
        )}
      </nav>

      <div className="pb-24">
        {selectedItem && (
          <div className="relative mt-6 p-4 bg-black/60 rounded-lg shadow-xl text-white max-w-sm mx-auto">
            <button
              onClick={handleCloseCard}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold">{selectedItem.name}</h3>
            <p className="text-sm text-gray-400">{selectedItem.category}</p>
            <p className="text-lg mt-2">{selectedItem.calories} kcal</p>

            <div className="mt-4 flex items-center justify-center space-x-4 bg-black/30 rounded-lg p-2">
              <button
                onClick={() => handleDecrement(selectedItem)}
                className="text-green-400 hover:text-green-300 transition-colors duration-300"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-gray-300 font-medium">{quantity}</span>
              <button
                onClick={() => handleIncrement(selectedItem)}
                className="text-green-400 hover:text-green-300 transition-colors duration-300"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

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
    </>
  );
};

export default Navbar;