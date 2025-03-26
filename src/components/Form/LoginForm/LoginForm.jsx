import React from 'react';
import './LoginForm.css';

const LoginForm = () => {
    return (
        <>
            <div className="form__field">
                <label className="form__label" htmlFor="username">Имя пользователя</label>
                <input
                    className="form__input"
                    type="text"
                    id="username"
                    name="username"
                    placeholder='Латиницей'
                    required
                />
            </div>
            <div className="form__field">
                <label className="form__label" htmlFor="password">Пароль</label>
                <input
                    className="form__input"
                    type="password"
                    id="password"
                    name="password"
                    placeholder='Не забудьте. Восстановить, пока, нельзя'
                    required
                />
            </div>
        </>
    );
};

export default LoginForm;
