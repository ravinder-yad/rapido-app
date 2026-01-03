import React, { useEffect } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { RiCheckDoubleLine, RiShareForwardLine, RiStarFill } from 'react-icons/ri';
import GlassCard from '../GlassCard';
import confetti from 'canvas-confetti';

const RideCompleted = ({ onHome }) => {

    useEffect(() => {
        // Fire confetti on mount
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#7df9ff', '#ff4ecd', '#ffffff']
        });
    }, []);

    return (
        <Box
            component={motion.div}
            initial={{ y: 500 }}
            animate={{ y: 0 }}
            sx={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                zIndex: 1500,
                p: 2,
                pb: 4
            }}
        >
            <GlassCard sx={{ background: 'linear-gradient(180deg, #131825 0%, #0b0f1a 100%)', borderTop: '4px solid #4caf50' }}>

                {/* Success Header */}
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Box sx={{
                        display: 'inline-flex', p: 2, borderRadius: '50%',
                        background: 'rgba(76, 175, 80, 0.2)', color: '#4caf50',
                        mb: 1
                    }}>
                        <RiCheckDoubleLine size={40} />
                    </Box>
                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>
                        Ride Completed!
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray' }}>
                        You arrived on time (2:30 PM)
                    </Typography>
                </Box>

                {/* Stats Row */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, px: 2 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="caption" sx={{ color: 'gray' }}>FARE</Typography>
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>₹45</Typography>
                    </Box>
                    <Box sx={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="caption" sx={{ color: 'gray' }}>TIME</Typography>
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>12m</Typography>
                    </Box>
                    <Box sx={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="caption" sx={{ color: '#4caf50' }}>ECO SAVED</Typography>
                        <Typography variant="h6" sx={{ color: '#4caf50', fontWeight: 700 }}>1.2kg</Typography>
                    </Box>
                </Box>

                {/* Rating */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
                    {[1, 2, 3, 4, 5].map(star => (
                        <RiStarFill key={star} size={28} color={star <= 4 ? "#fbc02d" : "gray"} />
                    ))}
                </Box>

                {/* Actions */}
                <Button
                    onClick={onHome}
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                        background: '#7df9ff', color: '#000', fontWeight: 800, borderRadius: 3, mb: 2
                    }}
                >
                    GO TO HOME 🏠
                </Button>

                <Button
                    fullWidth
                    startIcon={<RiShareForwardLine />}
                    sx={{ color: 'gray' }}
                >
                    Share Details
                </Button>

            </GlassCard>
        </Box>
    );
};

export default RideCompleted;
