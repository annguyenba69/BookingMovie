import { SET_ACTIVE_KEY_TAB, SET_DANH_SACH_GHE_DANG_DAT, SET_DANH_SACH_PHONG_VE, SET_RONG_DANH_SACH_GHE_DANG_DAT } from "../types/QuanLyDatVeType"


const initialState = {
    danhSachGhe: [],
    thongTinPhim: {},
    danhSachGheDangDat: [],
    activeKey: "1"
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_DANH_SACH_PHONG_VE: {
            const { danhSachGhe, thongTinPhim } = action;
            return { ...state, danhSachGhe: danhSachGhe, thongTinPhim: thongTinPhim }
        }
        case SET_DANH_SACH_GHE_DANG_DAT: {
            let danhSachGheDangDatUpdate = [...state.danhSachGheDangDat];
            let index = danhSachGheDangDatUpdate.findIndex(ghe => ghe.maGhe === action.ghe.maGhe);
            if (index !== -1) {
                danhSachGheDangDatUpdate.splice(index, 1);
            } else {
                danhSachGheDangDatUpdate.push(action.ghe);
            }
            return { ...state, danhSachGheDangDat: danhSachGheDangDatUpdate }

        }
        case SET_RONG_DANH_SACH_GHE_DANG_DAT:{
            return {...state, danhSachGheDangDat: [] }
        }
        case SET_ACTIVE_KEY_TAB:{
            return {...state, activeKey : action.activeKey}
        }
        default:
            return state
    }
}
