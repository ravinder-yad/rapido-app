import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftLine, RiFileList3Fill, RiMotorbikeFill, RiTaxiFill, RiCarFill } from 'react-icons/ri';

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            // Sort by new first
            setOrders((user.orders || []).slice().reverse());
        }
    }, []);

    const getIcon = (type) => {
        if (type === 'bike') return RiMotorbikeFill;
        if (type === 'auto') return RiTaxiFill;
        return RiCarFill;
    };

    const total = orders.length;
    const completed = orders.filter(o => o.status !== 'Cancelled').length;
    const cancelled = orders.filter(o => o.status === 'Cancelled').length;

    return (
        <Box sx={{ minHeight: '100vh', background: '#F5F6FA' }}>

            {/* Header */}
            <Box sx={{ p: 2, pt: 4, display: 'flex', alignItems: 'center', gap: 2, background: '#fff' }}>
                <IconButton onClick={() => navigate('/')}>
                    <RiArrowLeftLine color="#2D3436" />
                </IconButton>
                <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#2D3436' }}>
                    My Rides
                </Typography>
            </Box>

            {/* Stats Summary */}
            <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1, background: '#fff', p: 2, borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '24px', fontWeight: 800, color: '#2D3436' }}>{total}</Typography>
                    <Typography sx={{ fontSize: '12px', color: '#A0A3BD', fontWeight: 600 }}>Total</Typography>
                </Box>
                <Box sx={{ flex: 1, background: '#E6FFFA', p: 2, borderRadius: '16px', textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '24px', fontWeight: 800, color: '#00B894' }}>{completed}</Typography>
                    <Typography sx={{ fontSize: '12px', color: '#00B894', fontWeight: 600 }}>Done</Typography>
                </Box>
                <Box sx={{ flex: 1, background: '#FFF0F1', p: 2, borderRadius: '16px', textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '24px', fontWeight: 800, color: '#FF4757' }}>{cancelled}</Typography>
                    <Typography sx={{ fontSize: '12px', color: '#FF4757', fontWeight: 600 }}>Cancelled</Typography>
                </Box>
            </Box>

            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {orders.length > 0 ? (
                    orders.map((order, idx) => {
                        const Icon = getIcon(order.vehicle);
                        return (
                            <Box key={idx} sx={{ background: '#fff', p: 2, borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2 }}>
                                    <Box sx={{
                                        width: 40, height: 40, background: '#F5F6FA', borderRadius: '12px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <Icon color="#5956E9" size={20} />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#2D3436' }}>
                                            {order.date} • {order.time}
                                        </Typography>
                                        <Typography sx={{ fontSize: '12px', color: '#A0A3BD' }}>
                                            Ride ID: {Math.floor(Math.random() * 900000) + 100000}
                                        </Typography>
                                    </Box>
                                    {order.status === 'Cancelled' ? (
                                        <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#FF4757', bg: '#FFF0F1', px: 1, py: 0.5, borderRadius: 4 }}>
                                            Cancelled
                                        </Typography>
                                    ) : (
                                        <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#2D3436' }}>
                                            ₹{order.price}
                                        </Typography>
                                    )}
                                </Box>

                                <Box sx={{ position: 'relative', pl: 2, borderLeft: '2px solid #F0F0F0' }}>
                                    <Box sx={{
                                        position: 'absolute', left: -5, top: 0, width: 8, height: 8,
                                        background: '#5956E9', borderRadius: '50%'
                                    }} />
                                    <Typography sx={{ fontSize: '12px', color: '#2D3436', mb: 1, fontWeight: 500 }}>
                                        {order.pickup}
                                    </Typography>

                                    <Box sx={{
                                        position: 'absolute', left: -5, bottom: 0, width: 8, height: 8,
                                        background: '#FF4757', borderRadius: '0%'
                                    }} />
                                    <Typography sx={{ fontSize: '12px', color: '#2D3436', fontWeight: 500 }}>
                                        {order.drop}
                                    </Typography>
                                </Box>
                            </Box>
                        );
                    })
                ) : (
                    <Box sx={{ textAlign: 'center', py: 8, opacity: 0.5 }}>
                        <RiFileList3Fill size={48} color="#A0A3BD" />
                        <Typography sx={{ mt: 2 }}>No rides yet</Typography>
                    </Box>
                )}
            </Box>

        </Box>
    );
};

export default Orders;
