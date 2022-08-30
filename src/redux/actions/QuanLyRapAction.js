import { quanLyRapService } from "../../services/QuanLyRapService";
import { STATUS_CODE } from "../../utils/configSystems";
import { SET_THONG_TIN_LICH_CHIEU_HE_THONG_RAP, SET_THONG_TIN_LICH_CHIEU_PHIM } from "../types/QuanLyRapType";


export const layThongTinLichChieuHeThongRap = () => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyRapService.layThongTinLichChieuHeThongRap();
            dispatch({
                type: SET_THONG_TIN_LICH_CHIEU_HE_THONG_RAP,
                arrLichChieuHeThongRap: data.content
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export const layThongTinLichChieuPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyRapService.layThongTinLichChieuPhim(maPhim);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_THONG_TIN_LICH_CHIEU_PHIM,
                    thongTinLichChieuPhim: data.content
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
}