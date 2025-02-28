const API_URL = 'http://localhost:8000'; // Замените на URL вашего бэкенда

// Функция для получения всех подарков
export const getGifts = async () => {
    const response = await fetch(`${API_URL}/gifts/`);
    if (!response.ok) {
        throw new Error('Ошибка при получении подарков');
    }
    return await response.json();
};

// Функция для получения подарка по ID
export const getGiftById = async (id) => {
    const response = await fetch(`${API_URL}/gifts/${id}`);
    if (!response.ok) {
        throw new Error('Ошибка при получении подарка');
    }
    return await response.json();
};

// Функция для получения подарков пользователя по ID
export const getGiftsByUserId = async (userId) => {
    const response = await fetch(`${API_URL}/gifts/user/${userId}`);
    if (!response.ok) {
        throw new Error('Ошибка при получении подарков пользователя');
    }
    return await response.json();
};

// Функция для регистрации нового пользователя
export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error('Ошибка при регистрации пользователя');
    }
    return await response.json();
};

// Функция для авторизации пользователя
export const loginUser = async (credentials) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(credentials),
    });
    if (!response.ok) {
        throw new Error('Ошибка при авторизации пользователя');
    }
    return await response.json();
};

// Функция для добавления нового подарка
export const addGift = async (giftData, token) => {
    const response = await fetch(`${API_URL}/gifts/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(giftData),
    });
    if (!response.ok) {
        throw new Error('Ошибка при добавлении подарка');
    }
    return await response.json();
};

// Функция для обновления подарка
export const updateGift = async (id, giftData, token) => {
    const response = await fetch(`${API_URL}/gifts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(giftData),
    });
    if (!response.ok) {
        throw new Error('Ошибка при обновлении подарка');
    }
    return await response.json();
};

// Функция для удаления подарка
export const deleteGift = async (id, token) => {
    const response = await fetch(`${API_URL}/gifts/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Ошибка при удалении подарка');
    }
    return await response.json();
};
