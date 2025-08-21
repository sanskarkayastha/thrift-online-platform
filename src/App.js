import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import AuthContainer from './pages/AuthContainer';
import { ToastContainer } from "react-toastify"
import AddProductForm from './pages/frontend/addProduct';
import FrontEndLayout from './pages/frontend/frontEndLayot';
import HomePage from './pages/frontend/home';


function App() {
  return (      
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FrontEndLayout/>}>
            <Route path='/' element={<HomePage/>} />
            <Route path='/addProduct' element={<AddProductForm/>}/>
          </Route>
          <Route path='/login' element={<AuthContainer/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  );
}

export default App;
