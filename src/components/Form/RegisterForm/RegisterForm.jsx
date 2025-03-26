import React from 'react';
import './RegisterForm.css';

const RegisterForm = () => {

    return (
        <>
            <div className="form__field">
                <label className="form__label" htmlFor="username">Имя пользователя</label>
                <input
                    className="form__input"
                    type="text"
                    id="username"
                    placeholder='Латиницей, можно вводить любой'
                    required
                />
            </div>
            <div className="form__field">
                <label className="form__label" htmlFor="password">Пароль</label>
                <input
                    className="form__input"
                    type="password"
                    id="password"
                    placeholder='Пока что любой'
                    required
                />
            </div>
            <div className="form__field">
                <label className="form__label" htmlFor="confirm-password">Повторите пароль</label>
                <input
                    className="form__input"
                    type="password"
                    id="confirm-password"
                    placeholder='Не забудьте потом, восстановить не получится'
                    required
                />
            </div>
        </>
    );
};

export default RegisterForm;
