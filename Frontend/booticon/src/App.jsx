import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"
import RegisterPage from './pages/RegisterPage.jsx';
import RegisterSuccess from './pages/RegisterSuccess.jsx';
import LoginPage from './pages/LoginPage.jsx';
import LaptopProductsPage from './pages/LaptopProductsPage.jsx';
import BasketPage from './pages/BasketPage.jsx';
import OrderAddressPage from './pages/OrderAddressPage.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import MyOrdersPage from './pages/MyOrdersPage.jsx';
import Review from './components/Review.jsx';
import MouseProductsPage from './pages/MouseProductsPage.jsx';
import KeyboardProductsPage from './pages/KeyboardProductsPage.jsx';
import MonitorProductsPage from './pages/MonitorProductsPage.jsx';
import HeadphoneProductsPage from './pages/HeadphoneProductsPage.jsx';




function App() {



  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/register-success' element={<RegisterSuccess />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/laptopProductsPage' element={<LaptopProductsPage />} />
        <Route path='/mouseProductsPage' element={<MouseProductsPage />} />
        <Route path='/keyboardProductsPage' element={<KeyboardProductsPage />} />
        <Route path='/monitorProductsPage' element={<MonitorProductsPage />} />
        <Route path='/headphoneProductsPage' element={<HeadphoneProductsPage />} />
        <Route path='/basketPage' element={<BasketPage />} />
        <Route path='/orderAddressPage' element={<OrderAddressPage />}></Route>
        <Route path='/orderSuccess' element={<OrderSuccess />}></Route>
        <Route path='/myOrdersPage' element={<MyOrdersPage />}></Route>
        <Route path='/review' element={<Review />}></Route>
      </Routes>

    </>
  )
}

export default App
