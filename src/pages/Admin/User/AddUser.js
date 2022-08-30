import React, { useEffect } from 'react'
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { layDanhSachLoaiNguoiDungAction, themNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import * as Yup from 'yup';
import { useFormik } from 'formik';
export default function AddUser() {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maNhom: 'GP01',
            maLoaiNguoiDung: '',
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
            maLoaiNguoiDung: Yup.string()
                .required('Required'),
            hoTen: Yup.string()
                .required('Required'),
        }),
        onSubmit: values => {
            dispatch(themNguoiDungAction(values));
        },
    });
    const { arrLoaiNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);
    useEffect(() => {
        dispatch(layDanhSachLoaiNguoiDungAction());
    }, []);
    const option = arrLoaiNguoiDung?.map((loaiNguoiDung, index) => {
        return <Select.Option value={loaiNguoiDung.maLoaiNguoiDung} key={index}>{loaiNguoiDung.tenLoai}</Select.Option>
    })
    const onChangeSelect = (value) => {
        formik.setFieldValue('maLoaiNguoiDung', value);
    };
    return (
        <div className='w-full'>
            <div className=''>
                <div className='card'>
                    <div className='card-header'>
                        <p className='card-title '>Thêm Người Dùng</p>
                    </div>
                    <div className='card-body'>
                        <Form
                            labelCol={{
                                span: 3,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            layout="horizontal"
                            size={"default"}
                        >
                            <Form.Item label="Họ Tên">
                                <Input onChange={formik.handleChange} name='hoTen' />
                                {formik.touched.hoTen && formik.errors.hoTen ? (
                                    <div className='text-red-400'>{formik.errors.hoTen}</div>
                                ) : null}
                            </Form.Item>
                            <Form.Item label="Tài Khoản">
                                <Input onChange={formik.handleChange} name='taiKhoan' />
                                {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
                                    <div className='text-red-400'>{formik.errors.taiKhoan}</div>
                                ) : null}
                            </Form.Item>
                            <Form.Item label="Mật Khẩu">
                                <Input.Password onChange={formik.handleChange}
                                    name='matKhau'
                                    placeholder="input password"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                                {formik.touched.matKhau && formik.errors.matKhau ? (
                                    <div className='text-red-400'>{formik.errors.matKhau}</div>
                                ) : null}
                            </Form.Item>
                            <Form.Item label="Email">
                                <Input onChange={formik.handleChange} name='email' />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className='text-red-400'>{formik.errors.email}</div>
                                ) : null}
                            </Form.Item>
                            <Form.Item label="Số Điện Thoại">
                                <Input onChange={formik.handleChange} name='soDt' />
                                {formik.touched.soDt && formik.errors.soDt ? (
                                    <div className='text-red-400'>{formik.errors.soDt}</div>
                                ) : null}
                            </Form.Item>
                            <Form.Item label="Loại Người Dùng">
                                <Select
                                    onChange={onChangeSelect}
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
                                    {option}
                                </Select>
                                {formik.touched.maLoaiNguoiDung && formik.errors.maLoaiNguoiDung ? (
                                    <div className='text-red-400'>{formik.errors.maLoaiNguoiDung}</div>
                                ) : null}
                            </Form.Item>
                        </Form>
                    </div>
                    <div className='card-footer text-right'>
                        <button onClick={formik.handleSubmit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
