import React, { useState } from 'react';
import { Box, Typography, Button, InputBase, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftLine, RiUser3Line, RiMailLine } from 'react-icons/ri';

const Signup = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ minHeight: '100vh', background: '#fff', p: 3, pt: 4 }}>
            <IconButton onClick={() => navigate(-1)} sx={{ background: '#F5F6FA', mb: 4 }}>
                <RiArrowLeftLine color="#2D3436" />
            </IconButton>

            <Typography sx={{ fontSize: '24px', fontWeight: 800, color: '#2D3436', mb: 1 }}>
                Create Account
            </Typography>
            <Typography sx={{ fontSize: '14px', color: '#A0A3BD', mb: 4 }}>
                Fill in your details to get started
            </Typography>

            {/* Inputs */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 4 }}>

                {/* Name Input */}
                <Box sx={{
                    background: '#F5F6FA', borderRadius: '16px', p: 2,
                    display: 'flex', alignItems: 'center', gap: 2,
                    border: '2px solid transparent',
                    '&:focus-within': { background: '#fff', border: '2px solid #5956E9', boxShadow: '0 4px 12px rgba(89, 86, 233, 0.1)' },
                    transition: 'all 0.2s'
                }}>
                    <RiUser3Line color="#5956E9" size={22} />
                    <InputBase placeholder="Full Name" sx={{ flex: 1, fontWeight: 700, fontSize: '16px', color: '#2D3436' }} />
                </Box>

                {/* Email Input */}
                <Box sx={{
                    background: '#F5F6FA', borderRadius: '16px', p: 2,
                    display: 'flex', alignItems: 'center', gap: 2,
                    border: '2px solid transparent',
                    '&:focus-within': { background: '#fff', border: '2px solid #5956E9', boxShadow: '0 4px 12px rgba(89, 86, 233, 0.1)' },
                    transition: 'all 0.2s'
                }}>
                    <RiMailLine color="#5956E9" size={22} />
                    <InputBase placeholder="Email Address" type="email" sx={{ flex: 1, fontWeight: 700, fontSize: '16px', color: '#2D3436' }} />
                </Box>
            </Box>

            <Button
                variant="contained"
                fullWidth
                onClick={() => navigate('/login')} // Redirect to login to simulate flow
                sx={{
                    background: '#000', color: '#fff',
                    borderRadius: '16px', py: 2,
                    fontSize: '16px', fontWeight: 700, textTransform: 'none',
                    '&:hover': { background: '#333' }
                }}
            >
                Create Account
            </Button>
        </Box>
    );
};

export default Signup;
