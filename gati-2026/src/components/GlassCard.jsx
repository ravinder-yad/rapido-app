import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const GlassCard = ({ children, sx = {}, ...props }) => {
    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
                background: 'rgba(23, 28, 45, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 4,
                padding: 3,
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                ...sx
            }}
            {...props}
        >
            {children}
        </Box>
    );
};

export default GlassCard;
