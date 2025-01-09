import React from 'react';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import list from "../list.json";
import Cards from "./Cards";


function Freebook() {
    const filterData = list.filter((data) => data.category === "For Sale");
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,

        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                //initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ],
    };
    return (
        <>
            <div className="max-w-screen-xl mx-auto">
            <div className="">
                <h1 className="text-yellow-400 font-bold text-xl pb-1 pt-20 max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row">Gadgets for Engineering Life:</h1>
                <p className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-2">
                Here, you can showcase, buy, and sell gadgets needed in your engineering life. Whether it's tools, accessories, 
                or any other device, find what you need to enhance your learning and daily activities.
                </p>
            </div>
            <div className="slider-container overflow-hidden px-8 py-1 text-center">
                <Slider {...settings}>
                    {/* <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div> */}

                    {filterData.map((item) => (
                        <Cards item={item} key={item.id}/>
                    ))}
                </Slider>
            </div>
            </div>
        </>
    )
}

export default Freebook
