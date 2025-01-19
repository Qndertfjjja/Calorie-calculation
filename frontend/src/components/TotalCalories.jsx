import React, { useEffect, useState } from 'react';

const TotalCalories = ({ selectedItems }) => {
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    const calculateCalories = () => {
      const total = selectedItems.reduce((sum, item) => sum + item.calories, 0);
      setTotalCalories(total);
    };
    calculateCalories();
  }, [selectedItems]);

  return (
    <div>
      <h3>Total Calories: {totalCalories} kcal</h3>
    </div>
  );
};

export default TotalCalories;
