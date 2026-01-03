import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon missing in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const RecenterAutomatically = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
        map.setView([lat, lng]);
    }, [lat, lng]);
    return null;
};

const Map = ({ center, zoom = 13, height = '100%', width = '100%', markers = [] }) => {
    // Default to New Delhi if no center provided
    const position = center || [28.6139, 77.2090];

    return (
        <MapContainer
            center={position}
            zoom={zoom}
            style={{ height: height, width: width, zIndex: 0 }}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.length > 0 ? (
                markers.map((mark, idx) => (
                    <Marker key={idx} position={mark.position}>
                        <Popup>{mark.popup || "Location"}</Popup>
                    </Marker>
                ))
            ) : (
                <Marker position={position}>
                    <Popup>Location</Popup>
                </Marker>
            )}
            <RecenterAutomatically lat={position[0]} lng={position[1]} />
        </MapContainer>
    );
};

export default Map;
