import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h1" sx={{ mb: 2, fontWeight: 700 }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Страница не найдена
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Запрашиваемая страница не существует или была перемещена.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/')}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            borderRadius: '8px'
          }}
        >
          Вернуться на главную
        </Button>
      </Container>
    </Box>
  );
};

export default NotFound;