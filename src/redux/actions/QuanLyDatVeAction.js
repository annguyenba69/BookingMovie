import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { STATUS_CODE } from "../../utils/configSystems";
import { history } from "../../utils/history";
import { openNotificationWithIcon } from "../../utils/notification";
import { SET_DISPLAY_LOADING, SET_HIDDENT_LOADING } from "../types/LoadingType";
import { SET_ACTIVE_KEY_TAB, SET_DANH_SACH_PHONG_VE, SET_RONG_DANH_SACH_GHE_DANG_DAT } from "../types/QuanLyDatVeType";

export const layDanhSachPhongVeAction = (maLichChieu) => {
    return async (dispatch) => {
        try {
            await dispatch({ type: SET_DISPLAY_LOADING })
            const { data, status } = await quanLyDatVeService.layDanhSachPhongVe(maLichChieu);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_DANH_SACH_PHONG_VE,
                    danhSachGhe: data.content.danhSachGhe,
                    thongTinPhim: data.content.thongTinPhim
                })
            }
            await dispatch({ type: SET_HIDDENT_LOADING })
        } catch (err) {
            await dispatch({ type: SET_HIDDENT_LOADING })
            console.log(err);
        }
    }
}

export const datVeAction = (thongTinDatVe) => {
    return async (dispatch) => {
        try {
            await dispatch({ type: SET_DISPLAY_LOADING })
            const { data, status } = await quanLyDatVeService.datVe(thongTinDatVe);
            await dispatch(layDanhSachPhongVeAction(thongTinDatVe.maLichChieu));
            await dispatch({
                type: SET_RONG_DANH_SACH_GHE_DANG_DAT
            })
            await dispatch({ type: SET_HIDDENT_LOADING });
            await dispatch({ type: SET_ACTIVE_KEY_TAB, activeKey: "2" })
            openNotificationWithIcon('success', 'Successful Ticket Booking', data.content);
        } catch (err) {
            console.log(err);
        }
    }
}

export const taoLichChieuAction = (lichChieu) => {
    return async (dispatch) => {
        try {
            await dispatch({ type: SET_DISPLAY_LOADING })
            const { data, status } = await quanLyDatVeService.taoLichChieu(lichChieu);
            await dispatch({ type: SET_HIDDENT_LOADING });
            openNotificationWithIcon('success', 'Success', data.content);
            history.push('/admin/film/list');
        } catch (err) {
            await dispatch({ type: SET_HIDDENT_LOADING });
            console.log(err);
        }
    }
}