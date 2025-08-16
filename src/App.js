import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import AuthContainer from './pages/AuthContainer';



function App() {
  return (      
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthContainer/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
