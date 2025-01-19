import { useState } from "react";
import { Camera, UtensilsCrossed } from "lucide-react";
import axios from "axios";

function DishForm() {
  const [dishName, setDishName] = useState("");
  const [calories, setCalories] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Log the data being sent
    const dishData = {
      name: dishName,
      calories: parseInt(calories),
      category: category,
      imageUrl: imageUrl.trim()  // Remove default null conversion
    };

    console.log('Submitting data:', dishData);

    try {
      const response = await axios.post("https://hackathon-backend-srsa.onrender.com/api/foods/add", dishData);
      
      console.log('Server response:', response.data);
      setSuccess(true);
      
      // Reset form
      setDishName("");
      setCalories("");
      setImageUrl("");
      setCategory("");
    } catch (err) {
      console.error('Error details:', err.response || err);
      setError(err.response?.data?.message || "An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  const validateImageUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    if (url && !validateImageUrl(url)) {
      setError("Please enter a valid image URL");
    } else {
      setError(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-black/40 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-green-500/20">
        <div className="text-center space-y-2">
          <div className="inline-block p-3 bg-green-500/20 rounded-full">
            <UtensilsCrossed className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Dish Calorie Form</h1>
          <p className="text-green-400">Track your dish calories</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
            Dish added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="dishName" className="sr-only">
                Dish Name
              </label>
              <input
                id="dishName"
                type="text"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                placeholder="Enter dish name"
                required
                className="appearance-none relative block w-full px-3 py-3 bg-black/30 border border-gray-600 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
              />
            </div>

            <div>
              <label htmlFor="calories" className="sr-only">
                Calories
              </label>
              <input
                id="calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="Enter calories"
                required
                min="0"
                className="appearance-none relative block w-full px-3 py-3 bg-black/30 border border-gray-600 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
              />
            </div>

            <div>
              <label htmlFor="category" className="sr-only">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="appearance-none relative block w-full px-3 py-3 bg-black/30 border border-gray-600 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
              >
                <option value="">Select Category</option>
                <option value="Beverages">Beverages</option>
                <option value="South Indian">South Indian</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Maharashtrian">Maharashtrian</option>
              </select>
            </div>

            <div className="relative">
              <label htmlFor="imageUrl" className="sr-only">
                Image URL
              </label>
              <input
                id="imageUrl"
                type="url"
                value={imageUrl}
                onChange={handleImageUrlChange}
                placeholder="Enter image URL"
                className="appearance-none relative block w-full px-10 py-3 bg-black/30 border border-gray-600 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
              />
              <Camera className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 shadow-lg shadow-green-600/30"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Dish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DishForm;