import React, { useState } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import { RiArrowLeftLine, RiInformationFill, RiMapPinUserFill, RiMapPin2Fill, RiTimeFill, RiPinDistanceFill } from 'react-icons/ri';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet Icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons
const PickupIcon = L.divIcon({
    className: 'custom-icon',
    html: '<div style="background-color: #5956E9; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.3);"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

const DropIcon = L.divIcon({
    className: 'custom-icon',
    html: '<div style="background-color: #FF4757; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><span style="color: white; font-size: 12px; font-weight: bold;"></span></div>',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});


const MapRoute = () => {
    const navigate = useNavigate();

    // Dummy Data
    const pickupPos = [28.6139, 77.2090]; // CP, Delhi
    const dropPos = [28.5355, 77.3910];   // Noida
    const routePath = [
        [28.6139, 77.2090],
        [28.6000, 77.2100],
        [28.5800, 77.2500],
        [28.5500, 77.3000],
        [28.5355, 77.3910]
    ];

    return (
        <Box sx={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', background: '#F5F6FA' }}>

            {/* 1. Top Bar */}
            <Box sx={{
                position: 'absolute', top: 0, left: 0, right: 0,
                p: 2, pt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                zIndex: 1000, pointerEvents: 'none'
            }}>
                <IconButton
                    onClick={() => navigate('/search')}
                    sx={{ background: '#fff', pointerEvents: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                >
                    <RiArrowLeftLine color="#2D3436" />
                </IconButton>
                <Box sx={{
                    background: '#fff', px: 2, py: 1, borderRadius: '20px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', pointerEvents: 'auto'
                }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#2D3436' }}>
                        Route Preview
                    </Typography>
                </Box>
                <IconButton sx={{ background: '#fff', pointerEvents: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <RiInformationFill color="#2D3436" />
                </IconButton>
            </Box>

            {/* 2. Map Area */}
            <MapContainer
                center={[28.5700, 77.3000]}
                zoom={11}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                {/* Route Line */}
                <Polyline
                    positions={routePath}
                    pathOptions={{ color: '#5956E9', weight: 5, lineCap: 'round' }}
                />

                {/* Pins */}
                <Marker position={pickupPos} icon={PickupIcon} />
                <Marker position={dropPos} icon={DropIcon} />

            </MapContainer>

            {/* 3. Bottom Sheet Card */}
            <Box sx={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: '#fff',
                borderTopLeftRadius: '30px', borderTopRightRadius: '30px',
                p: 3, pb: 5,
                boxShadow: '0 -10px 40px rgba(0,0,0,0.1)',
                zIndex: 1000
            }}>
                {/* Drag Handle */}
                <Box sx={{ width: 50, height: 5, background: '#E0E0E0', borderRadius: '10px', mx: 'auto', mb: 3 }} />

                {/* Locations */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <RiMapPinUserFill color="#5956E9" size={20} />
                        <Box>
                            <Typography sx={{ fontSize: '10px', color: '#A0A3BD' }}>From</Typography>
                            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#2D3436' }}>
                                Connaught Place, Delhi
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ pl: 1 }}>
                        <Box sx={{ width: 2, height: 20, background: '#F0F0F0', ml: 1 }} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <RiMapPin2Fill color="#FF4757" size={20} />
                        <Box>
                            <Typography sx={{ fontSize: '10px', color: '#A0A3BD' }}>To</Typography>
                            <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#2D3436' }}>
                                City Mall, Noida
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Stats */}
                {/* Stats */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, border: '1px solid #F0F0F0', p: 2, borderRadius: '16px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ p: 1, borderRadius: '12px', background: '#F5F6FA' }}>
                            <RiPinDistanceFill color="#5956E9" size={20} />
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '12px', color: '#A0A3BD', fontWeight: 500 }}>Distance</Typography>
                            <Typography sx={{ fontSize: '15px', fontWeight: 700, color: '#2D3436' }}>16.5 km</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ width: 1, background: '#F0F0F0' }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ p: 1, borderRadius: '12px', background: '#F5F6FA' }}>
                            <RiTimeFill color="#FF4757" size={20} />
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: '12px', color: '#A0A3BD', fontWeight: 500 }}>Time</Typography>
                            <Typography sx={{ fontSize: '15px', fontWeight: 700, color: '#2D3436' }}>45 mins</Typography>
                        </Box>
                    </Box>
                </Box>

                {/* Confirm Button */}
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate('/select-ride')}
                    sx={{
                        background: '#000', color: '#fff',
                        borderRadius: '16px', py: 2.2,
                        fontSize: '16px', fontWeight: 700,
                        textTransform: 'none',
                        '&:hover': { background: '#333' }
                    }}
                >
                    Confirm Location
                </Button>

            </Box>

        </Box>
    );
};

export default MapRoute;
