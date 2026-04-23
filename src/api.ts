import axios from 'axios';
import type { RevenueData, Department, Anomaly, KPI } from './types';

const api = axios.create({ baseURL: 'https://bizpulse-backend-production.up.railway.app/api' });

export const fetchKPIs        = () => api.get<KPI[]>('/kpis').then(r => r.data);
export const fetchRevenue     = () => api.get<RevenueData[]>('/revenue').then(r => r.data);
export const fetchDepartments = () => api.get<Department[]>('/departments').then(r => r.data);
export const fetchAnomalies   = () => api.get<Anomaly[]>('/anomalies').then(r => r.data);
