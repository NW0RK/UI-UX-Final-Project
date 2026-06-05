import { useState, useEffect } from 'react';

export function useSystemStatus(enabled = true) {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [ramUsage, setRamUsage] = useState(0);
  const [ramUsedGb, setRamUsedGb] = useState(null);

  useEffect(() => {
    if (!enabled) return;

    const updateSystemStatus = async () => {
      setCpuUsage(prev => {
        const delta = Math.floor(Math.random() * 8) - 4;
        return Math.max(5, Math.min(85, prev + delta));
      });

      if (window.electronAPI?.getSystemMemoryUsage) {
        const memory = await window.electronAPI.getSystemMemoryUsage();
        if (memory && Number.isFinite(memory.usagePercent)) {
          setRamUsage(Math.max(0, Math.min(100, memory.usagePercent)));
          setRamUsedGb(Number.isFinite(memory.usedGb) ? memory.usedGb : null);
        }
        return;
      }

      setRamUsage(prev => {
        const delta = Math.floor(Math.random() * 4) - 2;
        const nextUsage = Math.max(25, Math.min(95, prev + delta));
        setRamUsedGb((nextUsage / 100) * 16);
        return nextUsage;
      });
    };

    updateSystemStatus();
    const sysTimer = setInterval(updateSystemStatus, 4000);

    return () => clearInterval(sysTimer);
  }, [enabled]);

  return { cpuUsage, ramUsage, ramUsedGb };
}
