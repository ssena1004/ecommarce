import React, { useState } from 'react';
import productsData from './data/products-list.json';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const App = () => {
  const groupedProducts = {};
  productsData.forEach((product) => {
    if (!groupedProducts[product.category]) {
      groupedProducts[product.category] = product;
    }
  });
  const uniqueProducts = Object.values(groupedProducts);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const CategoryEvent = (category) => {
    setSelectedCategory(category);
  };

  const SearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const AddToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  };

  const [isCartOpen, setIsCartOpen] = useState(false);

  const CartEvent = () => {
    setIsCartOpen(true);
  };

  const CloseCart = () => {
    setIsCartOpen(false);
  };

  const RemoveFromCart = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  return (
    <div>
      <header>
        <div class="header-content">
          <div class="logo">
            <span>PinSoft | <span style={{ fontWeight: '600' }}>Ecommarce</span></span>
          </div>
          <div class="search">
            <input type="text" placeholder="Search..." value={searchKeyword} onChange={SearchChange} />
          </div>
          <div class="basket"  onClick={CartEvent}>
            <div class="piece"><span className="cart-count">{cartItems.length}</span></div>
            <div class="cart">
            <i>
          <FontAwesomeIcon icon={faBasketShopping} />
          </i>

            </div>

          </div>

        </div>
      </header>
      <div class="container">
        <div class="sidebar">
          <div class="sidebar-header">
            <span>Categories</span>
          </div>
          <div class="sidebar-catagoris">
            <ul>
              {uniqueProducts.map((product) => (
                <li key={product.id} onClick={() => CategoryEvent(product.category)}>
                  {product.category}
                </li>
              ))}
            </ul>
          </div>

        </div>
        <div class="content">
          <div class="products">
            {productsData.map((product) => {
              if ((!selectedCategory || product.category === selectedCategory) &&
                product.title.toLowerCase().includes(searchKeyword.toLowerCase())
              ) {
                return (
                  <div className="product" key={product.id}>
                    <div className="product-image img-hover-zoom">
                      <img src={product.image} alt={product.title} />
                    </div>
                    <div className="product-title">{product.title}</div>
                    <div className="product-price">{product.price} $</div>
                    <button className="add-to-cart" onClick={() => AddToCart(product)}>
                      Add to cart
                    </button>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <div className={`cart-dropdown ${isCartOpen ? 'open' : ''}`}>
        <div className="close-cart" onClick={CloseCart}>
          X
        </div>
        <h3>Shopping Bag</h3>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <span>{item.title}</span>
              <span className='price'>{item.price} $</span>
              <div className="remove-from-cart" onClick={() => RemoveFromCart(item.id)}>
                X
              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
}

export default App;
