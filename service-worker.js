/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./service-worker.js",['./workbox-41c5d200'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "assets/icons/icon-128x128.png",
    "revision": "e4069719fff2726574ade82b1141784a"
  }, {
    "url": "assets/icons/icon-144x144.png",
    "revision": "83ad4034894c27322a9428febdac9297"
  }, {
    "url": "assets/icons/icon-152x152.png",
    "revision": "4b4332884b5b7ad51b50beb8610ba981"
  }, {
    "url": "assets/icons/icon-192x192.png",
    "revision": "cd79936f5744b760e77fa7337c2e9b23"
  }, {
    "url": "assets/icons/icon-384x384.png",
    "revision": "500945a5dd19bb9ee3c71ff1fe132556"
  }, {
    "url": "assets/icons/icon-512x512.png",
    "revision": "500945a5dd19bb9ee3c71ff1fe132556"
  }, {
    "url": "assets/icons/icon-72x72.png",
    "revision": "439f3f11e7e713218b009aeeb5124f12"
  }, {
    "url": "assets/icons/icon-96x96.png",
    "revision": "7f7073dc73f5ccd469af1db48f5741e5"
  }, {
    "url": "assets/stock-data/AAPL.csv",
    "revision": "830773ff8c6a3fed229afdb16bb84bd9"
  }, {
    "url": "assets/stock-data/GOOGL.csv",
    "revision": "16ae00cee0a79a0d00d8f7c8b6fef2ea"
  }, {
    "url": "assets/stock-data/NFLX.csv",
    "revision": "3540021b8617e610e976e37d44919179"
  }, {
    "url": "assets/stock-data/TSLA.csv",
    "revision": "96050959d50b2be139ab928a492325b6"
  }, {
    "url": "bootstrap.min.css",
    "revision": "7cc40c199d128af6b01e74a28c5900b0"
  }, {
    "url": "container.js",
    "revision": "51fb3d08ad5373924b63d6f8ea920aed"
  }, {
    "url": "index.html",
    "revision": "dca9c80626641fddeb4ec53d8db080cc"
  }, {
    "url": "manifest.json",
    "revision": "e70db8b65b02a8d7342660e4e6eb4357"
  }, {
    "url": "popup-host.html",
    "revision": "24c04f8733c339c346177f8fd6061df7"
  }, {
    "url": "popup.js",
    "revision": "1fd29f3617928787a701d80da531320d"
  }, {
    "url": "popups-enabled.html",
    "revision": "51aa49e34496f25e7b310f2e221b7e49"
  }], {});

});
//# sourceMappingURL=service-worker.js.map
