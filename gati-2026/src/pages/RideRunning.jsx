import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { RiPhoneFill, RiMessage3Fill, RiShieldCheckFill, RiCloseLine, RiArrowUpLine, RiStarFill } from 'react-icons/ri';
import L from 'leaflet';
import { AnimatePresence, motion } from 'framer-motion';

// Sub Components
import CallScreen from '../components/ride/CallScreen';
import ChatScreen from '../components/ride/ChatScreen';

// Custom Driver Icon
const DriverIcon = L.divIcon({
    className: 'driver-icon',
    html: '<div style="background-color: #000; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); font-size: 16px;">🛵</div>',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
});

const RideRunning = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [isCalling, setIsCalling] = useState(false);
    const [isChatting, setIsChatting] = useState(false);

    // Simulate progress
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) return 0;
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleCompleteRide = () => {
        const storedUser = localStorage.getItem('user');
        const pickupData = JSON.parse(localStorage.getItem('pickup_location'));
        const dropData = JSON.parse(localStorage.getItem('drop_location'));

        if (storedUser && pickupData && dropData) {
            const user = JSON.parse(storedUser);
            const price = 65; // Example price

            // Deduct Wallet
            user.wallet = (user.wallet || 0) - price;

            // Add Order
            if (!user.orders) user.orders = [];
            user.orders.push({
                from: pickupData.name,
                to: dropData.name,
                vehicle: 'Bike', // Default for demo
                price: price,
                date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
                time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
            });

            // Add Wallet History
            if (!user.history) user.history = [];
            user.history.push({
                type: 'RIDE',
                amount: price,
                date: new Date().toLocaleDateString()
            });

            localStorage.setItem('user', JSON.stringify(user));
            navigate('/orders'); // Go to My Rides
        } else {
            navigate('/');
        }
    };

    const handleCancelRide = () => {
        const storedUser = localStorage.getItem('user');
        const pickupData = JSON.parse(localStorage.getItem('pickup_location'));
        const dropData = JSON.parse(localStorage.getItem('drop_location'));

        if (storedUser) {
            const user = JSON.parse(storedUser);
            // Cancel does not deduct money
            if (!user.orders) user.orders = [];
            user.orders.push({
                from: pickupData?.name || "Unknown",
                to: dropData?.name || "Unknown",
                vehicle: 'Bike',
                price: 0,
                status: 'Cancelled',
                date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
                time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
            });

            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
        } else {
            navigate('/');
        }
    };

    return (
        <Box sx={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', background: '#F5F6FA' }}>

            {/* 1. Map Area */}
            <MapContainer
                center={[28.6139, 77.2090]}
                zoom={14}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                <Marker position={[28.6139, 77.2090]} icon={DriverIcon} />
            </MapContainer>

            {/* 2. Top Floating Info (Status) */}
            <Box sx={{
                position: 'absolute', top: 50, left: 20, right: 20,
                background: '#000', borderRadius: '16px', p: 2,
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                boxShadow: '0 8px 20px rgba(0,0,0,0.25)', zIndex: 1000
            }}>
                <Box>
                    <Typography sx={{ fontSize: '14px', fontWeight: 600, opacity: 0.8 }}>Arriving in</Typography>
                    <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>2 mins</Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                    <Typography sx={{ fontSize: '12px', fontWeight: 600, bg: 'rgba(255,255,255,0.2)', px: 1, py: 0.5, borderRadius: '8px' }}>
                        OTP: <span style={{ fontSize: '16px', fontWeight: 700 }}>4921</span>
                    </Typography>
                </Box>
            </Box>

            {/* 3. Bottom Sheet (Driver Details) */}
            <Box sx={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: '#fff',
                borderTopLeftRadius: '30px', borderTopRightRadius: '30px',
                p: 3, pb: 5,
                boxShadow: '0 -10px 40px rgba(0,0,0,0.1)',
                zIndex: 1000
            }}>

                {/* Driver Profile Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{
                            width: 50, height: 50, borderRadius: '50%',
                            backgroundImage: 'url("https://randomuser.me/api/portraits/men/32.jpg")',
                            backgroundSize: 'cover',
                            border: '2px solid #5956E9'
                        }} />
                        <Box>
                            <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#2D3436' }}>
                                Rahul Kumar
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <RiStarFill color="#FFBC00" size={14} />
                                <Typography sx={{ fontSize: '12px', color: '#A0A3BD', fontWeight: 600 }}>4.8 Rating</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ textAlign: 'right' }}>
                        <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#2D3436' }}>
                            DL 5S 8291
                        </Typography>
                        <Typography sx={{ fontSize: '12px', color: '#A0A3BD' }}>
                            Honda Shine • Black
                        </Typography>
                    </Box>
                </Box>

                {/* Progress Visual */}
                <Box sx={{ mb: 4 }}>
                    <Typography sx={{ fontSize: '12px', color: '#A0A3BD', mb: 1 }}>Driver is on the way</Typography>
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                            height: 6, borderRadius: 5,
                            backgroundColor: '#F5F6FA',
                            '& .MuiLinearProgress-bar': { backgroundColor: '#5956E9' }
                        }}
                    />
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        onClick={() => setIsCalling(true)}
                        fullWidth
                        startIcon={<RiPhoneFill />}
                        sx={{
                            background: '#E6FFFA', color: '#00B894',
                            borderRadius: '16px', py: 1.5,
                            fontWeight: 700, textTransform: 'none',
                            '&:hover': { background: '#D6FAF4' }
                        }}
                    >
                        Call
                    </Button>
                    <Button
                        onClick={() => setIsChatting(true)}
                        fullWidth
                        startIcon={<RiMessage3Fill />}
                        sx={{
                            background: '#F0F0FF', color: '#5956E9',
                            borderRadius: '16px', py: 1.5,
                            fontWeight: 700, textTransform: 'none',
                            '&:hover': { background: '#E0E0FF' }
                        }}
                    >
                        Chat
                    </Button>
                    <IconButton sx={{ background: '#F5F6FA', borderRadius: '16px' }}>
                        <RiShieldCheckFill color="#2D3436" />
                    </IconButton>
                </Box>

                {/* Cancel Button (Subtle) & Complete Button (Simulation) */}
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Button
                        onClick={handleCancelRide}
                        fullWidth
                        sx={{ color: '#FF4757', textTransform: 'none', fontWeight: 600, background: '#FFF0F1', borderRadius: '12px', py: 1.5 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCompleteRide}
                        fullWidth
                        sx={{ color: '#00B894', textTransform: 'none', fontWeight: 600, background: '#E6FFFA', borderRadius: '12px', py: 1.5 }}
                    >
                        Complete Ride (Demo)
                    </Button>
                </Box>

            </Box>

            {/* OVERLAYS */}
            <AnimatePresence>
                {isCalling && (
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '100%' }}
                        style={{ position: 'fixed', inset: 0, zIndex: 2000 }}
                    >
                        <CallScreen riderName="Rahul Kumar" onEndCall={() => setIsCalling(false)} />
                    </motion.div>
                )}
                {isChatting && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
                        style={{ position: 'fixed', inset: 0, zIndex: 2000 }}
                    >
                        <ChatScreen riderName="Rahul Kumar" onBack={() => setIsChatting(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

        </Box>
    );
};

export default RideRunning;
