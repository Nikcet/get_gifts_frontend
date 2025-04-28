import React, { useEffect, useState } from 'react';
import Gift from '@/components/Gift/Gift';
// import './ListGifts.css';
import { useParams } from 'react-router-dom';
import { getGifts, getGiftsByUserId, addGift } from '@/utils/api';
import Popup from '@/components/Popup/Popup';
import { deleteGift } from '../../utils/api';
import {
    Box,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    CircularProgress
} from '@mui/material';

const ListGifts = ({ isAuthenticated }) => {
    const params = useParams();
    const [gifts, setGifts] = useState([]);
    const [isAddGiftPopupOpen, setIsAddGiftPopupOpen] = useState(false);
    const [giftLink, setGiftLink] = useState('');

    const userId = params.userId || (isAuthenticated ? localStorage.getItem('_user_id') : '');

    useEffect(() => {
        fetchGifts(userId);
    }, [userId, isAuthenticated]);

    async function fetchGifts(userId) {
        try {
            const data = userId ? await getGiftsByUserId(userId) : await getGifts();
            // const data = await getGiftsByUserId(userId);
            setGifts(data.gifts);
        } catch (err) {
            console.log("Ошибка: ", err);
        }
    };

    const toggleAddGiftPopup = () => {
        setIsAddGiftPopupOpen(!isAddGiftPopupOpen);
    };

    const handleAddGift = async (e) => {
        e.preventDefault();

        try {
            await addGift({ link: giftLink });
            setGiftLink('');
        } catch (err) {
            console.log("Ошибка при добавлении подарка: ", err);
        } finally {
            toggleAddGiftPopup();
            fetchGifts(userId);
        }
    };

    const onDeleteGift = async (giftId) => {
        await deleteGift(giftId);
        fetchGifts(userId);
    }

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
            {gifts.length === 0 ? (
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
