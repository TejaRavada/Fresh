import React, { useState } from 'react';
import "../Footer/Footer.css";

import Icon1 from '../../assets/images/Icon/Icon1.png'
import Icon2 from '../../assets/images/Icon/Icon2.png'
import Icon3 from '../../assets/images/Icon/Icon3.png'
import Icon4 from '../../assets/images/Icon/Icon4.png'
import Icon5 from '../../assets/images/Icon/Icon5.png'
import logo from '../../assets/images/Logo2.png'

import { GrLocation } from "react-icons/gr";
import { IoIosHeadset } from "react-icons/io";
import { BsSendFill } from "react-icons/bs";
import { IoTimerOutline } from "react-icons/io5";

import { Link } from 'react-router-dom';

import paymentImage from '../../assets/images/payment-method.png';
import googlePlay from '../../assets/images/google-play.jpg';
import appStore from '../../assets/images/app-store.jpg';

import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { TbPhoneCall } from "react-icons/tb";

const Footer = () => {

  const [icon] = useState([
    {
      id: 1,
      image: Icon1,
      description: 'Best prices & offers',
      price: 'Order $50 or more'
    },
    {
      id: 2,
      image: Icon2,
      description: 'Best prices & offers',
      price: 'Order $90 or more'
    },
    {
      id: 3,
      image: Icon3,
      description: 'Best prices & offers',
      price: 'Order $250 or more'
    },
    {
      id: 4,
      image: Icon4,
      description: 'Best prices & offers',
      price: 'Order $60 or more'
    },
    {
      id: 5,
      image: Icon5,
      description: 'Best prices & offers',
      price: 'Cake & Milk'
    }

  ]);

  return (
    <div className="footerWrapper">

      <div className="footerBoxes">
        <div className="container-fluid footer_Main">
          <div className="row footerFul">
            {
              icon.map(icon => (
                <div key={icon.id} className="footerIcon">
                  <div className="box d-flex align-items-center w-100">
                    <img src={icon.image} alt='icons' width={75} />
                    <div className="info_Text">
                      <h4>{icon.description}</h4>
                      <p>{icon.price}</p>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <footer>

        <div className="container-fluid ">

          <div className="footerHead">
            <div className=" partFoot">
              <Link to='/'><img src={logo} alt='logo' width={250} /></Link>
              <br />
              <div className="partFootFi">
                <p>Asesome grocery store website template</p>
                <p><GrLocation /><strong> Address:</strong> 5171 W Campbell Ave undefined Kent, Utah 53127 United States</p>
                <p><IoIosHeadset /><strong> Call Us:</strong> (+91) - 540-025-124553</p>
                <p><BsSendFill /><strong> Email:</strong>  sale@Fresh.com</p>
                <p><IoTimerOutline /><strong> Hours:</strong> 10:00 - 18:00, Mon - Sat</p>
              </div>
            </div>

            <div className="  partFoot">
              <h3 className='partFootHe'>Company</h3>

              <ul className="footer-list mb-sm-5 mb-md-0">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/about">Delivery Information</Link></li>
                <li><Link to="/about">Privacy Policy</Link></li>
                <li><Link to="/about">Terms &amp; Conditions</Link></li>
                <li><Link to="/about">Contact Us</Link></li>
                <li><Link to="/about">Support Center</Link></li>
                <li><Link to="/about">Careers</Link></li>
              </ul>
            </div>

            <div className=" partFoot">
              <h3 className='partFootHe'>Account</h3>

              <ul className="footer-list mb-sm-5 mb-md-0">
                <li><Link to="/signIn">Sign In</Link></li>
                <li><Link to="/cart">View Cart</Link></li>
                <li><Link to="/about">My Wishlist</Link></li>
                <li><Link to="/about">Track My Order</Link></li>
                <li><Link to="/about">Help Ticket</Link></li>
                <li><Link to="/about">Shipping Details</Link></li>
                <li><Link to="/about">Conpare Products</Link></li>
              </ul>
            </div>

            <div className="partFoot">
              <h3 className='partFootHe'>Corporate</h3>

              <ul className="footer-list mb-sm-5 mb-md-0">
                <li><Link to="/about">Become a Vendor</Link></li>
                <li><Link to="/about">Affiliate Program</Link></li>
                <li><Link to="/about">Farm Business</Link></li>
                <li><Link to="/about">Farm Careers</Link></li>
                <li><Link to="/about">Our Suppliers</Link></li>
                <li><Link to="/about">Accessibility</Link></li>
                <li><Link to="/about">Promotions</Link></li>
              </ul>
            </div>
            <div className="partFoot">
              <h3 className='partFootHe'>Popular</h3>

              <ul className="footer-list mb-sm-5 mb-md-0">
                <li><Link to="/about">Milk &amp; Flavoured Milk</Link></li>
                <li><Link to="/about">Butter and Margarine</Link></li>
                <li><Link to="/about">Eggs Subsitutes</Link></li>
                <li><Link to="/about">Marmalades</Link></li>
                <li><Link to="/about">Sour Cream and Dips</Link></li>
                <li><Link to="/about">Tea &amp; Kombucha</Link></li>
                <li><Link to="/about">Cheese</Link></li>
              </ul>
            </div>

            <div className="partFoot">
              <h3 className='partFootHe'>Install App</h3>

              <p>From App Store or Google Play</p>

              <div className="d-flex">
                <Link to="/about"><img src={appStore} alt='appstore' width={100} /></Link>
                <Link to="/about"><img src={googlePlay} alt='googleplay' className='mx-2' width={100} /></Link>
              </div>
              <br />
              <p>Secured Payment Gateways</p>
              <img src={paymentImage} alt='paymentimage' width={200} />
            </div>
          </div>

          <hr />

          <div className="lastStrip">

            <div className=" footDown footDown1">
              <p>© 2022, <span className="text-success">Nest </span> - HTML Ecommerce Template All rights reserved</p>
            </div>

            <div className="footDown phNo d-flex align-items-center">
              <span><TbPhoneCall className='headseti' /></span>
              <div className="info ms-3">
                <h3 className="text-g mb-0">1900 - 666</h3>
                <p className="mb-0">Working 8:00 - 22:00</p>
              </div>
            </div>

            <div className="footDown phNo d-flex align-items-center">
              <span><TbPhoneCall className='headseti' /></span>
              <div className="info ms-3">
                <h3 className="text-g mb-0">1900 - 888</h3>
                <p className="mb-0">24/7 Support Center</p>
              </div>
            </div>

            <div className=" footDown footDown2">
              <p>© 2022, <span className="text-success">Nest </span> - HTML Ecommerce Template All rights reserved</p>
            </div>

            <div className="footDown part3">
              <div className="d-flex align-items-center">
                <h5>Follow Us</h5>
                <ul className="list-inline socialIcons">
                  <li className="list-inline-item"><Link to="/about"><FaFacebookF /></Link></li>
                  <li className="list-inline-item"><Link to="/about"><FaTwitter /></Link></li>
                  <li className="list-inline-item"><Link to="/about"><FaInstagramSquare /></Link></li>
                  <li className="list-inline-item"><Link to="/about"><FaYoutube /></Link></li>
                </ul>
              </div>
              <p style={{ paddingTop: 15 }}>Up to 15% discount on your first subscribe</p>
            </div>

          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer