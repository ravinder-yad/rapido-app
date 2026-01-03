import React, { useState } from 'react';
import { Box, Typography, Button, InputBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RiUser3Line, RiArrowRightLine } from 'react-icons/ri';

const FinishProfile = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');

    const handleFinish = () => {
        if (name.length < 2) return;

        // Create user object
        const mobile = localStorage.getItem('auth_mobile');
        const user = {
            name: name,
            mobile: mobile,
            photo: 'https://i.pravatar.cc/150?img=12', // Default avatar
            wallet: 0,
            language: 'English' // Default
        };

        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(user));

        // Go to Home
        navigate('/');
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex', flexDirection: 'column',
            p: 4, pt: 8,
            background: '#fff'
        }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#2D3436', mb: 1 }}>
                What's your name?
            </Typography>
            <Typography sx={{ color: '#A0A3BD', mb: 6 }}>
                Let us know how to address you.
            </Typography>

            <Box sx={{
                background: '#F5F6FA', borderRadius: '16px', p: 2,
                display: 'flex', alignItems: 'center', gap: 2, mb: 4,
                border: '1px solid #5956E9', boxShadow: '0 4px 12px rgba(89, 86, 233, 0.1)'
            }}>
                <RiUser3Line color="#5956E9" size={24} />
                <InputBase
                    placeholder="Enter full name"
                    fullWidth
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ fontSize: '16px', fontWeight: 600, color: '#2D3436' }}
                />
            </Box>

            <Button
                variant="contained"
                fullWidth
                onClick={handleFinish}
                disabled={name.length < 2}
                endIcon={<RiArrowRightLine />}
                sx={{
                    background: '#000',
                    color: '#fff',
                    borderRadius: '16px',
                    py: 2,
                    fontSize: '16px',
                    fontWeight: 700,
                    textTransform: 'none',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    '&:hover': { background: '#333' }
                }}
            >
                Get Started
            </Button>
        </Box>
    );
};

export default FinishProfile;
