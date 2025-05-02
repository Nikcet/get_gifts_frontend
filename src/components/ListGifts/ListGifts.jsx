import React, { useEffect, useState, useContext } from 'react';
import Gift from '@/components/Gift/Gift';
import { NotificationContext } from '../../contexts/NotificationContext';
import { useParams } from 'react-router-dom';
import { getGifts, getGiftsByUserId, addGift } from '@/utils/api';
import { deleteGift, pingStatusIGiftAdded } from '../../utils/api';
import {
    Box,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Skeleton,
    CircularProgress,
} from '@mui/material';

const ListGifts = ({ isAuthenticated }) => {
    const params = useParams();
    const [gifts, setGifts] = useState([]);
    const [isAddGiftPopupOpen, setIsAddGiftPopupOpen] = useState(false);
    const [giftLink, setGiftLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [giftsQueue, setGiftsQueue] = useState(0); // Количество подарков в процессе добавления

    const showNotification = useContext(NotificationContext);

    const userId = params.userId || (isAuthenticated ? localStorage.getItem('_user_id') : '');

    useEffect(() => {
        fetchGifts(userId);
    }, [userId, isAuthenticated]);

    async function fetchGifts(userId) {
        setIsLoading(true);
        try {
            const data = userId ? await getGiftsByUserId(userId) : await getGifts();
            setGifts(data.gifts);
            setIsLoading(false);
        } catch (err) {
            console.log("Ошибка при загрузке подарков: ", err);
            showNotification('Ошибка при загрузке подарков', 'error');
            setIsLoading(false);
        }
    };

    const toggleAddGiftPopup = () => {
        setIsAddGiftPopupOpen(!isAddGiftPopupOpen);
    };

    const handleAddGift = async (e) => {
        e.preventDefault();
        try {
            toggleAddGiftPopup();
            let task = await addGift({ link: giftLink });
            setGiftsQueue(prev => prev + 1);
            showNotification('Подарок скоро будет добавлен!', 'success');
            setGiftLink('');

            const checkStatus = async (giftId) => {
                try {
                    const status = await pingStatusIGiftAdded(giftId);
                    if (status) {
                        showNotification('Подарок успешно добавлен!', 'success');
                        setGiftsQueue(prev => prev - 1);
                        fetchGifts(userId);
                    } else {
                        setTimeout(() => checkStatus(giftId), 30000);
                    }
                } catch (err) {
                    console.error("Status check error:", err);
                    setGiftsQueue(prev => prev - 1);
                }
            };

            checkStatus(task.gift_id);

        } catch (err) {
            console.log("Ошибка при добавлении подарка: ", err);
            showNotification('Ошибка при добавлении подарка', 'error');
        }
    };

    const onDeleteGift = async (giftId) => {
        await deleteGift(giftId);
        fetchGifts(userId);
    }

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 2, my: 4 }}>
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress size={60} />
                </Box>
            ) : gifts.length === 0 && giftsQueue === 0 ? (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Нет ни одного подарка! 😢
                    </Typography>
                    {isAuthenticated && (
                        <Button
                            variant="contained"
                            onClick={toggleAddGiftPopup}
                            sx={{ mt: 2 }}
                        >
                            Добавить подарок (Только с Ozon)
                        </Button>
                    )}
                </Box>
            ) : (
                <Box>
                    <Box component="ul" sx={{ p: 0, m: 0 }}>
                        {gifts.map((gift) => (
                            <Gift
                                key={gift.id}
                                gift={gift}
                                onDelete={onDeleteGift}
                            />
                        ))}
                    </Box>
                    {Array(giftsQueue).fill(0).map((_, index) => (
                        <Box key={`skeleton-${index}`}>
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={200}
                                sx={{ mb: 2, borderRadius: 2 }}
                            />
                        </Box>
                    ))}
                    {isAuthenticated && (
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Button
                                variant="contained"
                                onClick={toggleAddGiftPopup}
                            >
                                Добавить подарок (только Ozon)
                            </Button>
                        </Box>
                    )}
                </Box>
            )}

            <Dialog open={isAddGiftPopupOpen} onClose={toggleAddGiftPopup}>
                <DialogTitle>Добавить подарок</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleAddGift} sx={{ mt: 1 }}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Ссылка на подарок"
                            autoFocus
                            value={giftLink}
                            onChange={(e) => setGiftLink(e.target.value)}
                            required
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Добавить
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default ListGifts;