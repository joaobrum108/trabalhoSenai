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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-background text-text-primary overflow-hidden">
      {/* Header */}
      <header className="h-auto lg:h-[60px] border-b border-border-theme flex flex-col lg:flex-row items-center justify-between px-4 lg:px-6 py-3 lg:py-0 bg-surface gap-3 lg:gap-0">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent-theme rounded flex items-center justify-center font-black text-black text-sm">
              M
            </div>
            <div>
              <h1 className="text-sm lg:text-[18px] font-bold tracking-tight leading-none">
                MONITORAMENTO REAL <span className="hidden sm:inline font-light opacity-60 ml-1">| Satélite & Vias</span>
              </h1>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden text-text-secondary"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <List className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex items-center gap-3 lg:gap-4 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
          <div className="flex bg-surface-accent rounded-lg p-1 border border-border-theme shrink-0">
            <button 
              onClick={() => setMapType('satellite')}
              className={`px-2 lg:px-3 py-1 lg:py-1.5 rounded-md text-[9px] lg:text-[10px] font-bold transition-all ${mapType === 'satellite' ? 'bg-accent-theme text-black' : 'text-text-secondary'}`}
            >
              SATÉLITE
            </button>
            <button 
              onClick={() => setMapType('schematic')}
              className={`px-2 lg:px-3 py-1 lg:py-1.5 rounded-md text-[9px] lg:text-[10px] font-bold transition-all ${mapType === 'schematic' ? 'bg-accent-theme text-black' : 'text-text-secondary'}`}
            >
              ESQUEMÁTICO
            </button>
          </div>
          <div className="relative flex-1 lg:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 lg:w-4 lg:h-4 text-text-secondary" />
            <Input 
              placeholder="Buscar ativo..." 
              className="pl-8 lg:pl-9 h-8 lg:h-9 w-full lg:w-64 bg-surface-accent border-border-theme text-[10px] lg:text-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar: Asset List - Hidden on mobile unless toggled */}
        <aside className={`
          absolute lg:relative z-40 lg:z-0
          w-72 lg:w-80 h-full border-r border-border-theme bg-surface flex flex-col
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="panel-header flex items-center justify-between shrink-0">
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
                  onClick={() => {
                    setSelectedVehicle(vehicle);
                    if (window.innerWidth < 1024) setIsSidebarOpen(false);
                  }}
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

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="absolute inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Center: Large Map */}
        <section className="flex-1 bg-[#0F0F11] relative p-0 overflow-hidden">
          <div className="w-full h-full">
            {mapType === 'satellite' ? (
              <SatelliteMap vehicles={MOCK_VEHICLES} />
            ) : (
              <div className="p-2 lg:p-6 h-full">
                <InteractiveMap vehicles={MOCK_VEHICLES} tracks={MOCK_TRACKS} />
              </div>
            )}
          </div>

          {/* Map Controls Overlay (Only for Schematic) */}
          {mapType === 'schematic' && (
            <div className="absolute top-4 lg:top-10 right-4 lg:right-10 flex flex-col gap-2">
              <Button size="icon" variant="outline" className="w-8 h-8 lg:w-9 lg:h-9 bg-surface/80 backdrop-blur-md border-border-theme hover:bg-surface-accent">
                <span className="text-base lg:text-lg font-bold">+</span>
              </Button>
              <Button size="icon" variant="outline" className="w-8 h-8 lg:w-9 lg:h-9 bg-surface/80 backdrop-blur-md border-border-theme hover:bg-surface-accent">
                <span className="text-base lg:text-lg font-bold">-</span>
              </Button>
            </div>
          )}

          {/* Selected Asset Info Overlay */}
          {selectedVehicle && (
            <div className="absolute bottom-4 lg:bottom-10 left-4 right-4 lg:left-1/2 lg:-translate-x-1/2 lg:w-[400px] bg-surface/90 backdrop-blur-lg border border-accent-theme/30 rounded-2xl p-4 lg:p-6 shadow-2xl z-[1000]">
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-surface-accent rounded-xl flex items-center justify-center border border-border-theme shrink-0">
                    {selectedVehicle.type === 'locomotive' ? <Activity className="w-5 h-5 lg:w-6 lg:h-6 text-accent-theme" /> : <Navigation className="w-5 h-5 lg:w-6 lg:h-6 text-accent-theme" />}
                  </div>
                  <div>
                    <h3 className="text-base lg:text-lg font-bold truncate max-w-[180px] lg:max-w-none">{selectedVehicle.name}</h3>
                    <p className="text-[10px] lg:text-xs text-text-secondary font-mono uppercase tracking-widest">{selectedVehicle.id} • {selectedVehicle.type}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedVehicle(null)} className="text-text-secondary h-8 w-8">
                  <span className="text-xl">×</span>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-2 lg:gap-4 mb-4 lg:mb-6">
                <div className="bg-background/50 p-2 lg:p-3 rounded-lg border border-border-theme">
                  <p className="text-[8px] lg:text-[9px] font-bold text-text-secondary uppercase mb-1">Status</p>
                  <p className={`text-[10px] lg:text-xs font-bold uppercase ${selectedVehicle.status === 'alert' ? 'text-status-alert' : 'text-status-online'}`}>{selectedVehicle.status}</p>
                </div>
                <div className="bg-background/50 p-2 lg:p-3 rounded-lg border border-border-theme">
                  <p className="text-[8px] lg:text-[9px] font-bold text-text-secondary uppercase mb-1">Velocidade</p>
                  <p className="text-[10px] lg:text-xs font-bold">{selectedVehicle.speed} km/h</p>
                </div>
                <div className="bg-background/50 p-2 lg:p-3 rounded-lg border border-border-theme">
                  <p className="text-[8px] lg:text-[9px] font-bold text-text-secondary uppercase mb-1">Posição</p>
                  <p className="text-[10px] lg:text-xs font-bold">KM {Math.floor(selectedVehicle.position.x / 5)}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-accent-theme hover:bg-yellow-500 text-black font-bold text-[10px] lg:text-xs h-9 lg:h-10">
                  CENTRALIZAR
                </Button>
                <Button variant="outline" className="flex-1 border-border-theme text-[10px] lg:text-xs h-9 lg:h-10">
                  TELEMETRIA
                </Button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="h-auto lg:h-7 bg-black border-t border-border-theme flex flex-col lg:flex-row items-center justify-between px-4 lg:px-5 py-2 lg:py-0 text-[8px] lg:text-[10px] text-text-secondary gap-1 lg:gap-0">
        <div className="flex gap-4 lg:gap-6">
          <span>FONTE: ESRI WORLD IMAGERY</span>
          <span className="hidden sm:inline">LOCAL: PONTA DA MADEIRA, SÃO LUÍS - MA</span>
        </div>
        <div className="flex gap-3 lg:gap-4">
          <span>COORD: -2.560, -44.362</span>
          <span className="hidden sm:inline">PRECISÃO: 1.2m</span>
        </div>
      </footer>
    </div>
  );
};
