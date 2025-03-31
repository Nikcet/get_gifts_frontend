import React from 'react';
import "./Header.css";



const Header = ({ isAuthenticated, onLogout, onRegister, onLogin }) => {
    return (
        <header className="header">
            <div className="header__logo">Wishly</div>
            <div className="header__button-container">
                {!isAuthenticated ? (
                    <>
                        <button className="header__button" onClick={onLogin}>Войти</button>
                        <button className="header__button" onClick={onRegister}>Регистрация</button>
                    </>
                ) : (
                    <button className="header__button" onClick={onLogout}>Выйти</button>
                )}
            </div>
        </header>
    );
};

export default Header;
