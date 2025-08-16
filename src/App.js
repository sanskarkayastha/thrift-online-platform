import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import AuthContainer from './pages/AuthContainer';
import { ToastContainer } from "react-toastify"


function App() {
  return (      
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthContainer/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  );
}

export default App;
