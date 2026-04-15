/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TelemetryAlert } from '../types';
import { AlertCircle, Clock, ShieldAlert, Info } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface TelemetryFeedProps {
  alerts: TelemetryAlert[];
}

export const TelemetryFeed: React.FC<TelemetryFeedProps> = ({ alerts }) => {
  return (
    <div className="flex flex-col h-full bg-surface border border-border-theme rounded-xl overflow-hidden">
      <div className="panel-header">
        <h3 className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-accent-theme" />
          Alertas de Telemetria
        </h3>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-0">
          {alerts.map((alert) => (
            <div 
              key={alert.id}
              className="p-4 border-b border-border-theme hover:bg-surface-accent transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-text-secondary font-mono">{alert.timestamp}</span>
                <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  alert.severity === 'high' ? 'bg-status-alert/10 text-status-alert' : 
                  alert.severity === 'medium' ? 'bg-amber-500/10 text-amber-500' : 
                  'bg-blue-500/10 text-blue-500'
                }`}>
                  {alert.severity}
                </span>
              </div>
              
              <p className="text-[13px] text-text-primary leading-relaxed">
                <span className={`font-bold mr-1 ${alert.severity === 'high' ? 'text-status-alert' : 'text-text-primary'}`}>
                  {alert.vehicleId}:
                </span>
                {alert.message}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
