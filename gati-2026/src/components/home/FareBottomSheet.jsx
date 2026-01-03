import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { RiMoneyRupeeCircleLine, RiLeafLine, RiTimerFlashLine } from 'react-icons/ri';
import GlassCard from '../GlassCard';

const FareBottomSheet = ({ isValentineMode }) => {
    const accentColor = isValentineMode ? '#ff4ecd' : '#7df9ff';

    return (
        <Box
            component={motion.div}
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 20 }}
            sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, #0b0f1a 80%, transparent 100%)',
                pt: 4,
                pb: 2,
                px: 2,
                zIndex: 1000,
                borderRadius: '24px 24px 0 0',
            }}
        >
            <GlassCard sx={{ mb: 0 }}>
                {/* Info Row */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <RiTimerFlashLine color={accentColor} />
                        <Typography variant="body2" sx={{ color: 'white' }}>12 mins • 4.5 km</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <RiLeafLine color="#4caf50" />
                        <Typography variant="body2" sx={{ color: '#4caf50' }}>1.2kg CO₂ saved</Typography>
                    </Box>
                </Box>

                {/* Total Fare */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 3 }}>
                    <Box>
                        <Typography variant="caption" sx={{ color: 'gray' }}>ESTIMATED FARE</Typography>
                        <Typography variant="h3" sx={{ fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                            ₹45 <span style={{ fontSize: '1rem', color: 'gray', fontWeight: 400 }}>approx</span>
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" sx={{ color: accentColor, border: `1px solid ${accentColor}`, px: 1, borderRadius: 2 }}>
                            FASTEST
                        </Typography>
                    </Box>
                </Box>

                {/* Action Button */}
                <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                        background: isValentineMode
                            ? 'linear-gradient(90deg, #ff4ecd 0%, #ff0055 100%)'
                            : 'linear-gradient(90deg, #7df9ff 0%, #2f80ed 100%)',
                        color: isValentineMode ? 'white' : '#0b0f1a',
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        py: 2,
                        borderRadius: 4,
                        boxShadow: isValentineMode
                            ? '0 0 20px rgba(255, 78, 205, 0.5)'
                            : '0 0 20px rgba(125, 249, 255, 0.4)',
                        '&:hover': {
                            boxShadow: isValentineMode
                                ? '0 0 30px rgba(255, 78, 205, 0.7)'
                                : '0 0 30px rgba(125, 249, 255, 0.6)'
                        }
                    }}
                >
                    {isValentineMode ? "BOOK LOVE RIDE ❤️" : "BOOK GATI NOW 🚀"}
                </Button>
            </GlassCard>
        </Box>
    );
};

export default FareBottomSheet;
