import { useContext } from 'react';
import { useLocation } from 'react-router';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Tooltip
} from '@mui/material';
import { NotificationContext } from '../../contexts/NotificationContext';
import ShareIcon from '@mui/icons-material/Share';


const Header = ({ isAuthenticated, onLogout, onRegister, onLogin }) => {

    const showNotification = useContext(NotificationContext);
    const location = useLocation();

    const handleShare = () => {
        const url = `${window.location.origin}${location.pathname}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                showNotification('Ссылка скопирована в буфер обмена', 'success');
            })
            .catch(() => {
                showNotification('Не удалось скопировать ссылку', 'error');
            });
    };

    return (
        <AppBar position="static" color="primary" elevation={0}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
                    WhishesBook
                </Typography>

                {isAuthenticated ? (
                    <>
                        <Tooltip title="Поделиться">
                            <IconButton
                                color="inherit"
                                onClick={handleShare}
                                sx={{ mr: 1 }}
                                aria-label="Поделиться"
                            >
                                <ShareIcon />
                            </IconButton>
                        </Tooltip>

                        <Button
                            color="inherit"
                            onClick={onLogout}
                        >
                            Выйти
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" onClick={onLogin} sx={{ mr: 1 }}>
                            Войти
                        </Button>
                        <Button variant="outlined" color="inherit" onClick={onRegister}>
                            Регистрация
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
