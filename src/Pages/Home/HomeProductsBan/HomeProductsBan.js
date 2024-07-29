import React, { useContext, useEffect, useState } from 'react';
import Dailyimg1 from '../../../assets/images/Banner/DailyImg1.jpg';
import Slider from 'react-slick';
import Product from '../Products/Product';
import '../HomeProductsBan/HomeProductsBan.css';
import { MyContext } from '../../../App';

const HomeProductsBan = (props) => {
    const [prodData] = useState(props.data);
    const [bestSells, setBestSells] = useState([]);

    const context = useContext(MyContext);

    const settings = {
        dots: false,
        infinite: context.windowWidth>768 ? true : '',
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        fade: false,
        arrows: context.windowWidth>768 ? true : '',
        autoplay: 3000,
        responsive: [
            {
                breakpoint: 1050,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            }
        ],
    };

    useEffect(() => {
        const bestSellsArr = prodData.reduce((acc, item) => {
            if (item.cat_name === "Fashion") {
                item.items.forEach((item_) => {
                    acc.push(...item_.products);
                });
            }
            return acc;
        }, []);
        setBestSells(bestSellsArr);
    }, [prodData]);

    return (
        <>
            <section className="homeProducts homeProductRow2 pt-0">
                <div className="container-fluid">
                    <div className="d-flex align-items-center">
                        <h2 className="hd mb-0 mt-0">Daily Best Sells</h2>
                    </div>

                    <div className="row productRow">
                        <div className="col-md-3 daily_Img_Sec pr-5 res-hide">
                            <img src={Dailyimg1} alt="Daily Best Sell" className="w-100" />
                        </div>


                        <div className="col-md-9">
                            <Slider {...settings} className="prodSlider">
                                {bestSells.map((item, index) => (
                                    <div className="item" key={index}>
                                        <Product tag={item.type} item={item} />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomeProductsBan;
