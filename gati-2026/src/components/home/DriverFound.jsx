import React from 'react';
import { Box, Typography, Avatar, IconButton, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { RiPhoneFill, RiMessage3Fill, RiShieldStarFill } from 'react-icons/ri';
import GlassCard from '../GlassCard';

const DriverFound = ({ onStartRide }) => {
    return (
        <Box
            component={motion.div}
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            sx={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                zIndex: 1400,
                p: 2,
                pb: 4
            }}
        >
            <GlassCard sx={{ background: '#131825', borderTop: '4px solid #7df9ff' }}>

                {/* Status Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="caption" sx={{ color: '#7df9ff', fontWeight: 700, letterSpacing: 1 }}>
                        DRIVER ON THE WAY • 3 MINS
                    </Typography>
                    <Box sx={{ background: '#222', px: 1, borderRadius: 1 }}>
                        <Typography variant="caption" sx={{ color: 'white', fontWeight: 800 }}>OTP: 4589</Typography>
                    </Box>
                </Box>

                {/* Driver Profile */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Box sx={{ position: 'relative' }}>
                        <Avatar
                            src="https://randomuser.me/api/portraits/men/32.jpg"
                            sx={{ width: 64, height: 64, border: '2px solid white' }}
                        />
                        <Box sx={{ position: 'absolute', bottom: -5, left: '15%', background: '#fff', color: '#000', borderRadius: 4, px: 0.8, fontSize: '0.7rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            4.8 <RiShieldStarFill color="#fbc02d" size={10} />
                        </Box>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, lineHeight: 1.2 }}>
                            Raju Bhai
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'gray' }}>
                            Hero Splendor • DL 8S AB 1234
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton sx={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
                            <RiMessage3Fill size={20} />
                        </IconButton>
                        <IconButton sx={{ background: '#7df9ff', color: '#000' }}>
                            <RiPhoneFill size={20} />
                        </IconButton>
                    </Box>
                </Box>

                {/* Sim Button (For Demo) */}
                <Button
                    onClick={onStartRide}
                    fullWidth
                    variant="outlined"
                    sx={{
                        color: '#7df9ff',
                        borderColor: 'rgba(125, 249, 255, 0.3)',
                        borderRadius: 3
                    }}
                >
                    Simulate "Start Ride" 🚀
                </Button>

            </GlassCard>
        </Box>
    );
};

export default DriverFound;
