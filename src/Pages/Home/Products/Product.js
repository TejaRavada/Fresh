import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from 'react-icons/md';
import Rating from '@mui/material/Rating';
import { FaRegHeart } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";

import { MyContext } from '../../../App';

import '../../Home/Products/Product.css';


const Product = (props) => {

    const [productData, setProductData] = useState();
    const [isAdded, setIsadded] = useState(false);

    const context = useContext(MyContext);

    useEffect(() => {
        setProductData(props.item);
    }, [props.item])

    const setProductCat = () => {
        sessionStorage.setItem('parentCat', productData.parentCatName);
        sessionStorage.setItem('subCatName', productData.subCatName);
    }

    const addToCart = (item) => {
        context.addToCart(item);
        setIsadded(true);
    }

    return (
        <>
            <div className="productThumb" onClick={setProductCat}>
                {
                    props.tag !== null && props.tag !== undefined && (
                        <span className={`badge ${props.tag}`}>{props.tag}</span>
                    )
                }

                {
                    productData !== undefined &&
                    <>
                        <Link to={`/product/${productData.id}`}> {/* Placeholder 'to' prop */}
                            <div className="imgWrapper ">
                                <div className="p-4 wrapper">
                                    <img src={productData.catImg + '?im=Resize=(420,420)'} alt="productImg" className="w-100" />
                                </div>
                                <div className="overlay">
                                    <ul className="list list-inline mb-0">
                                        <li className="list-inline-item mb-0">
                                            <Link to="#" className="cursor" tooltip="Add to Whishlist">
                                                <FaRegHeart />
                                            </Link>
                                        </li>
                                        <li className="list-inline-item mb-0">
                                            <Link to="#" className="cursor" tooltip="Compare">
                                                <MdCompareArrows />
                                            </Link>
                                        </li>
                                        <li className="list-inline-item mb-0">
                                            <Link to="#" className="cursor" tooltip="View">
                                                <MdOutlineRemoveRedEye />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Link>

                        <div className="info">
                            <span className="d-block catName">{productData.brand}</span>
                            <h4 className="title">
                                <Link to="/product-details">
                                    {productData.productName.substr(0, 30) + '...'}
                                </Link>
                            </h4>
                            <Rating name="half-rating-read" value={parseFloat(productData.rating)} precision={0.5} readOnly />
                            <span className="brand d-block text-g">
                                By <Link to="/about" className="text-g">{productData.brand}</Link>
                            </span>

                            <div className="mt-3">
                                <div className="d-flex ">
                                    <div className="price text-g font-weight-bold">Rs {productData.price}</div>
                                    <div className="oldPrice ms-auto">Rs {productData.oldPrice}</div>
                                </div>

                            </div>

                            <Button className="ms-auto transition w-100 mt-3" onClick={() => addToCart(productData)}>
                                <MdOutlineShoppingCart />
                                {
                                    isAdded === true ? 'Added' : 'Add'
                                }
                            </Button>
                        </div>
                    </>
                }

            </div>
        </>
    );
};

export default Product;
