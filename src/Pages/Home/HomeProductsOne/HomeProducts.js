import React, { useEffect, useRef, useState } from 'react';
import Product from '../Products/Product';
import { Link } from 'react-router-dom';
import '../HomeProductsOne/HomeProducts.css';

const HomeProducts = (props) => {
  const [prodData] = useState(props.data);
  const [catArray, setCatArray] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeTabData, setActiveTabData] = useState([]);

  const [isLoadingProducts, setIsLoadingProducts] = useState([]);

  const productRow=useRef();

  // Populate category array
  useEffect(() => {
    const catArr = prodData.flatMap((item) => item.items.map((item_) => item_.cat_name));
    const uniqueCatArr = Array.from(new Set(catArr)); // Remove duplicates
    setCatArray(uniqueCatArr);
    setActiveTab(uniqueCatArr[0]);
  }, [prodData]);

  // Filter products based on activeTab
  useEffect(() => {
    const filteredData = prodData.flatMap((item) =>
      item.items.flatMap((item_) =>
        item_.cat_name === activeTab ? item_.products.map((product) => ({ ...product, parentCatName: item.cat_name, subCatName: item_.cat_name })) : []
      )
    );
    setActiveTabData(filteredData);
    setTimeout(()=>{
      setIsLoadingProducts(false);
    }, [1000]);

  }, [activeTab, prodData]);

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     setIsLoadingProducts(false);
  //   }, [1000]);
  // }, [isLoadingProducts])

  return (
    <section className="homeProducts homeProductRow1">
      <div className="container-fluid">
        <div className="d-flex align-items-center homeProductsWrap">
          <h2 className="hd mb-3 mt-3 res-full">Popular Products</h2>
          <ul className="list list-inline ms-auto filterTab mb-0 res-full">
            {catArray.map((cat, index) => (
              <li key={index} className="list list-inline-item">
                <Link to="#" 
                  className={`cursor text-capitalize ${activeTabIndex === index ? 'act' : ''}`}
                  onClick={() => {
                    setActiveTab(cat);
                    setActiveTabIndex(index);
                    productRow.current.scrollLeft=0;
                    setIsLoadingProducts(true);
                  }}
                >
                  {cat.substr(0, 10) + '...'}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={`productRow ${isLoadingProducts===true && 'loading'}` }ref={productRow}>
          {activeTabData.map((item, index) => (
            <div className="item" key={index}>
              <Product tag={item.type} item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeProducts;
