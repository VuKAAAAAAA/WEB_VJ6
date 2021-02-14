import React from 'react';

export default function Basket(props) {
  const { cartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.25;
  const shippingPrice = itemsPrice > 500 ? 0 : 5;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  return (
    <aside className="block col-1">
      <h2>Proizvodi u košarici</h2>
      <div>
        {cartItems.length === 0 && <div>Košarica je prazna</div>}
        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <div className="col-2">{item.name}</div>
            <div className="col-2">
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>{' '}
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
            </div>

            <div className="col-2 text-right">
              {item.qty} x HRK{item.price.toFixed(2)}
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">Cijena proizvoda</div>
              <div className="col-1 text-right">HRK{itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Cijena dostave</div>
              <div className="col-1 text-right">
                HRK{shippingPrice.toFixed(2)}
              </div>
            </div>
            <div className="row">
              <div className="col-2">Iznos poreza</div>
              <div className="col-1 text-right">HRK{taxPrice.toFixed(2)}</div>
            </div>

            <div className="row">
              <div className="col-2">
                <strong>Ukupno</strong>
              </div>
              <div className="col-1 text-right">
                <strong>HRK{totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <div className="row">
              <button onClick={() => alert('Implement Checkout!')}>
                Potvrdi
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
