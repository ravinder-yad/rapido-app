import React, { useState } from 'react';
import { Box, Typography, IconButton, InputBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftLine, RiMapPinUserFill, RiSearchLine, RiMapPin2Fill, RiTimeFill, RiArrowRightSLine } from 'react-icons/ri';

const Search = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const [results, setResults] = useState([]);

    // Debounce Search Logic
    React.useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm.length > 2) {
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}&countrycodes=in&limit=5`);
                    const data = await response.json();
                    setResults(data);
                } catch (error) {
                    console.error("Error fetching location:", error);
                }
            } else {
                setResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const [pickup, setPickup] = useState('Current Location');
    const [loadingLocation, setLoadingLocation] = useState(false);

    const handleCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }

        setLoadingLocation(true);
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                const data = await response.json();

                const address = data.display_name;
                setPickup(address.split(',')[0]); // Short name

                // Save pickup location
                localStorage.setItem('pickup_location', JSON.stringify({
                    name: address.split(',')[0],
                    address: address,
                    lat: latitude,
                    lon: longitude
                }));
            } catch (error) {
                console.error("Error fetching address:", error);
                setPickup("Location not found");
            } finally {
                setLoadingLocation(false);
            }
        }, () => {
            alert('Unable to retrieve your location');
            setLoadingLocation(false);
        });
    };

    const handleLocationSelect = (loc) => {
        // Save selected location logic
        localStorage.setItem('drop_location', JSON.stringify({
            name: loc.display_name.split(',')[0],
            address: loc.display_name,
            lat: loc.lat,
            lon: loc.lon
        }));
        navigate('/select-ride');
    };

    return (
        <Box sx={{ minHeight: '100vh', background: '#fff', pb: 4 }}>

            {/* 1. Top Bar */}
            <Box sx={{
                p: 2, pt: 4, display: 'flex', alignItems: 'center', gap: 2,
                borderBottom: '1px solid #f0f0f0'
            }}>
                <IconButton onClick={() => navigate('/')} sx={{ background: '#F5F6FA' }}>
                    <RiArrowLeftLine color="#2D3436" />
                </IconButton>
                <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#2D3436' }}>
                    Search Location
                </Typography>
            </Box>

            {/* 2. Inputs Section */}
            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>

                {/* Visual Connector Line */}
                <Box sx={{
                    position: 'absolute', left: 42, top: 120, bottom: 0, height: 40, width: 2,
                    background: '#e0e0e0', zIndex: 0
                }} />

                {/* Pickup Input */}
                <Box
                    onClick={handleCurrentLocation}
                    sx={{
                        background: '#F5F6FA', borderRadius: '16px', p: 2,
                        display: 'flex', alignItems: 'center', gap: 2, zIndex: 1,
                        cursor: 'pointer',
                        '&:active': { opacity: 0.7 }
                    }}
                >
                    <Box sx={{
                        width: 10, height: 10, borderRadius: '50%', background: '#5956E9',
                        boxShadow: '0 0 0 4px rgba(89, 86, 233, 0.2)'
                    }} />
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: '10px', color: '#A0A3BD' }}>Pickup Location</Typography>
                        <InputBase
                            value={loadingLocation ? "Detecting location..." : pickup}
                            fullWidth
                            readOnly
                            sx={{ fontSize: '14px', fontWeight: 600, color: '#2D3436', cursor: 'pointer' }}
                        />
                    </Box>
                    <RiMapPinUserFill color="#5956E9" />
                </Box>

                {/* Drop Input */}
                <Box sx={{
                    background: '#F5F6FA', borderRadius: '16px', p: 2,
                    display: 'flex', alignItems: 'center', gap: 2, zIndex: 1,
                    border: '1px solid #5956E9', boxShadow: '0 4px 12px rgba(89, 86, 233, 0.1)'
                }}>
                    <Box sx={{
                        width: 10, height: 10, borderRadius: '0%', transform: 'rotate(45deg)', background: '#FF4757',
                        boxShadow: '0 0 0 4px rgba(255, 71, 87, 0.2)'
                    }} />
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: '10px', color: '#A0A3BD' }}>Where do you want to go?</Typography>
                        <InputBase
                            placeholder="Search destination"
                            autoFocus
                            fullWidth
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{ fontSize: '14px', fontWeight: 600, color: '#2D3436' }}
                        />
                    </Box>
                    <RiSearchLine color="#FF4757" />
                </Box>
            </Box>

            {/* 3. Recent / Saved Locations */}
            <Box sx={{ px: 3, mt: 1 }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#2D3436', mb: 2 }}>
                    Recent Locations
                </Typography>

                {results.length > 0 ? (
                    results.map((loc, idx) => (
                        <Box
                            key={idx}
                            onClick={() => handleLocationSelect(loc)}
                            sx={{
                                display: 'flex', alignItems: 'center', gap: 2, p: 2, mb: 1,
                                borderRadius: '16px', cursor: 'pointer',
                                '&:hover': { background: '#F8F9FE' }
                            }}
                        >
                            <Box sx={{
                                width: 40, height: 40, borderRadius: '12px', background: '#F0F0FF',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <RiMapPin2Fill color="#5956E9" size={20} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#2D3436' }}>
                                    {loc.display_name.split(',')[0]}
                                </Typography>
                                <Typography sx={{ fontSize: '12px', color: '#A0A3BD', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '250px' }}>
                                    {loc.display_name}
                                </Typography>
                            </Box>
                            <Box>
                                <RiArrowRightSLine color="#A0A3BD" />
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Box sx={{ textAlign: 'center', mt: 4, opacity: 0.5 }}>
                        <Typography sx={{ fontSize: '14px' }}>Start typing to search...</Typography>
                    </Box>
                )}
            </Box>

        </Box>
    );
};

export default Search;
