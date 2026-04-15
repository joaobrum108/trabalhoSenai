/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TrainFront, Mic, AlertCircle, CheckCircle2, Settings, ShieldAlert, Navigation, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'motion/react';

export const DriverPanel: React.FC = () => {
  const [isTalking, setIsTalking] = useState(false);
  const [trackStatus, setTrackStatus] = useState<'clear' | 'blocked'>('clear');
  const [speed, setSpeed] = useState(42);

  // Simulate speed fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(prev => {
        const change = Math.floor(Math.random() * 3) - 1;
        return Math.max(0, Math.min(80, prev + change));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-background text-text-primary flex flex-col overflow-hidden font-sans">
      {/* Top Status Bar */}
      <div className="h-20 bg-surface border-b border-border-theme flex items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-surface-accent rounded-xl flex items-center justify-center border border-border-theme">
            <TrainFront className="w-8 h-8 text-accent-theme" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tighter uppercase">LOCOMOTIVA V-01</h2>
            <div className="flex items-center gap-2">
              <Badge className="bg-status-online/10 text-status-online border-status-online/20 text-[10px] font-bold">SISTEMA OK</Badge>
              <span className="text-text-secondary text-[10px] font-mono">ID: 4492-X</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-12">
          <div className="text-right">
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Velocidade</p>
            <p className="text-4xl font-black tabular-nums">
              {speed}<span className="text-sm font-normal text-text-secondary ml-1">km/h</span>
            </p>
          </div>
          <div className="h-10 w-px bg-border-theme" />
          <div className="text-right">
            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Próximo Marco</p>
            <p className="text-2xl font-bold text-text-primary">KM 142.5</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <main className="flex-1 grid grid-cols-12 gap-6 p-6">
        {/* Left Column: Navigation & Route */}
        <div className="col-span-8 flex flex-col gap-6">
          {/* Track Status Card */}
          <div className={`flex-1 rounded-3xl border-4 p-8 flex flex-col items-center justify-center text-center transition-all duration-500 ${
            trackStatus === 'clear' 
              ? 'bg-status-online/5 border-status-online/20' 
              : 'bg-status-alert/5 border-status-alert/20'
          }`}>
            <AnimatePresence mode="wait">
              {trackStatus === 'clear' ? (
                <motion.div 
                  key="clear"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-32 h-32 bg-status-online rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.3)] mb-8">
                    <CheckCircle2 className="w-20 h-20 text-white" />
                  </div>
                  <h1 className="text-6xl font-black mb-4 tracking-tighter">VIA LIBERADA</h1>
                  <p className="text-xl text-status-online font-medium max-w-md">
                    Trecho até o Porto de Ponta da Madeira sem restrições.
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  key="blocked"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-32 h-32 bg-status-alert rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.3)] mb-8 animate-pulse">
                    <ShieldAlert className="w-20 h-20 text-white" />
                  </div>
                  <h1 className="text-6xl font-black mb-4 tracking-tighter">VIA BLOQUEADA</h1>
                  <p className="text-xl text-status-alert font-medium max-w-md">
                    Pare imediatamente. Aguarde autorização da Torre de Controle.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <Button 
              onClick={() => setTrackStatus(prev => prev === 'clear' ? 'blocked' : 'clear')}
              variant="outline" 
              className="mt-12 border-border-theme text-text-secondary hover:bg-surface-accent"
            >
              Simular Mudança de Via
            </Button>
          </div>

          {/* Route Progress */}
          <div className="h-32 bg-surface rounded-3xl border border-border-theme p-6 flex items-center gap-8">
            <div className="flex-1">
              <div className="flex justify-between text-[10px] font-bold text-text-secondary uppercase mb-2">
                <span>Pátio de Origem</span>
                <span>Ponta da Madeira (Destino)</span>
              </div>
              <div className="h-4 bg-background rounded-full overflow-hidden border border-border-theme">
                <motion.div 
                  className="h-full bg-accent-theme shadow-[0_0_15px_rgba(255,184,0,0.5)]"
                  initial={{ width: '0%' }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 2 }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs font-mono text-text-secondary">KM 0</span>
                <span className="text-xs font-bold text-accent-theme">65% CONCLUÍDO</span>
                <span className="text-xs font-mono text-text-secondary">KM 215</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-surface-accent rounded-2xl flex items-center justify-center border border-border-theme">
              <Navigation className="w-8 h-8 text-text-secondary" />
            </div>
          </div>
        </div>

        {/* Right Column: Communication & Status */}
        <div className="col-span-4 flex flex-col gap-6">
          {/* PTT Button */}
          <button 
            onMouseDown={() => setIsTalking(true)}
            onMouseUp={() => setIsTalking(false)}
            onTouchStart={() => setIsTalking(true)}
            onTouchEnd={() => setIsTalking(false)}
            className={`flex-1 rounded-3xl flex flex-col items-center justify-center gap-6 transition-all duration-150 active:scale-95 shadow-2xl ${
              isTalking 
                ? 'bg-accent-theme shadow-accent-theme/40' 
                : 'bg-surface hover:bg-surface-accent border-4 border-border-theme'
            }`}
          >
            <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 ${
              isTalking ? 'bg-yellow-500 border-yellow-400' : 'bg-background border-border-theme'
            }`}>
              <Mic className={`w-12 h-12 ${isTalking ? 'text-black animate-pulse' : 'text-text-secondary'}`} />
            </div>
            <div className="text-center">
              <h3 className={`text-2xl font-black tracking-tight uppercase ${isTalking ? 'text-black' : 'text-text-primary'}`}>
                {isTalking ? 'Transmitindo...' : 'Falar com a Torre'}
              </h3>
              <p className={`text-sm font-bold uppercase tracking-widest mt-1 ${isTalking ? 'text-black/50' : 'text-text-secondary/50'}`}>
                {isTalking ? 'Solte para enviar' : 'Pressione e Segure'}
              </p>
            </div>
          </button>

          {/* Quick Status Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button className="h-24 rounded-2xl bg-surface border border-border-theme hover:bg-surface-accent text-text-primary flex flex-col gap-1 font-black text-xs uppercase tracking-tighter">
              <Settings className="w-6 h-6 mb-1 text-accent-theme" />
              Manutenção
            </Button>
            <Button className="h-24 rounded-2xl bg-surface border border-border-theme hover:bg-surface-accent text-text-primary flex flex-col gap-1 font-black text-xs uppercase tracking-tighter">
              <CheckCircle2 className="w-6 h-6 mb-1 text-status-online" />
              Carga OK
            </Button>
            <Button className="h-24 rounded-2xl bg-surface border border-border-theme hover:bg-surface-accent text-text-primary flex flex-col gap-1 font-black text-xs uppercase tracking-tighter">
              <MessageSquare className="w-6 h-6 mb-1 text-blue-500" />
              Chat
            </Button>
            <Button className="h-24 rounded-2xl bg-status-alert hover:bg-red-600 text-white flex flex-col gap-1 font-black text-xs uppercase tracking-tighter col-span-1">
              <AlertCircle className="w-6 h-6 mb-1" />
              Emergência
            </Button>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <div className="h-12 bg-surface border-t border-border-theme flex items-center justify-between px-8 text-[10px] font-mono text-text-secondary">
        <div className="flex gap-6">
          <span>SINAL: 100% (LTE-P)</span>
          <span>LATÊNCIA: 12ms</span>
          <span>BATERIA: 88%</span>
        </div>
        <div>
          <span>14 ABRIL 2026 • 16:45:12</span>
        </div>
      </div>
    </div>
  );
};
