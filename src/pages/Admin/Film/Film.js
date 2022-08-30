import React, { useEffect, useRef, useState } from 'react'
import { Button, Space, Table } from 'antd';
import { Divider, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, layDanhSachPhimKeywordAction, xoaPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { history } from '../../../utils/history';
import { THONG_TIN_PHIM } from '../../../utils/configSystems';
import { SEARCH_DANH_SACH_PHIM } from '../../../redux/types/QuanLyPhimType';
export default function Film() {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [page, setPage] = React.useState(1);
  let { arrPhim } = useSelector(state => state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const handleChangeSearch = (e) => {
    if (e.target.value.length > 0) {
      dispatch(layDanhSachPhimKeywordAction(e.target.value));
    } else {
      dispatch(layDanhSachPhimAction());
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
      title: 'Hình Ảnh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      render: (text, record, index) => {
        return <img style={{ width: '50px', height: '50px' }} src={text} alt='' />
      },
      width: '15%',
    },
    {
      title: 'Tên Phim',
      dataIndex: 'tenPhim',
      key: 'tenPhim',
      dataIndex: 'tenPhim',
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortOrder: sortedInfo.columnKey === 'tenPhim' ? sortedInfo.order : null,
      ellipsis: true,
      render: (text, record, index) => {
        return <span className='font-semibold'>{text}</span>
      },
      width: '30%',
    },
    {
      title: 'Đánh giá',
      dataIndex: 'danhGia',
      key: 'danhGia',
      render: (text, record, index) => {
        return <Tag color="success">{text}</Tag>
      },
      width: '10%',
    },
    {
      title: 'Ngày khởi chiếu',
      dataIndex: 'ngayKhoiChieu',
      key: 'ngayKhoiChieu',
      render: (text, record, index) => {
        return <span>{moment(text).format("DD/MM/YYYY")}</span>
      },
      width: '15%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record, index) => {
        return <>
          <Button onClick={() => {
            history.push(`/admin/film/edit/${record.maPhim}`);
          }} className='mr-2'>Edit</Button>
          <Button onClick={() => {
            dispatch(xoaPhimAction(record.maPhim))
          }} danger className='mr-2'>Delete</Button>
          <Button onClick={() => {
            localStorage.setItem(THONG_TIN_PHIM, JSON.stringify(record));
            history.push(`/admin/film/createschedule/${record.maPhim}`);
          }} >Schedule</Button>
        </>
      },
    },
  ];
  useEffect(() => {
    dispatch(layDanhSachPhimAction());
  }, []);
  return (
    <div>
      <div className='grid grid-cols-3'>
        <h3 className='text-2xl font-semibold col-span-2'>Quản Lý Phim</h3>
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
      <Table columns={columns} dataSource={arrPhim} onChange={handleChange} pagination={{
        onChange(current) {
          setPage(current);
        },
        pageSize: 6,
      }} rowKey="maPhim" />
    </div>
  )
}
