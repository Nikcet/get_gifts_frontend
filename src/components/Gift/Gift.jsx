import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    Box,
    Chip,
    Stack,
    CircularProgress
} from '@mui/material';
import { useState, useContext } from 'react';
import { UserIdContext } from '../../contexts/UserIdContext';
import { updateGift } from '@/utils/api';
import { NotificationContext } from '../../contexts/NotificationContext';

const Gift = ({ gift: initialGift, onDelete }) => {
    // eslint-disable-next-line no-unused-vars
    const [gift, setGift] = useState(initialGift);
    const userId = useContext(UserIdContext);
    const [isReserved, setIsReserved] = useState(gift.is_reserved);
    const [isReserveOwner, setIsReserveOwner] = useState(
        gift.reserve_owner === userId || gift.reserve_owner === localStorage.getItem("_temporaryUserId")
    );
    const [isReserving, setIsReserving] = useState(false);
    const [isUnreserving, setIsUnreserving] = useState(false);

    const showNotification = useContext(NotificationContext);

    const handleReserve = async (e) => {
        e.stopPropagation();
        setIsReserving(true);
        try {
            const updatedGift = {
                ...gift,
                is_reserved: true,
                reserve_owner: userId
            };
            await updateGift(gift.id, updatedGift);
            setIsReserved(true);
            setIsReserveOwner(true);
        } catch (err) {
            console.error('Ошибка при резервировании:', err);
            showNotification('Ошибка при резервировании', 'error');
        } finally {
            setIsReserving(false);
        }
    };

    const handleUnreserve = async (e) => {
        e.stopPropagation();
        setIsUnreserving(true);
        try {
            const updatedGift = {
                ...gift,
                is_reserved: false,
                reserve_owner: null
            };
            await updateGift(gift.id, updatedGift);
            setIsReserved(false);
            setIsReserveOwner(false);
        } catch (err) {
            console.error('Ошибка при снятии резерва:', err);
            showNotification('Ошибка при снятии резерва', 'error');
        } finally {
            setIsUnreserving(false);
        }
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        if (gift.user_id === userId) {
            try {
                await onDelete(gift.id);
            } catch (err) {
                console.log('Ошибка при удалении подарка:', err);
                showNotification('Ошибка при удалении подарка', 'error');
            }
        }
    };

    return (
        <Card
            sx={{
                display: 'flex',
                mb: 2,
                position: 'relative',
                '&:hover': {
                    boxShadow: 3
                },
                flexDirection: { xs: 'column', sm: 'row' } // Меняем направление на колонку для мобильных
            }}
        >
            <CardMedia
                component="img"
                sx={{
                    width: { xs: '100%', sm: 200 }, // На мобильных полная ширина
                    height: { xs: 200, sm: 200 }, // Фиксированная высота
                    objectFit: 'cover',
                    flexShrink: 0
                }}
                image={gift.photo}
                alt={gift.name}
            />

            <CardContent sx={{
                flex: 1,
                minWidth: 0,
                position: 'relative',
                pb: { xs: 6, sm: 2 } // Добавляем отступ снизу для мобильных
            }}>
                <Typography variant="h6" noWrap>{gift.name}</Typography>

                <Box sx={{ my: 1 }}>
                    <Button
                        href={gift.link}
                        target="_blank"
                        variant="text"
                        sx={{
                            p: 0,
                            textTransform: 'none',
                            fontSize: { xs: '0.875rem', sm: '1rem' } // Уменьшаем шрифт на мобильных
                        }}
                    >
                        Ссылка на подарок
                    </Button>
                </Box>

                <Chip
                    label={gift.cost > 0 ? `${gift.cost} ₽` : "Не известно"}
                    color="primary"
                    size="small"
                    sx={{ mt: 1, mb: 1 }}
                />

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{
                        position: { xs: 'static', sm: 'absolute' },
                        bottom: { xs: 'auto', sm: 16 },
                        right: { xs: 'auto', sm: 16 },
                        mt: { xs: 2, sm: 0 },
                        flexWrap: 'wrap', // Разрешаем перенос элементов
                        justifyContent: 'flex-end'
                    }}
                >
                    {isReserved && (
                        <Chip
                            label={isReserveOwner ? "Вы подарите" : "Кто-то уже дарит"}
                            color={isReserveOwner ? "success" : "info"}
                            size="small"
                        />
                    )}

                    {gift.user_id !== userId && (
                        isReserveOwner ? (
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={handleUnreserve}
                                disabled={isUnreserving}
                                size="small"
                            >
                                {isUnreserving ? <CircularProgress size={20} /> : 'Не подарю'}
                            </Button>
                        ) : !isReserved ? (
                            <Button
                                variant="contained"
                                onClick={handleReserve}
                                disabled={isReserving || isReserved}
                                size="small"
                            >
                                {isReserving ? <CircularProgress size={20} /> : 'Подарю'}
                            </Button>
                        ) : null
                    )}
                    {gift.user_id === userId && (
                        <Button
                            onClick={handleDelete}
                            color="error"
                            size="small"
                        >
                            Удалить
                        </Button>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default Gift;