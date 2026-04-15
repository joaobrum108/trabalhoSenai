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
      <div className="h-auto lg:h-20 bg-surface border-b border-border-theme flex flex-col lg:flex-row items-center justify-between px-4 lg:px-8 py-4 lg:py-0 gap-4 lg:gap-0">
        <div className="flex items-center gap-4 lg:gap-6 w-full lg:w-auto">
          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-surface-accent rounded-xl flex items-center justify-center border border-border-theme shrink-0">
            <TrainFront className="w-6 h-6 lg:w-8 lg:h-8 text-accent-theme" />
          </div>
          <div>
            <h2 className="text-lg lg:text-xl font-black tracking-tighter uppercase">LOCOMOTIVA V-01</h2>
            <div className="flex items-center gap-2">
              <Badge className="bg-status-online/10 text-status-online border-status-online/20 text-[9px] lg:text-[10px] font-bold">SISTEMA OK</Badge>
              <span className="text-text-secondary text-[9px] lg:text-[10px] font-mono">ID: 4492-X</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between lg:justify-end gap-6 lg:gap-12 w-full lg:w-auto border-t lg:border-t-0 border-border-theme pt-4 lg:pt-0">
          <div className="text-right">
            <p className="text-[8px] lg:text-[10px] font-bold text-text-secondary uppercase tracking-widest">Velocidade</p>
            <p className="text-2xl lg:text-4xl font-black tabular-nums">
              {speed}<span className="text-xs lg:text-sm font-normal text-text-secondary ml-1">km/h</span>
            </p>
          </div>
          <div className="hidden lg:block h-10 w-px bg-border-theme" />
          <div className="text-right">
            <p className="text-[8px] lg:text-[10px] font-bold text-text-secondary uppercase tracking-widest">Próximo Marco</p>
            <p className="text-lg lg:text-2xl font-bold text-text-primary">KM 142.5</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <main className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-6 p-4 lg:p-6 overflow-y-auto min-h-0">
        {/* Left Column: Navigation & Route */}
        <div className="lg:col-span-8 flex flex-col gap-4 lg:gap-6">
          {/* Track Status Card */}
          <div className={`flex-1 min-h-[300px] rounded-3xl border-4 lg:border-8 p-6 lg:p-8 flex flex-col items-center justify-center text-center transition-all duration-500 ${
            trackStatus === 'clear' 
              ? 'bg-status-online/15 border-status-online shadow-[0_0_40px_rgba(34,197,94,0.15)]' 
              : 'bg-status-alert/15 border-status-alert shadow-[0_0_40px_rgba(239,68,68,0.15)]'
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
                  <div className="w-24 h-24 lg:w-32 lg:h-32 bg-status-online rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.3)] mb-6 lg:mb-8">
                    <CheckCircle2 className="w-14 h-14 lg:w-20 lg:h-20 text-white" />
                  </div>
                  <h1 className="text-4xl lg:text-6xl font-black mb-2 lg:mb-4 tracking-tighter text-green-900">VIA LIBERADA</h1>
                  <p className="text-base lg:text-xl text-green-800 font-medium max-w-md">
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
                  <div className="w-24 h-24 lg:w-32 lg:h-32 bg-status-alert rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.3)] mb-6 lg:mb-8 animate-pulse">
                    <ShieldAlert className="w-14 h-14 lg:w-20 lg:h-20 text-white" />
                  </div>
                  <h1 className="text-4xl lg:text-6xl font-black mb-2 lg:mb-4 tracking-tighter text-red-600">VIA BLOQUEADA</h1>
                  <p className="text-base lg:text-xl text-red-700 font-medium max-w-md">
                    Pare imediatamente. Aguarde autorização da Torre de Controle.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <Button 
              onClick={() => setTrackStatus(prev => prev === 'clear' ? 'blocked' : 'clear')}
              className="mt-8 lg:mt-12 border-2 border-accent-theme bg-surface-accent text-accent-theme font-black h-12 px-8 uppercase tracking-widest shadow-lg"
            >
              Simular Mudança de Via
            </Button>
          </div>

          {/* Route Progress */}
          <div className="h-auto lg:h-32 bg-surface rounded-3xl border border-border-theme p-4 lg:p-6 flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
            <div className="flex-1 w-full">
              <div className="flex justify-between text-[8px] lg:text-[10px] font-bold text-text-secondary uppercase mb-2">
                <span>Pátio de Origem</span>
                <span>Ponta da Madeira (Destino)</span>
              </div>
              <div className="h-3 lg:h-4 bg-background rounded-full overflow-hidden border border-border-theme">
                <motion.div 
                  className="h-full bg-accent-theme shadow-[0_0_15px_rgba(255,184,0,0.5)]"
                  initial={{ width: '0%' }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 2 }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[10px] lg:text-xs font-mono text-text-secondary">KM 0</span>
                <span className="text-[10px] lg:text-xs font-bold text-accent-theme">65% CONCLUÍDO</span>
                <span className="text-[10px] lg:text-xs font-mono text-text-secondary">KM 215</span>
              </div>
            </div>
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-surface-accent rounded-2xl flex items-center justify-center border border-border-theme shrink-0">
              <Navigation className="w-6 h-6 lg:w-8 lg:h-8 text-text-secondary" />
            </div>
          </div>
        </div>

        {/* Right Column: Communication & Status */}
        <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-6">
          {/* PTT Button */}
          <button 
            onMouseDown={() => setIsTalking(true)}
            onMouseUp={() => setIsTalking(false)}
            onTouchStart={() => setIsTalking(true)}
            onTouchEnd={() => setIsTalking(false)}
            className={`flex-1 min-h-[200px] rounded-3xl flex flex-col items-center justify-center gap-4 lg:gap-6 transition-all duration-150 active:scale-95 shadow-2xl ${
              isTalking 
                ? 'bg-accent-theme shadow-accent-theme/40' 
                : 'bg-surface hover:bg-surface-accent border-2 lg:border-4 border-border-theme'
            }`}
          >
            <div className={`w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center border-2 lg:border-4 ${
              isTalking ? 'bg-yellow-500 border-yellow-400' : 'bg-background border-border-theme'
            }`}>
              <Mic className={`w-10 h-10 lg:w-12 lg:h-12 ${isTalking ? 'text-black animate-pulse' : 'text-text-secondary'}`} />
            </div>
            <div className="text-center">
              <h3 className={`text-xl lg:text-2xl font-black tracking-tight uppercase ${isTalking ? 'text-black' : 'text-text-primary'}`}>
                {isTalking ? 'Transmitindo...' : 'Falar com a Torre'}
              </h3>
              <p className={`text-[10px] lg:text-sm font-bold uppercase tracking-widest mt-1 ${isTalking ? 'text-black/50' : 'text-text-secondary/50'}`}>
                {isTalking ? 'Solte para enviar' : 'Pressione e Segure'}
              </p>
            </div>
          </button>

          {/* Quick Status Buttons */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <Button className="h-20 lg:h-24 rounded-2xl bg-surface border border-border-theme hover:bg-surface-accent text-text-primary flex flex-col gap-1 font-black text-[10px] lg:text-xs uppercase tracking-tighter">
              <Settings className="w-5 h-5 lg:w-6 lg:h-6 mb-1 text-accent-theme" />
              Manutenção
            </Button>
            <Button className="h-20 lg:h-24 rounded-2xl bg-surface border border-border-theme hover:bg-surface-accent text-text-primary flex flex-col gap-1 font-black text-[10px] lg:text-xs uppercase tracking-tighter">
              <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 mb-1 text-status-online" />
              Carga OK
            </Button>
            <Button className="h-20 lg:h-24 rounded-2xl bg-surface border border-border-theme hover:bg-surface-accent text-text-primary flex flex-col gap-1 font-black text-[10px] lg:text-xs uppercase tracking-tighter">
              <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6 mb-1 text-blue-500" />
              Chat
            </Button>
            <Button className="h-20 lg:h-24 rounded-2xl bg-status-alert hover:bg-red-600 text-white flex flex-col gap-1 font-black text-[10px] lg:text-xs uppercase tracking-tighter col-span-1">
              <AlertCircle className="w-5 h-5 lg:w-6 lg:h-6 mb-1" />
              Emergência
            </Button>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <div className="h-auto lg:h-12 bg-surface border-t border-border-theme flex flex-col lg:flex-row items-center justify-between px-4 lg:px-8 py-2 lg:py-0 text-[9px] lg:text-[10px] font-mono text-text-secondary gap-2 lg:gap-0">
        <div className="flex gap-4 lg:gap-6">
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
