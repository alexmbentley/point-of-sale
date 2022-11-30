import React, { useEffect } from 'react';

const BasketTotals = ({ items, setBasketTotal, basketTotal }) => {
  let sum = 0;

  for (let i = 0; i < items.length; i++) {
    sum += items[i].price * items[i].quantity;
  }

  useEffect(() => {
    setBasketTotal(sum);
  }, [sum]);

  return (
    <nav className="center">
      <h4>£{sum.toFixed(2)}</h4>
    </nav>
  );
};

export default BasketTotals;
