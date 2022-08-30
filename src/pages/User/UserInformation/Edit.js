import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { capNhatThongTinNguoiDungAction, thongTinTaiKhoanAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { TOKEN, USER_LOGIN } from '../../../utils/configSystems';
import { Redirect } from 'react-router-dom';
export default function Edit(props) {
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinNguoiDung?.taiKhoan,
            matKhau: '',
            email: thongTinNguoiDung?.email,
            hoTen: thongTinNguoiDung?.hoTen,
            soDt: thongTinNguoiDung?.soDT,
            maLoaiNguoiDung: 'KhachHang',
            maNhom: 'GP01'
        },
        validationSchema: Yup.object({
            hoTen: Yup.string()
                .required('Required'),
        }),
        onSubmit: values => {
            if (values.matKhau !== '') {
                dispatch(capNhatThongTinNguoiDungAction(values));
            } else {
                values.matKhau = thongTinNguoiDung.matKhau;
                dispatch(capNhatThongTinNguoiDungAction(values));
            }
        },
    });
    useEffect(() => {
        dispatch(thongTinTaiKhoanAction());
    }, [])
    if(!localStorage.getItem(USER_LOGIN)){
        return <Redirect to={"/login"}></Redirect>
    }
    return (
        <div className="w-screen pb-28 pt-36">
            <div className="container w-2/3  rounded-md mx-auto  home-menu-bg" style={{ opacity: '1', background: 'none' }}>
                <div className="mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="mt-5 md:mt-0 md:col-span-3">
                            <form onSubmit={formik.handleSubmit}>
                                <h3 className="text-3xl text-white text-center">Chỉnh sửa thông tin cá nhân</h3>
                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="taiKhoan" className="block text-sm font-medium text-gray-700">Tải Khoản</label>
                                                <input value={formik.values.taiKhoan || ''} readOnly type="text" name="taiKhoan" id="taiKhoan" autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="matKhau" className="block text-sm font-medium text-gray-700">Mật Khẩu</label>
                                                <input value={formik.values.matKhau || ''} onChange={formik.handleChange} type="password" name="matKhau" id="matKhau" autoComplete="family-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                                <input value={formik.values.email || ''} readOnly type="text" name="email" id="email" autoComplete="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="soDt" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                                                <input value={formik.values.soDt || ''} onChange={formik.handleChange} type="text" name="soDt" id="soDt" autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="hoTen" className="block text-sm font-medium text-gray-700">Họ Tên</label>
                                                <input value={formik.values.hoTen || ''} onChange={formik.handleChange} type="text" name="hoTen" id="hoTen" autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
