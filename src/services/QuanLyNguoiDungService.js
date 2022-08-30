import { baseService } from "./baseService";

class QuanLyNguoiDungService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }
    dangNhap = (thongTinDangNhap) => {
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
    }
    dangKy = (thongTinDangKy) => {
        return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
    }
    capNhatThongTinNguoiDung = (thongTinNguoiDung) => {
        return this.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, thongTinNguoiDung);
    }
    thongTinTaiKhoan = () => {
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
    }
    layDanhSachNguoiDung = () => {
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung`);
    }
    layDanhSachNguoiDungKeyword = (keyword) => {
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?tuKhoa=${keyword}`);
    }
    layDanhSachLoaiNguoiDung = () => {
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
    }
    themNguoiDung = (nguoiDung) => {
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, nguoiDung);
    }
    timKiemNguoiDung = (tuKhoa) => {
        return this.get(`/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${tuKhoa}`)
    }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();