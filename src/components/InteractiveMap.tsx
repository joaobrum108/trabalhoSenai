/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Vehicle, TrackSection } from '../types';
import { TrainFront, Truck, AlertTriangle } from 'lucide-react';

interface InteractiveMapProps {
  vehicles: Vehicle[];
  tracks: TrackSection[];
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ vehicles, tracks }) => {
  return (
    <div className="relative w-full h-full bg-[#0F0F11] rounded-xl border border-border-theme overflow-hidden shadow-inner">
      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #1A1A1D 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <svg className="w-full h-full" viewBox="0 0 800 500">
        {/* Tracks */}
        {tracks.map((track) => (
          <g key={track.id}>
            <path
              d={track.path}
              fill="none"
              stroke={track.status === 'open' ? '#22C55E' : '#EF4444'}
              strokeWidth="12"
              strokeOpacity="0.1"
              strokeLinecap="round"
            />
            <path
              d={track.path}
              fill="none"
              stroke={track.status === 'open' ? '#22C55E' : '#EF4444'}
              strokeWidth="3"
              strokeDasharray={track.status === 'open' ? "none" : "8 8"}
              strokeLinecap="round"
              className={track.status === 'open' ? '' : 'animate-pulse'}
            />
          </g>
        ))}

        {/* Vehicles */}
        {vehicles.map((vehicle) => (
          <motion.g
            key={vehicle.id}
            initial={{ x: vehicle.position.x, y: vehicle.position.y }}
            animate={{ x: vehicle.position.x, y: vehicle.position.y }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          >
            {/* Vehicle Glow */}
            <circle 
              r="20" 
              fill={vehicle.status === 'alert' ? '#EF4444' : '#FFB800'} 
              className="opacity-20 animate-pulse"
            />
            
            {/* Vehicle Icon Container */}
            <foreignObject x="-12" y="-12" width="24" height="24">
              <div className={`w-full h-full flex items-center justify-center rounded-sm border shadow-lg
                ${vehicle.status === 'alert' ? 'bg-status-alert border-red-400' : 
                  'bg-accent-theme border-yellow-400'}`}>
                {vehicle.type === 'locomotive' ? (
                  <TrainFront className="w-3 h-3 text-black" />
                ) : (
                  <Truck className="w-3 h-3 text-black" />
                )}
              </div>
            </foreignObject>

            {/* Label */}
            <text
              y="25"
              textAnchor="middle"
              className="text-[10px] font-mono fill-text-secondary font-medium tracking-tighter"
            >
              {vehicle.id} | {vehicle.speed}km/h
            </text>

            {/* Alert Icon */}
            {vehicle.status === 'alert' && (
              <foreignObject x="8" y="-20" width="16" height="16">
                <AlertTriangle className="w-4 h-4 text-status-alert animate-bounce" />
              </foreignObject>
            )}
          </motion.g>
        ))}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-2 p-3 bg-surface/80 backdrop-blur-sm border border-border-theme rounded-lg text-[10px] font-mono text-text-secondary">
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-status-online rounded-full" />
          <span className="text-green-800 font-bold">VIA LIBERADA</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-status-alert rounded-full" />
          <span className="text-red-600 font-bold">VIA BLOQUEADA</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-sm bg-accent-theme" />
          <span>VEÍCULO ATIVO</span>
        </div>
      </div>
    </div>
  );
};
