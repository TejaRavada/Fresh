import React, { useEffect, useRef, useState, useContext } from 'react';
import '../Header/Header.css';
import logo from "../../assets/images/Logo2.png";
import { CiSearch } from "react-icons/ci";
import Select from '../selectDrop/Select';
import Navba from '../Header/nav/Navba';
import axios from 'axios';
// import { IoLocationOutline } from "react-icons/io5";
import IconCompare from '../../assets/images/icon-compare.svg';
import IconHeart from '../../assets/images/icon-heart.svg';
import IconCart from '../../assets/images/icon-cart.svg';
import IconUser from '../../assets/images/icon-user.svg';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
// import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import Button from '@mui/material/Button';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { Link, useNavigate } from 'react-router-dom';

import { MyContext } from '../../App';

const Header = (props) => {

    const [isOpenDropDown, setisOpenDropDown] = useState(false);
    const [isOpenAccDropDown, setIsOpenAccDropDown] = useState(false);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isopenSearch, setOpenSearch] = useState(false);
    const [isOpenNav, setIsOpenNav] = useState(false);

    const headerRef = useRef();
    const searchInput = useRef()

    const context = useContext(MyContext);
    const history = useNavigate();

    useEffect(() => {
    }, [context.cartItems])

    const [Categories] = useState([
        // 'All Categories',
        'Milks and Dairies',
        'Wines & Drinks',
        'Clothing & Beauty',
        'Fresh Seafood',
        'Pet Foods & toy',
        'Fast food',
        'Baking material',
        'Vegetables',
        'Fresh Fruit',
        'Bread and Juice',
    ]);

    //Location -----------------
    

    const [countryList] = useState([]);

    useEffect(() => {
        const getCountry = async (url) => {
            try {
                await axios.get(url).then((response) => {
                    if (response !== null) {
                        // console.log(res.data.data);
                        response.data.data.map((item, index) => {
                            countryList.push(item.country);
                        })
    
                        // console.log(res.data.data.country)
                    }
                })
            } catch (error) {
                console.log(error.message);
            }
        };
    
        getCountry('https://countriesnow.space/api/v0.1/countries/');
    }, [countryList]);


    const signOut = () => {
        context.signOut();
        history('/');
    }

    const openSearch = () => {
        setOpenSearch(true);
        searchInput.current.focus();
    }

    const closeSearch = () => {
        setOpenSearch(false);
        searchInput.current.blur();
        searchInput.current.value = '';
    }

    const openNav = () => {
        setIsOpenNav(true);
        context.setIsOpenNavigation(true)
    }

    const closeNav = () => {
        setIsOpenNav(false);
        setIsOpenAccDropDown(false)
        context.setIsOpenNavigation(false)
    }

    return (
        <>
            <div className="headerWrapper" ref={headerRef}>

                <header >
                    <div className="container-fluid">
                        <div className="row HeaderRow">

                            <div className="logo partHead1 partH1 d-flex align-items-center">
                                <Link to="/"><img src={logo} alt="logo" /></Link>
                                {
                                    context.windowWidth < 768 &&
                                    <div className="ms-auto d-flex align-items-center">

                                        <div className="navbarToggle me-2" onClick={openSearch}><SearchIcon /></div>

                                        <ul className='list list-inline mb-0 headerTabs ps-0 me-4'>
                                            <li className='list-inline-item icon'>
                                                <Link to={'/cart'}>
                                                    <img src={IconCart} alt="IconCart" />
                                                    <span className='pro-count blue'>{context.cartItems.length}</span>
                                                </Link>
                                            </li>
                                        </ul>

                                        <div className="navbarToggle me-3" onClick={openNav}><MenuIcon /></div>
                                        {
                                            context.isLogin === 'true' &&
                                            <div className="myAccDrop me-3 " onClick={() => setIsOpenAccDropDown(!isOpenAccDropDown)}><PersonOutlineOutlinedIcon /></div>
                                        }
                                    </div>
                                }
                            </div>

                            {/* headerSearch  start here */}
                            <div className="partHead2 partH2 ">
                                <div className={` headerSearch d-flex align-items-center ${isopenSearch === true ? 'open' : ''}`}>

                                    {
                                        windowWidth < 768 &&
                                        <div className='countryWrapper mb-0 w-100'>
                                            <Select
                                                data={countryList}
                                                placeholder={'Your Location'}
                                                icon={<LocationOnOutlinedIcon style={{ opacity: '0.5' }} />}
                                            />
                                        </div>
                                    }

                                    {
                                        windowWidth < 768 && <div class='closeSearch' onClick={closeSearch}> <ArrowBackIosIcon /></div>
                                    }

                                    <Select data={Categories} placeholder={'All categories'} icon={false} />

                                    <div className="search">
                                        <input type="text" placeholder='Search for items ...' ref={searchInput} />
                                        <CiSearch className='searchIcon cursor' />
                                    </div>
                                </div>
                            </div>

                            <ClickAwayListener onClickAway={() => setisOpenDropDown(false)}>
                                <div className='partHead3 partH3 res-hide '>
                                    <div className='headerList'>

                                        <ul className='list list-inline mb-0 headerTabs'>

                                            <li className='countryWrapper'>
                                                <Select
                                                    data={countryList}
                                                    placeholder={'Your Location'}
                                                    icon={<LocationOnOutlinedIcon style={{ opacity: '0.5' }} />}
                                                />
                                            </li>

                                            <li className='list-inline-item icon'>

                                                <Link to={'/'}>
                                                    <img src={IconCompare} alt="IconCompare" />
                                                    <span className='pro-count blue'>3</span>
                                                </Link>
                                                <Link to={'/'} className='iconCom'>
                                                    <span className='lable'>Compare</span>
                                                </Link>

                                            </li>
                                            <li className='list-inline-item icon'>
                                                <Link to={'/'}>
                                                    <img src={IconHeart} alt="IconHeart" />
                                                    <span className='pro-count blue'>3</span>
                                                </Link>
                                                <Link to={'/'} className='iconCom'>
                                                    <span className='lable'>Wishlist</span>
                                                </Link>
                                            </li>
                                            <li className='list-inline-item icon'>
                                                <Link to={'/cart'}>
                                                    <img src={IconCart} alt="IconCart" />
                                                    <span className='pro-count blue'>{context.cartItems.length}</span>
                                                </Link>
                                                <Link to={'/'} className='iconCom'>
                                                    <span className='lable'>Cart</span>
                                                </Link>
                                            </li>

                                            {
                                                context.isLogin === "true" ?

                                                    <li className='list-inline-item '>

                                                        <span onClick={() => setisOpenDropDown(!isOpenDropDown)} className='icon'>
                                                            <Link to="#">
                                                                <img src={IconUser} alt="IconUser" />
                                                                {/* <span className='pro-count blue'></span> */}
                                                            </Link>

                                                            <Link to="#" className='iconCom'>
                                                                <span className='lable ms-1'>Account</span>
                                                            </Link>
                                                        </span>

                                                        {
                                                            isOpenDropDown !== false &&
                                                            <ul className='dropdownMenu'>
                                                                <li><Button className='align-items-center'><Person2OutlinedIcon /> My Account</Button></li>
                                                                <li><Button><LocationOnOutlinedIcon /> Order Tracking</Button></li>
                                                                <li><Button><FavoriteBorderOutlinedIcon /> My Wishlist</Button></li>
                                                                <li><Button><SettingsOutlinedIcon /> Setting</Button></li>
                                                                <li><Button onClick={signOut}><LogoutOutlinedIcon /> Sign out</Button></li>
                                                            </ul>
                                                        }
                                                    </li>

                                                    :

                                                    <li className='list-inline-item'>
                                                        <Link to={'/signIn'}>
                                                            <Button className="btn btn-g">Sign In</Button>
                                                        </Link>
                                                    </li>
                                            }

                                        </ul>

                                    </div>

                                </div>
                            </ClickAwayListener>

                        </div>
                    </div>
                </header>

                <Navba data={props.data} openNav={isOpenNav} closeNav={closeNav} />

            </div>

            <div className="afterHeader">

            </div>

            {
                isOpenAccDropDown !== false &&
                <>
                    <div className="navbarOverlay" onClick={closeNav}></div>
                    <ul className='dropdownMenu dropdownMenuAcc' onClick={closeNav}>
                        <li><Button className='align-items-center'><Link to=""><Person2OutlinedIcon /> My Account</Link></Button></li>
                        <li><Button className='align-items-center'><Link to=""><img src={IconCompare} alt="IconCompare" /> Compare</Link></Button></li>
                        <li><Button className='align-items-center'><Link to=""><img src={IconCart} alt="IconCart" /> Cart</Link></Button></li>
                        <li><Button><Link to=""><LocationOnOutlinedIcon /> Order Tracking</Link></Button></li>
                        <li><Button><Link to=""><FavoriteBorderOutlinedIcon /> My Wishlist</Link></Button></li>
                        <li><Button><Link to=""><SettingsOutlinedIcon /> Setting</Link></Button></li>
                        <li><Button onClick={signOut}><Link to=""><LogoutOutlinedIcon /> Sign out</Link></Button></li>
                    </ul>
                </>
            }
        </>
    )
}
export default Header