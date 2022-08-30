import { baseService } from "./baseService";

class QuanLyDatVeService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }
    layDanhSachPhongVe = (maLichChieu) => {
        return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
    }
    datVe = (thongTinDatVe) => {
        return this.post(`/api/QuanLyDatVe/DatVe`, thongTinDatVe);
    }
    taoLichChieu = (lichChieu) => {
        return this.post(`/api/QuanLyDatVe/TaoLichChieu`, lichChieu);
    }
}

export const quanLyDatVeService = new QuanLyDatVeService();