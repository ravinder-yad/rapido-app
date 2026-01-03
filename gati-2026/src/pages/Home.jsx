import React, { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
    RiNotification3Line,
    RiMenu2Line,
    RiSearchLine,
    RiCarFill,
    RiTaxiFill,
    RiBusFill,
    RiMotorbikeFill,
    RiArrowUpDownLine,
    RiCalendarLine,
    RiUser3Line
} from 'react-icons/ri';
import BottomNav from '../components/BottomNav';
import { text } from '../data/lang';

const Home = () => {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState('car');

    // Language Logic
    const lang = localStorage.getItem('lang') || 'English';
    const t = text[lang];

    const user = JSON.parse(localStorage.getItem('user')) || {
        name: 'Guest',
        photo: 'https://i.pravatar.cc/150?img=11'
    };

    const RideType = ({ icon: Icon, label, id, active }) => (
        <Box
            onClick={() => setSelectedType(id)}
            sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
                cursor: 'pointer'
            }}
        >
            <Box sx={{
                width: 60, height: 60,
                borderRadius: '20px',
                background: active ? '#5956E9' : '#fff',
                color: active ? '#fff' : '#2D3436',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: active ? '0 10px 20px rgba(89, 86, 233, 0.3)' : '0 4px 10px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
            }}>
                <Icon size={28} />
            </Box>
            <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#2D3436' }}>
                {label}
            </Typography>
        </Box>
    );

    return (
        <Box sx={{
            pb: 14,
            background: 'linear-gradient(180deg, #F0F0FF 0%, #FFFFFF 100%)',
            minHeight: '100vh',
            px: 3, pt: 4
        }}>

            {/* 1. Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{
                        width: 48, height: 48, borderRadius: '14px',
                        backgroundImage: `url("${user.photo}")`,
                        backgroundSize: 'cover'
                    }} />
                    <Box>
                        <Typography sx={{ fontSize: '12px', color: '#A0A3BD', fontWeight: 600 }}>
                            100.00$
                        </Typography>
                        <Typography sx={{ fontSize: '10px', color: '#5956E9', fontWeight: 700, cursor: 'pointer' }}>
                            Top up credit
                        </Typography>
                    </Box>
                </Box>
                <IconButton
                    onClick={() => navigate('/notifications')}
                    sx={{ background: '#fff', borderRadius: '12px', p: 1.5, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
                >
                    <RiNotification3Line color="#2D3436" size={20} />
                </IconButton>
            </Box>

            {/* 2. Title */}
            <Typography variant="h5" sx={{ color: '#2D3436', fontWeight: 800, mb: 0.5 }}>
                {t.home_greeting} {user.name.split(' ')[0]},
            </Typography>
            <Typography variant="h5" sx={{ color: '#5956E9', fontWeight: 800, mb: 3 }}>
                {t.where_to}
            </Typography>


            {/* 3. Search Pill */}
            <Box
                onClick={() => navigate('/search')}
                sx={{
                    background: '#fff',
                    borderRadius: '20px',
                    p: 2, px: 2.5,
                    display: 'flex', alignItems: 'center', gap: 2,
                    boxShadow: '0 8px 20px rgba(0,0,0,0.04)',
                    mb: 4, cursor: 'pointer'
                }}
            >
                <RiSearchLine size={24} color="#2D3436" />
                <Typography sx={{ color: '#A0A3BD', fontWeight: 500 }}>{t.enter_destination}</Typography>
            </Box>

            {/* 4. Ride Types */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, px: 1 }}>
                <RideType icon={RiCarFill} label="Car" id="car" active={selectedType === 'car'} />
                <RideType icon={RiTaxiFill} label="Taxi" id="taxi" active={selectedType === 'taxi'} />
                <RideType icon={RiBusFill} label="Bus" id="bus" active={selectedType === 'bus'} />
                <RideType icon={RiMotorbikeFill} label="Bike" id="bike" active={selectedType === 'bike'} />
            </Box>

            {/* 5. Route Card */}
            <Box sx={{ background: '#fff', borderRadius: '24px', p: 3, boxShadow: '0 8px 30px rgba(0,0,0,0.04)', mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>

                    {/* From */}
                    <Box
                        onClick={() => navigate('/search')}
                        sx={{ flex: 1, cursor: 'pointer', '&:active': { opacity: 0.7 } }}
                    >
                        <Typography sx={{ fontSize: '12px', color: '#A0A3BD', mb: 0.5 }}>{t.from}</Typography>
                        <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#2D3436' }}>PITX</Typography>
                        <Typography sx={{ fontSize: '12px', color: '#A0A3BD', fontWeight: 500 }}>Parañaque City</Typography>
                    </Box>

                    {/* Swap Icon */}
                    <Box sx={{
                        width: 40, height: 40, borderRadius: '12px', background: '#F5F6FA',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 2,
                        cursor: 'pointer'
                    }}>
                        <RiArrowUpDownLine color="#5956E9" size={20} />
                    </Box>

                    {/* To */}
                    <Box
                        onClick={() => navigate('/search')}
                        sx={{ flex: 1, textAlign: 'right', cursor: 'pointer', '&:active': { opacity: 0.7 } }}
                    >
                        <Typography sx={{ fontSize: '12px', color: '#A0A3BD', mb: 0.5 }}>{t.to}</Typography>
                        <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#2D3436' }}>Cubao</Typography>
                        <Typography sx={{ fontSize: '12px', color: '#A0A3BD', fontWeight: 500 }}>Quezon City</Typography>
                    </Box>
                </Box>

                {/* Divider */}
                <Box sx={{ height: '1px', background: '#F0F0F0', my: 2 }} />

                {/* Date & Passengers */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography sx={{ fontSize: '12px', color: '#A0A3BD', mb: 0.5 }}>{t.departing_on}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <RiCalendarLine color="#5956E9" />
                            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#2D3436' }}>{t.select_date}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography sx={{ fontSize: '12px', color: '#A0A3BD', mb: 0.5 }}>{t.passengers}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                            <RiUser3Line color="#5956E9" />
                            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#2D3436' }}>{t.passenger_count}</Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Search Button */}
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate('/select-ride')}
                    sx={{
                        mt: 3,
                        background: '#000',
                        color: '#fff',
                        borderRadius: '16px',
                        py: 2,
                        fontSize: '16px',
                        fontWeight: 700,
                        textTransform: 'none',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                        '&:hover': { background: '#333', transform: 'translateY(-2px)' },
                        transition: 'all 0.2s'
                    }}
                >
                    {t.search}
                </Button>
            </Box>

            {/* Bottom Nav */}
            <BottomNav />
        </Box>
    );
};

export default Home;
