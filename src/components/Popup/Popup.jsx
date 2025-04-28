import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import Close from '@mui/icons-material/Close';

const Popup = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            sx={{
                position: 'absolute',
                bgcolor: 'background.paper',
                minWidth: '400px'
            }}
        >
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: 'text.secondary'
                }}
            >
                <Close />
            </IconButton>

            {title && <DialogTitle>{title}</DialogTitle>}

            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default Popup;
