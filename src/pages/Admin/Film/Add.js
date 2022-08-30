import React, { useRef, useState } from 'react'
import "./Add.css"
import { Editor } from '@tinymce/tinymce-react';
import { PlusOutlined } from '@ant-design/icons';
import { Image } from 'antd';
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
    Modal, Upload
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { themPhimUploadHinhAction } from '../../../redux/actions/QuanLyPhimAction';
import * as Yup from 'yup';

export default function Add() {
    const editorRef = useRef(null);
    const [imgSrc, setImgSrc] = useState("");
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},
        },
        validationSchema: Yup.object({
            tenPhim: Yup.string()
                .required('Bạn phải nhập tên phim'),
            trailer: Yup.string()
                .required('Bạn phải nhập trailer'),
            moTa: Yup.string()
                .required('Bạn phải nhập mô tả'),
            ngayKhoiChieu: Yup.string()
                .required('Bạn phải nhập ngày khởi chiếu'),
        }),
        onSubmit: values => {
            values.maNhom = "GP01"
            //Tạo đối tượng formData
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name);
                }
            }
            dispatch(themPhimUploadHinhAction(formData));
        },
    });
    const onChangeDatepicker = (date, dateString) => {
        if (date !== null) {
            formik.setFieldValue("ngayKhoiChieu", moment(date._d).format("DD/MM/YYYY"));
        }
    };
    const onChangeDanhGia = (value) => {
        formik.setFieldValue("danhGia", value);
    };
    const onEditorChange = (value, editor) => {
        formik.setFieldValue("moTa", value);
    }
    const onChangeSwitch = (checked, event) => {
        formik.setFieldValue(event.target.name, checked)
    }
    const onChangeFile = (event) => {
        let file = event.target.files[0];
        if (file.type === "image/jpeg" || file.type === "image/jpg"
            || file.type === "image/gif" || file.type === "image/png") {
            //Tạo đối tượng để đọc file
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                setImgSrc(event.target.result);//Hình base64
            }
            //Đem dữ liệu lưu formik
            formik.setFieldValue('hinhAnh', file);
        }
    }
    return (
        <div className='w-full'>
            <div className=''>
                <div className='card'>
                    <div className='card-header'>
                        <p className='card-title '>Thêm Phim</p>
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
                            <Form.Item label="Tên Phim">
                                <Input name='tenPhim' onChange={formik.handleChange} />
                                {formik.touched.tenPhim && formik.errors.tenPhim ? (
                                    <div className='text-red-400'>{formik.errors.tenPhim}</div>
                                ) : null}
                            </Form.Item>
                            <Form.Item label="Trailer">
                                <Input name='trailer' onChange={formik.handleChange} />
                                {formik.touched.trailer && formik.errors.trailer ? (
                                    <div className='text-red-400'>{formik.errors.trailer}</div>
                                ) : null}
                            </Form.Item>
                            <Form.Item label="Mô Tả">
                                <Editor
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue=""
                                    init={{
                                        height: 300,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar: 'undo redo | formatselect | ' +
                                            'bold italic backcolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                    onEditorChange={onEditorChange}
                                />
                                {formik.touched.moTa && formik.errors.moTa ? (
                                    <div className='text-red-400'>{formik.errors.moTa}</div>
                                ) : null}
                            </Form.Item>
                            <Form.Item label="Ngày Khởi Chiếu">
                                <DatePicker format={"DD/MM/YYYY"} onChange={onChangeDatepicker} />
                                {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu ? (
                                    <div className='text-red-400'>{formik.errors.ngayKhoiChieu}</div>
                                ) : null}
                            </Form.Item>
                            <Form.Item label="Đang Chiếu" >
                                <Switch name="dangChieu" onChange={onChangeSwitch} />
                            </Form.Item>
                            <Form.Item label="Sắp Chiếu" >
                                <Switch name="sapChieu" onChange={onChangeSwitch} />
                            </Form.Item>
                            <Form.Item label="Hot" >
                                <Switch name="hot" onChange={onChangeSwitch} />
                            </Form.Item>
                            <Form.Item label="Đánh giá" >
                                <InputNumber min={1} max={10} defaultValue={0} onChange={onChangeDanhGia} />
                            </Form.Item>
                            <Form.Item label="Hình Ảnh" >
                                <input onChange={onChangeFile} type="file" accept="image/png, image/jpeg, image/jpg" />
                                {imgSrc !== "" ? <Image 
                                    width={200}
                                    src={imgSrc}
                                />: ''}
                                {formik.touched.hinhAnh && formik.errors.hinhAnh ? (
                                    <div className='text-red-400'>{formik.errors.hinhAnh}</div>
                                ) : null}
                            </Form.Item >
                        </Form>
                    </div>
                    <div className='card-footer text-right'>
                        <button onClick={() => {
                            formik.handleSubmit()
                        }} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
