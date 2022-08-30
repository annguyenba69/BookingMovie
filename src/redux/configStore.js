import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import LoadingReducer from './reducers/LoadingReducer';
import QuanLyDatVeReducer from './reducers/QuanLyDatVeReducer';
import QuanLyNguoiDungReducer from './reducers/QuanLyNguoiDungReducer';
import QuanLyPhimReducer from './reducers/QuanLyPhimReducer';
import QuanLyRapReducer from './reducers/QuanLyRapReducer';
const rootReducer = combineReducers({
    QuanLyPhimReducer,
    QuanLyRapReducer,
    QuanLyNguoiDungReducer,
    QuanLyDatVeReducer,
    LoadingReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;