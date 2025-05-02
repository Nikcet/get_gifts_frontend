import {
    Box,
    Typography,
    Button,
    Container,
    Grid,
    Paper,
    useTheme
} from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIdContext } from '@/contexts/UserIdContext';

const Start = ({ onRegister, isAuthenticated }) => {
    const theme = useTheme();
    const userId = useContext(UserIdContext);
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (isAuthenticated) {
            navigate(`/gifts/user/${userId}`);
        } else {
            onRegister();
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
            {/* Первый экран */}
            <Box
                sx={{
                    minHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    background: `linear-gradient(to bottom, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
                        Создайте свой вишлист
                    </Typography>
                    <Typography variant="h5" sx={{ mb: 6 }}>
                        Добавляйте подарки, делитесь списком с друзьями и получайте именно то, что хотите
                    </Typography>
                    <Button
                        onClick={handleButtonClick}
                        variant="contained"
                        size="large"
                        sx={{
                            px: 6,
                            py: 2,
                            fontSize: '1.2rem',
                            borderRadius: '50px'
                        }}
                    >
                        Создать вишлист
                    </Button>
                </Container>
            </Box>

            {/* Второй экран */}
            <Box
                sx={{
                    minHeight: '80vh',
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                }}
            >
                <Container maxWidth={false} sx={{ px: 4 }}>
                    <Grid
                        container={true}
                        spacing={4}
                        sx={{
                            justifyContent: 'center',
                        }}
                    >
                        <Grid item sx={{ maxWidth: 350 }}>
                            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
                                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                                    Зачем создавать вишлисты?
                                </Typography>
                                <Typography>
                                    Чтобы друзья и родные точно знали, какой подарок вам понравится.
                                    Больше никаких ненужных или повторяющихся подарков!
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item sx={{ maxWidth: 350 }}>
                            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
                                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                                    Для кого вишлисты?
                                </Typography>
                                <Typography>
                                    Для всех! Дни рождения, свадьбы, Новый год - любой повод для подарков.
                                    Подходит как для взрослых, так и для детей.
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item sx={{ maxWidth: 350 }}>
                            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
                                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                                    Это платно?
                                </Typography>
                                <Typography>
                                    Нет! Наш сервис полностью бесплатный. Создавайте неограниченное количество
                                    вишлистов без каких-либо подписок или скрытых платежей.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Третий экран */}
            <Box
                sx={{
                    minHeight: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
                        Готовы создать свой вишлист?
                    </Typography>
                    <Button
                        onClick={handleButtonClick}
                        variant="contained"
                        size="large"
                        sx={{
                            px: 6,
                            py: 2,
                            fontSize: '1.2rem',
                            borderRadius: '50px'
                        }}
                    >
                        Создать вишлист
                    </Button>
                </Container>
            </Box>
        </Box>
    );
};

export default Start;