import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Box } from '@mui/material';

const MainLayout = () => {
    return (
        <Box sx={{ minHeight: '100vh', background: '#0b0f1a', position: 'relative' }}>
            <Box component="main" sx={{ pt: 0, height: '100vh', overflow: 'hidden' }}>
                {/* pt: 0 because map needs to be full screen, content handles its own spacing/z-index */}
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
