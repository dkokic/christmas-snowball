var APP_NAME = 'Christmas-Snowball'     // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = '1.2'                     // Version of the off-line cache (change this value everytime you want to update cache)
var CACHE_NAME = [APP_NAME, VERSION].join('/')
var URLS = [                            // Add URL you want to cache in this list.
  '/christmas-snowball/',               // If you have separate JS/CSS files,
  '/christmas-snowball/index.html',     // add path to those files here
  '/christmas-snowball/icons/icon-152x152.png',
  '/christmas-snowball/christmas-tree-particle-shape.js',
  '/christmas-snowball/christmas-tree-particle-shape.css',
  '/christmas-snowball/merry-christmas.css',
  'https://fonts.gstatic.com/s/mountainsofchristmas/v8/dVGBFPwd6G44IWDbQtPewylJhLDHyIrT3I5b5eGTHmw.woff2',
]

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('installing cache : ' + CACHE_NAME)
      return cache.addAll(URLS)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_NAME)
      })
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('deleting cache : ' + keyList[i] )
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { // if cache is available, respond with cache
        console.log('responding with cache : ' + e.request.url)
        return request
      } else {       // if there are no cache, try fetching request
        console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
      }

      // You can omit if/else for console.log & put one line below like this too.
      // return request || fetch(e.request)
    })
  )
})

// What about an update?
self.addEventListener('updatefound', function (e) {
  console.log('updatefound :', e, self.installing)
  self.installing.addEventListener('statechange', (e) => {
    console.log('statechange :', e, self.installing.state)
  })
})
