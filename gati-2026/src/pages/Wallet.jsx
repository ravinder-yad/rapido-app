import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, IconButton, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftLine, RiWallet3Fill, RiAddLine, RiHistoryLine, RiArrowRightSLine } from 'react-icons/ri';

const Wallet = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            // Sort history by new to old (assuming we push new items to end, so reverse)
            setHistory((parsedUser.history || []).slice().reverse());
        }
    }, []);

    if (!user) return null;

    return (
        <Box sx={{ minHeight: '100vh', background: '#F5F6FA' }}>

            {/* Header */}
            <Box sx={{ p: 2, pt: 4, display: 'flex', alignItems: 'center', gap: 2, background: '#fff' }}>
                <IconButton onClick={() => navigate('/')}>
                    <RiArrowLeftLine color="#2D3436" />
                </IconButton>
                <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#2D3436' }}>
                    My Wallet
                </Typography>
            </Box>

            {/* Balance Card */}
            <Box sx={{ p: 3 }}>
                <Box sx={{
                    background: 'linear-gradient(135deg, #2D3436 0%, #000000 100%)',
                    borderRadius: '24px', p: 3, color: 'white',
                    display: 'flex', flexDirection: 'column', gap: 1,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.8 }}>
                        <RiWallet3Fill />
                        <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>Total Balance</Typography>
                    </Box>
                    <Typography sx={{ fontSize: '42px', fontWeight: 700 }}>
                        ₹{user.wallet || 0}
                    </Typography>

                    <Button
                        onClick={() => navigate('/add-money')}
                        startIcon={<RiAddLine />}
                        sx={{
                            mt: 2, background: 'rgba(255,255,255,0.2)', color: 'white',
                            borderRadius: '12px', textTransform: 'none', fontWeight: 600,
                            justifyContent: 'flex-start', py: 1.5, px: 2,
                            backdropFilter: 'blur(10px)',
                            '&:hover': { background: 'rgba(255,255,255,0.3)' }
                        }}
                    >
                        Add Money
                    </Button>
                </Box>
            </Box>

            {/* History Section */}
            <Box sx={{ px: 3 }}>
                <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#2D3436', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <RiHistoryLine color="#5956E9" /> Transaction History
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pb: 4 }}>
                    {history.length > 0 ? (
                        history.map((item, idx) => (
                            <Box key={idx} sx={{
                                background: '#fff', p: 2, borderRadius: '16px',
                                display: 'flex', alignItems: 'center', justifySelf: 'space-between',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                            }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#2D3436' }}>
                                        {item.type === 'ADD' ? 'Money Added' : 'Ride Payment'}
                                    </Typography>
                                    <Typography sx={{ fontSize: '12px', color: '#A0A3BD' }}>
                                        {item.date}
                                    </Typography>
                                </Box>
                                <Typography sx={{
                                    fontSize: '16px', fontWeight: 700,
                                    color: item.type === 'ADD' ? '#00B894' : '#FF4757'
                                }}>
                                    {item.type === 'ADD' ? '+' : '-'}₹{item.amount}
                                </Typography>
                            </Box>
                        ))
                    ) : (
                        <Box sx={{ textAlign: 'center', py: 4, opacity: 0.5 }}>
                            <Typography>No transactions yet</Typography>
                        </Box>
                    )}
                </Box>
            </Box>

        </Box>
    );
};

export default Wallet;
