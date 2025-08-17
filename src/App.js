import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import AuthContainer from './pages/AuthContainer';
import { ToastContainer } from "react-toastify"
import Home from './pages/frontend/home';


function App() {
  return (      
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthContainer/>} />
          <Route path='/home' element={<Home/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  );
}

export default App;
