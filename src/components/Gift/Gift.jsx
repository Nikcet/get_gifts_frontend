import React, { useState, useRef, useEffect, useContext } from 'react';
import { updateGift } from '@/utils/api';
import './Gift.css';
import { AuthContext } from '../../contexts/AuthContext';
import { UserIdContext } from '../../contexts/UserIdContext';
import { getGiftById } from '../../utils/api';

const Gift = ({ gift: initialGift, onDelete }) => {
    const [gift, setGift] = useState(initialGift);
    const [isReserving, setIsReserving] = useState(false);
    const [isClickable, setIsClickable] = useState(true);
    const [giftUpdated, setGiftUpdated] = useState(false);
    const [isActive, setIsActive] = useState(gift.is_reserved);
    const userId = useContext(UserIdContext);
    const timerRef = useRef(null);

    const isReserveOwner = (gift) => {
        return gift.reserve_owner === userId || gift.reserve_owner === localStorage.getItem("_temporaryUserId");
    }

    const isOwner = (gift) => {
        return gift.user_id === userId;
    }

    const handleClick = (e) => {
        if (!isActive && !isReserving && isClickable) {
            window.open(gift.link, '_blank');
        }
    };

    const handleMouseDown = (e) => {
        if (e.button === 0 && isClickable) {

            if (!isActive && userId) {
                setIsReserving(true);
                timerRef.current = setTimeout(async () => {
                    const updatedGift = {
                        ...gift,
                        is_reserved: true,
                        reserve_owner: userId,
                    };
                    await updateGift(gift.id, updatedGift);
                    setIsActive(true);
                    setIsReserving(false);
                    setGiftUpdated(!giftUpdated);
                }, 1000);
            }
            else if (isReserveOwner(gift)) {
                setIsReserving(true);
                timerRef.current = setTimeout(async () => {
                    const updatedGift = {
                        ...gift,
                        is_reserved: false,
                        reserve_owner: null
                    };
                    await updateGift(gift.id, updatedGift);
                    setIsActive(false);
                    setIsReserving(false);
                    setIsClickable(false);
                    setTimeout(() => {
                        setIsClickable(true);
                    }, 1000)
                    setGiftUpdated(!giftUpdated);
                }, 1000);
            }
        }

    };

    const handleMouseUp = (e) => {
        if (e.button === 0 && timerRef.current) {
            clearTimeout(timerRef.current);
            setIsReserving(false);
        }
    };

    const onDeleteGift = async (e) => {
        e.stopPropagation();
        if (isOwner(gift)) onDelete(gift.id);
    }

    useEffect(() => {
        getGiftById(gift.id)
            .then((data) => {
                setGift(data.gift);
            })
            .catch((err) => {
                console.error('Failed to fetch gift:', gift.name, err);
            })
    }, [giftUpdated])

    return (
        <li
            className={`gift ${isActive ? 'gift--reserved' : ''} ${isReserving ? 'gift--reserving' : ''}`}
            onClick={handleClick}
            onMouseDown={handleMouseDown}

            onMouseUp={handleMouseUp}
        >
            <div className="gift__fill"></div>
            <div className="cover"><p className="cover__text">
                {isReserveOwner(gift) ? "Вы подарите" : "Кто-то уже дарит"}</p></div>
            <div className="gift__photo-wrap">
                <img src={gift.photo} alt={gift.name} className="gift__photo" />
            </div>
            <div className="gift__info">
                <h3 className="gift__name">{gift.name}</h3>
                <div className="gift__link-wrap">
                    <a href={gift.link} className="gift__link" target="_blank" rel="noopener noreferrer">
                        Ссылка на подарок
                    </a>
                </div>
                <div className="gift__cost">
                    <span className="gift-cost">{gift.cost > 0 ? `${gift.cost} ₽` : "Не известно"}</span>
                </div>
            </div>
            {
                isOwner(gift) &&
                <button className="gift__delete" type='button' onClick={onDeleteGift}>Удалить</button>
            }
        </li>
    );
};

export default Gift;