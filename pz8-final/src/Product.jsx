import React from 'react';

function Product(props) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px', width: '200px' }}>
      <h2>{props.name}</h2>
      <p>Ціна: {props.price} грн</p>
<p> Наявість {props.avaliably} </p>
      <button style={{ cursor: 'pointer' }}>Купити</button>
    </div>
  );
}

export default Product; 