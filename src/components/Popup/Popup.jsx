import React from 'react';
import './Popup.css';

const Popup = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <button className="popup__close" onClick={onClose} aria-label="Закрыть">
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Popup;
