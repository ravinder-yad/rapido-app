import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Avatar, Divider, Switch } from '@mui/material';
import {
    RiArrowLeftLine, RiPencilFill, RiUser3Line, RiMapPinLine, RiContactsLine,
    RiWallet3Line, RiBankCardLine, RiHistoryLine, RiHeart3Line, RiStarLine,
    RiNotification3Line, RiGlobalLine, RiMoonLine, RiShieldCheckLine, RiShareLine,
    RiCustomerService2Line, RiQuestionLine, RiLogoutBoxRLine, RiArrowRightSLine
} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

import { text } from '../data/lang';

const Profile = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {
        name: 'Ravi Kumar',
        mobile: '+91 98765 43210',
        photo: 'https://randomuser.me/api/portraits/men/32.jpg'
    });

    // Language Logic
    const lang = localStorage.getItem('lang') || 'English';
    const t = text[lang];

    // Stats Data
    const stats = [
        { label: t.rides, value: '24', icon: RiHistoryLine, color: '#5956E9' },
        { label: 'Rating', value: '4.8', icon: RiStarLine, color: '#FFBC00' },
        { label: 'Level', value: 'Gold', icon: RiShieldCheckLine, color: '#00B894' },
        { label: 'CO₂ Saved', value: '12kg', icon: RiHeart3Line, color: '#FF4757' },
    ];

    const MenuOption = ({ icon: Icon, title, subtitle, onClick, isDestructive = false }) => (
        <Box
            onClick={onClick}
            sx={{
                display: 'flex', alignItems: 'center', gap: 2, py: 2,
                cursor: 'pointer',
                '&:active': { opacity: 0.7 }
            }}
        >
            <Box sx={{
                width: 40, height: 40, borderRadius: '12px',
                background: isDestructive ? '#FFF0F1' : '#F5F6FA',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <Icon size={20} color={isDestructive ? '#FF4757' : '#2D3436'} />
            </Box>
            <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: '15px', fontWeight: 600, color: isDestructive ? '#FF4757' : '#2D3436' }}>
                    {title}
                </Typography>
                {subtitle && <Typography sx={{ fontSize: '11px', color: '#A0A3BD' }}>{subtitle}</Typography>}
            </Box>
            <RiArrowRightSLine color="#A0A3BD" size={20} />
        </Box>
    );

    const SectionTitle = ({ title }) => (
        <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#A0A3BD', mt: 3, mb: 1, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {title}
        </Typography>
    );

    return (
        <Box sx={{ minHeight: '100vh', background: '#fff', pb: 14, position: 'relative' }}>

            {/* 1. Header & User Info */}
            <Box sx={{ background: '#F5F6FA', pb: 4, borderRadius: '0 0 40px 40px' }}>
                <Box sx={{ p: 2, pt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <IconButton onClick={() => navigate(-1)}>
                        <RiArrowLeftLine color="#2D3436" />
                    </IconButton>
                    <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#2D3436' }}>{t.profile}</Typography>
                    <IconButton onClick={() => navigate('/edit-profile')}>
                        <RiPencilFill color="#2D3436" />
                    </IconButton>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
                    <Box sx={{ position: 'relative' }}>
                        <Avatar
                            src={user.photo}
                            sx={{ width: 100, height: 100, border: '4px solid #fff', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
                        />
                        <Box sx={{
                            position: 'absolute', bottom: 0, right: 0,
                            background: '#5956E9', width: 32, height: 32, borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '3px solid #fff',
                            cursor: 'pointer'
                        }} onClick={() => navigate('/edit-profile')}>
                            <RiPencilFill color="white" size={14} />
                        </Box>
                    </Box>
                    <Typography sx={{ fontSize: '20px', fontWeight: 800, mt: 2, color: '#2D3436' }}>{user.name}</Typography>
                    <Typography sx={{ fontSize: '14px', color: '#A0A3BD', fontWeight: 500 }}>{user.mobile}</Typography>
                </Box>

                {/* Stats Row */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4, px: 2 }}>
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <Box key={idx} sx={{
                                background: '#fff', borderRadius: '16px', p: 1.5,
                                minWidth: '80px', textAlign: 'center',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                            }}>
                                <Icon color={stat.color} size={20} style={{ marginBottom: 4 }} />
                                <Typography sx={{ fontSize: '14px', fontWeight: 800, color: '#2D3436' }}>{stat.value}</Typography>
                                <Typography sx={{ fontSize: '10px', color: '#A0A3BD', fontWeight: 600 }}>{stat.label}</Typography>
                            </Box>
                        );
                    })}
                </Box>
            </Box>

            {/* 2. Options List */}
            <Box sx={{ px: 3, mt: 2 }}>

                <SectionTitle title={t.account} />
                <MenuOption icon={RiUser3Line} title={t.edit_profile} onClick={() => navigate('/edit-profile')} />
                <MenuOption icon={RiMapPinLine} title={t.saved_locations} subtitle="Home, Office" />
                <MenuOption icon={RiContactsLine} title={t.emergency_contacts} />

                <SectionTitle title={t.wallet_payments} />
                <MenuOption icon={RiWallet3Line} title={t.wallet} subtitle="Balance: ₹245.00" onClick={() => navigate('/wallet')} />
                <MenuOption icon={RiHistoryLine} title={t.transaction_history} />

                <SectionTitle title={t.rides} />
                <MenuOption icon={RiHistoryLine} title={t.my_rides} onClick={() => navigate('/orders')} />
                <MenuOption icon={RiHeart3Line} title={t.favorite_rides} />

                <SectionTitle title={t.settings} />
                <MenuOption icon={RiNotification3Line} title={t.notifications} onClick={() => navigate('/notifications')} />
                <MenuOption icon={RiGlobalLine} title={t.language} subtitle={lang} onClick={() => navigate('/language')} />

                <SectionTitle title={t.support} />
                <MenuOption icon={RiCustomerService2Line} title={t.help_support} onClick={() => navigate('/support')} />
                <MenuOption icon={RiLogoutBoxRLine} title={t.logout} isDestructive onClick={() => navigate('/login')} />
            </Box>

            <BottomNav />
        </Box>
    );
};

export default Profile;
