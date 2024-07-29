import React, { useContext, useEffect, useState } from 'react'
import '../nav/Navba.css'
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { IoGrid } from "react-icons/io5";
import { IoIosHeadset } from "react-icons/io";
import megamenuimg from '../../../assets/images/megamenuImg.jpg'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { Button } from '@mui/material';
import proIcon1 from '../../../assets/images/Icon/proIcon1.png';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import { MyContext } from '../../../App';

const Nav = (props) => {

    const [navData, setNavData] = useState([]);
    const [isOpenNav, setIsOpenNav] = useState(false);
    const [openDropdownMenu, setopenDropdownMenu] = useState(false);

    const [showDropdown, setShowDropdown] = useState(false);
    const [openDropdownMenuIndex, setopenDropdownMenuIndex] = useState(null);
    const [openMegaMenu, setOpenMegaMenu] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const context = useContext(MyContext);

    useEffect(() => {

        setNavData(props.data);

    }, [props.data]);

    useEffect(() => {
        setIsOpenNav(props.openNav)
    }, [props.openNav])

    const closeNav = () => {
        props.closeNav();
    }

    const openDropdownFun = (index => {
        setopenDropdownMenu(!openDropdownMenu)
        setopenDropdownMenuIndex(index)
    })

    return (
        <>
            {
                isOpenNav === true && <div className='navbarOverlay' onClick={props.closeNav}></div>
            }
            <div className={`nav d-flex align-items-center ${isOpenNav === true && 'click'}`}>
                <div className="container-fluid side_menu">
                    <div className="row position-relative navbarLine">


                    <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
                        <div className="part1 d-flex align-items-center  position-static browse " >
                            <Button className='bg-g text-white catTab' onClick={() => setShowDropdown(!showDropdown)}>
                                <IoGrid /> &nbsp; Browse All Categories &nbsp; <IoIosArrowDown className='arrow' />
                            </Button>

                            {
                                showDropdown && navData.length !== true &&
                                <div className=" menuNew">
                                    <ul>
                                        {
                                            navData.map((item, index) => (
                                                item.items.length !== 0 &&
                                                item.items.map((item_, index_) => (
                                                    <li key={index_}>
                                                        <span className="img">
                                                            <img src={proIcon1} alt="productImg1" width={30} />
                                                        </span>
                                                        <Link to={`/cat/${item.cat_name.toLowerCase()}/${item_.cat_name.replace(/\s/g, '-').toLowerCase()}`} >
                                                            {item_.cat_name}
                                                        </Link>
                                                    </li>
                                                ))
                                            ))
                                        }
                                    </ul>
                                </div>
                            }

                        </div>
                    </ClickAwayListener>

                        <div className="part2">
                            <nav className={`navItems ${isOpenNav === true ? 'open' : ''}`}>
                                <ul className="list list-inline listNav1 mb-0">

                                    <li className="list-inline-item listNav">
                                        <Link to="/about" className='dealHe' onClick={props.closeNav}><LocalFireDepartmentIcon className='fire' />Deals </Link>
                                    
                                    </li>

                                    <li className="list-inline-item listNav">
                                        <Link to="/" className='homeHe' onClick={props.closeNav} >Home
                                        </Link>
                                    </li>

                                    {
                                        navData.length !== 0 &&
                                        navData.map((item, index) => {
                                            return (

                                                <li className="list-inline-item listNav" key={index}>
                                                    <div onClick={() => openDropdownFun(index)}>
                                                        <Link to={`${windowWidth > 768 ? `/cat/${item.cat_name.toLowerCase()}` : '#'}`}
                                                            onClick={() => sessionStorage.setItem('cat', item.cat_name.toLowerCase())}>
                                                            {item.cat_name}
                                                            <IoIosArrowDown className={` ${openDropdownMenu === true && openDropdownMenuIndex === index && 'rotateIcon'}`
                                                            } />
                                                        </Link>
                                                    </div>

                                                    {
                                                        item.items.length !== 0 &&
                                                        <div className={`dropdown_menu ${openDropdownMenu === true && openDropdownMenuIndex === index && 'open'}`}>
                                                            <ul>
                                                                {
                                                                    item.items.map((item_, index_) => {
                                                                        return (
                                                                            <li key={index_}>
                                                                                <div onClick={props.closeNav}>
                                                                                    <Link to={`/cat/${item.cat_name.toLowerCase()}/${item_.cat_name.replace(/\s/g, '-').toLowerCase()}`} onClick={() => sessionStorage.setItem('cat', item.cat_name.toLowerCase())}>{item_.cat_name}</Link>
                                                                                </div>
                                                                            </li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                    }

                                                </li>
                                            )
                                        })
                                    }

                                    <li className="list-inline-item listNav position-static">
                                        <Link to="#" onClick={() => setOpenMegaMenu(!openMegaMenu)} >
                                            Mega menu
                                            <IoIosArrowDown className={` ${openMegaMenu === true && 'rotateIcon'}`
                                            } />
                                        </Link>

                                        <div className={`dropdown_menu megamenu w-100 ${openMegaMenu === true && 'open'}`}>
                                            <div className="row">
                                                {
                                                    props.data.length !== 0 &&
                                                    props.data.map((item, index) => {
                                                        return (
                                                            <div key={index} className="megamenu_Part">
                                                                <div onClick={props.closeNav}>
                                                                    <Link to={`/cat/${item.cat_name.toLowerCase()}`}>
                                                                        <h4 className='text-g text-capitalize' onClick={closeNav}>
                                                                            {item.cat_name}
                                                                        </h4>
                                                                    </Link>
                                                                </div>
                                                                {
                                                                    item.items.length !== 0 &&
                                                                    <ul className=" megamenu_drop ">
                                                                        {
                                                                            item.items.map((item_, index_) => {
                                                                                return (
                                                                                    <li key={index_} className='megaitems'>
                                                                                        <div onClick={props.closeNav}>
                                                                                            <Link to={`/cat/${item.cat_name.toLowerCase()}/${item_.cat_name.replace(/\s/g, '-').toLowerCase()}`}>
                                                                                                {item_.cat_name}
                                                                                            </Link>
                                                                                        </div>
                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                }

                                                <div className=" megaImg">
                                                    <img src={megamenuimg} alt="" className=' megaImgOnText' />
                                                    <div className="megaImgText">
                                                        <p>HOT DEALS</p>
                                                        <h4>Don't miss Trending</h4>
                                                        <h5>Save to 50%</h5>
                                                        <Link to="/" className='imgButt'>Shop now</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="list-inline-item listNav">
                                        <Link to="/about">Blog <IoIosArrowDown className='arrow' onClick={closeNav}/></Link>

                                        <div className="dropdown_menu">
                                            <ul>
                                                <li><Link to="/about">About Us</Link></li>
                                                <li><Link to="/about">Contact</Link></li>
                                                <li><Link to="/about">My Account</Link></li>
                                                <li><Link to="/about">Login</Link></li>
                                                <li><Link to="/about">Register</Link></li>
                                                <li><Link to="/about">Forgot password</Link></li>
                                                <li><Link to="/about">Reset password</Link></li>
                                                <li><Link to="/about">Purchase Guide</Link></li>
                                                <li><Link to="/about">privacy Policy</Link></li>
                                                <li><Link to="/about">Terms of Service</Link></li>
                                                <li><Link to="/about">404 page</Link></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="list-inline-item listNav">
                                        <Link to="/about">About</Link>
                                    </li>

                                    <li className="list-inline-item listNav">
                                        <Link to="/contact" className='contactNav'>Contact</Link>
                                        {/* <Link to="/contact" className='contactNavIc'><RecentActorsIcon/></Link> */}
                                    </li>
                                </ul>

                                {
                                    windowWidth < 768 &&
                                    <>
                                        {
                                            context.isLogin !== "true" &&

                                            <div className="ps-3 pe-3">
                                                <br />
                                                <Link to={'/signIn'}>
                                                    <Button className="btn btn-g btn-lg w-100" onClick={closeNav}>Sign In</Button>
                                                </Link>
                                            </div>
                                        }

                                    </>
                                }

                            </nav>
                        </div>

                        <div className="part3 d-flex align-items-center">
                            <div className="phNo d-flex align-items-center">
                                <span><IoIosHeadset className='headseti' /></span>
                                <div className="info info1 ms-2">
                                    <h3 className="text-g mb-0">1900 - 888</h3>
                                    <p className="mb-0">24/7 Support Center</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav

