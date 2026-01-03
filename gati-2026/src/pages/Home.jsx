import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
    RiSearchLine,
    RiMapPinUserFill,
    RiHistoryLine,
    RiStarFill,
    RiMapPin2Fill,
    RiFocus3Line,
    RiMotorbikeFill,
    RiTaxiFill,
    RiCarFill
} from 'react-icons/ri';
import BottomNav from '../components/BottomNav';
import Map from '../components/Map';
import { text } from '../data/lang';

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || { name: 'Guest' });
    const [selectedType, setSelectedType] = useState('bike');

    // Language Logic
    const lang = localStorage.getItem('lang') || 'English';
    const t = text[lang];

    // Get current location (simulated for now)
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        // Quick simulate location or fetch from storage if available
        const lastLoc = JSON.parse(localStorage.getItem('last_location'));
        if (lastLoc) setCurrentLocation([lastLoc.lat, lastLoc.lon]);
        else setCurrentLocation([12.9716, 77.5946]); // Bangalore default
    }, []);

    const LocationShortcut = ({ icon: Icon, label, address, color }) => (
        <Box
            onClick={() => navigate('/search')}
            sx={{
                background: '#fff',
                p: 2, borderRadius: '16px',
                display: 'flex', alignItems: 'center', gap: 2,
                mb: 1.5,
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                cursor: 'pointer',
                transition: 'transform 0.1s',
                '&:active': { transform: 'scale(0.98)' }
            }}
        >
            <Box sx={{
                width: 40, height: 40, borderRadius: '12px',
                background: color + '15', // 15% opacity
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <Icon size={20} color={color} />
            </Box>
            <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: '15px', fontWeight: 700, color: '#2D3436' }}>{label}</Typography>
                <Typography sx={{ fontSize: '12px', color: '#A0A3BD' }} noWrap>{address}</Typography>
            </Box>
        </Box>
    );

    const RideType = ({ icon: Icon, label, id, active }) => (
        <Box
            onClick={() => setSelectedType(id)}
            sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
                cursor: 'pointer',
                transition: 'transform 0.1s',
                '&:active': { transform: 'scale(0.95)' }
            }}
        >
            <Box sx={{
                width: 56, height: 56,
                borderRadius: '16px',
                background: active ? '#000' : '#fff',
                color: active ? '#fff' : '#2D3436',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                border: active ? 'none' : '1px solid #F0F0F0'
            }}>
                <Icon size={24} />
            </Box>
            <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#2D3436' }}>
                {label}
            </Typography>
        </Box>
    );

    return (
        <Box sx={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', background: '#F5F6FA' }}>

            {/* 1. Full Screen Map Layer */}
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
                <Map
                    center={currentLocation}
                    zoom={15}
                    height="100%"
                    width="100%"
                    // Single marker for user location
                    markers={currentLocation ? [{ position: currentLocation, popup: "You are here" }] : []}
                />
            </Box>

            {/* 2. Top Floating Header (User Profile & Menu) */}
            <Box sx={{
                position: 'absolute', top: 0, left: 0, right: 0,
                p: 2, pt: 3,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)',
                zIndex: 10,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <Box
                    onClick={() => navigate('/profile')}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1.5, background: '#fff', p: 0.8, pr: 2, borderRadius: 10, boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                >
                    <Box sx={{
                        width: 36, height: 36, borderRadius: '50%',
                        backgroundImage: `url("${user.photo || 'https://i.pravatar.cc/150?img=11'}")`,
                        backgroundSize: 'cover'
                    }} />
                    <Typography sx={{ fontSize: '13px', fontWeight: 700, color: '#2D3436' }}>
                        Hi, {user.name.split(' ')[0]}
                    </Typography>
                </Box>
            </Box>

            {/* 3. Bottom Sheet (Search & Shortcuts) */}
            <Box sx={{
                position: 'absolute', bottom: 80, left: 16, right: 16, // Above BottomNav
                zIndex: 10,
                display: 'flex', flexDirection: 'column', gap: 2
            }}>

                {/* RESTORED: Vehicle Selectors (Floating Row) */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1, mb: 1 }}>
                    <RideType icon={RiMotorbikeFill} label="Bike" id="bike" active={selectedType === 'bike'} />
                    <RideType icon={RiTaxiFill} label="Auto" id="auto" active={selectedType === 'auto'} />
                    <RideType icon={RiCarFill} label="Cab" id="car" active={selectedType === 'car'} />
                    <RideType icon={RiFocus3Line} label="Parcel" id="parcel" active={selectedType === 'parcel'} />
                </Box>

                {/* Search Bar (Floating) */}
                <Box
                    onClick={() => navigate('/search')}
                    sx={{
                        background: '#000',
                        borderRadius: '20px',
                        p: 2.5,
                        display: 'flex', alignItems: 'center', gap: 2,
                        boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                        mb: 3, cursor: 'pointer',
                        transform: 'translateY(10px)'
                    }}
                >
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: '#F9D71C', boxShadow: '0 0 10px #F9D71C' }} />
                    <Typography sx={{ fontSize: '18px', fontWeight: 600, color: '#fff' }}>
                        Where are you going?
                    </Typography>
                    <RiSearchLine size={24} color="#fff" style={{ marginLeft: 'auto' }} />
                </Box>

                {/* Recent Shortcuts */}
                <LocationShortcut icon={RiHistoryLine} label="Office" address="DLF Cyber City, Gurugram" color="#5956E9" />
                <LocationShortcut icon={RiStarFill} label="Home" address="Sector 21, Dwarka" color="#FFBC00" />
            </Box>

            {/* 4. Recenter Button */}
            <IconButton
                sx={{
                    position: 'absolute', bottom: 350, right: 20,
                    background: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                    width: 48, height: 48, zIndex: 10
                }}
            >
                <RiFocus3Line color="#2D3436" size={24} />
            </IconButton>

            {/* 5. Bottom Navigation */}
            <BottomNav />
        </Box>
    );
};

export default Home;
