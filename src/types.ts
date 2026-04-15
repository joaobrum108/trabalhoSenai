/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type VehicleStatus = 'moving' | 'stopped' | 'alert';
export type TrackStatus = 'open' | 'closed';
export type DriverStatus = 'online' | 'busy' | 'offline';

export interface Vehicle {
  id: string;
  name: string;
  type: 'locomotive' | 'truck';
  status: VehicleStatus;
  position: { x: number; y: number };
  speed: number;
  driverId: string;
}

export interface TrackSection {
  id: string;
  name: string;
  status: TrackStatus;
  path: string; // SVG path or coordinates
}

export interface Driver {
  id: string;
  name: string;
  status: DriverStatus;
  vehicleId: string;
}

export interface TelemetryAlert {
  id: string;
  timestamp: string;
  vehicleId: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
}
