import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserLandingPage from './components/UserLandingPage'

const App = () => {
  return (
   <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<UserLandingPage/>} />
  </Routes>
  </BrowserRouter>
   </>
  )
}

export default App