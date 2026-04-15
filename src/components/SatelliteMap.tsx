/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Vehicle } from '../types';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with React
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface SatelliteMapProps {
  vehicles: Vehicle[];
}

// Center of Ponta da Madeira, São Luís (2° 33' 38" S, 44° 21' 44" W)
const CENTER: [number, number] = [-2.560556, -44.362222];

const PIERS = [
  { name: 'Píer I', position: [-2.566667, -44.383333] as [number, number] },
  { name: 'Píer III', position: [-2.561667, -44.379167] as [number, number] },
  { name: 'Píer IV', position: [-2.551944, -44.379167] as [number, number] },
];

export const SatelliteMap: React.FC<SatelliteMapProps> = ({ vehicles }) => {
  // Map mock coordinates to real-world offsets
  const getRealCoords = (pos: { x: number, y: number }): [number, number] => {
    const latOffset = (pos.y - 250) / 10000;
    const lngOffset = (pos.x - 400) / 10000;
    return [CENTER[0] + latOffset, CENTER[1] + lngOffset];
  };

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-border-theme shadow-2xl">
      <MapContainer 
        center={CENTER} 
        zoom={15} 
        style={{ height: '100%', width: '100%', background: '#0A0A0B' }}
        zoomControl={false}
      >
        {/* Satellite Imagery Layer */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
        />
        
        {/* Road/Label Overlay for better context */}
        <TileLayer
          url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png"
          opacity={0.3}
        />

        {/* Pier Markers */}
        {PIERS.map((pier) => (
          <Marker 
            key={pier.name} 
            position={pier.position}
            icon={L.divIcon({
              className: 'pier-icon',
              html: `<div style="background: rgba(255,184,0,0.2); border: 2px solid #FFB800; width: 12px; height: 12px; border-radius: 50%;"></div>`,
              iconSize: [12, 12]
            })}
          >
            <Popup>
              <div className="text-zinc-900 font-bold">{pier.name}</div>
            </Popup>
          </Marker>
        ))}

        {vehicles.map((vehicle) => {
          const position = getRealCoords(vehicle.position);
          
          // Custom Icon based on status
          const vehicleIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `
              <div style="
                background-color: ${vehicle.status === 'alert' ? '#EF4444' : '#FFB800'};
                width: 24px;
                height: 24px;
                border-radius: 4px;
                border: 2px solid white;
                box-shadow: 0 0 10px rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                color: black;
                font-weight: bold;
                font-size: 10px;
              ">
                ${vehicle.id}
              </div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          });

          return (
            <Marker key={vehicle.id} position={position} icon={vehicleIcon}>
              <Popup>
                <div className="text-zinc-900">
                  <p className="font-bold">{vehicle.name}</p>
                  <p className="text-xs">Status: {vehicle.status}</p>
                  <p className="text-xs">Velocidade: {vehicle.speed} km/h</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
