import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { fetchUserProfile } from './redux/authSlice'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'

function App() {
  const dispatch = useDispatch()
  const { token, userProfile } = useSelector((state) => state.auth)

  useEffect(() => {
    if (token && !userProfile) {
      dispatch(fetchUserProfile())
    }
  }, [token, userProfile, dispatch])

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App