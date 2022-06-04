import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productUpdateReducer,
 
} from './reducers/productReducers';
import {approveRequestReducer, getRequestByIdReducer, getRequestProductReducer, requestProductReducer} from "./reducers/requestReducers"
import { userLoginReducer, userRegisterReducer , userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer, buySellUserReducer } from './reducers/userReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate:userUpdateReducer,
  productDelete:productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate : productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  requestProduct: requestProductReducer,
  getRequests: getRequestProductReducer,
  requestDetail: getRequestByIdReducer,
  approveDetail:approveRequestReducer,
  buySell:buySellUserReducer,
  

  
  
  

});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(...middleware))
);

export default store;
