import React, { useContext, useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

import '../Slider/Slider.css';

import slider1 from '../../../assets/images/slider1.jpg';
import slider2 from '../../../assets/images/slider2.jpg';
import slider3 from '../../../assets/images/slider3.jpg';
import slider4 from '../../../assets/images/slider4.jpg';
import slider5 from '../../../assets/images/slider5.jpg';
import NewsLetter from '../../../Components/NewsLetter/NewsLetter';

import { MyContext } from '../../../App';

const HomeSlider = () => {
    const images = [slider1, slider2, slider3, slider4, slider5];
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const context = useContext(MyContext);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: context.windowWidth>768 ? true : false,
        autoplay: 2000
    };

    useEffect(() => {

    }, [])

    return (
        <section className="homeSlider">
            <div className="container-fluid">
                <Slider {...settings} className='home_slider_main'>
                    {images.map((image, index) => (
                        <div key={index}>
                            {(index === 0 || index === 1) && (
                                <div className="item">
                                    {index === 0 && (
                                        <>
                                            <div className="infoBan">
                                                <h2 className='mb-4'>Don't miss amazing<br /> grocery deals</h2>
                                                <p>Sign up for the daily newsletter</p>
                                                {
                                                    context.windowWidth > 768 && <NewsLetter />
                                                }
                                            </div>
                                        </>
                                    )}
                                    {index === 1 && (
                                        <>
                                            <div className="info">
                                                <h2 className='mb-3'>Fresh vegetables <br />big discount</h2>
                                                <p>save upto 50%off on your first order</p>
                                                {
                                                    context.windowWidth > 768 && <NewsLetter />
                                                }
                                            </div>
                                        </>
                                    )}
                                    <img src={image} alt={`Slider ${index + 1}`} />
                                </div>
                            )}
                            {(index !== 0 && index !== 1) && (
                                <img src={image} alt={`Slider ${index + 1}`} />
                            )}
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
}

export default HomeSlider;
