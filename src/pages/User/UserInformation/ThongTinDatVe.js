import React, { useEffect } from 'react'
import { Tabs } from 'antd';
import { Image } from 'antd';
import "./ThongTinDatVe.css";
import { useDispatch, useSelector } from 'react-redux'
import { thongTinTaiKhoanAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import { USER_LOGIN } from '../../../utils/configSystems';
import { Redirect } from 'react-router-dom';
import { DISPLAY_MODAL } from '../../../redux/types/QuanLyHOC';
const { TabPane } = Tabs;
export default function ThongTinDatVe() {
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(thongTinTaiKhoanAction());
    }, []);
    const renderThongTinDatVe = () => {
        return thongTinNguoiDung.thongTinDatVe?.map((ve, index) => {
            return <div key={index} className='grid grid-cols-8 bg-item mt-4' >
                <Image
                    className='rounded-md col-span-1'
                    width={100}
                    height={150}
                    src={ve.hinhAnh}
                />
                <div className='col-span-7 text-white'>
                    <h3 className='text-white font-semibold uppercase'>{ve.tenPhim}</h3>
                    <p className='mb-2'><span className='font-semibold'>Địa Chỉ</span>: {ve.danhSachGhe[0].tenHeThongRap}</p>
                    <p><span className='font-semibold'>Ngày Đặt</span>: {moment(ve.ngayDat).format("DD/MM/YYYY")}</p>
                    <button onClick={()=>{
                        dispatch({
                            type: DISPLAY_MODAL,
                            thongTinChiTietVe: ve
                        })
                    }} className='mt-2 p-2 mb-2 text-white bg-green-500 rounded-md block hover:bg-gray-400 hover:text-green-900 font-bold'>Chi tiết</button>
                </div>
            </div>
        })
    }
    if (!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to={"/login"}></Redirect>
    }
    return (
        <div className="w-screen pb-28 pt-36">
            <h3 className="text-3xl text-white text-center">Lịch sử đặt vé</h3>
            <div className="container w-2/3  rounded-md mx-auto  thong-tin-dat-ve-bg" style={{ opacity: '1', }}>
                <div className="mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="mt-5 md:mt-0 md:col-span-3">
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Lịch sử đặt vé" key="1">
                                    {renderThongTinDatVe()}
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
