import React, { useEffect, useState } from 'react';
import SliderBanner from '../Home/Slider/Slider';
import CatSlider from '../../Components/catSlider/CatSlider';
import Banner from "../../Components/banners/Banner";

import '../Home/Home.css'

import HomeProducts from './HomeProductsOne/HomeProducts';
import HomeProductsBan from './HomeProductsBan/HomeProductsBan';
import TopProductSet from './TopProductSect/TopProductSet';
import BannerNews from './Banner_Bottom/Banner_Bot';
import axios from 'axios';

const Home = () => {

  const [productData, setProductData] = useState([]);

  useEffect(()=>{
    getData('https://freshapi.onrender.com/productData');
  },[]);

  const getData=async(url)=>{
    try{

      await axios.get(url).then((response)=>{
        setProductData(response.data);
      })

    }catch(error){
      console.log(error.message)
    }
  }

  return (
    productData.length !==0 &&
    <>
      
      <SliderBanner />
      <CatSlider data={productData}/>
      <Banner />
      
      <HomeProducts data={productData}/>
      <HomeProductsBan data={productData}/>
      <TopProductSet data={productData}/>
      <BannerNews data={productData}/>
    </>
  )
}

export default Home;