import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { RiMicFill, RiMicOffFill, RiVolumeUpFill, RiVolumeMuteFill, RiPhoneFill, RiUser3Fill } from 'react-icons/ri';
import { motion } from 'framer-motion';

const CallScreen = ({ onEndCall, riderName }) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isSpeaker, setIsSpeaker] = useState(false);
    const [callTime, setCallTime] = useState(0);

    // Call Timer
    useEffect(() => {
        const timer = setInterval(() => setCallTime(t => t + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <Box sx={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(20, 20, 30, 0.95)',
            backdropFilter: 'blur(20px)',
            zIndex: 2000,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
            py: 8, px: 4, color: 'white'
        }}>

            {/* 1. Header */}
            <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '18px', fontWeight: 600, mb: 1 }}>Calling...</Typography>
                <Typography sx={{ fontSize: '24px', fontWeight: 700 }}>{riderName}</Typography>
                <Typography sx={{ fontSize: '14px', opacity: 0.7, mt: 1 }}>{formatTime(callTime)}</Typography>
            </Box>

            {/* 2. Visualizer / Avatar */}
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Ripples */}
                {[1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
                        style={{
                            position: 'absolute', width: '150px', height: '150px',
                            borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)',
                        }}
                    />
                ))}

                {/* Profile Pic */}
                <Box sx={{
                    width: 120, height: 120, borderRadius: '50%',
                    backgroundImage: 'url("https://randomuser.me/api/portraits/men/32.jpg")',
                    backgroundSize: 'cover',
                    zIndex: 10, border: '4px solid rgba(255,255,255,0.1)'
                }} />
            </Box>

            {/* 3. Controls */}
            <Box sx={{ width: '100%', maxWidth: '300px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 6 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <IconButton
                            onClick={() => setIsMuted(!isMuted)}
                            sx={{
                                background: isMuted ? 'white' : 'rgba(255,255,255,0.15)',
                                color: isMuted ? 'black' : 'white',
                                p: 2, mb: 1
                            }}
                        >
                            {isMuted ? <RiMicOffFill size={28} /> : <RiMicFill size={28} />}
                        </IconButton>
                        <Typography sx={{ fontSize: '12px' }}>Mute</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <IconButton
                            onClick={() => setIsSpeaker(!isSpeaker)}
                            sx={{
                                background: isSpeaker ? 'white' : 'rgba(255,255,255,0.15)',
                                color: isSpeaker ? 'black' : 'white',
                                p: 2, mb: 1
                            }}
                        >
                            {isSpeaker ? <RiVolumeUpFill size={28} /> : <RiVolumeMuteFill size={28} />}
                        </IconButton>
                        <Typography sx={{ fontSize: '12px' }}>Speaker</Typography>
                    </Box>
                </Box>

                <IconButton
                    onClick={onEndCall}
                    sx={{
                        background: '#FF4757', color: 'white',
                        width: 70, height: 70, mx: 'auto', display: 'flex',
                        boxShadow: '0 10px 30px rgba(255, 71, 87, 0.4)',
                        '&:hover': { background: '#FF6B81' },
                        transform: 'rotate(135deg)'
                    }}
                >
                    <RiPhoneFill size={32} />
                </IconButton>
            </Box>
        </Box>
    );
};

export default CallScreen;
