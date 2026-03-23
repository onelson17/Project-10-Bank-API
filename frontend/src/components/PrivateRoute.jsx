import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  // Si pas connecté → redirige vers /login
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  // Si connecté → affiche la page demandée
  return children
}

export default PrivateRoute