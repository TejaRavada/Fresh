import React, { useEffect, useState } from 'react'


import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Quantity = (props) => {

    const [inputValue, setinputValue] = useState(1);
    const [cartItems, setcartItems] = useState([]);

    useEffect(() => {
        setcartItems(props.cartItems);
        //setinputValue(props.item.quantity)
    }, [cartItems, props.cartItems])

    const updateCart=(items)=>{
        props.updateCart(items)
    }

  return (
    <>
        <div className="addCartSection pt-4 pb-4 d-flex align-items-center">

            <div className="counterSec me-3">
                {/* <input type="number" value={inputValue} /> */}
                <input type="number" value={inputValue} onChange={(e) => setinputValue(parseInt(e.target.value) || 1)} />
                <span className="arrow plus" 
                    onClick={
                        () => {
                            setinputValue(inputValue + 1);
                            const _cart = props.cartItems?.map((cartItem, key) => {
                                return key === parseInt(props.index) ? { ...cartItem, quantity: inputValue+1 } : {...cartItem}

                            });
                                
                            updateCart(_cart);
                            setcartItems(_cart);
                        }
                    } 
                ><IoIosArrowUp style={{ fontSize: 20}}/></span>
                
                <span className="arrow minus" 
                    onClick={
                        () => {
                            if (inputValue !== 1) {
                                setinputValue(inputValue - 1)
                            }
                            
                            const _cart = props.cartItems?.map((cartItem, key) => {
                                return key === parseInt(props.index) ? { ...cartItem, quantity: cartItem.quantity !== 1 ? inputValue-1 : cartItem.quantity } : {...cartItem}
                            });

                            updateCart(_cart);
                            setcartItems(_cart);

                        }
                    }
                ><IoIosArrowDown style={{ fontSize: 20}} /></span>
            </div>

        </div>
    </>
  )
}

export default Quantity