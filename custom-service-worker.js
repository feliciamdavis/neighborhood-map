/**
 * Based on code from:
 * - https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
 * - https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker
 */

/** List of all the things */
const urlsToCache = [
    'https://fonts.googleapis.com/css?family=Roboto:400,700',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
    'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png',
    'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon-2x.png',
    'https://unpkg.com/leaflet@1.3.1/dist/images/marker-shadow.png',
]

/** Our cache name */
const staticCacheName = 'sw-precache-v3-sw-precache-webpack-plugin-' + (self.registration ? self.registration.scope : '')

function fetchWithCaching(url) {
    // Add index.html if no file was given so we can find it in the cache
    if (url.endsWith('/')) {
        url += 'index.html'
    }

    // Get from cache or if not found go fetch the URL
    return caches.open(staticCacheName).then(cache => {
        console.log(`Network request for ${url}`)
        return cache.match(url)
            .then(response => {
                if (response) {
                    console.log(`Found cached response for ${url}`)
                    return response
                }
                throw new Error(`Found cached response is empty for ${url}`)
            })
            .catch(() => {
                console.log(`Network request for ${url}`)
                return fetch(event.request)
                    .then(response => {
                        console.log(`Caching response for ${url}`)
                        if (response.type === 'opaque' || response.ok === true) {
                            cache.put(url, response.clone())
                        }
                        return response
                    })
            })
    })
}

self.addEventListener('install', () => {
    console.log('Attempting to install service worker and cache static assets')
    for (const url of urlsToCache) {
        fetchWithCaching(url)
    }
})

self.addEventListener('fetch', event => {
    // Workaround a weird Chrome bug: https://stackoverflow.com/questions/48463483/what-causes-a-failed-to-execute-fetch-on-serviceworkerglobalscope-only-if
    if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
        return
    }
    event.respondWith(fetchWithCaching(event.request.url))
})

// Include the worker built by the react scripts
importScripts('./service-worker.js')

