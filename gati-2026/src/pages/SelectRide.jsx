import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftLine, RiMotorbikeFill, RiTaxiFill, RiCarFill, RiInformationFill } from 'react-icons/ri';
import Map from '../components/Map';
import { calculateDistance } from '../utils/distance';

const SelectRide = () => {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState('bike');
    const [pickup, setPickup] = useState(null);
    const [drop, setDrop] = useState(null);
    const [distance, setDistance] = useState(0);
    const [rides, setRides] = useState([]);

    useEffect(() => {
        // Load locations
        const pickupData = JSON.parse(localStorage.getItem('pickup_location'));
        const dropData = JSON.parse(localStorage.getItem('drop_location'));

        if (!dropData) {
            navigate('/search');
            return;
        }

        // Use default coords for Delhi if pickup is missing (Fallback)
        const finalPickup = pickupData || { lat: 28.6139, lon: 77.2090, name: 'Current Location', address: 'New Delhi' };

        setPickup(finalPickup);
        setDrop(dropData);

        // Calculate Distance
        const dist = parseFloat(calculateDistance(finalPickup.lat, finalPickup.lon, dropData.lat, dropData.lon));
        setDistance(dist);

        // Generate Rides
        const calculatedRides = [
            {
                id: 'bike',
                name: 'Bike',
                eta: '4 mins',
                price: `₹${Math.max(25, Math.round(dist * 8))}`, // Min fare ₹25
                desc: 'Affordable, instant ride',
                icon: RiMotorbikeFill,
                color: '#5956E9'
            },
            {
                id: 'auto',
                name: 'Auto',
                eta: '2 mins',
                price: `₹${Math.max(40, Math.round(dist * 12))}`, // Min fare ₹40
                desc: 'No bargaining, doorstep',
                icon: RiTaxiFill,
                color: '#FFBC00'
            },
            {
                id: 'car',
                name: 'Cab Economy',
                eta: '8 mins',
                price: `₹${Math.max(60, Math.round(dist * 18))}`,
                desc: 'Comfortable hatchbacks',
                icon: RiCarFill,
                color: '#2D3436'
            },
            {
                id: 'premium',
                name: 'Cab Premium',
                eta: '10 mins',
                price: `₹${Math.max(80, Math.round(dist * 22))}`, // Min fare ₹80
                desc: 'Sedans with top drivers',
                icon: RiCarFill,
                color: '#000'
            },
        ];

        setRides(calculatedRides);

    }, [navigate]);

    const handleBook = () => {
        // Validation for long distance bike rides
        if (selectedId === 'bike' && distance > 30) {
            alert("Bike rides are not available for long distances (>30km). Please choose a Cab.");
            return;
        }
        navigate('/ride');
    };

    return (
        <Box sx={{ minHeight: '100vh', background: '#F5F6FA', pb: 16, position: 'relative' }}>

            {/* 1. Map View */}
            <Box sx={{ height: '35vh', width: '100%', position: 'relative' }}>
                <IconButton
                    onClick={() => navigate('/search')}
                    sx={{ position: 'absolute', top: 20, left: 20, zIndex: 1000, background: 'white' }}
                >
                    <RiArrowLeftLine color="#2D3436" />
                </IconButton>
                {pickup && drop && (
                    <Map
                        center={[pickup.lat, pickup.lon]}
                        zoom={11}
                        markers={[
                            { position: [pickup.lat, pickup.lon], popup: "Pickup: " + pickup.name },
                            { position: [drop.lat, drop.lon], popup: "Drop: " + drop.name }
                        ]}
                    />
                )}
            </Box>

            {/* 2. Sheet Content */}
            <Box sx={{
                minHeight: '65vh', background: 'white',
                borderTopLeftRadius: '24px', borderTopRightRadius: '24px',
                mt: -3, position: 'relative', zIndex: 10, p: 3
            }}>
                <Box sx={{ width: 40, height: 4, background: '#E0E0E0', borderRadius: '2px', mx: 'auto', mb: 3 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#2D3436' }}>
                        Distance: {distance} km
                    </Typography>
                    {distance > 40 && (
                        <Typography sx={{ fontSize: '10px', color: 'red', fontWeight: 600 }}>
                            Inter-city Trip Warning
                        </Typography>
                    )}
                </Box>

                {/* Ride Options */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {rides.map((ride) => {
                        const isSelected = selectedId === ride.id;
                        const Icon = ride.icon;
                        return (
                            <Box
                                key={ride.id}
                                onClick={() => setSelectedId(ride.id)}
                                sx={{
                                    background: '#fff',
                                    borderRadius: '16px',
                                    p: 2,
                                    display: 'flex', alignItems: 'center', gap: 2,
                                    border: isSelected ? '2px solid #5956E9' : '1px solid #F0F0F0',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <Box sx={{
                                    width: 48, height: 48, borderRadius: '12px',
                                    background: '#F5F6FA',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Icon size={24} color={ride.color} />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#2D3436' }}>
                                        {ride.name}
                                    </Typography>
                                    <Typography sx={{ fontSize: '12px', color: '#A0A3BD' }}>
                                        {ride.eta} • {ride.desc}
                                    </Typography>
                                </Box>
                                <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#2D3436' }}>
                                    {ride.price}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>
            </Box>

            {/* Bottom Action */}
            <Box sx={{
                position: 'fixed', bottom: 0, left: 0, right: 0,
                p: 3, background: '#fff', borderTop: '1px solid #f0f0f0', zIndex: 100
            }}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleBook}
                    sx={{
                        background: '#000', color: '#fff',
                        borderRadius: '16px', py: 2,
                        fontSize: '16px', fontWeight: 700,
                        textTransform: 'none',
                        '&:hover': { background: '#333' }
                    }}
                >
                    Book {rides.find(r => r.id === selectedId)?.name}
                </Button>
            </Box>

        </Box>
    );
};

export default SelectRide;
