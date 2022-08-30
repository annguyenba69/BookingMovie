import { stringify } from "rc-field-form/es/useWatch";
import { TOKEN, USER_LOGIN } from "../../utils/configSystems";
import { SET_DANH_SACH_LOAI_NGUOI_DUNG, SET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_DANG_NHAP, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG_CHINH_SUA } from "../types/QuanLyNguoiDungType"

let thongTinDangNhapUser = {};
if (localStorage.getItem(USER_LOGIN)) {
    thongTinDangNhapUser = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
    thongTinDangNhap: thongTinDangNhapUser,
    thongTinNguoiDung: {},
    arrNguoiDung: [],
    arrLoaiNguoiDung: [],
    thongTinNguoiDungChinhSua: {}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_THONG_TIN_DANG_NHAP: {
            const { thongTinDangNhap } = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
            localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
            return { ...state, thongTinDangNhap: thongTinDangNhap }
        }
        case SET_THONG_TIN_NGUOI_DUNG: {
            return { ...state, thongTinNguoiDung: action.thongTinNguoiDung }
        }
        case SET_DANH_SACH_NGUOI_DUNG: {
            return { ...state, arrNguoiDung: action.arrNguoiDung }
        }
        case SET_DANH_SACH_LOAI_NGUOI_DUNG: {
            return { ...state, arrLoaiNguoiDung: action.arrLoaiNguoiDung }
        }
        case SET_THONG_TIN_NGUOI_DUNG_CHINH_SUA:{
            return {...state, thongTinNguoiDungChinhSua: action.thongTinNguoiDungChinhSua}
        }
        default:
            return state
    }
}
