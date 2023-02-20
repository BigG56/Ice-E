import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './components/Header/HeaderBar';
import ProductsPage from './routes/Products/Products';
import Login from './routes/Login/Login';
import ProductDetails from './routes/ProductDetails/ProductDetails';
import Register from './routes/Register/Register';
import Account from './routes/Account/Account';
import Home from './routes/Home/Home';
import Cart from './routes/Cart/Cart';
import Orders from './routes/Orders/Order';
import History from './utils/History';
import Checkout from './routes/Checkout/Checkout';
import OrderDetails from './routes/OrderDetails/OrderDetails';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';



function App() {
  const { loggedIn } = useSelector(state => state.auth)
  return (
    <div className="App" style={{flex: 1}}>
      <Router basename="/home" history={History}>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route exact path='/'  element={<Home />}/>
          <Route path='/users/:userId'  element={<Home />}/>
          <Route path="/products" element={<ProductsPage />}/>
          <Route path="/products/:productId/:productType/:prodMetal" element={<ProductDetails />}/>
          <Route path="/auth/login" element={<Login />}/>
          <Route path="/auth/register" element={<Register/>}/>
          {/* Protected Routes */}
          <Route path="users/:userId/account" element={<ProtectedRoute loggedIn={loggedIn}><Account/></ProtectedRoute>}/>
          <Route path='users/:userId/products' element={<ProtectedRoute loggedIn={loggedIn}><ProductsPage /></ProtectedRoute>}/>
          <Route path="users/:userId/products/:productId/:productType/:prodMetal" element={<ProtectedRoute loggedIn={loggedIn}><ProductDetails /></ProtectedRoute>}/>
          <Route path="users/:userId/carts/:cartId" element={<ProtectedRoute loggedIn={loggedIn}><Cart/></ProtectedRoute>}/>
          <Route path="users/:userId/carts/:cartId/checkout" element={<ProtectedRoute loggedIn={loggedIn}><Checkout/></ProtectedRoute>}/>
          <Route path="users/:userId/orders" element={<ProtectedRoute loggedIn={loggedIn}><Orders/></ProtectedRoute>}/>
          <Route path="users/:userId/orders/:orderId" element={<ProtectedRoute loggedIn={loggedIn}><OrderDetails/></ProtectedRoute>}/>
        </Routes>
      </Router>
    </div>   
  );
}

export default App;
