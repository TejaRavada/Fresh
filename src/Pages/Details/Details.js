import React, { useEffect, useRef, useState, useCallback, useContext } from 'react';
import Slider from 'react-slick';
import '../../Pages/Details/Details.css';
import Table from 'react-bootstrap/Table';

import { Link, useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import InnerImageZoom from 'react-inner-image-zoom';
import { Button } from '@mui/material';

import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

import Proimg1 from '../../assets/images/Profile/Proimg1.jpg';

import LogoClient from '../../assets/images/vendor/Logo_Client.png';


// import Sidebar from '../../Components/Sidebar/Sidebar';

import { HiMiniShoppingCart } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { RiShuffleLine } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";
import { IoIosHeadset } from "react-icons/io";

import Product from '../Home/Products/Product';
import axios from 'axios';
import { MyContext } from '../../App';

import Quantity from '../../Components/QuantityBox/Quantity';

const Details = (props) => {

    // const [zoomImage, setZoomImage] = useState(Product1)

    const [bigImageSize] = useState([1500, 1500]);
    const [smlImageSize] = useState([150, 150]);

    const [activeSize, setActiveSize] = useState(0);



    // const [inputValue, setinputValue] = useState(1);

    const [activeTabs, setActiveTabs] = useState(0);

    const [currentProduct, setCurrentProduct] = useState({})
    const [isAdded, setIsadded] = useState(false);

    const context = useContext(MyContext);

    const [prodCat] = useState({
        parentCat: sessionStorage.getItem('parentCat'),
        subCatName: sessionStorage.getItem('subCatName')
    })

    const [relatedProducts, setRelatedProducts] = useState([]);

    const [rating, setRating] = useState(0.0);

    const [reviewsArr, setReviewsArr] = useState([]);

    const [isAlreadyAddedInCart, setisAlreadyAddedInCart] = useState(false);

    const [reviewFields, setReviewFields] = useState({
        review: '',
        userName: '',
        rating: 0.0,
        productId: 0,
        date: ''
    })

    const zoomSliderBig = useRef();
    const zoomSlider = useRef();

    let { id } = useParams();

    var settings2 = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        arrows: false,
    };

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        fade: false,
        arrows: context.windowWidth > 768 ? true : false
    };

    var related = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        fade: false,
        arrows: context.windowWidth > 768 ? true : false
    };
    const goto = (index) => {

        zoomSlider.current.slickGoTo(index);
        zoomSliderBig.current.slickGoTo(index);
    }


    const isActive = (index) => {
        setActiveSize(index);
    }

    useEffect(() => {
        window.scrollTo(0, 0)

        props.data.length !== 0 &&
            props.data.map((item) => {
                item.items.length !== 0 &&
                    item.items.map((item_) => {
                        item_.products.length !== 0 &&
                            item_.products.map((product) => {
                                if (parseInt(product.id) === parseInt(id)) {
                                    setCurrentProduct(product);
                                }
                            })
                    })
            })

        //related products code

        const related_products = [];

        props.data.length !== 0 &&
            props.data.map((item) => {
                if (prodCat.parentCat === item.cat_name) {
                    item.items.length !== 0 &&
                        item.items.map((item_) => {
                            if (prodCat.subCatName === item_.cat_name) {
                                item_.products.length !== 0 &&
                                    item_.products.map((product, index) => {
                                        if (product.id !== parseInt(id)) {
                                            related_products.push(product)
                                        }

                                    })
                            }
                        })
                }

            })

        if (related_products.length !== 0) {
            setRelatedProducts(related_products)
        }

        showReviews();

        getCartData("https://freshapi.onrender.com/cartItems");

    }, [id]);


    const changeInput = (name, value) => {
        if (name === "rating") {
            setRating(value);
        }
        setReviewFields(() => ({
            ...reviewFields,
            [name]: value,
            productId: id,
            date: new Date().toLocaleString()
        }))
    }

    const reviews_Arr = [];

    const submitReview = async (e) => {
        e.preventDefault();

        try {

            await axios.post("https://freshapi.onrender.com/productReviews", reviewFields).then((response) => {
                reviews_Arr.push(response.data);
                setReviewFields(() => ({
                    review: '',
                    userName: '',
                    rating: 0.0,
                    productId: 0,
                    date: ''
                }))
            })

        } catch (error) {
            console.log(error.message);
        }

        showReviews();
        
    }

    var reviews_Arr2 = [];
    const showReviews = async () => {
        try {
            await axios.get("https://freshapi.onrender.com/productReviews").then((response) => {
                if (response.data.length !== 0) {
                    response.data.map((item) => {
                        if (parseInt(item.productId) === parseInt(id)) {
                            reviews_Arr2.push(item)
                        }

                    })

                }
            })
        } catch (error) {
            console.log(error.message);
        }

        if (reviews_Arr2.length !== 0) {

            setReviewsArr(reviews_Arr2);
        }

    }

    const addToCart = (item) => {
        context.addToCart(item);
        setIsadded(true);
    }

    const getCartData = async (url) => {
        try {
            await axios.get(url).then((response) => {
                response.data.length!==0 && response.data.map((item)=>{
                    
                    if(parseInt(item.id)===parseInt(id)){
                        setisAlreadyAddedInCart(true);
                    }
                })
            })

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>

            <section className="detailsPage md-5">

                {
                    context.windowWidth > 768 &&
                    <div className='breadcrumbWrapper mb-4'>
                        <div className='container-fluid'>
                            <ul className="breadcrumb breadcrumb2 mb-0">
                                <li><Link to="#" >Home</Link></li>

                                <li>
                                    <Link to={`/cat/${prodCat.parentCat.split(' ').join('-').toLowerCase()}`}
                                        onClick={() => sessionStorage.setItem('cat', prodCat.parentCat.split(' ').join('-').toLowerCase())} className='text-capitalize'>
                                        {prodCat.parentCat}
                                    </Link>
                                </li>

                                <li>
                                    <Link to={`/cat/${prodCat.parentCat.toLowerCase()}/${prodCat.subCatName.replace(/\s/g, '-').toLowerCase()}`}
                                        onClick={() => sessionStorage.setItem('cat', prodCat.subCatName.toLowerCase())} className='text-capitalize'>
                                        {prodCat.subCatName}
                                    </Link>
                                </li>

                                <li>{currentProduct.productName}</li>
                            </ul>
                        </div>

                    </div>
                }

                <div className="container detailsContainer pt-3 pb-3">

                    <div className="row">

                        {/* ProductZoom code start here */}

                        <div className='col-md-5'>
                            <div className='productZoom'>
                                <Slider {...settings2} className='zoomSliderBig' ref={zoomSliderBig}>
                                    {
                                        currentProduct.productImages !== undefined &&
                                        currentProduct.productImages.map((imgUrl, index) => {
                                            return (
                                                <div className='item' key={index}>
                                                    <InnerImageZoom
                                                        zoomType="hover" zoomScale={1}
                                                        src={`${imgUrl}?im=Resize=(${bigImageSize[0]},${bigImageSize[1]})`} />

                                                </div>
                                            )
                                        })
                                    }

                                </Slider>
                            </div>

                            <Slider {...settings} className='zoomSlider' ref={zoomSlider}>

                                {
                                    currentProduct.productImages !== undefined &&
                                    currentProduct.productImages.map((imgUrl, index) => {
                                        return (
                                            <div className='item' key={index}>
                                                <img src={`${imgUrl}?im=Resize=(${smlImageSize[0]},${smlImageSize[1]})`} className='w-100'
                                                    onClick={() => goto(index)} alt='productImg' />
                                            </div>
                                        )
                                    })
                                }

                            </Slider>

                        </div>

                        {/* productZoom code ends here */}

                        {/* product info code start here */}

                        <div className='col-md-7 productInfo'>

                            <h1>{currentProduct.productName}</h1>

                            <div className='d-flex align-items-center mb-4 mt-3'>
                                <Rating name="half-rating-read" value={parseFloat(currentProduct.rating)} precision={0.5} readOnly />
                                <span className='text-light ms-2'>(32 reviews)</span>
                            </div>

                            <div className='priceSec d-flex align-items-center mb-3'>
                                <span className='text-g priceLarge'>Rs {currentProduct.price}</span>
                                <div className='ms-3 d-flex flex-column'>
                                    <span className='text-org'>{currentProduct.discount}% Off</span>
                                    <span className='text-light oldPrice'>Rs {currentProduct.oldPrice}</span>
                                </div>
                            </div>

                            <p>{currentProduct.description}</p>
                            {/* Weight(groceries) */}
                            {
                                currentProduct.weight !== undefined && currentProduct.weight.length !== 0 &&
                                <div className='productSize d-flex align-items-center'>
                                    <span>Size / Weight:</span>
                                    <ul className='list list-inline mb-0 ps-0'>
                                        {
                                            currentProduct.weight.map((item, index) => {
                                                return (
                                                    <li className='list-inline-item' key={index}>
                                                        <Link to="#" className={`tag ${activeSize === index ? 'active' : ''}`} onClick={() => isActive(index)}>
                                                            {item}g
                                                        </Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            }

                            {/* Ram(Mobile) */}
                            
                            {
                                currentProduct.RAM !== undefined && currentProduct.RAM.length !== 0 &&
                                <div className='productSize d-flex align-items-center'>
                                    <span>RAM:</span>
                                    <ul className='list list-inline mb-0 ps-0'>
                                        {
                                            currentProduct.RAM.map((RAM, index) => {
                                                return (
                                                    <li className='list-inline-item' key={index}>
                                                        <Link to="#" className={`tag ${activeSize === index ? 'active' : ''}`} onClick={() => isActive(index)}>
                                                            {RAM} GB
                                                        </Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            }

                            {/* SIZE(TV) */}

                            {
                                currentProduct.SIZE !== undefined && currentProduct.SIZE.length !== 0 &&
                                <div className='productSize d-flex align-items-center'>
                                    <span>SIZE:</span>
                                    <ul className='list list-inline mb-0 ps-0'>
                                        {
                                            currentProduct.SIZE.map((SIZE, index) => {
                                                return (
                                                    <li className='list-inline-item' key={index}>
                                                        <Link to="#" className={`tag ${activeSize === index ? 'active' : ''}`} onClick={() => isActive(index)}>
                                                            {SIZE}
                                                        </Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            }

                            <div className="addCart">
                                <div className='addCartQuan'>
                                    <Quantity />
                                    <Button className=" btn-lg  counterSec ms-3 btn-border"><FaRegHeart /></Button>
                                    <Button className=" btn-lg  counterSec ms-3 btn-border"><RiShuffleLine /></Button>
                                </div>

                                <div className="d-flex align-items-center">
                                    <Button className={`btn-g btn-lg addtocartbtn addtocartbtn1 ${isAlreadyAddedInCart === true && 'no-click'}`} onClick={() => addToCart(currentProduct)} ><HiMiniShoppingCart />
                                        {
                                            isAdded === true || isAlreadyAddedInCart === true ? 'Added' : 'Add to Card'
                                        }
                                    </Button>
                                </div>
                            </div>

                        </div>

                        {/* Product info code ends here */}
                    </div>

                    <div className="card mt-5 p-5 detailsPageTabs">
                        <div className="customTabs">
                            <ul className="list list-inline customTabsMob">
                                <li className="list-inline-item">
                                    <Button className={`${activeTabs === 0 && 'active'}`} onClick={() => setActiveTabs(0)}>Description</Button>
                                </li>
                                <li className="list-inline-item">
                                    <Button className={`${activeTabs === 1 && 'active'}`} onClick={() => setActiveTabs(1)}>Additional info</Button>
                                </li>
                                <li className="list-inline-item">
                                    <Button className={`${activeTabs === 2 && 'active'}`} onClick={() => setActiveTabs(2)}>Vendor</Button>
                                </li>
                                <li className="list-inline-item">
                                    <Button className={`${activeTabs === 3 && 'active'}`} onClick={() => setActiveTabs(3)}>Reviews(3)</Button>
                                </li>
                            </ul>

                            <br />
                            {
                                activeTabs === 0 &&
                                <div className="tabContent">
                                    <p>{currentProduct.description}</p>
                                    <br />
                                </div>
                            }

                            {
                                activeTabs === 1 &&
                                <div className="tabContent">
                                    <div className="table-responsive">
                                        <div className="table table-bordered">
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr className="tab_border">
                                                        <th>Stand Up</th>
                                                        <td>
                                                            <p>35"L x 24"W x 37-45"H(front to back wheel)</p>
                                                        </td>
                                                    </tr>
                                                    <tr className="tab_border">
                                                        <th>Folded (w/o wheels)</th>
                                                        <td>
                                                            <p>32.5"L x 18.5"W x 16.5"H</p>
                                                        </td>
                                                    </tr>
                                                    <tr className="tab_border">
                                                        <th>Folded (w/ wheels)</th>
                                                        <td>
                                                            <p>32.5"L x 24""W x 18.5"H</p>
                                                        </td>
                                                    </tr>
                                                    <tr className="tab_border">
                                                        <th>Door Pass Through</th>
                                                        <td>
                                                            <p>24</p>
                                                        </td>
                                                    </tr>
                                                    <tr className="tab_border">
                                                        <th>Frame</th>
                                                        <td>
                                                            <p>Aluminum</p>
                                                        </td>
                                                    </tr>
                                                    <tr className="tab_border">
                                                        <th>Weight(w/o wheels)</th>
                                                        <td>
                                                            <p>20 LBS</p>
                                                        </td>
                                                    </tr>
                                                    <tr className="tab_border">
                                                        <th>Weight Capacity</th>
                                                        <td>
                                                            <p>60 LBS</p>
                                                        </td>
                                                    </tr>
                                                    <tr className="tab_border">
                                                        <th>Width</th>
                                                        <td>
                                                            <p>24"</p>
                                                        </td>
                                                    </tr>
                                                    <tr className="tab_border">
                                                        <th>Handle height (ground to handle)</th>
                                                        <td>
                                                            <p>37-45"</p>
                                                        </td>
                                                    </tr>
                                                    <tr className="tab_border">
                                                        <th>Wheels</th>
                                                        <td>
                                                            <p>12" air / wide track slick tread</p>
                                                        </td>
                                                    </tr>
                                                    <tr className="tab_border">
                                                        <th>Seat back height</th>
                                                        <td>
                                                            <p>21.5"</p>
                                                        </td>
                                                    </tr>
                                                    <tr className="tab_border">
                                                        <th>Head room (inside canopy)</th>
                                                        <td>
                                                            <p>25"</p>
                                                        </td>
                                                    </tr>
                                                    <tr className="tab_border">
                                                        <th>Color</th>
                                                        <td>
                                                            <p>Black, Blue, Red, White</p>
                                                        </td>
                                                    </tr>
                                                    <tr className="tab_border">
                                                        <th>Size</th>
                                                        <td>
                                                            <p>M, S</p>
                                                        </td>
                                                    </tr>
                                                </thead>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                activeTabs === 2 &&
                                <div className="tabContent">

                                    <div className="tab_logo d-flex">

                                        <div className="tab_logo_icon">
                                            <img src={LogoClient} alt="" />
                                        </div>

                                        <div className="tab_logo_text">
                                            <p className='mb-0'>Noodles Co.</p>
                                            <div className="d-flex align-items-center">
                                                <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                                                <span className="text-light ms-2">(32 reviews)</span>
                                            </div>
                                        </div>

                                    </div>
                                    <br />

                                    <div className="tab_locationText">
                                        <div className="tab_texticon">
                                            <p><GrLocation /><strong> Address:</strong> 5171 W Campbell Ave undefined Kent, Utah 53127 United States</p>
                                            <p><IoIosHeadset /><strong> Call Us:</strong> (+91) - 540-025-124553</p>
                                        </div>
                                    </div>
                                    <br />
                                    <br />

                                    <div className="tab_per d-flex gap-3 align-items-center">
                                        <div className="tab_icon1 ">
                                            <p>Rating</p>
                                            <h3>92%</h3>
                                        </div>
                                        <div className="tab_icon1">
                                            <p>Ship on time</p>
                                            <h3>100%</h3>
                                        </div>
                                        <div className="tab_icon1">
                                            <p>Chat response</p>
                                            <h3>89%</h3>
                                        </div>
                                    </div>
                                    <br />
                                    <br />

                                    <div className="tab_para">
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, laborum atque at maxime architecto earum ullam numquam rem sapiente perferendis incidunt sunt illum? Dolores, repellat totam incidunt inventore veniam hic? Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, laborum atque at maxime architecto earum ullam numquam rem sapiente perferendis incidunt sunt illum? Dolores, repellat totam incidunt inventore veniam hic?</p>
                                    </div>

                                </div>
                            }

                            {
                                activeTabs === 3 &&
                                <div className="tabContent">
                                    <div className="row">

                                        <div className='col-md-8'>

                                            <h3>Customer questions & answers</h3>
                                            <br />

                                            {
                                                reviewsArr.length !== 0 && reviewsArr !== undefined &&
                                                reviewsArr.map((item, index) => {

                                                    return (

                                                        <div className='card p-4 reviewsCard flex-row' key={index}>
                                                            <div className='col-md-1 image'>
                                                                <div className='rounded-circle'>
                                                                    <img src={Proimg1} alt="" width={100} />
                                                                </div>
                                                                <span className='text-g d-block text-center font-weight-bold'>{item.userName}</span>
                                                            </div>

                                                            <div className='col-md-11 info ps-5'>
                                                                <div className='d-flex align-items-center w-100'>
                                                                    <h5 className='text-light'>{item.date}</h5>
                                                                    <div className='ms-auto'>
                                                                        <Rating name="half-rating-read"
                                                                            value={parseFloat(item.rating)} precision={0.5} readOnly />
                                                                    </div>
                                                                </div>

                                                                <p>{item.review} </p>
                                                            </div>

                                                        </div>
                                                    )

                                                })
                                            }

                                            <br className='res-hide' />

                                            <br className='res-hide' />

                                            <form className='reviewForm' onSubmit={submitReview}>

                                                <h4>Add a review</h4> <br />
                                                <div className='mb-3 form-group'>
                                                    <textarea className='form-control' placeholder='Write a Review'
                                                        name="review" value={reviewFields.review} onChange={(e) => changeInput(e.target.name, e.target.value)}></textarea>
                                                </div>

                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <div className='mb-3 form-group'>
                                                            <input type='text' value={reviewFields.userName} className='form-control' placeholder='Name' name='userName'
                                                                onChange={(e) => changeInput(e.target.name, e.target.value)} />
                                                        </div>
                                                    </div>

                                                    <div className='col-md-6'>
                                                        <div className='mb-3 form-group'>
                                                            <Rating name="rating" value={rating} precision={0.5}
                                                                onChange={(e) => changeInput(e.target.name, e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                </div>

                                                <br />
                                                <div className='md-3 form-group'>
                                                    <Button type='submit' className='btn-g btn-lg'>Submit Review</Button>
                                                </div>

                                            </form>

                                        </div>

                                        <div className="col-md-4 ps-5">

                                            <h4>Customer reviews</h4>
                                            <div className="d-flex align-items-center mt-2">
                                                <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                                                <strong className="ms-3">4.8 out of 5</strong>
                                            </div>
                                            <br />

                                            <div className="progressBarBox d-flex align-items-center">
                                                <span className=''>5 star</span>
                                                <div className="progress" style={{ width: '85%', height: '25px', marginLeft: '10px', fontSize: '15px' }}>
                                                    <div className="progress-bar bg-success" style={{ width: '75%', height: '25px' }} >75%</div>
                                                </div>
                                            </div>

                                            <div className="progressBarBox d-flex align-items-center">
                                                <span className=''>4 star</span>
                                                <div className="progress" style={{ width: '85%', height: '25px', marginLeft: '10px', fontSize: '15px' }}>
                                                    <div className="progress-bar bg-success" style={{ width: '25%', height: '25px' }} >25%</div>
                                                </div>
                                            </div>

                                            <div className="progressBarBox d-flex align-items-center">
                                                <span className=''>3 star</span>
                                                <div className="progress" style={{ width: '85%', height: '25px', marginLeft: '10px', fontSize: '15px' }}>
                                                    <div className="progress-bar bg-success" style={{ width: '55%', height: '25px' }} >55%</div>
                                                </div>
                                            </div>

                                            <div className="progressBarBox d-flex align-items-center">
                                                <span className=''>2 star</span>
                                                <div className="progress" style={{ width: '85%', height: '25px', marginLeft: '10px', fontSize: '15px' }}>
                                                    <div className="progress-bar bg-success" style={{ width: '35%', height: '25px' }} >35%</div>
                                                </div>
                                            </div>

                                            <div className="progressBarBox d-flex align-items-center">
                                                <span className=''>1 star</span>
                                                <div className="progress" style={{ width: '85%', height: '25px', marginLeft: '10px' }}>
                                                    <div className="progress-bar bg-success" style={{ width: '15%', height: '25px' }} >15%</div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>

                    <br />

                    <div className="relatedProducts homeProductsRow2 pt-5 pb-4">
                        <h2 className='hd mb-0 mt-0'>Related products</h2>
                        <br />
                        <Slider {...related} className='prodSlider'>

                            {
                                relatedProducts.length !== 0 &&
                                relatedProducts.map((product, index) => {

                                    return (
                                        <div className='item' key={index}>
                                            <Product tag={product.type} item={product} />
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div>

                </div>
            </section>

        </>
    );
}

export default Details