import React, { Fragment, useEffect } from 'react'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import moment from 'moment'
import { CompassOutlined } from '@ant-design/icons';
import { layThongTinLichChieuPhimAction } from '../../../redux/actions/QuanLyRapAction';
import { history } from '../../../utils/history';
export default function Detail(props) {
    const { thongTinPhim } = useSelector(state => state.QuanLyPhimReducer);
    const { thongTinLichChieuPhim } = useSelector(state => state.QuanLyRapReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layThongTinPhimAction(props.match.params.id));
        dispatch(layThongTinLichChieuPhimAction(props.match.params.id));
    }, [])
    const renderStart = () => {
        let htmlStart = ""
        for (let i = 0; i < Math.round(thongTinPhim.danhGia * 0.5); i++) {
            htmlStart += '<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>'
        }
        return htmlStart;
    }
    const renderStartGray = () => {
        let htmlStartGray = ""
        for (let i = 0; i < 5 - Math.round(thongTinPhim.danhGia * 0.5); i++) {
            htmlStartGray += ' <svg class="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>'
        }
        return htmlStartGray;
    }
    const renderHeThongRapChieuPhim = () => {
        return thongTinLichChieuPhim.heThongRapChieu?.map((htr, index) => {
            return <Fragment key={index} >{htr.cumRapChieu.map((rap, index) => {
                return <Fragment key={index}>
                    <div className='col-span-4 col-start-2 mt-8'>
                        <div className='tag-cinema w-60 bg-gray-700 rounded-md'>
                            <div className='tag-cinema-content  px-3'>
                                <h3 className='text-xl text-white text-center'>{rap.tenCumRap}</h3>
                                <p className='text-slate-200'>{rap.diaChi}</p>
                            </div>
                            <div className='bg-green-500 flex justify-center cursor-pointer'>
                                <CompassOutlined className='inline-block mt-1 mr-2' style={{ color: 'white', fontSize: '25px' }} />
                                <button className=' block text-lg text-white py-1'>Xem Vi Trí</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-6 mt-8'>
                        {rap.lichChieuPhim.map((lichChieu, index) => {
                            return <button onClick={() => {
                                history.push(`/checkout/${lichChieu.maLichChieu}`)
                            }} key={index} className='mt-2 p-2 h-fit ml-5 text-gray-500 bg-black font-bold hover:bg-green-500 hover:text-white text-lg ease-in-out duration-100' >{moment(lichChieu.ngayChieuGioChieu).format("LT")}</button>
                        })}
                    </div>
                </Fragment>
            })}
            </Fragment>
        })
    }
    return (
        <div className='' style={{
            minHeight: '100vh', backgroundImage: `url(${thongTinPhim.hinhAnh})`,
            backgroundSize: 'cover', backgroundPosition: 'center'
        }}>
            <CustomCard style={{ minHeight: '100vh' }}
                effectColor="#C780FF" // required
                color="#14AEFF" // default color is white
                blur={10} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <div className='container mx-auto mt-32'>
                    <div className=' grid grid-cols-12'>
                        <div className='col-span-6 col-start-3 flex'>
                            <img src={thongTinPhim.hinhAnh} style={{ width: '300px', height: '500px' }} />
                            <div className='des ml-5'>
                                <h3 className='text-white text-3xl uppercase'>{thongTinPhim.tenPhim}</h3>
                                <div className="flex">
                                    {<div className='flex' dangerouslySetInnerHTML={{ __html: renderStart() }} ></div>}
                                    {<div className='flex' dangerouslySetInnerHTML={{ __html: renderStartGray() }} ></div>}
                                    <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{Math.round(thongTinPhim.danhGia * 0.5)} out of 5</p>
                                </div>
                                <p className='text-slate-300 mt-4'>{thongTinPhim.moTa}</p>
                                <p className='text-slate-300'>Ngày khởi chiếu: {moment(thongTinPhim.ngayKhoiChieu).format("DD/MM/YYYY")}</p>
                                <a href={thongTinPhim.trailer} target="_blank" className='rounded-md p-2 text-white bg-green-500 hover:bg-white hover:text-green-500'>XEM TRAILER</a>
                                <a href={thongTinPhim.trailer} target="_blank" className='rounded-md p-2 text-white bg-green-500 hover:bg-white hover:text-green-500 ml-4'>ĐẶT VÉ NGAY</a>
                            </div>
                        </div>
                    </div>
                    <div className='mx-36 mt-20'>
                        <h3 className='text-white text-2xl text-center mb-4'>Vui lòng chọn thông tin vé</h3>
                        <hr style={{ height: '1px', border: 'none' }} className=' bg-green-500'></hr>
                        <div className='grid grid-cols-12'>
                            {renderHeThongRapChieuPhim()}
                        </div>
                    </div>
                </div>
            </CustomCard>
        </div>
    )
}
