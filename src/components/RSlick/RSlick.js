import React, { useId } from 'react'
import Slider from "react-slick";
import './RSlick.css';
import { useDispatch } from 'react-redux';
import { SET_DANH_SACH_PHIM_DANG_CHIEU, SET_DANH_SACH_PHIM_SAP_CHIEU } from '../../redux/types/QuanLyPhimType';
import { history } from '../../utils/history';
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", }}
            onClick={onClick}
        />
    );
}
export default function RSlick(props) {
    const dispatch = useDispatch();
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        rows: 2,
        slidesPerRow: 2,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        variableWidth: true
    };
    const renderPhim = () => {
        return props.arrPhim.map((phim, index) => {
            return <div key={index} className="px-2 ">
                <div>
                    <div className='overflow-hidden'>
                        <img className='hover:scale-110 ease-in duration-300' src={phim.hinhAnh} alt={phim.hinhAnh} 
                        style={{ width: '250px', height: '300px' }} onError={(e)=>{e.target.onerror = null; e.target.src="https://cf.shopee.co.id/file/eebdd55f79801d40ac26fc65034b4c85"}} />
                    </div>
                    <button onClick={()=>{
                        history.push(`/detail/${phim.maPhim}`)
                    }} className='mt-2 p-3 mb-2 text-white bg-green-500 rounded-md block w-full hover:bg-gray-400 hover:text-green-900 font-bold'>Chi tiết</button>
                </div>
            </div>
        })
    }
    return (
        <div className='mt-10'>
            <div className='status-film text-center mb-8'>
                <button onClick={() => {
                    dispatch({
                        type: SET_DANH_SACH_PHIM_DANG_CHIEU
                    })
                }} className='text-3xl text-white hover:text-yellow-500 ease-in duration-100 mr-8'>Phim Đang Chiếu</button>
                <button onClick={() => {
                    dispatch({
                        type: SET_DANH_SACH_PHIM_SAP_CHIEU
                    })
                }} className='text-3xl text-white hover:text-yellow-500 ease-in duration-300'>Phim Sắp Chiếu</button>
            </div>
            <Slider {...settings} autoplay>
                {renderPhim()}
            </Slider>
        </div>
    )
}
