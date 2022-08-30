import React from 'react'
import { Radio, Space, Tabs } from 'antd';
import { useState } from 'react';
import moment from 'moment';
import { history } from '../../utils/history';
const { TabPane } = Tabs;
export default function HomeMenu(props) {
    const renderLichChieuHeThongRap = () => {
        return props.arrLichChieuHeThongRap?.map((heThongRap, index) => {
            return <TabPane tab={<img style={{ width: '50px', height: '50px' }} src={heThongRap.logo} />} key={index} alt="" >
                <Tabs tabPosition={"left"}>
                    {heThongRap.lstCumRap.slice(0, 6).map((cumRap, index) => {
                        return <TabPane tab={<img style={{ width: '50px', height: '50px' }} src={heThongRap.logo} />} key={index} alt="" >
                            <p className='text-white bg-green-500 inline-block p-2 rounded-md'>{cumRap.diaChi}</p>
                            {cumRap.danhSachPhim.slice(0, 7).map((phim, index) => {
                                return <div key={index} className='mt-2 flex'>
                                    <img className='rounded-full mb-4' src={phim.hinhAnh} style={{ width: '50px', height: '50px' }} alt="" onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = 'https://cdn.pixabay.com/photo/2021/01/10/20/03/laptop-5906264_640.png'
                                    }} />
                                    <div>
                                        <p className='text-white text-lg ml-5 font-semibold'>{phim.tenPhim}</p>
                                        {phim.lstLichChieuTheoPhim.slice(0, 8).map((lichChieu, index) => {
                                            return <button onClick={() => {
                                                history.push(`/checkout/${lichChieu.maLichChieu}`)
                                            }} className='p-1 h-fit ml-5 text-gray-500 bg-black font-bold hover:bg-green-500 hover:text-white text-sm ease-out duration-100' key={index}>{moment(lichChieu.ngayChieuGioChieu).format('LT')}</button>
                                        })}
                                    </div>
                                </div>
                            })}
                        </TabPane>
                    })}
                </Tabs>
            </TabPane>
        })
    }
    return (<>
        <h3 className="text-3xl text-white text-center">Thông Tin Lịch Chiếu Phim</h3>
        <Tabs tabPosition={"left"}>
            {renderLichChieuHeThongRap()}
        </Tabs>
        <div className='pb-10'></div>
    </>
    )
}
