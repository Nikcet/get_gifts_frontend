import React, { useEffect, useState } from 'react';
import Gift from '@/components/Gift/Gift';
import './ListGifts.css';
import { useParams } from 'react-router-dom';
import { getGifts, getGiftsByUserId, addGift } from '@/utils/api';
import Popup from '@/components/Popup/Popup';
import { deleteGift } from '../../utils/api';

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
            toggleAddGiftPopup();
            fetchGifts(userId);
        } catch (err) {
            console.log("Ошибка при добавлении подарка: ", err);
        }
    };

    const onDeleteGift = async (giftId) => {
        await deleteGift(giftId);
        fetchGifts(userId);
    }

    return (
        <div className="list-gifts-container">
            {gifts.length === 0 ? (
                <div>
                    <p className="no-gifts-message">Нет ни одного подарка! 😢</p>
                    {isAuthenticated && (
                        <button onClick={toggleAddGiftPopup}>
                            Добавить подарок (Только с Ozon)
                        </button>
                    )}
                </div>
            ) : (
                <div>
                    <ul className="list-gifts">
                        {gifts.map((gift) => (
                            <Gift
                                key={gift.id}
                                gift={gift}
                                onDelete={onDeleteGift}
                            />
                        ))}
                    </ul>
                    {isAuthenticated && (
                        <button className="list-gifts__add" onClick={toggleAddGiftPopup}>
                            Добавить подарок (только Ozon)
                        </button>
                    )}
                </div>

            )}
            <Popup isOpen={isAddGiftPopupOpen} onClose={toggleAddGiftPopup}>
                <form onSubmit={handleAddGift}>
                    <h2>Добавить подарок</h2>
                    <input
                        type="text"
                        placeholder="Ссылка на подарок"
                        value={giftLink}
                        onChange={(e) => setGiftLink(e.target.value)}
                        required
                    />
                    <button type="submit">Добавить</button>
                </form>
            </Popup>
        </div>
    );
};

export default ListGifts;
