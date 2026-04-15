/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Driver } from '../types';
import { Phone, Mic, User, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface VoIPCenterProps {
  drivers: Driver[];
}

export const VoIPCenter: React.FC<VoIPCenterProps> = ({ drivers }) => {
  return (
    <div className="flex flex-col h-full bg-surface border border-border-theme rounded-xl overflow-hidden">
      <div className="panel-header flex items-center justify-between">
        <h3 className="flex items-center gap-2">
          <Mic className="w-4 h-4 text-accent-theme" />
          Central VoIP & PTT
        </h3>
        <Badge variant="outline" className="text-[10px] border-border-theme text-text-secondary">
          {drivers.filter(d => d.status === 'online').length} ONLINE
        </Badge>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-0">
          {drivers.map((driver) => (
            <div 
              key={driver.id}
              className="group flex flex-col p-4 border-b border-border-theme hover:bg-surface-accent transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-surface-accent flex items-center justify-center border border-border-theme">
                    <User className="w-4 h-4 text-text-secondary" />
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-surface 
                    ${driver.status === 'online' ? 'bg-status-online' : 
                      driver.status === 'busy' ? 'bg-amber-500' : 'bg-zinc-600'}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{driver.name}</p>
                  <p className="text-[11px] font-medium text-text-secondary uppercase tracking-tight">
                    {driver.vehicleId} • {driver.status}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="h-8 text-[11px] font-semibold bg-surface-accent border-border-theme hover:bg-accent-theme hover:text-black transition-all">
                  VOICE
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-[11px] font-semibold bg-surface-accent border-border-theme hover:bg-accent-theme hover:text-black transition-all">
                  PTT
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 bg-background/50 border-t border-border-theme">
        <Button className="w-full bg-accent-theme hover:bg-yellow-500 text-black font-bold uppercase tracking-widest text-[11px] h-12 gap-2 rounded-lg">
          <Circle className="w-3 h-3 fill-current animate-pulse" />
          PTT GLOBAL
        </Button>
      </div>
    </div>
  );
};
