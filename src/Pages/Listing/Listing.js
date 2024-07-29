import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../Listing/Listing.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Product from '../Home/Products/Product'
import { IoGridOutline } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import { Button } from '@mui/material';

import { MyContext } from '../../App';

const Listing = (props) => {
    const [isOpenDropDown, setisOpenDropDown] = useState(false);
    const [isOpenDropDown2, setisOpenDropDown2] = useState(false);
    const [data, setData] = useState([]);
    const { id } = useParams();

    const context = useContext(MyContext);

    var itemsData = [];

    useEffect(() => {
        let itemsData = [];

        if (props.data.length !== 0) {
            props.data.forEach((item) => {
                // page == single cat
                if (props.single === true) {
                    if (item.cat_name.toLowerCase() === id.toLowerCase()) {
                        if (item.items.length !== 0) {
                            item.items.forEach((item_) => {
                                if (item_.products.length !== 0) {
                                    item_.products.forEach((product) => {
                                        itemsData.push(product);
                                    });
                                }
                            });
                        }
                    }
                }
                // page == double cat
                else {
                    if (item.items.length !== 0) {
                        item.items.forEach((item_) => {
                            if (item_.cat_name.split(' ').join('-').toLowerCase() === id.toLowerCase()) {
                                if (item_.products.length !== 0) {
                                    item_.products.forEach((product) => {
                                        itemsData.push(product);
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }

        const list2 = itemsData.filter((item, index) => itemsData.indexOf(item) === index);
        setData(list2);

        // Return cleanup function if necessary
        return () => {
            // Any cleanup code can go here
        };
    }, [id, props.data, props.single]);


    //-------------------------------------------------------------------------------------------

    const filterByBrand = (keyword) => {

        props.data.length !== 0 &&
            props.data.forEach((item, index) => {

                //page == single cat
                if (props.single === true) {

                    item.items.length !== 0 &&
                        item.items.forEach((item_) => {
                            item_.products.forEach((item__, index__) => {
                                if (item__.brand.toLowerCase() === keyword.toLowerCase()) {
                                    //console.log(item__)
                                    itemsData.push({ ...item__, parentCatName: item.cat_name, subCatName: item_.cat_name })
                                }


                            })

                        })


                }
                //page == double cat
                else {
                    item.items.length !== 0 &&
                        item.items.forEach((item_, index_) => {
                            // console.log(item_.cat_name.replace(/[^A-Za-z]/g,"-").toLowerCase())
                            if (item_.cat_name.split(' ').join('-').toLowerCase() === id.split(' ').join('-').toLowerCase()) {
                                item_.products.forEach((item__, index__) => {
                                    if (item__.brand.toLowerCase() === keyword.toLowerCase()) {
                                        itemsData.push({ ...item__, parentCatName: item.cat_name, subCatName: item_.cat_name })
                                    }

                                })

                            }
                        })
                }

            })

        const list2 = itemsData.filter((item, index) => itemsData.indexOf(item) === index);
        //console.log(itemsData)

        setData(list2);

        // return () => {
        //     // Any cleanup code can go here
        // };

        // window.scrollTo(0,0);
    }
    //-------------------------------------------------------------------------------------------
    const filterByPrice = (minValue, maxValue) => {

        props.data.length !== 0 &&
            props.data.forEach((item, index) => {

                //page == single cat
                if (props.single === true) {
                    if (id === item.cat_name.toLowerCase()) {
                        item.items.length !== 0 &&
                            item.items.forEach((item_) => {
                                item_.products.length !== 0 &&
                                    item_.products.forEach((product) => {

                                        let price = parseInt(product.price.toString().replace(/,/g, ""))
                                        if (minValue <= price && maxValue >= price) {
                                            itemsData.push({ ...product, parentCatName: item.cat_name, subCatName: item_.cat_name })
                                        }

                                    })
                            })
                    }
                }

                else {
                    item.items.length !== 0 &&
                        item.items.forEach((item_, index_) => {
                            if (item_.cat_name.split(' ').join('-').toLowerCase() === id.split(' ').join('-').toLowerCase()) {
                                item_.products.forEach((product) => {
                                    let price = parseInt(product.price.toString().replace(/,/g, ""))
                                    if (minValue <= price && maxValue >= price) {
                                        itemsData.push({ ...product, parentCatName: item.cat_name, subCatName: item_.cat_name })
                                    }
                                })
                            }
                        })
                }
            })

        const list2 = itemsData.filter((item, index) => itemsData.indexOf(item) === index);
        setData(list2);

        // window.scrollTo(0,0);

        // return()=>{

        // };
    }
    //-------------------------------------------------------------------------------------------
    const filterByRating = (keyword) => {

        props.data.length !== 0 &&
            props.data.forEach((item, index) => {

                //page == single cat
                if (props.single === true) {

                    item.items.length !== 0 &&
                        item.items.forEach((item_) => {
                            item_.products.forEach((item__) => {
                                let rating = parseFloat(item__.rating);
                                if (rating === keyword) {
                                    itemsData.push({ ...item__, parentCatName: item.cat_name, subCatName: item_.cat_name })
                                }
                            })
                        })
                }
                //page == double cat
                else {
                    item.items.length !== 0 &&
                        item.items.forEach((item_, index_) => {
                            // console.log(item_.cat_name.replace(/[^A-Za-z]/g,"-").toLowerCase())
                            if (item_.cat_name.split(' ').join('-').toLowerCase() === id.split(' ').join('-').toLowerCase()) {
                                item_.products.forEach((item__, index__) => {
                                    let rating = parseFloat(item__.rating);
                                    if (rating === keyword) {
                                        itemsData.push({ ...item__, parentCatName: item.cat_name, subCatName: item_.cat_name })
                                    }
                                })

                            }
                        })
                }

            })


        const list2 = itemsData.filter((item, index) => itemsData.indexOf(item) === index);

        setData(list2);

        // window.scrollTo(0,0)

        // return()=>{

        // };

    }

    return (
        <>

            {
                context.windowWidth < 768 &&
                <>
                    {
                        context.isOpenNavigation === false &&
                        <div className='filterMoblie'><Button className='btn-g btn-lg w-100 filterBtn' onClick={() => context.openFilters()}>Filters</Button></div>
                    }
                </>
            }

            <section className="listingPaga">
                <div className="container-fluid">

                    <div className="breadcrumb flex-column">
                        <h1 className='text-capitalize'>{sessionStorage.getItem('cat')}</h1>
                        <ul className="list list-inline mb-0">
                            <li className="list-inline-item">
                                <Link to={'/'}>Home</Link>
                            </li>

                            <li className="list-inline-item">
                                <Link to={`/cat/${sessionStorage.getItem('cat')}`} className='text-capitalize'>
                                    {sessionStorage.getItem('cat')}
                                </Link>
                            </li>

                            {
                                props.single === false &&

                                <li className="list-inline-item text-capitalize">
                                    {id}
                                </li>
                            }
                        </ul>
                    </div>

                    <div className="listingData">
                        <div className="row">
                            <div className={`col-md-3 sidebarWrapper ${context.isOpenFilters === true && 'click'} `}>

                                {
                                    data.length !== 0 && <Sidebar data={props.data} currentCatData={data} filterByBrand={filterByBrand} filterByPrice={filterByPrice} filterByRating={filterByRating} />
                                }

                            </div>

                            <div className="col-md-9 rightContent homeProducts pt-0">

                                <div className="topStrip d-flex align-items-center">
                                    <p className="mb-0">We Found <span className="text-success">{data.length} </span>items for you!</p>
                                    <div className="ms-auto d-flex align-items-center">
                                        <div className="tab_ position-relative">
                                            <Button className="btn_" onClick={() => setisOpenDropDown(!isOpenDropDown)}> <IoGridOutline /> Show: 50</Button>
                                            {
                                                isOpenDropDown !== false &&
                                                <ul className="dropdownMenu">
                                                    <li><Button className="align-items-center" onClick={() => setisOpenDropDown(false)}>50</Button></li>
                                                    <li><Button className="align-items-center" onClick={() => setisOpenDropDown(false)}>100</Button></li>
                                                    <li><Button className="align-items-center" onClick={() => setisOpenDropDown(false)}>200</Button></li>
                                                    <li><Button className="align-items-center" onClick={() => setisOpenDropDown(false)}>2000</Button></li>
                                                    <li><Button className="align-items-center" onClick={() => setisOpenDropDown(false)}>All</Button></li>
                                                </ul>
                                            }
                                        </div>
                                        <div className="tab_ ms-3 position-relative">
                                            <Button className="btn_" onClick={() => setisOpenDropDown2(!isOpenDropDown2)}> <IoFilter /> Sort by :  Featured</Button>
                                            {
                                                isOpenDropDown2 !== false &&
                                                <ul className="dropdownMenu">
                                                    <li><Button className="align-items-center" onClick={() => setisOpenDropDown2(false)}>Featured</Button></li>
                                                    <li><Button className="align-items-center" onClick={() => setisOpenDropDown2(false)}>Price: Low to High</Button></li>
                                                    <li><Button className="align-items-center" onClick={() => setisOpenDropDown2(false)}>Price: High to Low</Button></li>
                                                    <li><Button className="align-items-center" onClick={() => setisOpenDropDown2(false)}>Release Date</Button></li>
                                                    <li><Button className="align-items-center" onClick={() => setisOpenDropDown2(false)}>Avg Rating</Button></li>

                                                </ul>
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="productRow  productRow1 ps-4 pe-3">

                                    {
                                        data.length !== 0 &&
                                        data.map((item, index) => {
                                            return (
                                                <div className="item" key={index}>
                                                    <Product tag={item.type} item={item} />
                                                </div>
                                            )
                                        })
                                    }

                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Listing