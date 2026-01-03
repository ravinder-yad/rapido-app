import React, { useState } from 'react';
import { Box, Typography, IconButton, InputBase } from '@mui/material';
import { RiArrowLeftLine, RiSendPlaneFill, RiAttachment2 } from 'react-icons/ri';

const ChatScreen = ({ onBack, riderName }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hi, I am on my way!', sender: 'rider', time: '10:05 AM' },
        { id: 2, text: 'Okay, I am sending the OTP.', sender: 'user', time: '10:06 AM' },
        { id: 3, text: 'Thanks.', sender: 'rider', time: '10:06 AM' }
    ]);
    const [inputText, setInputText] = useState('');

    const quickChips = ["📍 I'm at pickup", "⏳ 2 mins late", "Call me 📞", "Wrong location ❌"];

    const handleSend = () => {
        if (!inputText.trim()) return;
        setMessages([...messages, { id: Date.now(), text: inputText, sender: 'user', time: 'Now' }]);
        setInputText('');
    };

    const handleChipClick = (text) => {
        setMessages([...messages, { id: Date.now(), text: text, sender: 'user', time: 'Now' }]);
    };

    return (
        <Box sx={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: '#F5F6FA', zIndex: 2000,
            display: 'flex', flexDirection: 'column'
        }}>

            {/* 1. Top Bar */}
            <Box sx={{
                p: 2, pt: 4, display: 'flex', alignItems: 'center', gap: 2,
                background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
                <IconButton onClick={onBack} sx={{ color: '#2D3436' }}>
                    <RiArrowLeftLine />
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{
                        width: 40, height: 40, borderRadius: '50%',
                        backgroundImage: 'url("https://randomuser.me/api/portraits/men/32.jpg")',
                        backgroundSize: 'cover',
                        border: '2px solid #5956E9'
                    }} />
                    <Box>
                        <Typography sx={{ fontSize: '16px', fontWeight: 700 }}>{riderName}</Typography>
                        <Typography sx={{ fontSize: '12px', color: '#00B894', fontWeight: 600 }}>● Online</Typography>
                    </Box>
                </Box>
            </Box>

            {/* 2. Messages Area */}
            <Box sx={{ flex: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {messages.map((msg) => (
                    <Box
                        key={msg.id}
                        sx={{
                            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                            maxWidth: '75%'
                        }}
                    >
                        <Box sx={{
                            background: msg.sender === 'user' ? '#5956E9' : 'white',
                            color: msg.sender === 'user' ? 'white' : '#2D3436',
                            p: 2, borderRadius: msg.sender === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}>
                            <Typography sx={{ fontSize: '14px' }}>{msg.text}</Typography>
                        </Box>
                        <Typography sx={{ fontSize: '10px', color: '#A0A3BD', mt: 0.5, textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                            {msg.time}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* 3. Quick Chips */}
            <Box sx={{ p: 2, display: 'flex', gap: 1, overflowX: 'auto', scrollbarWidth: 'none' }}>
                {quickChips.map((chip, idx) => (
                    <Box
                        key={idx}
                        onClick={() => handleChipClick(chip)}
                        sx={{
                            background: 'white', border: '1px solid #E0E0E0',
                            px: 2, py: 0.8, borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                            cursor: 'pointer', whiteSpace: 'nowrap',
                            '&:hover': { background: '#F0F0FF', borderColor: '#5956E9' }
                        }}
                    >
                        {chip}
                    </Box>
                ))}
            </Box>

            {/* 4. Input Area */}
            <Box sx={{ p: 2, background: 'white', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <IconButton sx={{ background: '#F5F6FA' }}>
                    <RiAttachment2 color="#A0A3BD" />
                </IconButton>
                <InputBase
                    fullWidth
                    placeholder="Type a message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    sx={{
                        background: '#F5F6FA', borderRadius: '25px', px: 2.5, py: 1,
                        fontSize: '14px'
                    }}
                />
                <IconButton
                    onClick={handleSend}
                    sx={{
                        background: '#5956E9', color: 'white',
                        '&:hover': { background: '#4a47c3' }
                    }}
                >
                    <RiSendPlaneFill />
                </IconButton>
            </Box>

        </Box>
    );
};

export default ChatScreen;
