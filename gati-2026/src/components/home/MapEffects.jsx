import React, { useEffect, useState, useRef } from 'react';
import { useMap, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom Pulse Icon for User Location
const CreatePulseIcon = (isValentineMode) => {
    return L.divIcon({
        className: `user-gps-marker ${isValentineMode ? 'valentine-mode' : ''}`,
        html: '<div class="gps-ring"></div><div class="gps-dot"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
};

// Function to calculate bearing between two points
const toDeg = (rad) => rad * 180 / Math.PI;
const toRad = (deg) => deg * Math.PI / 180;

const getBearing = (startLat, startLng, destLat, destLng) => {
    const startLatRad = toRad(startLat);
    const startLngRad = toRad(startLng);
    const destLatRad = toRad(destLat);
    const destLngRad = toRad(destLng);

    const y = Math.sin(destLngRad - startLngRad) * Math.cos(destLatRad);
    const x = Math.cos(startLatRad) * Math.sin(destLatRad) -
        Math.sin(startLatRad) * Math.cos(destLatRad) * Math.cos(destLngRad - startLngRad);

    let brng = Math.atan2(y, x);
    brng = toDeg(brng);
    return (brng + 360) % 360;
};

// Rotatable Vehicle Icon
const CreateVehicleIcon = (rotation) => {
    return L.divIcon({
        className: 'vehicle-marker-container',
        html: `<div style="transform: rotate(${rotation}deg); transition: transform 0.5s linear;">
                <img src="https://cdn-icons-png.flaticon.com/512/3097/3097180.png" style="width: 40px; height: 40px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));" />
               </div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
    });
};

// Detailed Route Data (Simulating a real path in Delhi)
const fullRoute = [
    [28.6139, 77.2090], // CP Center
    [28.6135, 77.2095],
    [28.6130, 77.2100],
    [28.6125, 77.2105],
    [28.6120, 77.2110], // Turn 1
    [28.6110, 77.2115],
    [28.6100, 77.2120],
    [28.6090, 77.2130],
    [28.6085, 77.2140], // Turn 2
    [28.6080, 77.2150],
    [28.6075, 77.2160],
    [28.6070, 77.2170],
    [28.6065, 77.2180],
    [28.6060, 77.2190], // End
];

const MapEffects = ({ isValentineMode, isBooking, onComplete }) => {
    const map = useMap();
    const [path, setPath] = useState([]);
    const [vehiclePos, setVehiclePos] = useState(fullRoute[0]);
    const [rotation, setRotation] = useState(0);
    const [progress, setProgress] = useState(0);

    // Center map on load
    useEffect(() => {
        map.flyTo(fullRoute[0], 15, { animate: true, duration: 2 });
    }, [map]);

    // Animation Loop
    useEffect(() => {
        if (!isBooking) {
            setPath([]);
            setProgress(0);
            return;
        }

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= fullRoute.length - 1) {
                    clearInterval(interval);
                    if (onComplete) onComplete();
                    return prev;
                }
                return prev + 1;
            });
        }, 800);

        return () => clearInterval(interval);
    }, [isBooking]);

    // Update Logic: Rotation + Path + Position
    useEffect(() => {
        if (progress > 0) {
            const currentPos = fullRoute[progress];
            const prevPos = fullRoute[progress - 1];

            // 1. Calculate Bearing
            if (prevPos) {
                const angle = getBearing(prevPos[0], prevPos[1], currentPos[0], currentPos[1]);
                setRotation(angle);
            }

            // 2. Set Position & Path
            // Sync Logic: Path draws exactly to vehicle
            const newPath = fullRoute.slice(0, progress + 1);
            setPath(newPath);
            setVehiclePos(currentPos);

            // 3. Camera Sync
            map.panTo(currentPos, { animate: true, duration: 0.8, easeLinearity: 0.5 });
        } else {
            // Reset
            setPath([fullRoute[0]]);
            setVehiclePos(fullRoute[0]);
        }
    }, [progress, map]);

    return (
        <>
            {/* User Logic Dot */}
            <Marker
                position={fullRoute[0]}
                icon={CreatePulseIcon(isValentineMode)}
            />

            {/* Destination Pin */}
            <Marker
                position={fullRoute[fullRoute.length - 1]}
            />

            {/* Animated Path */}
            {isBooking && (
                <>
                    <Polyline
                        positions={path}
                        pathOptions={{
                            color: isValentineMode ? '#ff4ecd' : '#7df9ff',
                            weight: 6,
                            opacity: 0.8,
                            className: isValentineMode ? 'valentine-path' : 'neon-path'
                        }}
                    />

                    {/* Moving Vehicle with Rotation */}
                    <Marker
                        position={vehiclePos}
                        icon={CreateVehicleIcon(rotation)}
                        zIndexOffset={100}
                    />
                </>
            )}
        </>
    );
};

export default MapEffects;
