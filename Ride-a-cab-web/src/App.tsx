import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Start from './pages/Start';

import Riding from './pages/Riding';
import CaptainRiding from './pages/CaptainRiding';
import 'remixicon/fonts/remixicon.css';
import UserLogin from './auth/UserLogin';
import UserSignup from './auth/UserSignup';
import Captainlogin from './auth/CaptainLogin';
import CaptainSignup from './auth/CaptainSignup';
import UserProtectWrapper from './wrapper/UserProtectWrapper';
import Home from './pages/Home';
import UserLogout from './auth/UserLogout';
import CaptainProtectWrapper from './wrapper/CaptainProtectWrapper';
import CaptainHome from './pages/CaptainHome';
import CaptainLogout from './auth/CaptainLogout';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route
          path='/home'
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route
          path='/user/logout'
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
        <Route
          path='/captain-home'
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />
        <Route
          path='/captain/logout'
          element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;