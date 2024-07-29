import React from 'react'
import '../TopProducts/TopProject.css'
import img1 from '../../../../assets/images/Vegetables/img1.png'
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';

const TopProject = (props) => {
    return (
        <>
            <div className="topSelling_box">
                <h3>{props.title}</h3>

                {/* First Row  */}

                <div className="items d-flex align-items-center ">
                    <div className="img">
                        <Link to="#">
                            <img src={img1} alt="Top_product1" className='w-100' />
                        </Link>
                    </div>
                    <div className="info px-3">
                        <Link to="#"><h4>Nestle Original Coffee-Mate Coffee Creamer</h4></Link>
                        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                        <div className="d-flex align-items-center">
                            <span className="price text-g font-weight-bold">$28.85</span>
                            <span className="oldPrice">$32.8</span>
                        </div>
                    </div>
                </div>

                {/* Second Row  */}

                <div className="items d-flex align-items-center">
                    <div className="img">
                        <Link to="#">
                            <img src={img1} alt="Top_product1" className='w-100' />
                        </Link>

                    </div>
                    <div className="info px-3">
                        <Link to="#"><h4>Nestle Original Coffee-Mate Coffee Creamer</h4></Link>
                        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                        <div className="d-flex align-items-center">
                            <span className="price text-g font-weight-bold">$28.85</span>
                            <span className="oldPrice">$32.8</span>
                        </div>
                    </div>
                </div>

                {/* Thrid Row  */}

                <div className="items d-flex align-items-center">
                    <div className="img">
                        <Link to="#">
                            <img src={img1} alt="Top_product1" className='w-100' />
                        </Link>

                    </div>
                    <div className="info px-3">
                        <Link to="#"><h4>Nestle Original Coffee-Mate Coffee Creamer</h4></Link>
                        <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                        <div className="d-flex align-items-center">
                            <span className="price text-g font-weight-bold">$28.85</span>
                            <span className="oldPrice">$32.8</span>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default TopProject