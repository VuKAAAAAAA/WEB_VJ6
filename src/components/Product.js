import React from 'react';

export default function Product(props) {
  const { product, onAdd } = props;
  return (
    <div>
      <img className="small" src={product.image} alt={product.name} />
      <h3>
      {product.name}
      </h3>
      <div>HRK{product.price}</div>
      <div>
        <button onClick={() => onAdd(product)}>Dodaj u košaricu</button>
      </div>
    </div>
  );
}
