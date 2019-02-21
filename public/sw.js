//console.log("ei"); 
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/src/index.css',
  '/src/index.js',
  '/sw.js',
  '/index.html',
];

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function (response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', function (event) {

  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (CACHE_NAME) {
          if (cacheWhitelist.indexOf(CACHE_NAME) === -1) {
            console.log("Cache deleted") //ATENCAO QUE ESTA PARTE DO CODIGO PODE ESTAR MAL, ELE ELIMINA A CACHE COM O NOME DE CACHE_NAME E DEVIA ELIMINAR TODAS AS CACHES QUE TIVESSEM NOME DIFERENTE DOS QUE ESTAO NO ARRAY DE CACHE 
            return caches.delete(CACHE_NAME);
          }
        })
      );
    })
  );
});

//importScripts('js/cache-polyfill.js');

/*var CACHE_VERSION = 'app-v1';
var CACHE_FILES = [
	'/',
  '/src/index.css',
  '/src/index.js',
  '/sw.js',
  '/index.html',
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(CACHE_FILES.map(url => new Request(url, {credentials: 'same-origin'})));
            }).catch(function(Error){console.log('Install failed...'+Error)})
    );
});

self.addEventListener('activate', function (event) {
	event.waitUntil(
		// Get all the cache names that we have.
		caches.keys().then(function(cacheNames) {
		  return Promise.all(
			// Run through the cache names and for each, if the cache name is not our current cache delete it.
			cacheNames.map(function(cacheName) {
			  if (cacheName !== CACHE_VERSION) {
				return caches.delete(cacheName);
			  }
			})
		  );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('Fetch event for ', event.request.url);
  let request = event.request;
  if (request.method !== 'GET') { return; }
  event.respondWith(
    caches.match(event.request, {ignoreSearch: event.request.url.indexOf('?') != -1}).then(function(response) {
//    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('--- Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

      // TODO 4 - Add fetched files to the cache

    }).catch(function(error) {

      // TODO 6 - Respond with custom offline page

    })
  );
});*/
