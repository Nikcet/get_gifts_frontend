import { TextField, Alert, Box, Button, useTheme, Typography } from '@mui/material';
import { useState } from 'react';
import { registerUser } from '@/utils/api';

const RegisterForm = ({ onSwitchToLogin }) => {
    const [error, setError] = useState('');
    const theme = useTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const formData = new FormData(e.currentTarget);
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');

        try {
            if (password !== confirmPassword) {
                throw new Error('Пароли не совпадают');
            }

            await registerUser({
                username: formData.get('username'),
                password: password
            });
        } catch (err) {
            setError(err.message || 'Ошибка регистрации');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            {error &&
                <Alert
                    severity="error"
                    sx={{
                        mb: 2,
                        bgcolor: theme.palette.error.dark,
                        color: theme.palette.error.contrastText
                    }}
                >
                    {error}
                </Alert>}

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

            <TextField
                fullWidth
                margin="normal"
                type="password"
                label="Повторите пароль"
                name="confirm-password"
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
                    bgcolor: theme.palette.secondary.main,
                    '&:hover': {
                        bgcolor: theme.palette.secondary.dark,
                    }
                }}
            >
                Зарегистрироваться
            </Button>
            <Typography sx={{ mt: 2, textAlign: 'center' }}>
                Есть аккаунт?{' '}
                <Button
                    onClick={onSwitchToLogin}
                    sx={{ p: 0, textTransform: 'none' }}
                >
                    Войдите!
                </Button>
            </Typography>
        </Box>
    );
};

export default RegisterForm;