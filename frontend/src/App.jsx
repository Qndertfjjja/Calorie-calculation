import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';

import FoodList from './components/FoodList';
import FoodSelection from './components/FoodSelection';
import About from './components/About'; // Import the About page
import DishForm from './components/DishForm';
import Cart from './components/Cart';


function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar is included here */}
      <Routes>
        
        <Route path="/" element={<FoodList />} />
       
        <Route path="/food-selection" element={<FoodSelection />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/post" element={<DishForm />} /> 
        <Route path="/cart" element={<Cart />} /> 
        
      </Routes>
    </Router>
  );
}

export default App;
