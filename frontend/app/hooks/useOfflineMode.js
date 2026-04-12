import { useEffect, useState } from 'react';

export function useOfflineMode() {
  const [isOnline, setIsOnline] = useState(
    typeof window !== 'undefined' ? navigator.onLine : true
  );
  const [syncPending, setSyncPending] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // When back online — sync any pending uploads
  useEffect(() => {
    if (isOnline && syncPending > 0) {
      // Mock sync logic
      console.log(`Synchronizing ${syncPending} pending items...`);
      setTimeout(() => {
        setSyncPending(0);
        console.log("Synchronization complete.");
      }, 2000);
    }
  }, [isOnline, syncPending]);


  // Helper to simulate pushing a request to the queue while offline
  const queueForOffline = () => setSyncPending(p => p + 1);

  return { isOnline, syncPending, queueForOffline };
}
