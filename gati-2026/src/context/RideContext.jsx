import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the State Machine types for clarity
/*
type RideStatus = 
  | 'IDLE' 
  | 'SEARCHING' 
  | 'SELECTING' 
  | 'FINDING' 
  | 'FOUND' 
  | 'RIDE' 
  | 'COMPLETED';
*/

const RideContext = createContext();

export const RideProvider = ({ children }) => {
    // Core State Machine
    const [rideStatus, setRideStatus] = useState('IDLE');

    // Data State
    const [pickupLocation, setPickupLocation] = useState([28.6139, 77.2090]); // Default: New Delhi
    const [dropLocation, setDropLocation] = useState(null);
    const [selectedRide, setSelectedRide] = useState(1); // 1=Bike, 2=Car, etc.
    const [isValentineMode, setIsValentineMode] = useState(false);

    // Driver Details (simulation)
    const [driverDetails, setDriverDetails] = useState(null);

    // ACTIONS ( The "Brain" Logic )

    const startSearch = () => setRideStatus('SEARCHING');

    const selectDestination = (coords) => {
        // setDropLocation(coords); // Future: Real coords
        setRideStatus('SELECTING');
    };

    const bookRide = () => {
        setRideStatus('FINDING');

        // Simulate Driver Finding Logic
        setTimeout(() => {
            setDriverDetails({
                name: 'Raju Bhai',
                vehicle: 'Hero Splendor',
                plate: 'DL 8S AB 1234',
                rating: 4.8,
                otp: 4589
            });
            setRideStatus('FOUND');
        }, 4000);
    };

    const startRide = () => {
        setRideStatus('RIDE');
    };

    const completeRide = () => {
        setRideStatus('COMPLETED');
    };

    const resetRide = () => {
        setRideStatus('IDLE');
        setDriverDetails(null);
    };

    const goBack = () => {
        if (rideStatus === 'SEARCHING') setRideStatus('IDLE');
        if (rideStatus === 'SELECTING') setRideStatus('SEARCHING');
        if (rideStatus === 'FINDING') setRideStatus('SELECTING');
    };

    const toggleValentineMode = () => setIsValentineMode(prev => !prev);

    return (
        <RideContext.Provider value={{
            rideStatus,
            pickupLocation,
            dropLocation,
            selectedRide,
            isValentineMode,
            driverDetails,
            // set states
            setSelectedRide,
            // Actions
            startSearch,
            selectDestination,
            bookRide,
            startRide,
            completeRide,
            resetRide,
            goBack,
            toggleValentineMode
        }}>
            {children}
        </RideContext.Provider>
    );
};

export const useRide = () => useContext(RideContext);
