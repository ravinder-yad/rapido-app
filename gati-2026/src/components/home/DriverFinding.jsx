import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import GlassCard from '../GlassCard';

/* Radar Animation Styles */
const radarKeyframes = `
@keyframes radar-ping {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(3); opacity: 0; }
}
`;

const DriverFinding = ({ onCancel }) => {
    return (
        <Box sx={{
            position: 'absolute',
            top: 0, bottom: 0, left: 0, right: 0,
            zIndex: 1300,
            background: 'rgba(11, 15, 26, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <style>{radarKeyframes}</style>

            {/* Radar Visual */}
            <Box sx={{ position: 'relative', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                {/* Ping Circles */}
                <Box sx={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '2px solid #7df9ff', animation: 'radar-ping 2s infinite' }} />
                <Box sx={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '2px solid #7df9ff', animation: 'radar-ping 2s infinite', animationDelay: '0.6s' }} />

                {/* Center Icon */}
                <Avatar
                    src="https://cdn-icons-png.flaticon.com/512/3097/3097180.png"
                    sx={{ width: 60, height: 60, p: 1, background: '#7df9ff', '& img': { objectFit: 'contain' } }}
                />
            </Box>

            <Typography variant="h5" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
                Finding your Captain...
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray', mb: 4 }}>
                Connecting with nearby drivers
            </Typography>

            {/* Cancel Button */}
            <Box
                onClick={onCancel}
                sx={{
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 4,
                    px: 3, py: 1,
                    color: 'white',
                    cursor: 'pointer',
                    '&:hover': { background: 'rgba(255,255,255,0.1)' }
                }}
            >
                Cancel Request
            </Box>
        </Box>
    );
};

export default DriverFinding;
