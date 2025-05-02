import { Routes, Route, useNavigate } from 'react-router';
import { useState } from 'react';
import { generate } from 'short-uuid';
import Header from '@/components/Header/Header';
import RegisterForm from './components/Form/RegisterForm/RegisterForm';
import LoginForm from './components/Form/LoginForm/LoginForm';
import Form from './components/Form/Form';
import Popup from './components/Popup/Popup';
import ListGifts from '@/components/ListGifts/ListGifts';
import Start from './components/Start/Start';
import Footer from './components/Footer/Footer';
import NotificationProvider from './components/NotificationProvider/NotificationProvider';
import NotFound from './components/NotFound/NotFound';
import { AuthContext } from './contexts/AuthContext';
import { UserIdContext } from './contexts/UserIdContext';
import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
});

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formType, setFormType] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(isLogin());
  const [userId, setUserId] = useState(getOrCreateTemporaryUserId());

  const navigate = useNavigate();

  const openPopup = (type) => {
    setFormType(type);
    setIsPopupOpen(true);
  };

  const closePopup = () => setIsPopupOpen(false);

  const handleLoginSuccess = (userId) => {
    setIsAuthenticated(true);
    setUserId(userId);
    closePopup();
    navigate(`/gifts/user/${userId}`);
  };

  const renderForm = () => {
    return formType === 'login' ? (
      <LoginForm
        onLoginSuccess={handleLoginSuccess}
        onSwitchToRegister={() => setFormType('register')}
      />
    ) : (
      <RegisterForm
        onSwitchToLogin={() => setFormType('login')}
      />
    );
  };

  const logout = async () => {
    localStorage.removeItem('_access_token');
    localStorage.removeItem('_user_id');
    setIsAuthenticated(false);
    setUserId(getOrCreateTemporaryUserId());
    navigate('/');
  };

  function isLogin() {
    if (localStorage.getItem('_user_id') && localStorage.getItem('_access_token')) {
      return true;
    }
    return false;
  }

  function getOrCreateTemporaryUserId() {
    if (localStorage.getItem("_user_id")) {
      return localStorage.getItem("_user_id");
    }
    let teporaryUserId = localStorage.getItem("_temporaryUserId");
    if (!teporaryUserId) {
      teporaryUserId = generate();
      localStorage.setItem("_temporaryUserId", teporaryUserId);
    }
    return teporaryUserId;
  }

  return (
    <AuthContext.Provider value={isAuthenticated}>
      <UserIdContext.Provider value={userId}>
        <NotificationProvider>
          <div className='app' style={{ display: 'flex', flexDirection: 'column', minHeight: "100vh" }}>
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <Header
                isAuthenticated={isAuthenticated}
                onLogout={logout}
                onLogin={() => openPopup('login')}
                onRegister={() => openPopup('register')}
              />
              <Popup
                isOpen={isPopupOpen}
                onClose={closePopup}
              >
                <Form
                  title={formType === 'login' ? 'Вход' : 'Регистрация'}
                  setIsAuth={handleLoginSuccess}
                >
                  {renderForm()}
                </Form>
              </Popup>

              <Box sx={{ flex: 1 }} component='main'>
                <Routes>
                  <Route path="/gifts/user/:userId" element={<ListGifts isAuthenticated={isAuthenticated} />} />
                  <Route path="/" element={
                    <Start onRegister={() => openPopup('register')} isAuthenticated={isAuthenticated} />
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Box>
              <Footer />
            </ThemeProvider>
          </div>
        </NotificationProvider>
      </UserIdContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
