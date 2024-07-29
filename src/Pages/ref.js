// src/context/ProductContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase'; // Make sure the path to your Firebase config is correct

export const ProductContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [isOpenNavigation, setIsOpenNavigation] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isOpenFilters, setIsOpenFilters] = useState(false);


  //---------------------------------------ProductData---------------------------------------

  
  // 
  useEffect(() => {
    getData('https://freshapi.onrender.com/productData');
    getCartData('https://freshapi.onrender.com/cartItems');

    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);
  }, []);

  const getData = async (url) => {
    try {

      await axios.get(url).then((response) => {
        setProductData(response.data);
          setTimeout(()=>{
            setIsLoading(false);
          },2000)
      })

    } catch (error) {
      console.log(error.message)
    }
  }

  const getCartData = async (url) => {
    try {

      await axios.get(url).then((response) => {
        setCartItems(response.data);
      })

    } catch (error) {
      console.log(error.message)
    }
  }

  //---------------------------------------addToCart---------------------------------------//

  const addToCart = async (item) => {
    item.quantity = 1;

    try {
      await axios.post("https://freshapi.onrender.com/cartItems", item).then((response) => {
        if (response !== undefined) {
          setCartItems([...cartItems, { ...item, quantity: 1 }])
        }
      })
    } catch (error) {
      console.log(error)
    }

  }

  const removeItemsFromCart = (id) => {
    const arr = cartItems.filter((obj) => obj.id !== id);
    setCartItems(arr)
  }

  const emptyCart = () => {
    setCartItems([]);
  };
  
  // Auth SignIn signUp

  const signUpWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setIsLogin(true);
            localStorage.setItem('isLogin', 'true');
            return userCredential;
        })
        .catch(error => {
            console.error("SignUp Error:", error);
            throw error;  // Propagate the error
        });
};


const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            setIsLogin(true);
            localStorage.setItem('isLogin', 'true');
        })
        .catch(error => {
            console.error("SignIn Error:", error.message);
            throw error;  // Ensure errors are handled or thrown for caller to handle
        });
};

const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
        .then(() => {
            setIsLogin(true);
            localStorage.setItem('isLogin', 'true');
        })
        .catch(error => {
            console.error("Google SignIn Error:", error.message);
            throw error;  // Ensure errors are handled or thrown for caller to handle
        });
};


  // Sign In and Sign Out
  const signIn = () => {
    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);
  }

  const signOut = () => {
    localStorage.removeItem('isLogin');
    setIsLogin(false);
    
  }

  // Open Filters 
  const openFilters = () => {
    setIsOpenFilters(!isOpenFilters);
  };

  // Header 
  useEffect(() => {
    // Fetch data
    axios.get('https://freshapi.onrender.com/productData').then(response => {
      setProductData(response.data);
      setIsLoading(false);
    }).catch(error => console.error("Error fetching data:", error));
    
    // Fetch cart items
    axios.get('https://freshapi.onrender.com/cartItems').then(response => {
      setCartItems(response.data);
    }).catch(error => console.error("Error fetching cart data:", error));

    const storedLoginStatus = localStorage.getItem('isLogin');
    setIsLogin(!!storedLoginStatus);
  }, []);

  // Functionality related to user authentication
  // const signInWithEmail = (email, password) => {
  //   return signInWithEmailAndPassword(auth, email, password).then(() => {
  //     setIsLogin(true);
  //     localStorage.setItem('isLogin', 'true');
  //   });
  // };

  const toggleNavigation = () => {
    setIsOpenNavigation(prev => !prev);
  };

  const value = {
    productData,
    cartItems,
    isLoading,
    isLogin,
    windowWidth,
    isOpenFilters,
    isOpenNavigation,
    toggleNavigation,
    addToCart,
    removeItemsFromCart,
    emptyCart,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    setIsOpenNavigation,
    signOut,
    signIn,
    openFilters
    
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
