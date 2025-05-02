import {
    Box,
    Typography,
    Link,
    Stack,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                mb: '50px',
                backgroundColor: theme.palette.background.paper,
                borderTop: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
                alignItems="center"
            >
                <Typography variant="body2" color="text.secondary">
                    Задать вопрос разработчику {isSmallScreen ? '👇' : '👉'} 
                </Typography>

                <Stack direction="row" spacing={2}>
                    <Link
                        href="https://t.me/mr_nikcet"
                        target="_blank"
                        rel="noopener noreferrer"
                        color="inherit"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            '&:hover': {
                                color: theme.palette.primary.main,
                            }
                        }}
                    >
                        <TelegramIcon sx={{ mr: 0.5, fontSize: '1.2rem' }} />
                        <Typography variant="body2">Telegram</Typography>
                    </Link>

                    <Link
                        href="mailto:mstislav.kr@yandex.ru"
                        color="inherit"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            '&:hover': {
                                color: theme.palette.primary.main,
                            }
                        }}
                    >
                        <EmailIcon sx={{ mr: 0.5, fontSize: '1.2rem' }} />
                        <Typography variant="body2">Email</Typography>
                    </Link>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Footer;