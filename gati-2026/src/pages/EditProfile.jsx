import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton, TextField, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftLine, RiCameraLine, RiUser3Line, RiSmartphoneLine } from 'react-icons/ri';

const EditProfile = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [photo, setPhoto] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        console.log("Loaded user for edit:", storedUser); // Debugging
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setName(user.name || '');
            setMobile(user.mobile || '');
            setPhoto(user.photo || '');
        }
    }, []);

    const handleSave = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            user.name = name;
            user.photo = photo;
            localStorage.setItem('user', JSON.stringify(user));
            // Update auth state in App if needed, or just navigate
            navigate('/profile');
            window.location.reload(); // Force refresh to update Header elsewhere
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setPhoto(imageUrl);
        }
    };

    // Explicit Input Styles to ensure visibility
    const inputStyles = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            backgroundColor: '#F5F6FA',
            color: '#2D3436', // Dark text color
            '& fieldset': { border: 'none' },
            '&:hover fieldset': { border: '1px solid #E0E0E0' },
            '&.Mui-focused fieldset': { border: '1px solid #5956E9' },
        },
        '& .MuiInputBase-input': {
            color: '#2D3436', // Ensure input text is dark
            fontWeight: 600,
            WebkitTextFillColor: '#2D3436 !important', // Force color even if disabled
        },
        '& .MuiInputLabel-root': { color: '#A0A3BD' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#5956E9' }
    };

    return (
        <Box sx={{ minHeight: '100vh', background: '#fff', position: 'relative' }}>

            {/* Header */}
            <Box sx={{ p: 2, pt: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={() => navigate('/profile')}>
                    <RiArrowLeftLine color="#2D3436" size={24} />
                </IconButton>
                <Typography sx={{ fontSize: '20px', fontWeight: 700, color: '#2D3436' }}>
                    Edit Profile
                </Typography>
            </Box>

            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                {/* Avatar Section */}
                <Box sx={{ position: 'relative', mb: 5 }}>
                    <Avatar
                        src={photo}
                        sx={{ width: 120, height: 120, border: '4px solid #fff', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
                    />
                    <IconButton
                        component="label"
                        sx={{
                            position: 'absolute', bottom: 0, right: 0,
                            background: '#000', color: 'white',
                            width: 36, height: 36,
                            '&:hover': { background: '#333' }
                        }}
                    >
                        <RiCameraLine size={18} />
                        <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                    </IconButton>
                </Box>

                {/* Form Fields */}
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>

                    <Box>
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#2D3436', mb: 1 }}>Full Name</Typography>
                        <TextField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            placeholder="Enter your name"
                            variant="outlined"
                            sx={inputStyles}
                            InputProps={{
                                startAdornment: <RiUser3Line style={{ marginRight: 12, color: '#A0A3BD' }} size={20} />,
                            }}
                        />
                    </Box>

                    <Box>
                        <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#2D3436', mb: 1 }}>Mobile Number</Typography>
                        <TextField
                            value={mobile}
                            disabled
                            fullWidth
                            variant="outlined"
                            sx={{
                                ...inputStyles,
                                '& .MuiOutlinedInput-root': { backgroundColor: '#fff', border: '1px solid #F0F0F0' }
                            }}
                            InputProps={{
                                startAdornment: <RiSmartphoneLine style={{ marginRight: 12, color: '#A0A3BD' }} size={20} />,
                            }}
                        />
                        <Typography sx={{ fontSize: '12px', color: '#A0A3BD', mt: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <span style={{ color: 'red' }}>*</span> Mobile number cannot be changed
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Save Button */}
            <Box sx={{ p: 3, position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff' }}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSave}
                    sx={{
                        background: '#F9D71C', // Signature Yellow
                        color: '#000',
                        borderRadius: '30px', py: 2,
                        fontSize: '16px', fontWeight: 700,
                        textTransform: 'none',
                        boxShadow: '0 4px 15px rgba(249, 215, 28, 0.4)',
                        '&:hover': { background: '#F0C900' }
                    }}
                >
                    Save Changes
                </Button>
            </Box>

        </Box>
    );
};

export default EditProfile;
