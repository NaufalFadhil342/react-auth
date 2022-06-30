import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Components/Layout/layout';
import AuthContext from './Context/auth-context';
import Auth from './Pages/Authpage/auth';
import Home from './Pages/Homepage/home';
import Profile from './Pages/Profilepage/profile';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {!authCtx.isLoggedIn && <Route path="/auth" element={<Auth />} />}
        <Route path="/profile" element={authCtx.isLoggedIn ? <Profile /> : <Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
