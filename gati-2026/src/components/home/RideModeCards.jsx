import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { RiMotorbikeFill, RiCarFill, RiGroupFill } from 'react-icons/ri';
import { FaHeart } from 'react-icons/fa';
import GlassCard from '../GlassCard';

const rides = [
    { id: 1, name: 'GATI Bike', icon: <RiMotorbikeFill size={28} />, time: '3 min', price: '₹45', type: 'fast' },
    { id: 2, name: 'GATI Plus', icon: <RiCarFill size={28} />, time: '5 min', price: '₹120', type: 'comfort' },
    { id: 3, name: 'Friends', icon: <RiGroupFill size={28} />, time: '7 min', price: '₹90', type: 'economy' },
    { id: 4, name: 'Valentine', icon: <FaHeart size={24} />, time: 'Now', price: '₹69', type: 'love' },
];

const RideModeCards = ({ isValentineMode, selectedRide, setSelectedRide }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
                overflowX: 'auto',
                py: 2,
                px: 1,
                '::-webkit-scrollbar': { display: 'none' } // Hide scrollbar
            }}
        >
            {rides.map((ride, index) => {
                const isSelected = selectedRide === ride.id;
                const color = ride.type === 'love' || isValentineMode ? '#ff4ecd' : '#7df9ff';

                return (
                    <GlassCard
                        key={ride.id}
                        onClick={() => setSelectedRide(ride.id)}
                        component={motion.div}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        sx={{
                            minWidth: 100,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 1.5,
                            cursor: 'pointer',
                            background: isSelected
                                ? (ride.type === 'love' ? 'rgba(255, 78, 205, 0.2)' : 'rgba(125, 249, 255, 0.15)')
                                : 'rgba(23, 28, 45, 0.6)',
                            border: isSelected ? `1px solid ${color}` : '1px solid rgba(255,255,255,0.05)',
                            position: 'relative',
                        }}
                    >
                        {/* Icon Circle */}
                        <Box sx={{
                            p: 1.5,
                            borderRadius: '50%',
                            background: isSelected ? color : 'rgba(255,255,255,0.05)',
                            color: isSelected ? '#000' : 'white',
                            mb: 1,
                            transition: 'all 0.3s'
                        }}>
                            {ride.icon}
                        </Box>

                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'white' }}>
                            {ride.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                            {ride.time}
                        </Typography>

                        {/* Price Tag */}
                        <Box sx={{
                            position: 'absolute',
                            top: -5,
                            right: -5,
                            background: color,
                            color: '#000',
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            px: 0.8,
                            py: 0.2,
                            borderRadius: 4
                        }}>
                            {ride.price}
                        </Box>
                    </GlassCard>
                );
            })}
        </Box>
    );
};

export default RideModeCards;
