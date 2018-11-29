/**
 * Based on code from:
 * - https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
 * - https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker
 */

// Include the worker built by the react scripts
importScripts('./service-worker.js')

/** List of all the things */
const filesToCache = [
    '/neighborhood-map/index.html',
    'https://fonts.googleapis.com/css?family=Roboto:400,700',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
]

/** Our cache name */
const staticCacheName = 'sw-precache-v3-sw-precache-webpack-plugin-' + (self.registration ? self.registration.scope : '')


self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets')
    // event.waitUntil(
    caches.open(staticCacheName).then(cache => {
        return cache.addAll(filesToCache)
    })
    // )
})

self.addEventListener('fetch', event => {
    console.log(`Fetch event for ${event.request.url}`)
    // event.respondWith(
    caches.match(event.request).then(response => {
        if (!response) {
            fetch(event.request).then(response => {
                caches.open(staticCacheName).then(cache => {
                    cache.put(event.request.url, response.clone())
                })
            })
        }
    })
    // )
})
