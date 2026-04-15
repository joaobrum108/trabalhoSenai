/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MOCK_VEHICLES, MOCK_TRACKS } from '../constants';
import { InteractiveMap } from './InteractiveMap';
import { SatelliteMap } from './SatelliteMap';
import { Vehicle, TrackSection } from '../types';
import { Search, Filter, List, Map as MapIcon, Info, Navigation, Activity, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export const FullMapView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [mapType, setMapType] = useState<'satellite' | 'schematic'>('satellite');

  const filteredVehicles = MOCK_VEHICLES.filter(v => 
    v.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-background text-text-primary overflow-hidden">
      {/* Header */}
      <header className="h-[60px] border-b border-border-theme flex items-center justify-between px-6 bg-surface">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent-theme rounded flex items-center justify-center font-black text-black text-sm">
            M
          </div>
          <div>
            <h1 className="text-[18px] font-bold tracking-tight leading-none">
              MONITORAMENTO REAL <span className="font-light opacity-60 ml-1">| Satélite & Vias</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-surface-accent rounded-lg p-1 border border-border-theme mr-4">
            <button 
              onClick={() => setMapType('satellite')}
              className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${mapType === 'satellite' ? 'bg-accent-theme text-black' : 'text-text-secondary'}`}
            >
              SATÉLITE
            </button>
            <button 
              onClick={() => setMapType('schematic')}
              className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${mapType === 'schematic' ? 'bg-accent-theme text-black' : 'text-text-secondary'}`}
            >
              ESQUEMÁTICO
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <Input 
              placeholder="Buscar ativo..." 
              className="pl-9 h-9 w-64 bg-surface-accent border-border-theme text-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Asset List */}
        <aside className="w-80 border-r border-border-theme bg-surface flex flex-col">
          <div className="panel-header flex items-center justify-between">
            <span className="flex items-center gap-2">
              <List className="w-4 h-4" />
              Lista de Ativos
            </span>
            <Badge variant="outline" className="text-[10px] border-border-theme">
              {filteredVehicles.length} TOTAL
            </Badge>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-0">
              {filteredVehicles.map((vehicle) => (
                <button
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className={`w-full text-left p-4 border-b border-border-theme transition-all ${
                    selectedVehicle?.id === vehicle.id 
                      ? 'bg-accent-theme/5 border-l-4 border-l-accent-theme' 
                      : 'hover:bg-surface-accent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-text-secondary">{vehicle.id}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                      vehicle.status === 'alert' ? 'bg-status-alert/10 text-status-alert' : 
                      vehicle.status === 'moving' ? 'bg-status-online/10 text-status-online' : 
                      'bg-amber-500/10 text-amber-500'
                    }`}>
                      {vehicle.status}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-text-primary">{vehicle.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-text-secondary font-mono">
                    <span className="flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      {vehicle.speed} km/h
                    </span>
                    <span className="flex items-center gap-1">
                      <Navigation className="w-3 h-3" />
                      KM {Math.floor(vehicle.position.x / 5)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Center: Large Map */}
        <section className="flex-1 bg-[#0F0F11] relative p-0">
          <div className="w-full h-full">
            {mapType === 'satellite' ? (
              <SatelliteMap vehicles={MOCK_VEHICLES} />
            ) : (
              <div className="p-6 h-full">
                <InteractiveMap vehicles={MOCK_VEHICLES} tracks={MOCK_TRACKS} />
              </div>
            )}
          </div>

          {/* Map Controls Overlay (Only for Schematic) */}
          {mapType === 'schematic' && (
            <div className="absolute top-10 right-10 flex flex-col gap-2">
              <Button size="icon" variant="outline" className="bg-surface/80 backdrop-blur-md border-border-theme hover:bg-surface-accent">
                <span className="text-lg font-bold">+</span>
              </Button>
              <Button size="icon" variant="outline" className="bg-surface/80 backdrop-blur-md border-border-theme hover:bg-surface-accent">
                <span className="text-lg font-bold">-</span>
              </Button>
            </div>
          )}

          {/* Selected Asset Info Overlay */}
          {selectedVehicle && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[400px] bg-surface/90 backdrop-blur-lg border border-accent-theme/30 rounded-2xl p-6 shadow-2xl z-[1000]">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface-accent rounded-xl flex items-center justify-center border border-border-theme">
                    {selectedVehicle.type === 'locomotive' ? <Activity className="w-6 h-6 text-accent-theme" /> : <Navigation className="w-6 h-6 text-accent-theme" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{selectedVehicle.name}</h3>
                    <p className="text-xs text-text-secondary font-mono uppercase tracking-widest">{selectedVehicle.id} • {selectedVehicle.type}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedVehicle(null)} className="text-text-secondary">
                  <span className="text-xl">×</span>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-background/50 p-3 rounded-lg border border-border-theme">
                  <p className="text-[9px] font-bold text-text-secondary uppercase mb-1">Status</p>
                  <p className={`text-xs font-bold uppercase ${selectedVehicle.status === 'alert' ? 'text-status-alert' : 'text-status-online'}`}>{selectedVehicle.status}</p>
                </div>
                <div className="bg-background/50 p-3 rounded-lg border border-border-theme">
                  <p className="text-[9px] font-bold text-text-secondary uppercase mb-1">Velocidade</p>
                  <p className="text-xs font-bold">{selectedVehicle.speed} km/h</p>
                </div>
                <div className="bg-background/50 p-3 rounded-lg border border-border-theme">
                  <p className="text-[9px] font-bold text-text-secondary uppercase mb-1">Posição</p>
                  <p className="text-xs font-bold">KM {Math.floor(selectedVehicle.position.x / 5)}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-accent-theme hover:bg-yellow-500 text-black font-bold text-xs h-10">
                  CENTRALIZAR NO MAPA
                </Button>
                <Button variant="outline" className="flex-1 border-border-theme text-xs h-10">
                  VER TELEMETRIA
                </Button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="h-7 bg-black border-t border-border-theme flex items-center justify-between px-5 text-[10px] text-text-secondary">
        <div className="flex gap-6">
          <span>FONTE: ESRI WORLD IMAGERY</span>
          <span>LOCAL: PONTA DA MADEIRA, SÃO LUÍS - MA</span>
        </div>
        <div className="flex gap-4">
          <span>COORD: -2.593, -44.364</span>
          <span>PRECISÃO: 1.2m</span>
        </div>
      </footer>
    </div>
  );
};
