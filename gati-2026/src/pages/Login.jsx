import React, { useState } from 'react';
import { Box, Typography, Button, InputBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RiSmartphoneLine, RiArrowRightLine } from 'react-icons/ri';

const Login = () => {
    const navigate = useNavigate();
    const [mobile, setMobile] = useState('');

    const handleGetOTP = () => {
        if (mobile.length === 10) {
            localStorage.setItem('temp_mobile', mobile); // Save to local storage
            navigate('/otp', { state: { mobile } });
        } else {
            alert('Please enter a valid 10-digit number');
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', background: '#fff', p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            {/* Logo / Branding */}
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Box sx={{ width: 80, height: 80, background: '#5956E9', borderRadius: '20px', mx: 'auto', mb: 2 }} />
                <Typography sx={{ fontSize: '24px', fontWeight: 800, color: '#2D3436' }}>GATI</Typography>
                <Typography sx={{ fontSize: '14px', color: '#A0A3BD' }}>Move with safety</Typography>
            </Box>

            {/* Input */}
            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#2D3436', mb: 1 }}>Enter Mobile Number</Typography>
            <Box sx={{
                background: '#F5F6FA', borderRadius: '16px', p: 2,
                display: 'flex', alignItems: 'center', gap: 2, mb: 4,
                border: '2px solid transparent',
                '&:focus-within': { background: '#fff', border: '2px solid #5956E9', boxShadow: '0 4px 12px rgba(89, 86, 233, 0.1)' },
                transition: 'all 0.2s'
            }}>
                <RiSmartphoneLine color="#5956E9" size={24} />
                <Typography sx={{ fontWeight: 700, color: '#2D3436', fontSize: '18px' }}>+91</Typography>
                <InputBase
                    placeholder="Enter number"
                    autoFocus
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    sx={{ flex: 1, fontSize: '18px', fontWeight: 700, color: '#2D3436' }}
                />
            </Box>

            {/* Button */}
            <Button
                variant="contained"
                fullWidth
                onClick={handleGetOTP}
                sx={{
                    background: '#000', color: '#fff',
                    borderRadius: '16px', py: 2,
                    fontSize: '16px', fontWeight: 700, textTransform: 'none',
                    '&:hover': { background: '#333' }
                }}
            >
                Get OTP code
            </Button>

            {/* Footer */}
            <Typography sx={{ textAlign: 'center', mt: 4, fontSize: '14px', color: '#A0A3BD' }}>
                Don't have an account? <span onClick={() => navigate('/signup')} style={{ color: '#5956E9', fontWeight: 700, cursor: 'pointer' }}>Sign Up</span>
            </Typography>

        </Box>
    );
};

export default Login;
