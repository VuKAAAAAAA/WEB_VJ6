import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket';
import data from './Data';
import { useState } from 'react';
import React, {useState1} from "react";
import {render} from "react-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";
import {Router} from "@reach/router";
import ThemeConext from "./ThemeContext";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";

function App() {
  const { products } = data;
  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  return (
    <div className="App">
      <Header countCartItems={cartItems.length}></Header>
      <div className="row">
        <Main products={products} onAdd={onAdd}></Main>
        <Basket
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
        ></Basket>
      </div>
    </div>
  );
}

export default App;

const App2 = () => {
  const theme = useState1("darkblue");
  return(
      <div>
          <ThemeConext.Provider value={theme}>
              <Router>            
                  <SearchParams path="/" />
                  <Details path="/:genre/details/:id"/>
                  <Login path="/login" />
                  <Register path="/register" />
                  <Logout path="/logout" />
              </Router>
          </ThemeConext.Provider>
      {}
      </div>
  );
}



render(<App2/>, document.getElementById("root"));
