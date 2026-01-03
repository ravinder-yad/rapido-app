import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton, TextField, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RiArrowLeftLine, RiCameraLine, RiUser3Line } from 'react-icons/ri';

const EditProfile = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [photo, setPhoto] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setName(user.name);
            setMobile(user.mobile);
            setPhoto(user.photo);
        }
    }, []);

    const handleSave = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            user.name = name;
            user.photo = photo;
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/profile');
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setPhoto(imageUrl);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', background: '#fff' }}>

            {/* Header */}
            <Box sx={{ p: 2, pt: 4, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid #f0f0f0' }}>
                <IconButton onClick={() => navigate('/profile')}>
                    <RiArrowLeftLine color="#2D3436" />
                </IconButton>
                <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#2D3436' }}>
                    Edit Profile
                </Typography>
            </Box>

            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                <Box sx={{ position: 'relative', mb: 4 }}>
                    <Avatar
                        src={photo}
                        sx={{ width: 100, height: 100, border: '4px solid #fff', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}
                    />
                    <IconButton
                        component="label"
                        sx={{
                            position: 'absolute', bottom: 0, right: 0,
                            background: '#5956E9', color: 'white',
                            '&:hover': { background: '#3B37C9' }
                        }}
                    >
                        <RiCameraLine size={18} />
                        <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                    </IconButton>
                </Box>

                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        label="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            startAdornment: <RiUser3Line style={{ marginRight: 10, color: '#A0A3BD' }} />,
                            style: { borderRadius: '16px' }
                        }}
                    />

                    <TextField
                        label="Mobile Number"
                        value={mobile}
                        disabled
                        fullWidth
                        variant="filled"
                        helperText="Mobile number cannot be changed"
                    />
                </Box>
            </Box>

            <Box sx={{ p: 3, position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSave}
                    sx={{
                        background: '#000', color: '#fff',
                        borderRadius: '16px', py: 2,
                        fontSize: '16px', fontWeight: 700,
                        textTransform: 'none',
                        '&:hover': { background: '#333' }
                    }}
                >
                    Save Changes
                </Button>
            </Box>

        </Box>
    );
};

export default EditProfile;
