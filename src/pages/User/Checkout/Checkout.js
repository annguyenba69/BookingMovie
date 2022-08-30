import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import style from './Checkout.module.css';
import "./Checkout.css"
import { useDispatch, useSelector } from 'react-redux';
import { datVeAction, layDanhSachPhongVeAction } from '../../../redux/actions/QuanLyDatVeAction';
import { SET_ACTIVE_KEY_TAB, SET_DANH_SACH_GHE_DANG_DAT } from '../../../redux/types/QuanLyDatVeType';
import { CheckOutlined, HomeOutlined } from '@ant-design/icons';
import { USER_LOGIN } from '../../../utils/configSystems';
import { NavLink, Redirect } from 'react-router-dom'
import moment from 'moment';
import { history } from '../../../utils/history';
import { thongTinTaiKhoanAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import _ from 'lodash'
const { TabPane } = Tabs;
export default function Checkout(props) {
    const dispatch = useDispatch();
    const { danhSachGhe, thongTinPhim, danhSachGheDangDat, activeKey } = useSelector(state => state.QuanLyDatVeReducer);
    const { thongTinDangNhap, thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    console.log(thongTinPhim);
    useEffect(() => {
        dispatch(layDanhSachPhongVeAction(props.match.params.id));
        dispatch(thongTinTaiKhoanAction());
    }, []);
    const renderSeats = () => {
        return danhSachGhe?.map((ghe, index) => {
            let classGheVip = ghe.loaiGhe === 'Vip' ? 'ghe-vip' : '';
            let classGheDaDuocDat = ghe.taiKhoanNguoiDat !== null ? 'ghe-da-duoc-dat' : '';
            let classGheDangDat = danhSachGheDangDat?.findIndex(gheDangDat => gheDangDat.maGhe === ghe.maGhe) !== -1 ? 'ghe-dang-dat' : '';
            let classGheMinhDat = thongTinDangNhap.taiKhoan === ghe.taiKhoanNguoiDat ? 'ghe-minh-dat' : '';
            return <button disabled={ghe.daDat} onClick={() => {
                dispatch({
                    type: SET_DANH_SACH_GHE_DANG_DAT,
                    ghe: ghe
                })
            }} key={index} className={`ghe ${classGheVip} ${classGheDaDuocDat} ${classGheDangDat} ${classGheMinhDat} `}>{ghe.stt}</button>
        })
    }
    const renderTotalMoney = () => {
        return danhSachGheDangDat?.reduce((totalMoney, ghe, index) => {
            return totalMoney += ghe.giaVe
        }, 0)
    }
    const renderResultBooking = () => {
        return thongTinNguoiDung.thongTinDatVe?.map((ve, index) => {
            return <div key={index} className="p-4 md:w-1/4">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                    <div className="flex items-center mb-3">
                        <h2 className="text-gray-900 text-lg title-font font-medium uppercase">{ve.tenPhim}</h2>
                    </div>
                    <div className="flex-grow">
                        <p>Ngày đặt: {moment(ve.ngayDat).format("hh:mm - DD/MM/YYYY")}</p>
                        <p>Hệ Thống Rạp: {ve.danhSachGhe[0].tenHeThongRap}</p>
                        <div style={{ maxWidth: '100%' }}>
                            <span className='font-semibold'>Ghế:</span>
                            {ve.danhSachGhe.slice(0, 6).map((ghe, index) => {
                                return <span key={index} className="ghe-sm">
                                    {ghe.tenGhe}
                                </span>
                            })}
                            {_.size(ve.danhSachGhe) > 7 ? <span>...</span> : ''}
                        </div>
                    </div>
                </div>
            </div>
        })
    }
    const onChange = (key) => {
        dispatch({
            type: SET_ACTIVE_KEY_TAB,
            activeKey : key
        })
    };
    if (!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to={'/login'}></Redirect>
    }
    return (
        <div className='container mx-auto px-0 pb-48'>
            <Tabs defaultActiveKey="1" activeKey={activeKey} onChange={onChange}>
                <TabPane tab="01 Chọn Ghế Và Thanh Toán" key="1">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <NavLink to="/home" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-green-500">
                                    <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                    <a style={{ pointerEvents: "none" }} className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-green-500">Checkout</a>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <div className='mt-12 grid grid-cols-12'>
                        <div className='col-span-9 flex flex-col items-center pr-16'>
                            <div className='h-1 bg-green-500 w-full'></div>
                            <div id={`${style['trapezoid']}`}>
                                <h3 className='text-center mt-2 text-xl'>Màn Hình</h3>
                            </div>
                            <div className='mx-12 mt-10'>
                                {renderSeats()}
                            </div>
                            <div className='w-2/3 mt-10 grid grid-cols-5'>
                                <hr className='col-span-5 border-spacing-2 border-slate-700'></hr>
                                <div className='col-span-1 text-center'>
                                    <p className='mb-0 mt-1 text-sm font-semibold'>GHẾ CHƯA ĐẶT</p>
                                    <button className='ghe'><CheckOutlined /></button>
                                </div>
                                <div className='col-span-1 text-center'>
                                    <p className='mb-0 mt-1 text-sm font-semibold'>GHẾ ĐĂNG ĐẶT</p>
                                    <button className='ghe ghe-dang-dat'><CheckOutlined /></button>
                                </div>
                                <div className='col-span-1 text-center'>
                                    <p className='mb-0 mt-1 text-sm font-semibold'>GHẾ VIP</p>
                                    <button className='ghe ghe-vip'><CheckOutlined /></button>
                                </div>
                                <div className='col-span-1 text-center'>
                                    <p className='mb-0 mt-1 text-sm font-semibold'>GHẾ ĐÃ ĐƯỢC ĐẶT</p>
                                    <button className='ghe ghe-da-duoc-dat'><CheckOutlined /></button>
                                </div>
                                <div className='col-span-1 text-center'>
                                    <p className='mb-0 mt-1 text-sm font-semibold'>GHẾ MÌNH ĐẶT</p>
                                    <button className='ghe ghe-minh-dat'><CheckOutlined /></button>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-3'>
                            <div className="max-w-xs rounded-md shadow-md dark:bg-gray-100 text-black">
                                <div className="flex flex-col justify-between p-6 space-y-8">
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-semibold tracking-wide">Thông tin đặt vé</h2>
                                        <h3 className="text-lg font-semibold">{thongTinPhim.tenPhim}</h3>
                                        <p className='text-slate-600'>Địa điểm: {thongTinPhim.diaChi}</p>
                                        <p className='text-slate-600'>Tên rạp: {thongTinPhim.tenCumRap}</p>
                                        <p className='text-slate-600'>Giờ chiếu: {thongTinPhim.gioChieu} </p>
                                        <p className='text-slate-600'>Ngày chiếu: {thongTinPhim.ngayChieu}</p>
                                        <hr></hr>
                                        <div className=''>
                                            <span className='font-semibold'>Ghế:</span>
                                            {danhSachGheDangDat?.map((gheDangDat, index) => {
                                                return <span key={index} className='ghe-sm'>{gheDangDat.stt}</span>
                                            })}
                                        </div>
                                        <hr></hr>
                                        <p className='italic text-slate-600'>Họ tên : {thongTinDangNhap.hoTen}</p>
                                        <p className='italic text-slate-600'>Email : {thongTinDangNhap.email}</p>
                                        <p className='italic text-slate-600'>Số điện thoại : {thongTinDangNhap.soDT}</p>
                                        <hr></hr>
                                        <div className='flex justify-between'>
                                            <p className='font-semibold text-lg'>Tổng tiền:</p>
                                            <p className='font-semibold text-lg'>{renderTotalMoney().toLocaleString()} đ</p>
                                        </div>
                                    </div>
                                    <button onClick={() => {
                                        let danhSachVe = danhSachGheDangDat.map((ghe, index) => {
                                            return { 'maGhe': ghe.maGhe, 'giaVe': ghe.giaVe }
                                        })
                                        let thongTinDatVe = {
                                            "maLichChieu": props.match.params.id,
                                            "danhSachVe": danhSachVe
                                        }
                                        dispatch(datVeAction(thongTinDatVe));
                                    }} type="button" className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-green-500 dark:text-gray-900">Đặt vé</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="02 Kết Quả Đặt Vé" key="2">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <NavLink to="/home" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-green-500">
                                    <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                    <a style={{ pointerEvents: "none" }} className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-green-500">Checkout</a>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <div className=''>
                        <section className="text-gray-600 body-font">
                            <div className="container px-5 py-12 mx-auto">
                                <div className="flex flex-col text-center w-full mb-20">
                                    <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Danh Sách Vé Đã Đặt</h1>
                                </div>
                                <div className="flex flex-wrap -m-4">
                                    {renderResultBooking()}
                                </div>
                            </div>
                        </section>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}
