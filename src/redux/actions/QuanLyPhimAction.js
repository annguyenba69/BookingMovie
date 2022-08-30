import { quanLyPhimService } from "../../services/QuanLyPhimService"
import { STATUS_CODE } from "../../utils/configSystems";
import { history } from "../../utils/history";
import { openNotificationWithIcon } from "../../utils/notification";
import { SET_DISPLAY_LOADING, SET_HIDDENT_LOADING } from "../types/LoadingType";
import { SET_CHI_TIET_PHIM, SET_DANH_SACH_BANNER, SET_DANH_SACH_PHIM } from "../types/QuanLyPhimType";

export const layDanhSachBannerAction = () => {
    return async (dispatch) => {
        try {
            await dispatch({ type: SET_DISPLAY_LOADING })
            const { data, status } = await quanLyPhimService.layDanhSachBanner();
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_DANH_SACH_BANNER,
                    arrBanner: data.content
                })
            }
            await dispatch({ type: SET_HIDDENT_LOADING })
        } catch (err) {
            console.log(err.response.data);
        }
    }
}

export const layDanhSachPhimAction = () => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyPhimService.layDanhSachPhim();
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_DANH_SACH_PHIM,
                    arrPhim: data.content
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const layDanhSachPhimKeywordAction = (keyword) => {
    return async (dispatch) => {
        try {
            const { data, status } = await quanLyPhimService.layDanhSachPhimKeyword(keyword);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_DANH_SACH_PHIM,
                    arrPhim: data.content
                })
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const layThongTinPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            await dispatch({ type: SET_DISPLAY_LOADING })
            const { data, status } = await quanLyPhimService.layThongTinPhim(maPhim);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_CHI_TIET_PHIM,
                    thongTinPhim: data.content
                })
            }
            await dispatch({ type: SET_HIDDENT_LOADING })
        } catch (err) {
            await dispatch({ type: SET_HIDDENT_LOADING })
            console.log(err);
        }
    }
}

export const themPhimUploadHinhAction = (formData) => {
    return async (dispatch) => {
        try {
            await dispatch({ type: SET_DISPLAY_LOADING })
            const { data, status } = await quanLyPhimService.themPhimUploadHinh(formData);
            if (status === STATUS_CODE.SUCCESS) {
                history.push("/admin/film/list");
            }
            await dispatch({ type: SET_HIDDENT_LOADING })
        } catch (err) {
            await dispatch({ type: SET_HIDDENT_LOADING })
            openNotificationWithIcon('success', err.response.data?.message)
        }
    }
}

export const capNhatPhimUploadAction = (formData) => {
    return async (dispatch) => {
        try {
            await dispatch({ type: SET_DISPLAY_LOADING })
            const { data, status } = await quanLyPhimService.capNhatPhimUpload(formData);
            if (status === STATUS_CODE.SUCCESS) {
                openNotificationWithIcon('success', 'Update Successfull Film', data.content);
                history.push("/admin/film/list");
            }
            await dispatch({ type: SET_HIDDENT_LOADING })
        } catch (err) {
            await dispatch({ type: SET_HIDDENT_LOADING })
            openNotificationWithIcon('danger', err.response.data?.message)
        }
    }
}

export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            await dispatch({ type: SET_DISPLAY_LOADING })
            const { data, status } = await quanLyPhimService.xoaPhim(maPhim);
            if (status === STATUS_CODE.SUCCESS) {
                dispatch(layDanhSachPhimAction());
                openNotificationWithIcon('success', 'Delete Successful Film', data.content);
            }
            await dispatch({ type: SET_HIDDENT_LOADING })
        } catch (err) {
            await dispatch({ type: SET_HIDDENT_LOADING })
            console.log(err);
        }
    }
}