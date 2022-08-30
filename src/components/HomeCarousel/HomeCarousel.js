import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import Axios from 'axios';
import "./HomeCarousel.css";
const contentStyle = {
    height: '400px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat'
};
export default function HomeCarousel(props) {
    const renderImg = () => {
        return props.arrBanner.map((item, index) => {
            return <div key={index} >
                <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>
                    <img className='w-full' src={item.hinhAnh} alt='' />
                </div>
            </div>
        })
    }
    return (
        <Carousel effect="fade" className='slick-dots-bottom'>
            {renderImg()}
        </Carousel>
    )
}
