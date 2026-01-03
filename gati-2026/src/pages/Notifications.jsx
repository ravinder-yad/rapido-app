import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { RiArrowLeftLine, RiNotification3Fill, RiDiscountPercentFill, RiInformationFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const Notifications = () => {
    const navigate = useNavigate();

    const notifs = [
        {
            id: 1,
            title: 'Ride Completed',
            desc: 'Your ride to City Mall has been completed correctly.',
            time: '2 mins ago',
            icon: RiInformationFill,
            color: '#00B894'
        },
        {
            id: 2,
            title: '30% Off on Auto Rides!',
            desc: 'Use code AUTO30 to get discount on your next 5 rides.',
            time: '2 hours ago',
            icon: RiDiscountPercentFill,
            color: '#FFBC00'
        },
        {
            id: 3,
            title: 'Wallet Updated',
            desc: '₹200 added to your wallet successfully.',
            time: 'Yesterday',
            icon: RiNotification3Fill,
            color: '#5956E9'
        }
    ];

    return (
        <Box sx={{ minHeight: '100vh', background: '#fff', pb: 4 }}>

            {/* Header */}
            <Box sx={{ p: 2, pt: 4, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid #F0F0F0' }}>
                <IconButton onClick={() => navigate(-1)} sx={{ background: '#F5F6FA' }}>
                    <RiArrowLeftLine color="#2D3436" />
                </IconButton>
                <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#2D3436' }}>Notifications</Typography>
            </Box>

            <Box sx={{ p: 2 }}>
                {notifs.map(n => {
                    const Icon = n.icon;
                    return (
                        <Box key={n.id} sx={{
                            display: 'flex', gap: 2, p: 2, mb: 2,
                            borderRadius: '20px', background: '#F9FAFB'
                        }}>
                            <Box sx={{
                                minWidth: 48, height: 48, borderRadius: '50%',
                                background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                            }}>
                                <Icon size={24} color={n.color} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography sx={{ fontSize: '15px', fontWeight: 700, color: '#2D3436' }}>{n.title}</Typography>
                                    <Typography sx={{ fontSize: '11px', color: '#A0A3BD', fontWeight: 500 }}>{n.time}</Typography>
                                </Box>
                                <Typography sx={{ fontSize: '13px', color: '#555', lineHeight: 1.4 }}>{n.desc}</Typography>
                            </Box>
                        </Box>
                    );
                })}

                <Typography sx={{ textAlign: 'center', mt: 4, color: '#A0A3BD', fontSize: '12px' }}>
                    No more notifications
                </Typography>
            </Box>
        </Box>
    );
};

export default Notifications;
