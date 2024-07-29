import React from 'react';
import '../banners/Banner.css';

import Banner1 from '../../assets/images/Banner/Banner1.jpg';
import Banner2 from '../../assets/images/Banner/Banner2.jpg';
import Banner3 from '../../assets/images/Banner/Banner3.jpg';

const Banner = () => {
    const images = [Banner1, Banner2, Banner3];

    return (
        <div className="bannerSection">
            <div className="container-fluid">
                <div className="row bannerImg ">
                    {images.map((image, index) => (
                        <div key={index} className="bannerImgSec">
                            <div className="box">
                                <img  src={image} className="w-100 transition" alt={`Banner ${index + 1}`} />
                            </div>
                        </div>
                     ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;

