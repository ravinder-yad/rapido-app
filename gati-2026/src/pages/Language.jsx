import React, { useState } from 'react';
import { Box, Typography, IconButton, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { RiArrowLeftLine, RiTranslate2, RiCheckLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const Language = () => {
    const navigate = useNavigate();
    const [lang, setLang] = useState(localStorage.getItem('lang') || 'English');

    const handleChange = (event) => {
        const newLang = event.target.value;
        setLang(newLang);
        localStorage.setItem('lang', newLang);
        // Simulate a small delay/feedback
        setTimeout(() => navigate(-1), 300);
    };

    const languages = [
        { warning: false, label: 'English', value: 'English', native: 'English' },
        { warning: false, label: 'Hindi', value: 'Hindi', native: 'हिन्दी' },
        { warning: false, label: 'Kannada', value: 'Kannada', native: 'ಕನ್ನಡ' },
        { warning: false, label: 'Telugu', value: 'Telugu', native: 'తెలుగు' },
        { warning: false, label: 'Tamil', value: 'Tamil', native: 'தமிழ்' },
    ];

    return (
        <Box sx={{ minHeight: '100vh', background: '#fff', pb: 4 }}>

            {/* Header */}
            <Box sx={{ p: 2, pt: 4, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid #F0F0F0' }}>
                <IconButton onClick={() => navigate(-1)} sx={{ background: '#F5F6FA' }}>
                    <RiArrowLeftLine color="#2D3436" />
                </IconButton>
                <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#2D3436' }}>Choose Language</Typography>
            </Box>

            <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4, background: '#F5F6FA', p: 2, borderRadius: '16px' }}>
                    <RiTranslate2 size={24} color="#5956E9" />
                    <Box>
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#2D3436' }}>App Language</Typography>
                        <Typography sx={{ fontSize: '12px', color: '#A0A3BD' }}>Select your preferred language</Typography>
                    </Box>
                </Box>

                <RadioGroup value={lang} onChange={handleChange}>
                    {languages.map((l) => (
                        <Box
                            key={l.value}
                            sx={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                p: 2, mb: 1.5, borderRadius: '16px',
                                border: lang === l.value ? '2px solid #5956E9' : '1px solid #F0F0F0',
                                background: lang === l.value ? '#F8F9FE' : '#fff',
                                cursor: 'pointer', transition: 'all 0.2s'
                            }}
                            onClick={() => handleChange({ target: { value: l.value } })}
                        >
                            <Box>
                                <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#2D3436' }}>{l.label}</Typography>
                                <Typography sx={{ fontSize: '12px', color: '#A0A3BD' }}>{l.native}</Typography>
                            </Box>
                            {lang === l.value && <RiCheckLine color="#5956E9" size={24} />}
                        </Box>
                    ))}
                </RadioGroup>

            </Box>
        </Box>
    );
};

export default Language;
