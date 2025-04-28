import React from 'react';
import "./Header.css";
import { AppBar, Toolbar, Typography, Button, Link } from '@mui/material';



const Header = ({ isAuthenticated, onLogout, onRegister, onLogin }) => {
    return (
        <AppBar position="static" color="primary" elevation={0}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
                    Whishes Book
                </Typography>
                {!isAuthenticated ? (
                    <>
                        <Button
                            color="inherit"
                            onClick={onLogin}
                            sx={{ mr: 1 }}
                        >
                            Войти
                        </Button>
                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={onRegister}
                        >
                            Регистрация
                        </Button>
                    </>
                ) : (
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={onLogout}
                    >
                        Выйти
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
