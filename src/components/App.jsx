import React, { Fragment } from 'react';
import SignUp from './SingUp';
import LogIn from './LogIn';
import Home from './Home';
import Profile from './Profile';
import { ChakraProvider } from '@chakra-ui/provider'
import theme from '../theme'
import { AuthProvider } from './contexts/authContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginRequiredRoute, LogoutRequiredRoute } from './PrivateRoute';
import RecoverPassword from './RecoverPassword';
import Dashboard from './Dashboard';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/dashboard" element={
              <LoginRequiredRoute>
                <Dashboard />
              </LoginRequiredRoute>
            } />

            <Route path="/signup" element={
              <LogoutRequiredRoute>
                <SignUp />
              </LogoutRequiredRoute>
            } />

            <Route path="/login" element={
              <LogoutRequiredRoute>
                <LogIn />
              </LogoutRequiredRoute>
            } />

            <Route path="/recover-password" element={
              <LogoutRequiredRoute>
                <RecoverPassword />
              </LogoutRequiredRoute>
            } />

            <Route path="/profile" element={
              <LoginRequiredRoute>
                <Profile />
              </LoginRequiredRoute>
            } />

          </Routes>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
