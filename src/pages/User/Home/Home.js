import { useEffect } from "react";
import HomeCarousel from "../../../components/HomeCarousel/HomeCarousel";
import RSlick from "../../../components/RSlick/RSlick";
import { useDispatch, useSelector } from 'react-redux'
import { layDanhSachBannerAction, layDanhSachPhimAction } from "../../../redux/actions/QuanLyPhimAction";
import "./Home.css"
import HomeMenu from "../../../components/HomeMenu/HomeMenu";
import { layThongTinLichChieuHeThongRap } from "../../../redux/actions/QuanLyRapAction";

export default function Home() {
  const { arrBanner, arrPhim } = useSelector(state => state.QuanLyPhimReducer);
  const { arrLichChieuHeThongRap } = useSelector(state => state.QuanLyRapReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachBannerAction());
    dispatch(layDanhSachPhimAction());
    dispatch(layThongTinLichChieuHeThongRap());
  }, []);
  return (
    <div className="w-screen pb-28">
      <HomeCarousel arrBanner={arrBanner} className="w-screen"></HomeCarousel>
      <div className="container mx-auto">
        <RSlick arrPhim={arrPhim}></RSlick>
      </div>
      <div className="container mx-auto mt-14 home-menu-bg">
        <HomeMenu arrLichChieuHeThongRap={arrLichChieuHeThongRap}></HomeMenu>
      </div>
    </div>
  )
}
