import { baseService } from "./baseService";

class QuanLyRapService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    layThongTinLichChieuHeThongRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01`);
    }

    layThongTinLichChieuPhim = (maPhim)=>{
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
    }
}

export const quanLyRapService = new QuanLyRapService();