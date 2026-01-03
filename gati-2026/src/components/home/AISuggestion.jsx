import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { RiLightbulbFlashLine } from 'react-icons/ri';

const AISuggestion = ({ isValentineMode }) => {
    return (
        <Box
            component={motion.div}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            sx={{
                position: 'absolute',
                bottom: 180, // Above the bottom sheet
                left: 16,
                zIndex: 1000,
                maxWidth: 220,
            }}
        >
            <Box sx={{
                background: 'rgba(11, 15, 26, 0.8)',
                backdropFilter: 'blur(12px)',
                borderLeft: `4px solid ${isValentineMode ? '#ff4ecd' : '#7df9ff'}`,
                p: 1.5,
                borderRadius: '0 12px 12px 0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
            }}>
                <RiLightbulbFlashLine size={24} color={isValentineMode ? '#ff4ecd' : '#7df9ff'} />
                <Box>
                    <Typography variant="caption" sx={{ color: 'gray', textTransform: 'uppercase', fontWeight: 800, fontSize: '0.65rem' }}>
                        GATI AI SAYS
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff', fontSize: '0.8rem', lineHeight: 1.2 }}>
                        {isValentineMode ? "Love is in the air! Expect 50% more romance. ❤️" : "Traffic is low. Save 10 mins with GATI Bike! 🚀"}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default AISuggestion;
