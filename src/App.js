import React, { useContext } from 'react'
import Home from './pages/Home'
import PaymentPage from './pages/PaymentPage'
import { Context } from './Context'

function App() {
  const { goToPay } = useContext(Context)

  return <div>{!goToPay ? <Home /> : <PaymentPage />}</div>
}

export default App
