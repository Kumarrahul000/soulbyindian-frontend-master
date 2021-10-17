import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import WishlistItem from "./WishlistItem/index";
import { addToWishlist, getWishlistItems, removeWishlistItem } from "../../actions";

import "./style.css";
import { FaRupeeSign } from "react-icons/fa";

/**
 * @author
 * @function WishlistPage
 **/

/*
Before Login
Add product to cart
save in localStorage
when try to checkout ask for credentials and 
if logged in then add products to users cart database from localStorage
*/

const WishlistPage = (props) => {
  const wishlist = useSelector((state) => state.wishlist);
  const auth = useSelector((state) => state.auth);
  // const wishlistItems = wishlist.wishlistItems;
  const [wishlistItems, setwishlistItems] = useState(wishlist.wishlistItems);
  const dispatch = useDispatch();

  useEffect(() => {
    setwishlistItems(wishlist.wishlistItems);
  }, [wishlist.wishlistItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getWishlistItems());
    }
  }, [auth.authenticate]);

  const onQuantityIncrement = (_id) => {
    //console.log({_id, qty});
    const { name, price, img } = wishlistItems[_id];
    dispatch(addToWishlist({ _id, name, price, img }, 1));
  };

  const onQuantityDecrement = (_id) => {
    const { name, price, img } = wishlistItems[_id];
    dispatch(addToWishlist({ _id, name, price, img }, -1));
  };

  const onRemovewishlistItem = (_id) => {
    dispatch(removeWishlistItem({ productId: _id }));
  };

  if (props.onlywishlistItems) {
    return (
      <>
        {Object.keys(wishlistItems).map((key, index) => (
          <wishlistItem
            key={index}
            wishlistItem={wishlistItems[key]}
            onQuantityInc={onQuantityIncrement}
            onQuantityDec={onQuantityDecrement}
          />
        ))}
      </>
    );
  }

  return (
    <Layout>
      <div className="wishlistContainer">
        <Card
          headerLeft={`My wishlist`}
          // headerRight={<div>Deliver to</div>}
         
        >
          {Object.keys(wishlistItems).map((key, index) => (
            <WishlistItem
              key={index}
              wishlistItem={wishlistItems[key]}
              onQuantityInc={onQuantityIncrement}
              onQuantityDec={onQuantityDecrement}
              onRemovewishlistItem={onRemovewishlistItem}
            />
          ))}

          <div className="WishlistPriceMobile">
            <div className="WishlistPriceMobileInner">
            <h4> <FaRupeeSign />
            {Object.keys(wishlist.wishlistItems).reduce((totalPrice, key) => {
            const { price, qty } = wishlist.wishlistItems[key];
            return totalPrice + price * qty;
          }, 0)}
            </h4>
        
            <a href="#pricemobiledetails">View Details</a>
            </div>
          </div>
          <div id="pricemobiledetails"></div>
        </Card>
        
      </div>
    </Layout>
  );
};

export default WishlistPage;