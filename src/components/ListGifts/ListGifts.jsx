import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import Gift from '@/components/Gift/Gift';
import AddGiftButton from '../AddGiftButton/AddGiftButton';
import { NotificationContext } from '../../contexts/NotificationContext';
import { useParams } from 'react-router';
import { getGifts, getGiftsByUserId, addGift, getGiftById } from '@/utils/api';
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
    const [giftsQueue, setGiftsQueue] = useState([]);

    const navigate = useNavigate();

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
            showNotification(err.message, 'error');
            setIsLoading(false);
            if (err.statusCode === 404) {
                return navigate('/');
            }
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
            setGiftsQueue(prev => [...prev, task.gift_id]);
            showNotification('Подарок скоро будет добавлен!', 'success');
            setGiftLink('');

            const checkStatus = async (giftId) => {
                try {
                    const status = await pingStatusIGiftAdded(giftId);
                    if (status) {
                        showNotification('Подарок успешно добавлен!', 'success');
                        setGiftsQueue(prev => prev.filter(id => id !== giftId));
                        const data = await getGiftById(giftId);
                        setGifts(prev => [...prev, data.gift])
                    } else {
                        setTimeout(() => checkStatus(giftId), 20000);
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
        try {
            setGifts(prev => prev.filter(gift => gift.id !== giftId));
            await deleteGift(giftId);
        } catch (err) {
            console.log("Ошибка при удалении подарка: ", err);
            showNotification('Ошибка при удалении подарка', 'error');
            const data = await getGiftById(giftId);
            setGifts(prev => [...prev, data.gift])
        }
    }

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 2, my: 4 }}>
            {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress size={60} />
                </Box>
            ) : gifts.length === 0 && giftsQueue.length === 0 ? (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Нет ни одного подарка! 😢
                    </Typography>
                    {isAuthenticated && (
                        <AddGiftButton onClick={toggleAddGiftPopup} />
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
                        {giftsQueue.map((giftId) => (
                            <Box key={`skeleton-${giftId}`}>
                                <Skeleton
                                    variant="rectangular"
                                    width="100%"
                                    height={200}
                                    sx={{ mb: 2, borderRadius: 2 }}
                                />
                            </Box>
                        ))}
                    </Box>
                    {isAuthenticated && (
                        <AddGiftButton onClick={toggleAddGiftPopup} fixed />
                    )}
                </Box>
            )}

            <Dialog open={isAddGiftPopupOpen} onClose={toggleAddGiftPopup}>
                <DialogTitle>Добавить подарок</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleAddGift} sx={{ mt: 1 }}>
                        <Typography gutterBottom>
                            Вставьте ссылку на подарок с маркетплейса Ozon
                        </Typography>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Вставьте ссылку"
                            value={giftLink}
                            onChange={(e) => setGiftLink(e.target.value)}
                            required
                            autoFocus
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