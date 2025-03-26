import { API_URL } from "./config";
import CustomError from "./customError";

export const getGifts = async () => {
    const response = await fetch(`${API_URL}/gifts/`);
    if (!response.ok) {
        const errorText = await response.text();
        throw new CustomError(response.status, response.statusText, errorText, 'Ошибка при получении подарков');
    }
    return await response.json();
};

export const getGiftById = async (id) => {
    const response = await fetch(`${API_URL}/gifts/${id}`);
    if (!response.ok) {
        const errorText = await response.text();
        throw new CustomError(response.status, response.statusText, errorText, 'Ошибка при получении подарка');
    }
    return await response.json();
};

export const getGiftsByUserId = async (userId) => {
    const response = await fetch(`${API_URL}/gifts/user/${userId}`);
    if (!response.ok) {
        const errorText = await response.text();
        throw new CustomError(response.status, response.statusText, errorText, 'Ошибка при получении подарков пользователя');
    }
    return await response.json();
};

export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new CustomError(response.status, response.statusText, errorText, 'Ошибка при регистрации пользователя');
    }
    return await response.json();
};

export const loginUser = async (credentials) => {
    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        credentials: "include",
        body: formData,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new CustomError(response.status, response.statusText, errorText, 'Ошибка при авторизации пользователя');
    }
    return await response.json();
};

export const addGift = async (giftData) => {
    // console.log(giftData, token);
    const token = localStorage.getItem('_access_token');
    const response = await fetch(`${API_URL}/gifts/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(giftData),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new CustomError(response.status, response.statusText, errorText, 'Ошибка при добавлении подарка');
    }
    return await response.json();
};

export const updateGift = async (id, giftData) => {
    // const token = localStorage.getItem('_access_token');
    const response = await fetch(`${API_URL}/gifts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`,
        },
        // credentials: "include",
        body: JSON.stringify(giftData),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new CustomError(response.status, response.statusText, errorText, 'Ошибка при обновлении подарка');
    }
    return await response.json();
};

export const deleteGift = async (id) => {
    const token = localStorage.getItem('_access_token');
    const response = await fetch(`${API_URL}/gifts/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        credentials: "include",
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new CustomError(response.status, response.statusText, errorText, 'Ошибка при удалении подарка');
    }
    return await response.json();
};
