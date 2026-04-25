import { BrowserRouter as Router, Routes, Route } from 'react-router'
import CartPage from './features/cart/pages/CartPage'
import FavouritePage from './features/favourites/pages/FavouritePage'
import HomePage from './features/common/pages/HomePage'
import SignUpPage from './features/auth/pages/SignUpPage'
import LandingPage from './features/common/pages/LandingPage'
import LoginPage from './features/auth/LoginPage'
function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/favourites' element={<FavouritePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
