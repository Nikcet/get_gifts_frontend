import React from 'react';
import { Box, Typography } from '@mui/material';

const Form = ({ title, children }) => {
    return (
        <Box sx={{ width: 400, mx: 'auto', p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                {title}
            </Typography>
            {children}
        </Box>
    );
};

export default Form;
