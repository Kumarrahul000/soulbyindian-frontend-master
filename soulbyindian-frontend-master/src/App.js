import { useEffect, useState } from 'react';
import './App.css';
import HomePage from './containers/HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductListPage from './containers/ProductListPage';

import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, updateCart, updateWishlist } from './actions';
import ProductDetailsPage from './containers/ProductDetailsPage';
import CartPage from './containers/CartPage';
import WishlistPage from './containers/WishlistPage';

import ForgotPasswordPage from './containers/ForgotPasswordPage';

import OrderPage from './containers/OrderPage';
import OrderDetailsPage from './containers/OrderDetailsPage';
// import Footer from './components/Footer';
import PortFolio from './components/Portfolio';
import CheckOutPage from './containers/CheckOutPage';
import { ThankYou } from './components/Thankyou';
import Men from './components/men/Men';
import Products from './components/Products';
import axios from 'axios';


const baseUrl = 'http://localhost:7000'

function App() {
const dispatch = useDispatch();
const auth = useSelector(state => state.auth);


  useEffect(() => {

    if(!auth.authenticate){
      dispatch(isUserLoggedIn())
    }

  }, [auth.authenticate])


  useEffect(() => {
    
    console.log("App.js - updateCart");
    dispatch(updateCart());
  }, [auth.authenticate]);

  useEffect(() => {
    
    console.log("App.js - updateCart");
    dispatch(updateWishlist());
  }, [auth.authenticate]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);


  const getProducts =async() => {
    const res = await axios.get(`${baseUrl}/products`);
    console.log(res);
    if(res.status === 200) {
      setProducts(res.data);
    }
  };
  const buyNow = (productId) => {
   alert(productId);
  }

  return (
    <div className="App">
      <Products products={products} buyNow={buyNow} />

<Router>
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/portfolio" exact component={PortFolio} />
    <Route path="/thank"  component={ThankYou} />
    <Route path="/cart"  component={CartPage} />
    <Route path="/wishlist"  component={WishlistPage} />
    <Route path="/forgotpassword" component={ForgotPasswordPage} />

    <Route path="/checkout"  component={CheckOutPage} />
    <Route path="/account/orders" component={OrderPage} />
    <Route path="/order_details/:orderId" component={OrderDetailsPage} />
    <Route path="/:productSlug/:productId/p" component={ProductDetailsPage} />
    <Route path="/:slug" component={ProductListPage} />

    <Route path="/men" exact component={Men} />
 
   
  </Switch>
</Router>


    </div>
  );
}

export default App;
