import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, InputBase, IconButton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { RiArrowLeftLine } from 'react-icons/ri';

const OTPVerification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const mobile = location.state?.mobile || '9876543210';
    const [otp, setOtp] = useState(['', '', '', '']);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleVerify = () => {
        // Dummy verification
        const enteredOtp = otp.join('');
        if (enteredOtp === "1234") {
            const mobile = location.state?.mobile || '9876543210';
            localStorage.setItem('auth_mobile', mobile);

            // Simulating Backend Check:
            // Since we are frontend-only, we check if 'user' object exists in localStorage using THIS number
            // But 'user' object might be from a previous session.
            // For the purpose of "First Time Login" demo, let's assume if 'user' is null, it's a first time login.
            const existingUser = localStorage.getItem('user');

            if (existingUser && JSON.parse(existingUser).mobile === mobile) {
                navigate('/');
            } else {
                navigate('/finish-profile');
            }
        } else {
            alert('Please enter OTP: 1234');
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', background: '#fff', p: 3 }}>

            <IconButton onClick={() => navigate(-1)} sx={{ background: '#F5F6FA', mb: 4 }}>
                <RiArrowLeftLine color="#2D3436" />
            </IconButton>

            <Typography sx={{ fontSize: '24px', fontWeight: 800, color: '#2D3436', mb: 1 }}>
                Verification
            </Typography>
            <Typography sx={{ fontSize: '14px', color: '#A0A3BD', mb: 6 }}>
                We sent a code to <b style={{ color: '#2D3436' }}>+91 {mobile}</b>
            </Typography>

            {/* OTP Inputs */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 6, px: 2 }}>
                {otp.map((data, index) => (
                    <input
                        key={index}
                        type="text"
                        name="otp"
                        maxLength="1"
                        value={data}
                        onChange={e => handleChange(e.target, index)}
                        onFocus={e => e.target.select()}
                        style={{
                            width: '60px', height: '60px',
                            textAlign: 'center',
                            fontSize: '24px', fontWeight: 'bold',
                            border: '1px solid #E0E0E0',
                            borderRadius: '16px',
                            background: '#F5F6FA',
                            outlineColor: '#5956E9'
                        }}
                    />
                ))}
            </Box>

            <Button
                variant="contained"
                fullWidth
                onClick={handleVerify}
                sx={{
                    background: '#5956E9', color: '#fff',
                    borderRadius: '16px', py: 2,
                    fontSize: '16px', fontWeight: 700, textTransform: 'none',
                    '&:hover': { background: '#4a44d1' }
                }}
            >
                Verify & Proceed
            </Button>

            <Typography sx={{ textAlign: 'center', mt: 4, fontSize: '14px', color: '#A0A3BD', fontWeight: 500 }}>
                Resend code in 00:30
            </Typography>

        </Box>
    );
};

export default OTPVerification;
