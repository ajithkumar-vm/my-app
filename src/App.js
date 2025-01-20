import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import PLP from './components/PLP';
import SignIn from './components/SignIn';
import MyAccount from './components/MyAccount';


function App() {
  return (
    <>
    <Routes>
      <Route path="/PLP" element={<PLP />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/account" element={<MyAccount />} />
      <Route path="/logout" element={<SignIn />} />
    </Routes>
    </>
  );
}

export default App;
