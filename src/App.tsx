/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { TowerDashboard } from './components/TowerDashboard';
import { DriverPanel } from './components/DriverPanel';
import { FullMapView } from './components/FullMapView';
import { LayoutDashboard, Truck, Map as MapIcon } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'tower' | 'driver' | 'map'>('tower');

  return (
    <div className="relative min-h-screen bg-background">
      {/* View Switcher (Prototype Only) */}
      <div className="fixed bottom-6 right-6 z-50 flex gap-2 p-2 bg-surface/80 backdrop-blur-md border border-border-theme rounded-full shadow-2xl">
        <button
          onClick={() => setView('tower')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
            view === 'tower' 
              ? 'bg-accent-theme text-black shadow-lg shadow-accent-theme/20' 
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          TORRE
        </button>
        <button
          onClick={() => setView('map')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
            view === 'map' 
              ? 'bg-accent-theme text-black shadow-lg shadow-accent-theme/20' 
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <MapIcon className="w-4 h-4" />
          MAPA
        </button>
        <button
          onClick={() => setView('driver')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
            view === 'driver' 
              ? 'bg-accent-theme text-black shadow-lg shadow-accent-theme/20' 
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Truck className="w-4 h-4" />
          PAINEL
        </button>
      </div>

      {view === 'tower' ? <TowerDashboard /> : view === 'map' ? <FullMapView /> : <DriverPanel />}
    </div>
  );
}
