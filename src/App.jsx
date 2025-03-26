import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import { generate } from 'short-uuid';
import Header from '@/components/Header/Header';
import RegisterForm from './components/Form/RegisterForm/RegisterForm';
import LoginForm from './components/Form/LoginForm/LoginForm';
import Form from './components/Form/Form';
import Popup from './components/Popup/Popup';
import ListGifts from '@/components/ListGifts/ListGifts';
import './App.css';
import { AuthContext } from './contexts/AuthContext';
import { UserIdContext } from './contexts/UserIdContext';

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formType, setFormType] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(isLogin());
  const [userId, setUserId] = useState(getOrCreateTemporaryUserId());

  // const isAuthContext = createContext(isAuthenticated);
  // const userIdContext = createContext(userId);

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
    return formType === 'login' ? <LoginForm onLoginSuccess={handleLoginSuccess} /> : <RegisterForm />;
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

  useEffect(() => {

  }, [])

  return (
    <AuthContext.Provider value={isAuthenticated}>
      <UserIdContext.Provider value={userId}>
        <div className='app'>
          <Header
            isAuthenticated={isAuthenticated}
            onLogout={logout}
            onLogin={() => openPopup('login')}
            onRegister={() => openPopup('register')}
          />
          <Popup isOpen={isPopupOpen} onClose={closePopup}>
            <Form title={formType === 'login' ? 'Вход' : 'Регистрация'} setIsAuth={handleLoginSuccess}>
              {renderForm()}
            </Form>
          </Popup>
          <Routes>
            <Route path="/gifts/user/:userId" element={<ListGifts isAuthenticated={isAuthenticated} />} />
            <Route path="/" element={<ListGifts isAuthenticated={isAuthenticated} />} />
          </Routes>
        </div>
      </UserIdContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
