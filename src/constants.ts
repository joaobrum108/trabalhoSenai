/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Vehicle, TrackSection, Driver, TelemetryAlert } from './types';

export const MOCK_VEHICLES: Vehicle[] = [
  { id: 'V01', name: 'Locomotiva 01', type: 'locomotive', status: 'moving', position: { x: 150, y: 100 }, speed: 45, driverId: 'D01' },
  { id: 'V02', name: 'Locomotiva 02', type: 'locomotive', status: 'stopped', position: { x: 400, y: 250 }, speed: 0, driverId: 'D02' },
  { id: 'V03', name: 'Caminhão 03', type: 'truck', status: 'moving', position: { x: 600, y: 150 }, speed: 30, driverId: 'D03' },
  { id: 'V04', name: 'Caminhão 04', type: 'truck', status: 'alert', position: { x: 300, y: 400 }, speed: 85, driverId: 'D04' },
];

export const MOCK_TRACKS: TrackSection[] = [
  { id: 'T01', name: 'Via Principal Norte', status: 'open', path: 'M 50 100 L 750 100' },
  { id: 'T02', name: 'Ramal de Descarga', status: 'open', path: 'M 400 100 L 400 300' },
  { id: 'T03', name: 'Via de Manobra Sul', status: 'closed', path: 'M 50 400 L 750 400' },
  { id: 'T04', name: 'Acesso Pátio A', status: 'open', path: 'M 150 100 L 150 400' },
];

export const MOCK_DRIVERS: Driver[] = [
  { id: 'D01', name: 'Carlos Silva', status: 'online', vehicleId: 'V01' },
  { id: 'D02', name: 'Ana Oliveira', status: 'busy', vehicleId: 'V02' },
  { id: 'D03', name: 'Roberto Santos', status: 'online', vehicleId: 'V03' },
  { id: 'D04', name: 'Marcos Lima', status: 'online', vehicleId: 'V04' },
];

export const MOCK_ALERTS: TelemetryAlert[] = [
  { id: 'A01', timestamp: '16:15:22', vehicleId: 'V04', message: 'Excesso de velocidade detectado (85km/h)', severity: 'high' },
  { id: 'A02', timestamp: '16:12:05', vehicleId: 'V02', message: 'Parada não programada detectada', severity: 'medium' },
  { id: 'A03', timestamp: '16:08:45', vehicleId: 'V01', message: 'Nível de combustível baixo', severity: 'low' },
];
