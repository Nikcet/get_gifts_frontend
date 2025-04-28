import { useState } from 'react';
import { Alert, Snackbar, useTheme } from '@mui/material';
import { NotificationContext } from '../../contexts/NotificationContext';

const NotificationProvider = ({ children }) => {

    const theme = useTheme();

    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'info'
    });

    const showNotification = (message, severity = 'info') => {
        setNotification({ open: true, message, severity });
    };

    const handleClose = () => {
        setNotification(prev => ({ ...prev, open: false }));
    };

    return (
        <NotificationContext.Provider value={showNotification}>
            {children}
            <Snackbar
                open={notification.open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        boxShadow: theme.shadows[6],
                        border: `1px solid ${theme.palette.divider}`
                    }
                }}
            >
                <Alert
                    onClose={handleClose}
                    severity={notification.severity}
                    sx={{
                        width: '100%',
                        bgcolor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        '& .MuiAlert-icon': {
                            color: theme.palette[notification.severity].main
                        },
                        '& .MuiAlert-action': {
                            color: theme.palette.text.secondary
                        }
                    }}
                    variant="outlined"
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;