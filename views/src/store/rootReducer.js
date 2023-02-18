import { combineReducers } from 'redux';
import authReducer from './auth/Auth.reducers';
import productReducer from './products/Products.reducers';
//import cartReducer from './cart/Cart.reducers';
import userReducer from './user/Users.reducers';
//import orderReducer from './orders/Orders.reducers'
//import orderItemsReducer from './orderItems/OrderItem.reducers'

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    products: productReducer,
    //cart: cartReducer,
    //order: orderReducer,
    //orderItems: orderItemsReducer
  });