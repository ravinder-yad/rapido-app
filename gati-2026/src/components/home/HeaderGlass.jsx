import React from 'react';
import { Box, Typography, IconButton, Avatar, Badge, Switch } from '@mui/material';
import { motion } from 'framer-motion';
import { RiNotification3Line, RiMenu4Line } from 'react-icons/ri';
import { BiMoon, BiSun } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';

const HeaderGlass = ({ isValentineMode, toggleValentineMode, isDark, toggleTheme }) => {
    return (
        <Box
            component={motion.div}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1100,
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'linear-gradient(180deg, rgba(11,15,26,0.8) 0%, rgba(11,15,26,0) 100%)',
            }}
        >
            {/* Left: Menu & Greeting */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton sx={{ color: 'white', backdropFilter: 'blur(5px)', background: 'rgba(255,255,255,0.05)' }}>
                    <RiMenu4Line size={24} />
                </IconButton>
                <Box>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', display: 'block', mb: -0.5 }}>
                        Good Evening,
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: isValentineMode ? '#ff4ecd' : '#fff' }}>
                        Ravinder 👋
                    </Typography>
                </Box>
            </Box>

            {/* Right: Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                {/* Valentine Toggle */}
                <IconButton
                    onClick={toggleValentineMode}
                    sx={{
                        color: isValentineMode ? '#ff4ecd' : 'gray',
                        background: isValentineMode ? 'rgba(255, 78, 205, 0.1)' : 'transparent',
                        border: isValentineMode ? '1px solid #ff4ecd' : 'none',
                        transition: 'all 0.3s'
                    }}
                >
                    <FaHeart size={20} />
                </IconButton>

                <IconButton sx={{ color: '#fff' }}>
                    <Badge color="secondary" variant="dot">
                        <RiNotification3Line size={22} />
                    </Badge>
                </IconButton>

                <Avatar
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    sx={{ width: 40, height: 40, border: `2px solid ${isValentineMode ? '#ff4ecd' : '#7df9ff'}` }}
                />
            </Box>
        </Box>
    );
};

export default HeaderGlass;
