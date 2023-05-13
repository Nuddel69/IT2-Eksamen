import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./components/product";
import Catalog from "./components/catalog";

import Home from "./pages";
import About from "./pages/about";
import Contact from "./pages/contact";
import Dakimakura from "./pages/dakimakura";
import Featured from "./pages/featured";
import OrderHistory from "./pages/orders";
import Cart from "./pages/cart";
import Kigurumi from "./pages/kigurumi";
import Figurines from "./pages/figurines";
import Doujinshi from "./pages/doujinshi";

import Navbar from "./components/navbar.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" exact element={<Home />} />
          <Route exact path="/home" exact element={<Home />} />
          <Route exact path="/about" exact element={<About />} />
          <Route exact path="/contact" exact element={<Contact />} />
          <Route exact path="/featured" exact element={<Featured />} />
          <Route exact path="/orders" exact element={<OrderHistory />} />
          <Route exact path="/cart" exact element={<Cart />} />
          <Route exact path="/product" exact element={<Catalog />} />
          <Route
            exact
            path="/categories/dakimakura"
            exact
            element={<Dakimakura />}
          />
          <Route
            exact
            path="/categories/figurines"
            exact
            element={<Figurines />}
          />
          <Route
            exact
            path="/categories/doujinshi"
            exact
            element={<Doujinshi />}
          />
          <Route
            exact
            path="/categories/kigurumi"
            exact
            element={<Kigurumi />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
