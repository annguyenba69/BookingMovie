import { useEffect } from "react";
import { NavLink, Redirect, Route } from "react-router-dom";
import React, { useState } from 'react';
import "./AdminTemplate.css"
import { DownOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { openNotificationWithIcon } from "../../utils/notification";
import { history } from "../../utils/history";
import { TOKEN, USER_LOGIN } from "../../utils/configSystems";
export const AdminTemplate = (props) => {
  const { Component, ...restParam } = props;
  const { thongTinDangNhap } = useSelector(state => state.QuanLyNguoiDungReducer);
  console.log(thongTinDangNhap)
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  if (thongTinDangNhap.maLoaiNguoiDung !== 'QuanTri') {
    openNotificationWithIcon("error", 'Bạn không có quyền truy cập');
    return <Redirect to={"/home"} />
  }
  return <Route {...restParam} render={(propsRoute) => {
    return <div className="flex">
      <div className=" px-9 p-3 space-y-2 w-60 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
        <div className="flex items-center p-2 space-x-4">
          <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
          <div>
            <h2 className="text-lg font-semibold text-white">{thongTinDangNhap.taiKhoan}</h2>
            <span className="flex items-center space-x-1">
              <p className="text-xs hover:underline dark:text-gray-400">{thongTinDangNhap.email}</p>
            </span>
          </div>
        </div>
        <div className="divide-y divide-gray-700">
          <ul className="pt-2 pb-4 space-y-1 text-sm pr-10">
            <li className="dark:bg-gray-800 dark:text-gray-50 main-menu">
              <NavLink to={"/admin/film/list"} rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                  <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                </svg>
                <span>Film</span>
                <DownOutlined />
              </NavLink>
              <ul className="sub-menu ">
                <li>
                  <NavLink to={"/admin/film/list"} rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                    <span>List</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/admin/film/add"} rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                    <span>Add</span>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="dark:bg-gray-800 dark:text-gray-50 main-menu">
              <NavLink to={"/admin/user/list"} rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                  <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                </svg>
                <span>User</span>
                <DownOutlined />
              </NavLink>
              <ul className="sub-menu ">
                <li>
                  <NavLink to={"/admin/user/list"} rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                    <span>List</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"/admin/user/adduser"} rel="noopener noreferrer" className="flex items-center p-2 space-x-3 rounded-md">
                    <span>Add</span>
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="pt-4 pb-2 space-y-1 text-sm">
            <li>
              <button onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN);
                history.push("/login")
              }} rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="right-box w-full min-h-screen">
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900 w-full">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <a href="https://flowbite.com/" className="flex items-center">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Booking Movie</span>
            </a>
            <button data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
              <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
          </div>
        </nav>
        <div className="main-content  px-10 pt-10 h-full" style={{ backgroundColor: "#f4f6f9" }}>
          <Component {...propsRoute} ></Component>
        </div>
      </div>
    </div>
  }}>

  </Route >
}