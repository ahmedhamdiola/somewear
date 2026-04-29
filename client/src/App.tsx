import { BrowserRouter as Router, Routes, Route } from 'react-router'
import CartPage from './features/cart/pages/CartPage'
import HomePage from './features/home/HomePage'
import { ToastContainer } from "react-toastify"
import SignUpPage from './features/auth/pages/SignUpPage'
import LandingPage from './features/common/pages/LandingPage'
import SearchPage from './features/common/pages/SearchPage'
import CategoryPage from './features/product/pages/CategoryPage'
import ProductPage from './features/product/pages/ProductPage'
import LoginPage from './features/auth/pages/LoginPage'
import ProfilePage from './features/user/pages/ProfilePage'
/////////////
import AdminLayout from "./features/admin/pages/AdminLayout";
import  Products  from "./features/admin/pages/Products";
import   Users  from "./features/admin/pages/Users";
import OrdersNew  from "./features/admin/pages/OrdersNew";
import  OrdersCompleted  from "./features/admin/pages/OrdersCompleted";
import AdminHomePage from "./features/admin/pages/AdminHomePage";
import ContactUsPage from './features/common/pages/ContactUsPage'

function App() {

  return (
    <div>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<LandingPage />} />  
          <Route path='/cart' element={<CartPage />} />
          <Route path='/products' element={<HomePage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/contact' element={<ContactUsPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/products/:product' element={<ProductPage />} />
          <Route path='/:category' element={<CategoryPage />} />

          <Route path="/admin" element={<AdminLayout />}>  
            <Route index element={<AdminHomePage/>} />
            <Route path="products" element={<Products />} />
            <Route path="users" element={<Users />} />
            <Route path="orders-new" element={<OrdersNew />} />
            <Route path="orders-completed" element={<OrdersCompleted />} />
          </Route>
          
        </Routes>
      </Router>
    </div>
  )
}

export default App
