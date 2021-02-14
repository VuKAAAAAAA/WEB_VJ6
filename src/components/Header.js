import React from 'react';

export default function Header(props) {
  return (
    <header className="block row center">
      <div>
        <a href="#/">
          <h1>Online trgovina</h1>
        </a>
      </div>
      <div>
        <a href="#/cart">
          Košarica{' '}
          {props.countCartItems ? (
            <button className="badge">{props.countCartItems}</button>
          ) : (
            ''
          )}
        </a>{' '}
        <a href="#/signin"> Log In</a>
      </div>
    </header>
  );
}
