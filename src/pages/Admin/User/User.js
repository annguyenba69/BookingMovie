import React, { useEffect, useRef, useState } from 'react'
import { Button, Space, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNguoiDungAction, layDanhSachNguoiDungKeywordAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { history } from '../../../utils/history';
export default function User() {
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [page, setPage] = React.useState(1);
    let { arrNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();
    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const handleChangeSearch = (e) => {
        if (e.target.value.length > 0) {
            dispatch(layDanhSachNguoiDungKeywordAction(e.target.value));
        } else {
            dispatch(layDanhSachNguoiDungAction());
        }
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (text, record, index) => {
                return (page - 1) * 10 + index
            },
            width: ' 10%',
        },
        {
            title: 'Tài Khoản',
            dataIndex: 'taiKhoan',
            key: 'taiKhoan',
            dataIndex: 'taiKhoan',
            sorter: (a, b) => {
                let taiKhoanA = a.taiKhoan.toLowerCase().trim();
                let taiKhoanB = b.taiKhoan.toLowerCase().trim();
                if (taiKhoanA > taiKhoanB) {
                    return 1;
                }
                return -1;
            },
            sortOrder: sortedInfo.columnKey === 'taiKhoan' ? sortedInfo.order : null,
            ellipsis: true,
            render: (text, record, index) => {
                return <span className='font-semibold'>{text}</span>
            },
            width: '15%',
        },
        {
            title: 'Họ Tên',
            dataIndex: 'hoTen',
            key: 'hoTen',
            dataIndex: 'hoTen',
            sorter: (a, b) => {
                let hoTenA = a.hoTen.toLowerCase().trim();
                let hoTenB = b.hoTen.toLowerCase().trim();
                if (hoTenA > hoTenB) {
                    return 1;
                }
                return -1;
            },
            sortOrder: sortedInfo.columnKey === 'hoTen' ? sortedInfo.order : null,
            ellipsis: true,
            render: (text, record, index) => {
                return <span className='font-semibold'>{text}</span>
            },
            width: '20%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '20%',
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'soDt',
            key: 'soDt',
            width: '10%',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) => {
                return <>
                    <Button onClick={()=>{
                        history.push(`/admin/user/edituser/${record.taiKhoan}`)
                    }} className='mr-2'>Edit</Button>
                    <Button danger className='mr-2'>Delete</Button>
                </>
            },
        },
    ];
    useEffect(() => {
        dispatch(layDanhSachNguoiDungAction());
    }, []);
    return (
        <div>
            <div className='grid grid-cols-3'>
                <h3 className='text-2xl font-semibold col-span-2'>Quản User</h3>
                <div className="">
                    <div className="mb-3 xl:w-96">
                        <div className="input-group relative flex  items-stretch mb-4">
                            <input name='search' onChange={handleChangeSearch} type="search" className="form-control relative  min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon3" />
                            <button className="btn inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" type="button" id="button-addon3">Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <Space
                style={{
                    marginBottom: 16,
                }}
            >
            </Space>
            <Table columns={columns} dataSource={arrNguoiDung} onChange={handleChange} pagination={{
                onChange(current) {
                    setPage(current);
                },
                pageSize: 8,
            }} rowKey="taiKhoan" />
        </div>
    )
}
