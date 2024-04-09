import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from "./components/Signup";
import Login from "./components/Login";
import LandingPage from './components/LandingPage';
import UserLandingPage from './components/UserLandingPage';

function App() {
  return (
   
    <>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path='/user/landingpage' element={<UserLandingPage/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
