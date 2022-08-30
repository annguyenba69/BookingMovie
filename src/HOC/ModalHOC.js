import React, { useState } from 'react'
import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { HIDDEN_MODAL } from '../redux/types/QuanLyHOC';
import moment from 'moment';
export default function ModalHOC() {
    const { thongTinChiTietVe, visibleModalHoc } = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();
    const handleOk = () => {
        dispatch({ type: HIDDEN_MODAL });
    };
    return (
        <>
            <Modal title="Thông tin chi tiết vé" width={1000} centered visible={visibleModalHoc} onOk={handleOk} footer={[
                <Button key="submit" type="primary" onClick={handleOk}>
                    Ok
                </Button>
            ]}>
                <div className="rounded-md shadow-md dark:bg-gray-100 text-black">
                    <div className="flex flex-col justify-between p-6 space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-semibold tracking-wide">Thông tin đặt vé</h2>
                            <h3 className="text-lg font-semibold uppercase">{thongTinChiTietVe?.tenPhim}</h3>
                            <p className='text-slate-600'>Thời lượng: {thongTinChiTietVe?.thoiLuongPhim}</p>
                            <p className='text-slate-600'>Tên rạp: {thongTinChiTietVe.danhSachGhe?.[0].tenHeThongRap} - {thongTinChiTietVe.danhSachGhe?.[0].tenRap}</p>
                            {/* <p className='text-slate-600'>Ngày chiếu: {moment(thongTinPhim.ngayChieu).format('DD/MM/YYYY')}</p> */}
                            <hr></hr>
                            <div className='grid grid-cols-3'>
                                <p className='font-semibold text-lg col-span-1'>Danh sách ghế:</p>
                                <div className='col-span-2'>
                                    {thongTinChiTietVe.danhSachGhe?.map((ghe, index) => {
                                        return <span key={index} className='ghe-md inline-block'>{ghe.tenGhe}</span>
                                    })}
                                </div>
                            </div>
                            <hr></hr>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
