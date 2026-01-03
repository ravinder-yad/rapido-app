import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { RiHome4Fill, RiMapPin2Fill, RiUser3Fill, RiFileList3Line, RiWallet3Line } from "react-icons/ri";
import { Box } from '@mui/material';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getActiveColor = (path) => location.pathname === path ? '#fff' : '#A0A3BD';
    const getActiveBg = (path) => location.pathname === path ? '#5956E9' : 'transparent';

    const NavItem = ({ icon: Icon, path, label }) => {
        const isActive = location.pathname === path;
        return (
            <Box
                onClick={() => navigate(path)}
                sx={{
                    display: 'flex', alignItems: 'center', gap: 1,
                    cursor: 'pointer',
                    background: getActiveBg(path),
                    padding: isActive ? '10px 20px' : '10px',
                    borderRadius: '30px',
                    transition: 'all 0.3s ease'
                }}
            >
                <Icon size={24} color={getActiveColor(path)} />
                {isActive && (
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#fff' }}>
                        {label}
                    </span>
                )}
            </Box>
        );
    };

    return (
        <Box sx={{
            position: "fixed",
            bottom: 24,
            width: "90%",
            maxWidth: "380px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            background: "#fff",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            padding: "10px",
            borderRadius: "40px",
            zIndex: 1000,
            left: '50%',
            transform: 'translateX(-50%)'
        }}>
            <NavItem icon={RiHome4Fill} path="/" label="Home" />
            <NavItem icon={RiFileList3Line} path="/orders" label="Orders" />
            <NavItem icon={RiWallet3Line} path="/wallet" label="Wallet" />
            <NavItem icon={RiUser3Fill} path="/profile" label="Profile" />
        </Box>
    );
};

export default BottomNav;
