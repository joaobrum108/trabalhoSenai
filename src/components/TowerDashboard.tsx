/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MOCK_VEHICLES, MOCK_TRACKS, MOCK_DRIVERS, MOCK_ALERTS } from '../constants';
import { InteractiveMap } from './InteractiveMap';
import { VoIPCenter } from './VoIPCenter';
import { TelemetryFeed } from './TelemetryFeed';
import { TrackSection } from '../types';
import { LayoutDashboard, Map as MapIcon, Settings, Bell, Search, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export const TowerDashboard: React.FC = () => {
  const [tracks, setTracks] = useState<TrackSection[]>(MOCK_TRACKS);

  const toggleTrack = (id: string) => {
    setTracks(prev => prev.map(t => 
      t.id === id ? { ...t, status: t.status === 'open' ? 'closed' : 'open' } : t
    ));
  };

  return (
    <div className="flex flex-col h-screen bg-background text-text-primary overflow-hidden">
      {/* Header */}
      <header className="h-[60px] border-b border-border-theme flex items-center justify-between px-6 bg-surface">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-accent-theme rounded flex items-center justify-center font-black text-black text-sm">
            V
          </div>
          <div>
            <h1 className="text-[18px] font-bold tracking-tight leading-none">
              TOTAL DIGITAL <span className="font-light opacity-60 ml-1">| Porto Ponta da Madeira</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[12px] text-text-secondary font-medium">
            SISTEMA OPERACIONAL
            <div className="w-2 h-2 bg-status-online rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <span className="text-text-primary ml-2 font-mono">14:32:05</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 grid grid-cols-[260px_1fr_300px] bg-border-theme gap-[1px] overflow-hidden">
        {/* Left Sidebar: VoIP */}
        <aside className="bg-surface flex flex-col overflow-hidden">
          <VoIPCenter drivers={MOCK_DRIVERS} />
        </aside>

        {/* Center: Map */}
        <section className="bg-[#0F0F11] relative p-4 flex flex-col gap-4">
          <div className="flex-1 relative">
            <InteractiveMap vehicles={MOCK_VEHICLES} tracks={tracks} />
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 h-20">
            {[
              { label: 'Veículos Ativos', value: '12', color: 'text-accent-theme' },
              { label: 'Alertas Ativos', value: '03', color: 'text-status-alert' },
              { label: 'Vias Bloqueadas', value: '01', color: 'text-amber-500' },
              { label: 'Operadores Online', value: '08', color: 'text-blue-500' },
            ].map((stat, i) => (
              <div key={i} className="bg-surface border border-border-theme rounded-lg p-3 flex flex-col justify-center">
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">{stat.label}</p>
                <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Right Sidebar: Controls & Telemetry */}
        <aside className="bg-surface flex flex-col overflow-hidden border-l border-border-theme">
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="panel-header">Controle de Vias</div>
            <ScrollArea className="flex-1">
              <div className="p-0">
                {tracks.map((track) => (
                  <div 
                    key={track.id}
                    className="p-4 flex items-center justify-between border-b border-border-theme hover:bg-surface-accent transition-colors"
                  >
                    <span className="text-[13px] font-medium text-text-primary">{track.name}</span>
                    <button 
                      onClick={() => toggleTrack(track.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
                        track.status === 'open' 
                          ? 'bg-status-online/10 text-status-online border-status-online' 
                          : 'bg-status-alert/10 text-status-alert border-status-alert'
                      }`}
                    >
                      {track.status === 'open' ? 'ABERTO' : 'FECHADO'}
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          <div className="h-[40%] border-t border-border-theme">
            <TelemetryFeed alerts={MOCK_ALERTS} />
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="h-7 bg-black border-t border-border-theme flex items-center justify-between px-5 text-[10px] text-text-secondary">
        <div>VALE S.A. • INFRAESTRUTURA DIGITAL • 2024</div>
        <div className="flex gap-4">
          <span>CPU: 12%</span>
          <span>NET: 45ms</span>
          <span>GPS: ESTÁVEL</span>
        </div>
      </footer>
    </div>
  );
};
