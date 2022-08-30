import { DatePicker, Form, Input, InputNumber, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { THONG_TIN_PHIM } from '../../../utils/configSystems'
import { useDispatch, useSelector } from 'react-redux'
import { layThongTinLichChieuHeThongRap } from '../../../redux/actions/QuanLyRapAction';
import { Option } from 'antd/lib/mentions';
import _ from 'lodash';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { taoLichChieuAction } from '../../../redux/actions/QuanLyDatVeAction';
export default function CreateSchedule(props) {
    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: 0,
            heThongRap: ''
        },
        validationSchema: Yup.object({
            ngayChieuGioChieu: Yup.string()
                .required('Bạn phải chọn lịch chiếu'),
            maRap: Yup.string()
                .required('Bạn phải chọn rạp chiếu'),
            giaVe: Yup.number()
                .max(200000, 'Giá vé tối đa 200000')
                .min(75000, 'Giá vé tối thiểu 75000')
                .required('Bạn phải chọn giá vé'),
            heThongRap: Yup.string()
                .required('Bạn phải chọn hệ thống rạp'),
        }),
        onSubmit: values => {
            dispatch(taoLichChieuAction(values));
        },
    });
    const [lstCumRap, setLstCumRap] = useState();
    const thongTinPhim = JSON.parse(localStorage.getItem(THONG_TIN_PHIM));
    const dispatch = useDispatch();
    const { arrLichChieuHeThongRap } = useSelector(state => state.QuanLyRapReducer);
    useEffect(() => {
        dispatch(layThongTinLichChieuHeThongRap());
    }, [])

    const handleChange = (value) => {
        setLstCumRap(_.first(arrLichChieuHeThongRap.filter(heThongRap => heThongRap.maHeThongRap === value)).lstCumRap);
        formik.setFieldValue('heThongRap', value)
    };
    const handleChangeCumRap = (value) => {
        formik.setFieldValue('maRap', value)
    }
    const onChangeDate = (date, dateString) => {
        if (date !== null) {
            formik.setFieldValue('ngayChieuGioChieu', moment(date._d).format('DD/MM/yyyy hh:mm:ss'))
        }
    };
    const onChangeNumber = (value) => {
        formik.setFieldValue('giaVe', value)
    };
    return (
        <div className='w-full'>
            <div className=''>
                <div className='card'>
                    <div className='card-header'>
                        <p className='card-title '>Tạo lịch chiếu</p>
                    </div>
                    <div className='card-body grid grid-cols-4'>
                        <div className='col-span-3'>
                            <Form className='col-span-3'
                                labelCol={{
                                    span: 4,
                                }}
                                wrapperCol={{
                                    span: 14,
                                }}
                                layout="horizontal"
                                size={"default"}
                            >
                                <Form.Item label="Hệ thống rạp">
                                    <Select
                                        onChange={handleChange}
                                        showSearch
                                        style={{
                                            width: '100%',
                                        }}
                                        placeholder="Search to Select"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.children.includes(input)}
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }
                                    >
                                        {arrLichChieuHeThongRap?.map((heThongRap, index) => {
                                            return <Select.Option value={heThongRap.maHeThongRap} key={index}>{heThongRap.tenHeThongRap}</Select.Option>
                                        })}
                                    </Select>
                                    {formik.touched.heThongRap && formik.errors.heThongRap ? (
                                        <div className='text-red-500'>{formik.errors.heThongRap}</div>
                                    ) : null}
                                </Form.Item>
                                <Form.Item label="Cụm rạp">
                                    <Select
                                        onChange={handleChangeCumRap}
                                        showSearch
                                        style={{
                                            width: '100%',
                                        }}
                                        placeholder="Search to Select"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.children.includes(input)}
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }
                                    >
                                        {lstCumRap?.map((cumRap, index) => {
                                            return <Select.Option value={cumRap.maCumRap} key={index}>{cumRap.tenCumRap}</Select.Option>
                                        })}
                                    </Select>
                                    {formik.touched.maRap && formik.errors.maRap ? (
                                        <div className='text-red-500'>{formik.errors.maRap}</div>
                                    ) : null}
                                </Form.Item>
                                <Form.Item label="Ngày Khởi Chiếu">
                                    <DatePicker onChange={onChangeDate} />
                                    {formik.touched.ngayChieuGioChieu && formik.errors.ngayChieuGioChieu ? (
                                        <div className='text-red-500'>{formik.errors.ngayChieuGioChieu}</div>
                                    ) : null}
                                </Form.Item>
                                <Form.Item label="Giá vé" >
                                    <InputNumber onChange={onChangeNumber} min={75000} max={200000} defaultValue={0} />
                                    {formik.touched.giaVe && formik.errors.giaVe ? (
                                        <div className='text-red-500'>{formik.errors.giaVe}</div>
                                    ) : null}
                                </Form.Item>
                            </Form>
                        </div>
                        <div className='col-span-1'>
                            <p className='text-2xl font-thin text-center'>{thongTinPhim.tenPhim}</p>
                            <img className='m-auto' style={{ width: 200, height: 250 }} src={thongTinPhim.hinhAnh} alt={thongTinPhim.hinhAnh} />
                        </div>
                    </div>
                    <div className='card-footer text-right'>
                        <button onClick={formik.handleSubmit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Tạo lịch chiếu</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

