import {Router, Switch} from "react-router-dom";
import Loading from "./components/Loading/Loading";
import ModalHOC from "./HOC/ModalHOC";
import Add from "./pages/Admin/Film/Add";
import CreateSchedule from "./pages/Admin/Film/CreateSchedule";
import EditFilm from "./pages/Admin/Film/Edit";
import Film from "./pages/Admin/Film/Film";
import AddUser from "./pages/Admin/User/AddUser";
import EditUser from "./pages/Admin/User/EditUser";
import User from "./pages/Admin/User/User";
import About from "./pages/User/About/About";
import Advertise from "./pages/User/Advertise/Advertise";
import Checkout from "./pages/User/Checkout/Checkout";
import Detail from "./pages/User/Detail/Detail";
import Home from "./pages/User/Home/Home";
import Login from "./pages/User/LoginRegister/Login";
import Register from "./pages/User/LoginRegister/Register";
import Edit from "./pages/User/UserInformation/Edit";
import ThongTinDatVe from "./pages/User/UserInformation/ThongTinDatVe";
import { AdminTemplate } from "./templates/AdminTemplate/AdminTemplate";
import { CheckoutTemplate } from "./templates/CheckoutTemplate/CheckoutTemplate";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { LoginRegisterTemplate } from "./templates/LoginRegisterTemplate/LoginRegisterTemplate";
import { history } from "./utils/history";

function App() {
  return (
    <Router history={history}>
      <Loading></Loading>
      <ModalHOC></ModalHOC>
      <Switch>
        <HomeTemplate exact path="/" Component={Home}></HomeTemplate>
        <HomeTemplate exact path="/home" Component={Home}></HomeTemplate>
        <HomeTemplate exact path="/detail/:id" Component={Detail}></HomeTemplate>
        <HomeTemplate exact path="/edit"  Component={Edit} ></HomeTemplate>
        <HomeTemplate exact path="/thongtindatve"  Component={ThongTinDatVe} ></HomeTemplate>
        <HomeTemplate exact path="/about"  Component={About} ></HomeTemplate>
        <HomeTemplate exact path="/advertise"  Component={Advertise} ></HomeTemplate>
        <LoginRegisterTemplate exact path="/login" Component={Login} ></LoginRegisterTemplate>
        <LoginRegisterTemplate exact path="/register" Component={Register} ></LoginRegisterTemplate>
        <CheckoutTemplate exact path="/checkout/:id" Component={Checkout} ></CheckoutTemplate>

        <AdminTemplate exact path="/admin" Component={Film}></AdminTemplate>
        <AdminTemplate exact path="/admin/film/list" Component={Film}></AdminTemplate>
        <AdminTemplate exact path="/admin/film/add" Component={Add}></AdminTemplate>
        <AdminTemplate exact path="/admin/film/edit/:id" Component={EditFilm}></AdminTemplate>
        <AdminTemplate exact path="/admin/film/createschedule/:id" Component={CreateSchedule}></AdminTemplate>
      
        <AdminTemplate exact path="/admin/user/list" Component={User}></AdminTemplate>
        <AdminTemplate exact path="/admin/user/adduser" Component={AddUser}></AdminTemplate>
        <AdminTemplate exact path="/admin/user/edituser/:id" Component={EditUser}></AdminTemplate>
      </Switch>
    </Router>
  );
}

export default App;
