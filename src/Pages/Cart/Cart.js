import React, { useEffect, useState, useContext } from 'react'
import { Button } from '@mui/material';
import Rating from '@mui/material/Rating';
import '../Cart/Cart.css'

import { Link } from 'react-router-dom'
import { AiOutlineDelete } from "react-icons/ai";
import { MdKeyboardBackspace } from "react-icons/md";

import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Quantity from '../../Components/QuantityBox/Quantity';


const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const context = useContext(MyContext);
    const history = useNavigate();

    useEffect(() => {
        if(context.isLogin==="true"){
            getCartData("https://freshapi.onrender.com/cartItems");
        }else{
            history('/');
        }
    }, [context.isLogin, history])
    

    const getCartData = async (url) => {
        try {
            await axios.get(url).then((response) => {
                setCartItems(response.data);
            })

        } catch (error) {
            console.log(error.message);
        }
    }


    const deleteItem = async (id) => {
        const response = await axios.delete(`https://freshapi.onrender.com/cartItems/${id}`);
        if (response !== null) {
            getCartData("https://freshapi.onrender.com/cartItems");
            context.removeItemsFromCart(id);
        }
    }

    const emptyCart = async () => {
        try {
            await Promise.all(cartItems.map(item => axios.delete(`https://freshapi.onrender.com/cartItems/${parseInt(item.id)}`)));
            getCartData("https://freshapi.onrender.com/cartItems");
            context.emptyCart();
        } catch (error) {
            console.error('Error emptying cart:', error.message);
        }
    }

    const updateCart = (items) => {
        setCartItems(items)
    }

  return (
    <>
        <div className="breadcrumbWrapper mb-4">
            <div className="container-fluid">
                <ul className="breadcrumb breadcrumb2 mb-0">
                    <li>
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li>
                        Shop
                    </li>
                    <li>
                        Cart
                    </li>
                </ul>
            </div>
        </div>

        <section className="cartSection">
            <div className="container-fluid">
                <div className="row">

                    <div className='col-md-8'>
                        <div className="d-flex align-items-center w-100">
                            <div className="left">
                                <h1 className="hd mb-0">Your Cart</h1>
                                <p> There are <span className="text-g">3</span> products in your cart</p>
                            </div>
                            <span className="ms-auto clearCart cursor"onClick={()=>emptyCart()}><AiOutlineDelete /> Clear Cart</span>
                        </div>
                    

                        <div className="cartWrapper">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Unit Price</th>
                                            <th>Quantity</th>
                                            <th>Subtotal</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                

                                    <tbody>
                                        {
                                            cartItems.length!== 0 &&
                                            cartItems.map((item, index)=>{
                                                return(
                                                    <tr>
                                                        <td width={"40%"}>
                                                            <div className="d-flex align-items-center">
                                                                    <div className='img'>
                                                                        <Link to={`/product/${item.id}`}>
                                                                            <img src={item.catImg + '?im=Resize=(100,100)'} className='w-100' alt='CartProduct' />
                                                                        </Link>
                                                                    </div>

                                                                    <div className='info ps-4'>
                                                                        <Link to={`/product/${item.id}`}><h4>{item.productName}</h4></Link>
                                                                        <Rating name="half-rating-read"
                                                                            value={parseFloat(item.rating)} precision={0.5} readOnly />
                                                                            <span className='text-light'>({parseFloat(item.rating)})</span>
                                                                    </div>
                                                            </div>
                                                        </td>

                                                        <td width={"20%"}><span>Rs:  {parseInt(item.price.split(",").join(""))}</span></td>

                                                        <td>
                                                            <Quantity item={item} cartItems={cartItems} index={index} updateCart={updateCart}/>
                                                        </td>

                                                        <td>
                                                            <span className='text-g'>
                                                                Rs. {parseInt(item.price.split(",").join("")) * parseInt(item.quantity)}
                                                            </span>
                                                        </td>

                                                        <td align='center'>
                                                            <span className='cursor' onClick={() => deleteItem(item.id)}>
                                                                <AiOutlineDelete />
                                                            </span>
                                                        </td>

                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <br />

                            <div className='d-flex align-items-center  mb-5'>
                                <Link to="/">
                                    <Button className='btn-g'>
                                        <MdKeyboardBackspace /> Continue Shopping
                                    </Button>
                                </Link>
                            </div>
                    </div>
                
                    <div className='col-md-4 ps-5 cartRightBox'>
                        <div className="card p-4 ">

                            <div className="d-flex align-items-center mb-4">
                                <h5 className="mb-0 text-light">Subtotal</h5>
                                <h3 className="ms-auto mb-0 font-weight-blod">
                                    <span className="text-g">
                                        {
                                            cartItems.length !== 0 &&
                                            cartItems.map(item => parseInt(item.price.split(",").join("")) * item.quantity).reduce((total, value) => total + value, 0)
                                        }
                                    </span>
                                </h3>
                            </div>

                            <div className="d-flex align-items-center mb-4">
                                <h5 className="mb-0 text-light">Shippig</h5>
                                <h3 className="ms-auto mb-0 font-weight-blod">
                                        <span>Free</span>
                                </h3>
                            </div>

                            <div className="d-flex align-items-center mb-4">
                                <h5 className="mb-0 text-light">Estimate for</h5>
                                <h3 className="ms-auto mb-0 font-weight-blod">
                                        United Kingdom
                                </h3>
                            </div>

                            <div className="d-flex align-items-center mb-4">
                                <h5 className="mb-0 text-light">Total</h5>
                                <h3 className="ms-auto mb-0 font-weight-blod">
                                        <span className="text-g">
                                            {
                                                cartItems.length !== 0 &&
                                                cartItems.map(item => parseInt(item.price.split(",").join("")) * item.quantity).reduce((total, value) => total + value, 0)
                                            }
                                        </span>
                                    </h3>
                            </div>
                            <br />

                            <Button className='btn-g btn-lg'>Proceed To CheckOut</Button>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Cart