import React from 'react';
import { Box, Typography, Button, IconButton, Divider } from '@mui/material';
import { RiArrowLeftLine, RiDownloadLine, RiHeart3Line, RiStarFill, RiMapPinUserFill, RiMapPin2Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const OrderDetails = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ minHeight: '100vh', background: '#fff', pb: 4, position: 'relative' }}>

            {/* 1. Header */}
            <Box sx={{ p: 2, pt: 4, display: 'flex', alignItems: 'center', gap: 2, position: 'absolute', top: 0, left: 0, zIndex: 10 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                    <RiArrowLeftLine color="#2D3436" />
                </IconButton>
                {/* Title is hidden on header image, or can be added */}
            </Box>

            {/* 2. Map Snapshot */}
            <Box sx={{
                height: '250px',
                background: 'url("https://miro.medium.com/v2/resize:fit:1400/1*qYUvh-EtES8dtgKiBRiLsA.png")',
                backgroundSize: 'cover', backgroundPosition: 'center',
                position: 'relative'
            }}>
                <Box sx={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: '30px', background: '#fff',
                    borderRadius: '30px 30px 0 0'
                }} />
            </Box>

            {/* 3. Details Content */}
            <Box sx={{ px: 3, mt: -1 }}>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ fontSize: '20px', fontWeight: 800, color: '#2D3436' }}>Bike Ride</Typography>
                    <Typography sx={{ fontSize: '18px', fontWeight: 800, color: '#2D3436' }}>₹50.00</Typography>
                </Box>
                <Typography sx={{ fontSize: '12px', color: '#A0A3BD', mb: 3 }}>12 Aug 2024, 10:30 AM</Typography>

                {/* Locations */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <RiMapPinUserFill color="#5956E9" size={20} />
                        <Box>
                            <Typography sx={{ fontSize: '10px', color: '#A0A3BD' }}>Pickup</Typography>
                            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#2D3436' }}>
                                Metro Station, Delhi
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ pl: 1 }}>
                        <Box sx={{ width: 2, height: 20, background: '#F0F0F0', ml: 1 }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <RiMapPin2Fill color="#FF4757" size={20} />
                        <Box>
                            <Typography sx={{ fontSize: '10px', color: '#A0A3BD' }}>Drop</Typography>
                            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#2D3436' }}>
                                College Gate No. 2
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* Rider Info */}
                <Typography sx={{ fontSize: '14px', fontWeight: 700, mb: 2 }}>Rider Details</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                    <Box sx={{
                        width: 50, height: 50, borderRadius: '50%',
                        backgroundImage: 'url("https://randomuser.me/api/portraits/men/32.jpg")',
                        backgroundSize: 'cover',
                        border: '2px solid #5956E9'
                    }} />
                    <Box>
                        <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>Rahul Kumar</Typography>
                        <Typography sx={{ fontSize: '12px', color: '#A0A3BD' }}>DL 5S 8291 • Honda Shine</Typography>
                    </Box>
                    <Box sx={{ ml: 'auto', display: 'flex', gap: 0.5 }}>
                        <RiStarFill color="#FFBC00" />
                        <Typography sx={{ fontWeight: 700 }}>4.8</Typography>
                    </Box>
                </Box>

                {/* Actions */}
                <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<RiDownloadLine />}
                    sx={{ mb: 2, borderRadius: '12px', textTransform: 'none', fontWeight: 600, borderColor: '#E0E0E0', color: '#2D3436' }}
                >
                    Download Invoice
                </Button>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        fullWidth
                        sx={{ background: '#FFF0F1', color: '#FF4757', borderRadius: '12px', py: 1.5, fontWeight: 700 }}
                    >
                        Report Issue
                    </Button>
                    <Button
                        fullWidth
                        sx={{ background: '#5956E9', color: '#fff', borderRadius: '12px', py: 1.5, fontWeight: 700, '&:hover': { background: '#4a44d1' } }}
                    >
                        Book Again
                    </Button>
                </Box>

            </Box>
        </Box>
    );
};

export default OrderDetails;
