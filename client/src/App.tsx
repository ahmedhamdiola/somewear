import { BrowserRouter as Router, Routes, Route } from 'react-router'
import CartPage from './features/cart/pages/CartPage'
import FavouritePage from './features/favourites/pages/FavouritePage'
import HomePage from './features/common/pages/HomePage'
import SignUpPage from './features/auth/pages/SignUpPage'
function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<div className="bg-red-400">HELLO</div>} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/favourites' element={<FavouritePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/signup' element={<SignUpPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
