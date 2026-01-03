import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from 'framer-motion';

const Navbar = () => {
    return (
        <AppBar
            component={motion.div}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            position="fixed"
            sx={{
                background: 'rgba(11, 15, 26, 0.6)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                top: 0
            }}
            elevation={0}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" component="div" sx={{
                        color: '#7df9ff',
                        fontWeight: 800,
                        letterSpacing: 1.5,
                        textShadow: '0 0 10px rgba(125, 249, 255, 0.5)'
                    }}>
                        GATI
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton color="inherit">
                        <Badge badgeContent={2} color="secondary">
                            <NotificationsIcon sx={{ color: '#fff' }} />
                        </Badge>
                    </IconButton>
                    <Avatar
                        alt="User"
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                        sx={{ width: 40, height: 40, border: '2px solid #7df9ff' }}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
