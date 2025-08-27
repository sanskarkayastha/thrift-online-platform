import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import AuthContainer from './pages/AuthContainer';
import { ToastContainer } from "react-toastify"
import AddProductForm from './pages/frontend/addProduct';
import FrontEndLayout from './pages/frontend/frontEndLayot';
import HomePage from './pages/frontend/home';
import MyListings from './pages/frontend/myListings';
import ProfileLayout from './pages/frontend/ProfileLayout';
import ProfilePage from './pages/frontend/ProfilePage';
import ProductPage from './pages/frontend/ProductPage';
import ListingsPage from './pages/frontend/ListingPage';
import MessagesList from './pages/frontend/MessageList';
import ChatPage from './pages/frontend/ChatPage';
import SavedListings from './pages/frontend/SavedListings';


function App() {
  return (     
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FrontEndLayout/>}>
            <Route path='/' element={<HomePage/>} />
            <Route path='/addProduct' element={<AddProductForm/>}/>
            <Route path='/editProduct/:id' element={<AddProductForm/>}/>
            <Route path='/product/:id' element={<ProductPage/>}/>
            <Route path="products" element={<ListingsPage />} />
            <Route path="/profile" element={<ProfileLayout />}>
              <Route index element={<ProfilePage />} />
              <Route path="myListings" element={<MyListings />} />
              <Route path="messages" element={<MessagesList />} />
              <Route path="messages/:sellerId" element={<ChatPage/>} />
              <Route path="savedListings" element={<SavedListings />} />
              {/* <Route path="settings" element={<SettingsPage />} /> */}
            </Route>
          </Route>
          <Route path='/login' element={<AuthContainer/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  );
}

export default App;
