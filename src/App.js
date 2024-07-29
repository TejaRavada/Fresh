import React, { useEffect, useState, createContext } from 'react';
import './responsive.css';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../node_modules/react-bootstrap-v5/lib/dist/react-bootstrap';

import Header from './Components/Header/Header';
import Home from '../src/Pages/Home/Home'
import About from '../src/Pages/About/About'
import Listing from './Pages/Listing/Listing';
import Footer from './Components/Footer/Footer';
import NotFound from './Pages/NotFound/NotFound';
import DetailsPage from './Pages/Details/Details';
import axios from 'axios';

import Cart from './Pages/Cart/Cart';
import SignUp from './Pages/SignUp/SignUp';
import SignIn from './Pages/SignIn/SignIn';
import loading from '../src/assets/images/loading.gif';
import Contact from './Pages/Contact/Contact';

const MyContext = createContext();

function App() {
  const [productData, setProductData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [isOpenNavigation, setIsOpenNavigation] = useState(false);

  const [isLogin, setIsLogin] = useState();
  const [isOpenFilters, setIsOpenFilters] = useState(false);

  //---------------------------------------ProductData---------------------------------------

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
    setCartItems([])
  }


  const signIn = () => {
    const is_Login = localStorage.getItem('isLogin');
    setIsLogin(is_Login);
  }


  const signOut = () => {
    localStorage.removeItem('isLogin');
    setIsLogin(false);
    
  }

  const openFilters=()=>{
    setIsOpenFilters(!isOpenFilters)
  }

  const value = {
    cartItems,
    isLogin,
    windowWidth,
    isOpenFilters,
    addToCart,
    removeItemsFromCart,
    emptyCart,
    signOut,
    signIn,
    openFilters,
    isOpenNavigation,
    setIsOpenNavigation

  }

  return (
    productData.length !== 0 &&
    <BrowserRouter>
      <MyContext.Provider value={value}>
        {
          isLoading===true && <div className="loader"> <img src={loading} alt='loading'/> </div>
        }
        <Header data={productData}/>
        <Routes>
          <Route exact={true} path="/" element={<Home data={productData} />} />
          <Route exact={true} path="/about" element={<About />} />
          <Route exact={true} path="/contact" element={<Contact />} />
          <Route exact={true} path="/cat/:id" element={<Listing data={productData} single={true} />} />
          <Route exact={true} path="/cat/:id/:id" element={<Listing data={productData} single={false} />} />
          <Route exact={true} path="/product/:id" element={<DetailsPage data={productData} />} />
          <Route exact={true} path="/cart" element={<Cart />} />
          <Route exact={true} path="/signIn" element={<SignIn />} />
          <Route exact={true} path="/signUp" element={<SignUp />} />
          <Route exact={true} path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </MyContext.Provider>
    </BrowserRouter>

  );
}

export default App;

export { MyContext };
