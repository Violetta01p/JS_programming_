import React from 'react';
import Product from './Product'; 
import { products } from './products';

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Мій магазин</h1>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {products.map(item => (
          <Product 
            key={item.id} 
            name={item.name} 
            price={item.price} 
            avaliably={item.avaliably}
          />
        ))}
      </div>
    </div>
  );
}

export default App;