import { Banner } from "../../_core/models/Banner"
import { Film } from "../../_core/models/Film"
import { DISPLAY_MODAL, HIDDEN_MODAL } from "../types/QuanLyHOC"
import { SEARCH_DANH_SACH_PHIM, SET_CHI_TIET_PHIM, SET_DANH_SACH_BANNER, SET_DANH_SACH_PHIM, SET_DANH_SACH_PHIM_DANG_CHIEU, SET_DANH_SACH_PHIM_SAP_CHIEU } from "../types/QuanLyPhimType"

const initialState = {
    arrBanner: [new Banner()],
    arrPhim: [new Film()],
    dangChieu: false,
    sapChieu: false,
    arrPhimDefault: [new Film()],
    thongTinPhim: {},
    thongTinChiTietVe: {},
    visibleModalHoc: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_DANH_SACH_BANNER: {
            return { ...state, arrBanner: action.arrBanner }
        }
        case SET_DANH_SACH_PHIM: {
            return { ...state, arrPhim: action.arrPhim, arrPhimDefault: action.arrPhim }
        }
        case SET_DANH_SACH_PHIM_DANG_CHIEU: {
            state.dangChieu = true;
            state.sapChieu = false;
            state.arrPhim = state.arrPhimDefault.filter(film => film.dangChieu === state.dangChieu);
            return { ...state }
        }
        case SET_DANH_SACH_PHIM_SAP_CHIEU: {
            state.dangChieu = false;
            state.sapChieu = true;
            state.arrPhim = state.arrPhimDefault.filter(film => film.sapChieu === state.sapChieu);
            return { ...state }
        }
        case SET_CHI_TIET_PHIM: {
            return { ...state, thongTinPhim: action.thongTinPhim }
        }
        case DISPLAY_MODAL: {
            return { ...state, visibleModalHoc: true, thongTinChiTietVe: action.thongTinChiTietVe }
        }
        case HIDDEN_MODAL: {
            return { ...state, visibleModalHoc: false }
        }
        default:
            return state
    }
}
