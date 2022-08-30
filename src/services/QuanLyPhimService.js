import { baseService } from "./baseService";

class QuanLyPhimService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    layDanhSachBanner = () => {
        return this.get('/api/QuanLyPhim/LayDanhSachBanner');
    }

    layDanhSachPhim = ()=>{
        return this.get('/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01');
    }

    layDanhSachPhimKeyword = (keyword)=>{
        return this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${keyword}`);
    }

    layThongTinPhim = (maPhim)=>{
        return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
    }

    themPhimUploadHinh = (formData) => {
        return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, formData);
    }
    capNhatPhimUpload = (formData)=>{
        return this.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formData);
    }
    xoaPhim = (maPhim)=>{
        return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
    }
}

export const quanLyPhimService = new QuanLyPhimService();