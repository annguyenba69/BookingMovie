import { SET_THONG_TIN_LICH_CHIEU_HE_THONG_RAP, SET_THONG_TIN_LICH_CHIEU_PHIM } from "../types/QuanLyRapType"


const initialState = {
  arrLichChieuHeThongRap: [],
  thongTinLichChieuPhim: {}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_THONG_TIN_LICH_CHIEU_HE_THONG_RAP: {
      return { ...state, arrLichChieuHeThongRap: action.arrLichChieuHeThongRap }
    }
    case SET_THONG_TIN_LICH_CHIEU_PHIM: {
      return { ...state, thongTinLichChieuPhim: action.thongTinLichChieuPhim }
    }
    default:
      return state
  }
}
