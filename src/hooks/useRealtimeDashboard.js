import { useState, useEffect } from 'react';
import { generateAllDashboardData } from '../services/fakerService';

export const useRealtimeDashboard = (updateInterval = 10000) => {
  const [dashboardData, setDashboardData] = useState(() => generateAllDashboardData());
  const [isLive, setIsLive] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setDashboardData(generateAllDashboardData());
      setLastUpdated(new Date());
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval, isLive]);

  const toggleLive = () => setIsLive(prev => !prev);
  const refreshData = () => {
    setDashboardData(generateAllDashboardData());
    setLastUpdated(new Date());
  };

  return {
    dashboardData,
    isLive,
    lastUpdated,
    toggleLive,
    refreshData
  };
};
