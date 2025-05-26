'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register service worker
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('PWA Preguntas: Service Worker registered successfully:', registration);

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content available, notify user
                  console.log('PWA Preguntas: New content available, refresh to update');

                  // Optionally show a notification to user
                  if (confirm('New content available! Would you like to refresh to get the latest version?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('PWA Preguntas: Service Worker registration failed:', error);
        });

      // Handle service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SW_UPDATE_AVAILABLE') {
          console.log('PWA Preguntas: Service Worker update available');
        }
      });

      // Handle service worker controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('PWA Preguntas: Service Worker controller changed');
        // Optionally reload the page when new service worker takes control
        window.location.reload();
      });
    }
  }, []);

  return null; // This component doesn't render anything
}
