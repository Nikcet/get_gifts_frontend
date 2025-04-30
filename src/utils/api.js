import { API_URL } from "./config";
import {
    NotFoundError,
    AuthError,
    BadRequestError,
    DefaultError,
    ForbiddenError,
    ValueError
} from "./errors";

function onResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return res;
}

export const getGifts = async () => {
    try {
        const response = await fetch(`${API_URL}/gifts/`);
        const processedResponse = onResponse(response);

        if (response.status === 404) {
            throw new NotFoundError("Ни одного подарка не найдено");
        } else if (response.status === 403) {
            throw new ForbiddenError("Доступ запрещен");
        } else if (response.status === 400) {
            throw new ValueError("Некорректный запрос");
        } else if (!response.ok) {
            throw new DefaultError("Произошла ошибка при получении подарков");
        }

        return processedResponse;
    } catch (error) {
        if (error instanceof AuthError || error instanceof BadRequestError ||
            error instanceof DefaultError || error instanceof ForbiddenError ||
            error instanceof NotFoundError || error instanceof ValueError) {
            throw error;
        }
        throw new DefaultError("Произошла неизвестная ошибка при получении подарков");
    }
};

export const getGiftById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/gifts/${id}`);
        const processedResponse = onResponse(response);

        if (response.status === 404) {
            throw new NotFoundError("Подарок не найден");
        } else if (response.status === 401) {
            throw new AuthError("Требуется авторизация");
        } else if (response.status === 403) {
            throw new ForbiddenError("Доступ запрещен");
        } else if (response.status === 400) {
            throw new ValueError("Некорректный ID подарка");
        } else if (!response.ok) {
            throw new DefaultError("Произошла ошибка при получении подарка");
        }

        return processedResponse;
    } catch (error) {
        if (error instanceof AuthError || error instanceof BadRequestError ||
            error instanceof DefaultError || error instanceof ForbiddenError ||
            error instanceof NotFoundError || error instanceof ValueError) {
            throw error;
        }
        throw new DefaultError("Произошла неизвестная ошибка при получении подарка");
    }
};

export const getGiftsByUserId = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/gifts/user/${userId}`);
        const processedResponse = onResponse(response);

        if (response.status === 404) {
            throw new NotFoundError("Подарки пользователя не найдены");
        } else if (response.status === 401) {
            throw new AuthError("Требуется авторизация");
        } else if (response.status === 403) {
            throw new ForbiddenError("Доступ запрещен");
        } else if (response.status === 400) {
            throw new ValueError("Некорректный ID пользователя");
        } else if (!response.ok) {
            throw new DefaultError("Произошла ошибка при получении подарков пользователя");
        }

        return processedResponse;
    } catch (error) {
        if (error instanceof AuthError || error instanceof BadRequestError ||
            error instanceof DefaultError || error instanceof ForbiddenError ||
            error instanceof NotFoundError || error instanceof ValueError) {
            throw error;
        }
        throw new DefaultError("Произошла неизвестная ошибка при получении подарков пользователя");
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const processedResponse = onResponse(response);

        if (response.status === 409) {
            throw new BadRequestError("Пользователь уже существует");
        } else if (response.status === 400) {
            throw new ValueError("Некорректные данные пользователя");
        } else if (!response.ok) {
            throw new DefaultError("Произошла ошибка при регистрации пользователя");
        }

        return processedResponse;
    } catch (error) {
        if (error instanceof AuthError || error instanceof BadRequestError ||
            error instanceof DefaultError || error instanceof ForbiddenError ||
            error instanceof NotFoundError || error instanceof ValueError) {
            throw error;
        }
        throw new DefaultError("Произошла неизвестная ошибка при регистрации пользователя");
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(userData),
        });
        const processedResponse = onResponse(response);

        if (response.status === 401) {
            throw new AuthError("Не правильные логин или пароль");
        } else if (response.status === 400) {
            throw new ValueError("Некорректные данные для входа");
        } else if (!response.ok) {
            throw new DefaultError("Произошла ошибка при авторизации");
        }

        return processedResponse;
    } catch (error) {
        if (error instanceof AuthError || error instanceof BadRequestError ||
            error instanceof DefaultError || error instanceof ForbiddenError ||
            error instanceof NotFoundError || error instanceof ValueError) {
            throw error;
        }
        throw new DefaultError("Произошла неизвестная ошибка при авторизации");
    }
};

export const addGift = async (giftData) => {
    try {
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
        const processedResponse = onResponse(response);

        if (response.status === 401) {
            throw new AuthError("Требуется авторизация");
        } else if (response.status === 403) {
            throw new ForbiddenError("Недостаточно прав для добавления подарка");
        } else if (response.status === 400) {
            throw new ValueError("Некорректные данные подарка");
        } else if (response.status === 409) {
            throw new BadRequestError("Такой подарок уже существует");
        } else if (!response.ok) {
            throw new DefaultError("Произошла ошибка при добавлении подарка");
        }

        return processedResponse;
    } catch (error) {
        if (error instanceof AuthError || error instanceof BadRequestError ||
            error instanceof DefaultError || error instanceof ForbiddenError ||
            error instanceof NotFoundError || error instanceof ValueError) {
            throw error;
        }
        throw new DefaultError("Произошла неизвестная ошибка при добавлении подарка");
    }
};

export const updateGift = async (id, giftData) => {
    try {
        const token = localStorage.getItem('_access_token');
        const response = await fetch(`${API_URL}/gifts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify(giftData),
        });
        const processedResponse = onResponse(response);

        if (response.status === 401) {
            throw new AuthError("Требуется авторизация");
        } else if (response.status === 403) {
            throw new ForbiddenError("Недостаточно прав для обновления подарка");
        } else if (response.status === 400) {
            throw new ValueError("Некорректные данные подарка");
        } else if (response.status === 404) {
            throw new NotFoundError("Подарок не найден");
        } else if (!response.ok) {
            throw new DefaultError("Произошла ошибка при обновлении подарка");
        }

        return processedResponse;
    } catch (error) {
        if (error instanceof AuthError || error instanceof BadRequestError ||
            error instanceof DefaultError || error instanceof ForbiddenError ||
            error instanceof NotFoundError || error instanceof ValueError) {
            throw error;
        }
        throw new DefaultError("Произошла неизвестная ошибка при обновлении подарка");
    }
};

export const deleteGift = async (id) => {
    try {
        const token = localStorage.getItem('_access_token');
        const response = await fetch(`${API_URL}/gifts/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            credentials: "include",
        });
        const processedResponse = onResponse(response);

        if (response.status === 401) {
            throw new AuthError("Требуется авторизация");
        } else if (response.status === 403) {
            throw new ForbiddenError("Недостаточно прав для удаления подарка");
        } else if (response.status === 404) {
            throw new NotFoundError("Подарок не найден");
        } else if (response.status === 400) {
            throw new ValueError("Некорректный ID подарка");
        } else if (!response.ok) {
            throw new DefaultError("Произошла ошибка при удалении подарка");
        }

        return processedResponse;
    } catch (error) {
        if (error instanceof AuthError || error instanceof BadRequestError ||
            error instanceof DefaultError || error instanceof ForbiddenError ||
            error instanceof NotFoundError || error instanceof ValueError) {
            throw error;
        }
        throw new DefaultError("Произошла неизвестная ошибка при удалении подарка");
    }
};