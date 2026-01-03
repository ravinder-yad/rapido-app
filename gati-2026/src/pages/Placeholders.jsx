import React from 'react';
import { Box, Typography } from '@mui/material';

const PlaceholderPage = ({ title }) => (
    <Box sx={{ p: 4, pt: 10, color: 'white', textAlign: 'center' }}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" sx={{ color: 'gray', mt: 2 }}>Coming Soon</Typography>
    </Box>
);

export const Search = () => <PlaceholderPage title="Search Location 🔍" />;
export const MapRoute = () => <PlaceholderPage title="Map Route 🗺️" />;
export const SelectRide = () => <PlaceholderPage title="Select Ride 🛵" />;
export const RideRunning = () => <PlaceholderPage title="Ride Running 🚦" />;
export const Profile = () => <PlaceholderPage title="Profile 👤" />;
