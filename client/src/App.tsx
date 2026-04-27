import { BrowserRouter as Router, Routes, Route } from 'react-router'
import CartPage from './features/cart/pages/CartPage'
import HomePage from './features/home/HomePage'
import SignUpPage from './features/auth/pages/SignUpPage'
import LandingPage from './features/common/pages/LandingPage'
import SearchPage from './features/common/pages/SearchPage'
import CategoryPage from './features/product/pages/CategoryPage'
import ProductPage from './features/product/pages/ProductPage'
function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/products' element={<HomePage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/contact' element={<><h1>hi</h1></>} />
          <Route path='/:products/:product' element={<ProductPage />} />
          <Route path='/:category' element={<CategoryPage />} />

        </Routes>
      </Router>
    </div>
  )
}

export default App
