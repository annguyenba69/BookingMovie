import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { STATUS_CODE } from "../../utils/configSystems";
import { history } from "../../utils/history";
import { openNotificationWithIcon } from "../../utils/notification";
import { SET_DISPLAY_LOADING, SET_HIDDENT_LOADING } from "../types/LoadingType";
import { SET_DANH_SACH_LOAI_NGUOI_DUNG, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_DANG_NHAP, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG_CHINH_SUA } from "../types/QuanLyNguoiDungType";

export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
            if (status === STATUS_CODE.SUCCESS) {
                openNotificationWithIcon('success', 'Logged In Successfully', 'You can now make movie ticket bookings');
                dispatch({
                    type: SET_THONG_TIN_DANG_NHAP,
                    thongTinDangNhap: data.content
                })
                history.push("/home")
            }
        } catch (err) {
            openNotificationWithIcon('error', 'Login Failed', err.response.data.content);
        }
    }
}

export const dangKyAction = (thongTinDangKy) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.dangKy(thongTinDangKy);
            if (status === STATUS_CODE.SUCCESS) {
                openNotificationWithIcon('success', 'Successful Account Registration', 'Please log in to use the systems services');
                history.push("/login")
            }
        } catch (err) {
            openNotificationWithIcon('error', 'Register Failed', err.response.data.content);
        }
    }
}

export const thongTinTaiKhoanAction = () => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.thongTinTaiKhoan();
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: data.content
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const capNhatThongTinNguoiDungAction = (thongTinNguoiDung) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.capNhatThongTinNguoiDung(thongTinNguoiDung);
            if (status === STATUS_CODE.SUCCESS) {
                openNotificationWithIcon('success', 'Update successful',);
            }
        } catch (err) {
            openNotificationWithIcon('error', 'Update Failed', err.response.data.content);
            console.log(err)
        }
    }
}

export const layDanhSachNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.layDanhSachNguoiDung();
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_DANH_SACH_NGUOI_DUNG,
                    arrNguoiDung: data.content
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const layDanhSachNguoiDungKeywordAction = (keyword) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.layDanhSachNguoiDungKeyword(keyword);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_DANH_SACH_NGUOI_DUNG,
                    arrNguoiDung: data.content
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const layDanhSachLoaiNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_DANH_SACH_LOAI_NGUOI_DUNG,
                    arrLoaiNguoiDung: data.content
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const themNguoiDungAction = (nguoiDung) => {
    return async (dispatch) => {
        try {
            await dispatch({ type: SET_DISPLAY_LOADING })
            const { data, status } = await quanLyNguoiDungService.themNguoiDung(nguoiDung);
            if (status === STATUS_CODE.SUCCESS) {
                await dispatch({ type: SET_HIDDENT_LOADING });
                openNotificationWithIcon('success', 'Successful', data.content);
                history.push('/admin/user/list')
            }

        } catch (err) {
            await dispatch({ type: SET_HIDDENT_LOADING });
            console.log(err);
            openNotificationWithIcon('error', 'error', err.response.data.content);
        }
    }
}

export const timKiemNguoiDung = (tuKhoa) => {
    return async (dispatch) => {
        try {
            await dispatch({ type: SET_DISPLAY_LOADING })
            const { data, status } = await quanLyNguoiDungService.timKiemNguoiDung(tuKhoa);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG_CHINH_SUA,
                    thongTinNguoiDungChinhSua: data.content
                })
                await dispatch({ type: SET_HIDDENT_LOADING });
            }
        } catch (err) {
            await dispatch({ type: SET_HIDDENT_LOADING });
            console.log(err);
        }
    }
}
