import React from 'react';
import { Box, Typography, Button, IconButton, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { RiArrowLeftLine, RiCustomerService2Fill, RiArrowDownSLine, RiMailSendLine, RiPhoneLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const HelpSupport = () => {
    const navigate = useNavigate();

    const faqs = [
        { q: 'How do I book a ride?', a: 'You can book a ride by selecting your destination on the home screen and choosing your preferred vehicle type.' },
        { q: 'How to add money to wallet?', a: 'Go to Wallet > Add Money, enter the amount, and proceed with payment.' },
        { q: 'Can I cancel a scheduled ride?', a: 'Yes, you can cancel your ride from the "My Rides" section before the driver arrives.' },
        { q: 'Safety features available?', a: 'We have an SOS button, Ride Sharing, and 24/7 support for your safety.' },
    ];

    return (
        <Box sx={{ minHeight: '100vh', background: '#fff', pb: 4 }}>

            {/* Header */}
            <Box sx={{ p: 2, pt: 4, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid #F0F0F0' }}>
                <IconButton onClick={() => navigate(-1)} sx={{ background: '#F5F6FA' }}>
                    <RiArrowLeftLine color="#2D3436" />
                </IconButton>
                <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#2D3436' }}>Help & Support</Typography>
            </Box>

            <Box sx={{ p: 3 }}>

                {/* Hero */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Box sx={{
                        width: 80, height: 80, background: '#E6E6FF', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2
                    }}>
                        <RiCustomerService2Fill size={40} color="#5956E9" />
                    </Box>
                    <Typography sx={{ fontSize: '20px', fontWeight: 800, color: '#2D3436' }}>How can we help you?</Typography>
                    <Typography sx={{ fontSize: '14px', color: '#A0A3BD' }}>Find answers or contact our team.</Typography>
                </Box>

                {/* FAQs */}
                <Typography sx={{ fontSize: '16px', fontWeight: 700, mb: 2 }}>Frequently Asked Questions</Typography>
                <Box sx={{ mb: 4 }}>
                    {faqs.map((faq, index) => (
                        <Accordion key={index} elevation={0} sx={{ '&:before': { display: 'none' }, mb: 1, borderRadius: '12px', background: '#F5F6FA' }}>
                            <AccordionSummary expandIcon={<RiArrowDownSLine />}>
                                <Typography sx={{ fontWeight: 600, fontSize: '14px', color: '#2D3436' }}>{faq.q}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ fontSize: '13px', color: '#555' }}>{faq.a}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>

                {/* Contact Options */}
                <Typography sx={{ fontSize: '16px', fontWeight: 700, mb: 2 }}>Still need help?</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        fullWidth
                        startIcon={<RiPhoneLine />}
                        sx={{
                            background: '#FFF0F1', color: '#FF4757',
                            borderRadius: '16px', py: 2, fontWeight: 700, textTransform: 'none',
                            border: '1px solid #FFCDD2'
                        }}
                    >
                        Call Us
                    </Button>
                    <Button
                        fullWidth
                        startIcon={<RiMailSendLine />}
                        sx={{
                            background: '#F0F0FF', color: '#5956E9',
                            borderRadius: '16px', py: 2, fontWeight: 700, textTransform: 'none',
                            border: '1px solid #D1D1FF'
                        }}
                    >
                        Email Us
                    </Button>
                </Box>

            </Box>
        </Box>
    );
};

export default HelpSupport;
