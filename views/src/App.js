import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/HeaderBar';
import ProductsPage from './routes/Products/Products';
import Login from './routes/Login/Login';
import ProductDetails from './routes/ProductDetails/ProductDetails';
import Register from './routes/Register/Register';
import Home from './routes/Home/Home'
import History from './utils/History';

function App() {
  return (
    <div className="App" style={{flex: 1}}>
      <Router basename="/home" history={History}>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route exact path="/" element={<Home />}/>
          <Route path="/products" element={<ProductsPage />}/>
          <Route path="/products/:productId/:productType/:prodMetal" element={<ProductDetails />}/>
          <Route path="/auth/login" element={<Login />}/>
          <Route path="/auth/register" element={<Register/>}/>
        </Routes>
      </Router>
    </div>   
  );
}

export default App;
