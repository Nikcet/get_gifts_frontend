import { TextField, Alert, Box, Button, useTheme, Typography } from '@mui/material';
import { useState, useContext } from 'react';
import { loginUser } from '@/utils/api';
import { NotificationContext } from '../../../contexts/NotificationContext';


const LoginForm = ({ onLoginSuccess, onSwitchToRegister }) => {
    const [error, setError] = useState('');
    const theme = useTheme();

    const showNotification = useContext(NotificationContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const formData = new FormData(e.currentTarget);

        try {
            const data = await loginUser({
                username: formData.get('username'),
                password: formData.get('password')
            });
            onLoginSuccess(data.user_id);

            localStorage.setItem('_access_token', data.access_token);
            localStorage.setItem('_user_id', data.user_id);
        } catch (err) {
            setError(err.message);
            showNotification(err.message, 'error');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
        >
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <TextField
                fullWidth
                margin="normal"
                label="Имя пользователя"
                name="username"
                required
                sx={{
                    '& .MuiInputBase-root': {
                        color: theme.palette.text.primary,
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: theme.palette.divider,
                        },
                        '&:hover fieldset': {
                            borderColor: theme.palette.primary.main,
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: theme.palette.text.secondary,
                    },
                }}
            />

            <TextField
                fullWidth
                margin="normal"
                type="password"
                label="Пароль"
                name="password"
                required
                sx={{
                    '& .MuiInputBase-root': {
                        color: theme.palette.text.primary,
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: theme.palette.divider,
                        },
                        '&:hover fieldset': {
                            borderColor: theme.palette.primary.main,
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: theme.palette.text.secondary,
                    },
                }}
            />

            <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                sx={{
                    mt: 3,
                    bgcolor: theme.palette.primary.main,
                    '&:hover': {
                        bgcolor: theme.palette.primary.dark,
                    }
                }}
            >
                Войти
            </Button>
            <Typography sx={{ mt: 2, textAlign: 'center' }}>
                Нет аккаунта?{' '}
                <Button
                    onClick={onSwitchToRegister}
                    sx={{ p: 0, textTransform: 'none' }}
                >
                    Зарегистрируйтесь!
                </Button>
            </Typography>
        </Box>
    );
};

export default LoginForm;