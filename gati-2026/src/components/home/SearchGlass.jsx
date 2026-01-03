import React from 'react';
import { Box, Typography, TextField, Button, InputAdornment } from '@mui/material';
import { motion } from 'framer-motion';
import { RiSearchLine, RiRocketLine } from 'react-icons/ri';
import GlassCard from '../GlassCard';

const SearchGlass = ({ onSearch, isValentineMode }) => {
    return (
        <Box
            component={motion.div}
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            sx={{
                position: 'absolute',
                bottom: 24, // Floating above bottom
                left: 16,
                right: 16,
                zIndex: 1000,
            }}
        >
            <GlassCard>
                <Typography variant="h6" sx={{ color: '#fff', mb: 2, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                    Where to? <span style={{ fontSize: '0.8em', fontWeight: 400, color: 'gray' }}>🚀</span>
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        fullWidth
                        placeholder="Search destination"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <RiSearchLine color={isValentineMode ? '#ff4ecd' : '#7df9ff'} size={20} />
                                </InputAdornment>
                            ),
                            sx: {
                                borderRadius: 3,
                                background: 'rgba(0,0,0,0.3)',
                                color: 'white',
                                '& fieldset': { border: '1px solid rgba(255,255,255,0.1)' },
                                '&:hover fieldset': { borderColor: `${isValentineMode ? '#ff4ecd' : '#7df9ff'} !important` }
                            }
                        }}
                    />

                    <Button
                        onClick={onSearch}
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{
                            background: isValentineMode
                                ? 'linear-gradient(90deg, #ff4ecd 0%, #ff0055 100%)'
                                : 'linear-gradient(90deg, #7df9ff 0%, #2f80ed 100%)',
                            color: isValentineMode ? 'white' : '#0b0f1a',
                            fontWeight: 800,
                            fontSize: '1rem',
                            py: 1.5,
                            borderRadius: 3,
                            boxShadow: '0 0 20px rgba(0,0,0,0.2)',
                            '&:hover': {
                                transform: 'scale(1.02)'
                            }
                        }}
                        startIcon={<RiRocketLine />}
                    >
                        FIND A RIDE
                    </Button>
                </Box>
            </GlassCard>
        </Box>
    );
};

export default SearchGlass;
