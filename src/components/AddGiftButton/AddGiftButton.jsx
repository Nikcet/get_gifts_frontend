import React from "react";
import {
    Box,
    Button,
} from '@mui/material';

const AddGiftButton = ({ onClick, fixed = false }) => {

    return (
        <Box sx={{
            textAlign: 'center',
            mt: 2,
            ...(fixed && {
                position: 'fixed',
                bottom: 16,
                right: 16,
                zIndex: 1000,
                mt: 0,
                textAlign: 'right',
                '& .MuiButton-root': {
                    borderRadius: '28px',
                    boxShadow: 3
                }
            })
        }}>
            <Button
                variant="contained"
                onClick={onClick}
            >
                Добавить подарок
            </Button>
        </Box>
    )
}

export default AddGiftButton;