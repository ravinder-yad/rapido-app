import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, TextField, Chip, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftLine, RiSecurePaymentLine, RiShieldCheckFill } from 'react-icons/ri';

const AddMoney = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('100');

    const handleAdd = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);

            // Update Balance
            user.wallet = (user.wallet || 0) + parseInt(amount);

            // Add History
            if (!user.history) user.history = [];
            user.history.push({
                type: 'ADD',
                amount: parseInt(amount),
                date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
            });

            localStorage.setItem('user', JSON.stringify(user));
            navigate('/wallet');
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', background: '#fff', pb: 4 }}>

            {/* Header */}
            <Box sx={{ p: 2, pt: 4, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid #f0f0f0' }}>
                <IconButton onClick={() => navigate('/wallet')}>
                    <RiArrowLeftLine color="#2D3436" />
                </IconButton>
                <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#2D3436' }}>
                    Add Money
                </Typography>
            </Box>

            <Box sx={{ p: 4 }}>
                <Typography sx={{ fontSize: '14px', color: '#A0A3BD', mb: 1 }}>Enter Amount</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
                    <Typography sx={{ fontSize: '32px', fontWeight: 700, color: '#2D3436' }}>₹</Typography>
                    <TextField
                        variant="standard"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        InputProps={{ disableUnderline: true, style: { fontSize: '40px', fontWeight: 700 } }}
                        fullWidth
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 6 }}>
                    {['100', '200', '500'].map(val => (
                        <Chip
                            key={val}
                            label={`₹${val}`}
                            onClick={() => setAmount(val)}
                            sx={{
                                borderRadius: '12px', fontWeight: 600, fontSize: '14px', py: 2,
                                background: amount === val ? '#5956E9' : '#F5F6FA',
                                color: amount === val ? 'white' : '#2D3436'
                            }}
                        />
                    ))}
                </Box>

                <Typography sx={{ fontSize: '16px', fontWeight: 700, mb: 2 }}>Pay Using</Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                        onClick={handleAdd}
                        fullWidth
                        sx={{
                            justifyContent: 'flex-start', p: 2, borderRadius: '16px', border: '1px solid #E0E0E0',
                            color: '#2D3436', textTransform: 'none', fontWeight: 600, fontSize: '16px',
                            gap: 2
                        }}
                    >
                        <Box sx={{ width: 24, height: 24, background: '#00BAF2', borderRadius: '50%' }} /> {/* Proxy Icon */}
                        Paytm UPI
                    </Button>
                    <Button
                        onClick={handleAdd}
                        fullWidth
                        sx={{
                            justifyContent: 'flex-start', p: 2, borderRadius: '16px', border: '1px solid #E0E0E0',
                            color: '#2D3436', textTransform: 'none', fontWeight: 600, fontSize: '16px',
                            gap: 2
                        }}
                    >
                        <Box sx={{ width: 24, height: 24, background: '#5F259F', borderRadius: '50%' }} />
                        PhonePe
                    </Button>
                    <Button
                        onClick={handleAdd}
                        fullWidth
                        sx={{
                            justifyContent: 'flex-start', p: 2, borderRadius: '16px', border: '1px solid #E0E0E0',
                            color: '#2D3436', textTransform: 'none', fontWeight: 600, fontSize: '16px',
                            gap: 2
                        }}
                    >
                        <Box sx={{ width: 24, height: 24, background: '#DB4437', borderRadius: '50%' }} />
                        Google Pay
                    </Button>
                </Box>

            </Box>

            <Box sx={{ textAlign: 'center', mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, color: '#A0A3BD' }}>
                <RiShieldCheckFill color="#00B894" />
                <Typography sx={{ fontSize: '12px' }}>100% Secure Payments</Typography>
            </Box>

        </Box>
    );
};

export default AddMoney;
