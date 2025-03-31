import React, { useState } from 'react';
import { loginUser, registerUser } from '../../utils/api';
import { isObjectEmpty } from '../../utils/utils';
import { isStrongPassword, isAscii, equals } from 'validator';
import './Form.css';

const Form = ({ title, children, setIsAuth }) => {

    const handleLogin = async (credentials) => {
        const data = await loginUser({ username: credentials.username, password: credentials.password });

        if (isObjectEmpty(data)) throw new Error("Ошибка авторизации");

        setIsAuth(data.user_id);

        localStorage.setItem('_access_token', data.access_token);
        localStorage.setItem('_user_id', data.user_id);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {};
        const formElements = Array.from(e.target.elements);

        try {
            formElements.forEach((el) => {
                if (el.id === 'username') {
                    if (!isAscii(el.value)) {
                        throw new Error("Не правильное имя");
                    }
                    formData.username = el.value;
                } else if (el.id === 'password') {
                    if (!isStrongPassword(el.value)) {
                        throw new Error("Пароль слишком слабый");
                    }
                    formData.password = el.value;
                } else if (el.id === 'confirm-password') {
                    if (!equals(formData.password, el.value)) {
                        throw new Error("Пароли не совпадают");
                    }
                    formData.confirmPassword = el.value;
                }
            });
        }
        catch (err) {
            console.error(err);
        }

        if (formElements.length === 3) {
            try {
                await handleLogin(formData);
            } catch (err) {
                console.error(err);
            }
        } else {
            if (!equals(formData.password, formData.confirmPassword)) {
                throw new Error('Пароли не совпадают');
            }
            try {
                await registerUser(formData);
                await handleLogin(formData);
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="form">
            <h2 className="form__title">{title}</h2>
            <form className="form__inner" onSubmit={handleSubmit}>
                {children}
                <button className="form__button" type="submit">{title}</button>
            </form>
        </div>
    );
};

export default Form;
