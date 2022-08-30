import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux'
import { dangKyAction, dangNhapAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { NavLink } from 'react-router-dom';
export default function Register(props) {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            hoTen: ''
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string()
                .required('Required'),
            matKhau: Yup.string()
                .max(32, 'Must be 32 characters or less')
                .min(6, 'Must be 6 characters or more')
                .required('Required'),
            email: Yup.string()
                .required('Required')
                .email('Invalid email address'),
            soDt: Yup.string()
                .required('Required')
                .matches(/^[0-9]+$/, 'Is not in correct format phone number'),
            hoTen: Yup.string()
                .required('Required'),
        }),
        onSubmit: values => {
            dispatch(dangKyAction(values));
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className="lg:w-1/2 xl:max-w-screen-sm">
            <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
                <div className="cursor-pointer flex items-center">
                    <div>
                        <svg className="w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 225 225" style={{ enableBackground: 'new 0 0 225 225' }} xmlSpace="preserve">
                            <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n                                    .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                " }} />
                            <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                                <g>
                                    <path id="Layer0_0_1_STROKES" className="st0" d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">Booking Movie</div>
                </div>
            </div>
            <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
                <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
xl:text-bold">Register</h2>
                <div className="mt-12">
                    <div>
                        <div className="text-sm font-bold text-gray-700 tracking-wide">Username</div>
                        <input name='taiKhoan' onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="Username" />
                        {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
                            <span className='text-red-400 text-sm'>{formik.errors.taiKhoan}</span>
                        ) : null}
                    </div>
                    <div className="mt-4">
                        <div className="text-sm font-bold text-gray-700 tracking-wide">Password</div>
                        <input name='matKhau' onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="password" placeholder="Enter your password" />
                        {formik.touched.matKhau && formik.errors.matKhau ? (
                            <span className='text-red-400 text-sm'>{formik.errors.matKhau}</span>
                        ) : null}
                    </div>
                    <div className="mt-4">
                        <div className="text-sm font-bold text-gray-700 tracking-wide">Email</div>
                        <input name='email' onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="Email" />
                        {formik.touched.email && formik.errors.email ? (
                            <span className='text-red-400 text-sm'>{formik.errors.email}</span>
                        ) : null}
                    </div>
                    <div className="mt-4">
                        <div className="text-sm font-bold text-gray-700 tracking-wide">Phone Number</div>
                        <input name='soDt' onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="Phone Number" />
                        {formik.touched.soDt && formik.errors.soDt ? (
                            <span className='text-red-400 text-sm'>{formik.errors.soDt}</span>
                        ) : null}
                    </div>
                    <div className="mt-4">
                        <div className="text-sm font-bold text-gray-700 tracking-wide">FullName</div>
                        <input name='hoTen' onChange={formik.handleChange} className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500" type="text" placeholder="FullName" />
                        {formik.touched.hoTen && formik.errors.hoTen ? (
                            <span className='text-red-400 text-sm'>{formik.errors.hoTen}</span>
                        ) : null}
                    </div>
                    <div className="mt-10">
                        <button type='submit' className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
          shadow-lg">
                            Submit
                        </button>
                    </div>
                    <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                        You have an account ? <NavLink to={"/login"} className="cursor-pointer text-indigo-600 hover:text-indigo-800">Sign in</NavLink>
                    </div>
                    <div className="mt-4 text-sm font-display font-semibold text-gray-700 text-center">
                        <NavLink to={"/home"} className="cursor-pointer text-indigo-600 hover:text-indigo-800">Home</NavLink>
                    </div>
                </div>
            </div>
        </form >
    )
}
