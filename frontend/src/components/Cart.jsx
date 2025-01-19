import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X, ArrowLeft, QrCode } from "lucide-react";
import axios from "axios";

const Cart = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState(state?.selectedItems || []);
  const [qrCodeData, setQrCodeData] = useState(null);

  const calculateTotalCalories = () => {
    return cartItems.reduce((acc, item) => acc + item.calories * item.quantity, 0);
  };

  const calculateTotalQuantities = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handleGenerateQR = async () => {
    try {
      const totalCalories = calculateTotalCalories();
      const qrData = {
        totalCalories,
        itemCount: cartItems.length,  
        foodItems: cartItems.map(item => ({  
          foodName: item.name,
          quantity: item.quantity,
        })),
      };
      console.log('Button Clicked');
      const response = await axios.post("https://hackathon-backend-srsa.onrender.com/api/scan/generate", { qrData });
      setQrCodeData(response.data.qrData);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const handleQuantityChange = (itemId, change) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === itemId
          ? { ...item, quantity: Math.max(item.quantity + change, 1) }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item._id !== itemId));
  };

  return (
    <div
      className="fixed inset-0 z-50"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/a4/65/d1/a465d1482810c23d32a0bd732632f36b.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="h-full max-w-2xl mx-auto flex flex-col bg-black/60 backdrop-blur-sm">
        {/* Header */}
        <div className="p-4 border-b border-green-500/20">
          <div className="flex items-center justify-between">
            <button
              onClick={handleClose}
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-semibold text-green-400">Your Cart</h2>
            <div className="w-6" />
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-400 mt-12">
              <p className="text-xl">Your cart is empty</p>
              <p className="mt-2">Add some items to get started</p>
            </div>
          ) : (
            <div className="space-y-4 px-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-black/40 rounded-xl p-4 border border-green-500/20"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-green-400 font-semibold">{item.name}</h3>
                      <p className="text-gray-400">
                        {item.calories * item.quantity} calories
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 mt-2">
                        <button
                          onClick={() => handleQuantityChange(item._id, -1)}
                          className="text-green-400 hover:text-green-300 transition-colors"
                        >
                          -
                        </button>
                        <span className="text-gray-300">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item._id, 1)}
                          className="text-green-400 hover:text-green-300 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {cartItems.length > 0 && (
          <div className="border-t border-green-500/20 p-4 bg-black/60">
            <div className="space-y-4">
              <div className="flex justify-between text-gray-300">
                <span>Total Items:</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Total Quantities:</span>
                <span>{calculateTotalQuantities()}</span>
              </div>
              <div className="flex justify-between text-green-400 text-xl font-semibold">
                <span>Total Calories:</span>
                <span>{calculateTotalCalories()}</span>
              </div>
              <button
                onClick={handleGenerateQR}
                className="w-full py-3 bg-green-500 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
              >
                <QrCode className="h-5 w-5" />
                Generate QR Code
                
              </button>
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

export default Cart;
