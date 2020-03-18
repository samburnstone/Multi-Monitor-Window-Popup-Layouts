/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/container/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/broadcast-channel/dist/es/broadcast-channel.js":
/*!*********************************************************************!*\
  !*** ./node_modules/broadcast-channel/dist/es/broadcast-channel.js ***!
  \*********************************************************************/
/*! exports provided: BroadcastChannel, clearNodeFolder, enforceOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BroadcastChannel", function() { return BroadcastChannel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearNodeFolder", function() { return clearNodeFolder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enforceOptions", function() { return enforceOptions; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./node_modules/broadcast-channel/dist/es/util.js");
/* harmony import */ var _method_chooser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./method-chooser.js */ "./node_modules/broadcast-channel/dist/es/method-chooser.js");
/* harmony import */ var _options_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./options.js */ "./node_modules/broadcast-channel/dist/es/options.js");



var BroadcastChannel = function BroadcastChannel(name, options) {
  this.name = name;

  if (ENFORCED_OPTIONS) {
    options = ENFORCED_OPTIONS;
  }

  this.options = Object(_options_js__WEBPACK_IMPORTED_MODULE_2__["fillOptionsWithDefaults"])(options);
  this.method = Object(_method_chooser_js__WEBPACK_IMPORTED_MODULE_1__["chooseMethod"])(this.options); // isListening

  this._iL = false;
  /**
   * _onMessageListener
   * setting onmessage twice,
   * will overwrite the first listener
   */

  this._onML = null;
  /**
   * _addEventListeners
   */

  this._addEL = {
    message: [],
    internal: []
  };
  /**
   * _beforeClose
   * array of promises that will be awaited
   * before the channel is closed
   */

  this._befC = [];
  /**
   * _preparePromise
   */

  this._prepP = null;

  _prepareChannel(this);
}; // STATICS

/**
 * used to identify if someone overwrites
 * window.BroadcastChannel with this
 * See methods/native.js
 */

BroadcastChannel._pubkey = true;
/**
 * clears the tmp-folder if is node
 * @return {Promise<boolean>} true if has run, false if not node
 */

function clearNodeFolder(options) {
  options = Object(_options_js__WEBPACK_IMPORTED_MODULE_2__["fillOptionsWithDefaults"])(options);
  var method = Object(_method_chooser_js__WEBPACK_IMPORTED_MODULE_1__["chooseMethod"])(options);

  if (method.type === 'node') {
    return method.clearNodeFolder().then(function () {
      return true;
    });
  } else {
    return Promise.resolve(false);
  }
}
/**
 * if set, this method is enforced,
 * no mather what the options are
 */

var ENFORCED_OPTIONS;
function enforceOptions(options) {
  ENFORCED_OPTIONS = options;
} // PROTOTYPE

BroadcastChannel.prototype = {
  postMessage: function postMessage(msg) {
    if (this.closed) {
      throw new Error('BroadcastChannel.postMessage(): ' + 'Cannot post message after channel has closed');
    }

    return _post(this, 'message', msg);
  },
  postInternal: function postInternal(msg) {
    return _post(this, 'internal', msg);
  },

  set onmessage(fn) {
    var time = this.method.microSeconds();
    var listenObj = {
      time: time,
      fn: fn
    };

    _removeListenerObject(this, 'message', this._onML);

    if (fn && typeof fn === 'function') {
      this._onML = listenObj;

      _addListenerObject(this, 'message', listenObj);
    } else {
      this._onML = null;
    }
  },

  addEventListener: function addEventListener(type, fn) {
    var time = this.method.microSeconds();
    var listenObj = {
      time: time,
      fn: fn
    };

    _addListenerObject(this, type, listenObj);
  },
  removeEventListener: function removeEventListener(type, fn) {
    var obj = this._addEL[type].find(function (obj) {
      return obj.fn === fn;
    });

    _removeListenerObject(this, type, obj);
  },
  close: function close() {
    var _this = this;

    if (this.closed) return;
    this.closed = true;
    var awaitPrepare = this._prepP ? this._prepP : Promise.resolve();
    this._onML = null;
    this._addEL.message = [];
    return awaitPrepare.then(function () {
      return Promise.all(_this._befC.map(function (fn) {
        return fn();
      }));
    }).then(function () {
      return _this.method.close(_this._state);
    });
  },

  get type() {
    return this.method.type;
  }

};

function _post(broadcastChannel, type, msg) {
  var time = broadcastChannel.method.microSeconds();
  var msgObj = {
    time: time,
    type: type,
    data: msg
  };
  var awaitPrepare = broadcastChannel._prepP ? broadcastChannel._prepP : Promise.resolve();
  return awaitPrepare.then(function () {
    return broadcastChannel.method.postMessage(broadcastChannel._state, msgObj);
  });
}

function _prepareChannel(channel) {
  var maybePromise = channel.method.create(channel.name, channel.options);

  if (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isPromise"])(maybePromise)) {
    channel._prepP = maybePromise;
    maybePromise.then(function (s) {
      // used in tests to simulate slow runtime

      /*if (channel.options.prepareDelay) {
           await new Promise(res => setTimeout(res, this.options.prepareDelay));
      }*/
      channel._state = s;
    });
  } else {
    channel._state = maybePromise;
  }
}

function _hasMessageListeners(channel) {
  if (channel._addEL.message.length > 0) return true;
  if (channel._addEL.internal.length > 0) return true;
  return false;
}

function _addListenerObject(channel, type, obj) {
  channel._addEL[type].push(obj);

  _startListening(channel);
}

function _removeListenerObject(channel, type, obj) {
  channel._addEL[type] = channel._addEL[type].filter(function (o) {
    return o !== obj;
  });

  _stopListening(channel);
}

function _startListening(channel) {
  if (!channel._iL && _hasMessageListeners(channel)) {
    // someone is listening, start subscribing
    var listenerFn = function listenerFn(msgObj) {
      channel._addEL[msgObj.type].forEach(function (obj) {
        if (msgObj.time >= obj.time) {
          obj.fn(msgObj.data);
        }
      });
    };

    var time = channel.method.microSeconds();

    if (channel._prepP) {
      channel._prepP.then(function () {
        channel._iL = true;
        channel.method.onMessage(channel._state, listenerFn, time);
      });
    } else {
      channel._iL = true;
      channel.method.onMessage(channel._state, listenerFn, time);
    }
  }
}

function _stopListening(channel) {
  if (channel._iL && !_hasMessageListeners(channel)) {
    // noone is listening, stop subscribing
    channel._iL = false;
    var time = channel.method.microSeconds();
    channel.method.onMessage(channel._state, null, time);
  }
}

/***/ }),

/***/ "./node_modules/broadcast-channel/dist/es/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/broadcast-channel/dist/es/index.js ***!
  \*********************************************************/
/*! exports provided: BroadcastChannel, clearNodeFolder, enforceOptions, createLeaderElection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _broadcast_channel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./broadcast-channel */ "./node_modules/broadcast-channel/dist/es/broadcast-channel.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BroadcastChannel", function() { return _broadcast_channel__WEBPACK_IMPORTED_MODULE_0__["BroadcastChannel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clearNodeFolder", function() { return _broadcast_channel__WEBPACK_IMPORTED_MODULE_0__["clearNodeFolder"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "enforceOptions", function() { return _broadcast_channel__WEBPACK_IMPORTED_MODULE_0__["enforceOptions"]; });

/* harmony import */ var _leader_election__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./leader-election */ "./node_modules/broadcast-channel/dist/es/leader-election.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createLeaderElection", function() { return _leader_election__WEBPACK_IMPORTED_MODULE_1__["createLeaderElection"]; });




/***/ }),

/***/ "./node_modules/broadcast-channel/dist/es/leader-election.js":
/*!*******************************************************************!*\
  !*** ./node_modules/broadcast-channel/dist/es/leader-election.js ***!
  \*******************************************************************/
/*! exports provided: createLeaderElection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLeaderElection", function() { return createLeaderElection; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./node_modules/broadcast-channel/dist/es/util.js");
/* harmony import */ var unload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! unload */ "./node_modules/unload/dist/es/index.js");



var LeaderElection = function LeaderElection(channel, options) {
  this._channel = channel;
  this._options = options;
  this.isLeader = false;
  this.isDead = false;
  this.token = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["randomToken"])();
  this._isApl = false; // _isApplying

  this._reApply = false; // things to clean up

  this._unl = []; // _unloads

  this._lstns = []; // _listeners

  this._invs = []; // _intervals
};

LeaderElection.prototype = {
  applyOnce: function applyOnce() {
    var _this = this;

    if (this.isLeader) return Promise.resolve(false);
    if (this.isDead) return Promise.resolve(false); // do nothing if already running

    if (this._isApl) {
      this._reApply = true;
      return Promise.resolve(false);
    }

    this._isApl = true;
    var stopCriteria = false;
    var recieved = [];

    var handleMessage = function handleMessage(msg) {
      if (msg.context === 'leader' && msg.token != _this.token) {
        recieved.push(msg);

        if (msg.action === 'apply') {
          // other is applying
          if (msg.token > _this.token) {
            // other has higher token, stop applying
            stopCriteria = true;
          }
        }

        if (msg.action === 'tell') {
          // other is already leader
          stopCriteria = true;
        }
      }
    };

    this._channel.addEventListener('internal', handleMessage);

    var ret = _sendMessage(this, 'apply') // send out that this one is applying
    .then(function () {
      return Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["sleep"])(_this._options.responseTime);
    }) // let others time to respond
    .then(function () {
      if (stopCriteria) return Promise.reject(new Error());else return _sendMessage(_this, 'apply');
    }).then(function () {
      return Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["sleep"])(_this._options.responseTime);
    }) // let others time to respond
    .then(function () {
      if (stopCriteria) return Promise.reject(new Error());else return _sendMessage(_this);
    }).then(function () {
      return _beLeader(_this);
    }) // no one disagreed -> this one is now leader
    .then(function () {
      return true;
    })["catch"](function () {
      return false;
    }) // apply not successfull
    .then(function (success) {
      _this._channel.removeEventListener('internal', handleMessage);

      _this._isApl = false;

      if (!success && _this._reApply) {
        _this._reApply = false;
        return _this.applyOnce();
      } else return success;
    });

    return ret;
  },
  awaitLeadership: function awaitLeadership() {
    if (
    /* _awaitLeadershipPromise */
    !this._aLP) {
      this._aLP = _awaitLeadershipOnce(this);
    }

    return this._aLP;
  },
  die: function die() {
    var _this2 = this;

    if (this.isDead) return;
    this.isDead = true;

    this._lstns.forEach(function (listener) {
      return _this2._channel.removeEventListener('internal', listener);
    });

    this._invs.forEach(function (interval) {
      return clearInterval(interval);
    });

    this._unl.forEach(function (uFn) {
      uFn.remove();
    });

    return _sendMessage(this, 'death');
  }
};

function _awaitLeadershipOnce(leaderElector) {
  if (leaderElector.isLeader) return Promise.resolve();
  return new Promise(function (res) {
    var resolved = false;

    var finish = function finish() {
      if (resolved) return;
      resolved = true;
      clearInterval(interval);

      leaderElector._channel.removeEventListener('internal', whenDeathListener);

      res(true);
    }; // try once now


    leaderElector.applyOnce().then(function () {
      if (leaderElector.isLeader) finish();
    }); // try on fallbackInterval

    var interval = setInterval(function () {
      leaderElector.applyOnce().then(function () {
        if (leaderElector.isLeader) finish();
      });
    }, leaderElector._options.fallbackInterval);

    leaderElector._invs.push(interval); // try when other leader dies


    var whenDeathListener = function whenDeathListener(msg) {
      if (msg.context === 'leader' && msg.action === 'death') {
        leaderElector.applyOnce().then(function () {
          if (leaderElector.isLeader) finish();
        });
      }
    };

    leaderElector._channel.addEventListener('internal', whenDeathListener);

    leaderElector._lstns.push(whenDeathListener);
  });
}
/**
 * sends and internal message over the broadcast-channel
 */


function _sendMessage(leaderElector, action) {
  var msgJson = {
    context: 'leader',
    action: action,
    token: leaderElector.token
  };
  return leaderElector._channel.postInternal(msgJson);
}

function _beLeader(leaderElector) {
  leaderElector.isLeader = true;
  var unloadFn = unload__WEBPACK_IMPORTED_MODULE_1__["default"].add(function () {
    return leaderElector.die();
  });

  leaderElector._unl.push(unloadFn);

  var isLeaderListener = function isLeaderListener(msg) {
    if (msg.context === 'leader' && msg.action === 'apply') {
      _sendMessage(leaderElector, 'tell');
    }
  };

  leaderElector._channel.addEventListener('internal', isLeaderListener);

  leaderElector._lstns.push(isLeaderListener);

  return _sendMessage(leaderElector, 'tell');
}

function fillOptionsWithDefaults(options, channel) {
  if (!options) options = {};
  options = JSON.parse(JSON.stringify(options));

  if (!options.fallbackInterval) {
    options.fallbackInterval = 3000;
  }

  if (!options.responseTime) {
    options.responseTime = channel.method.averageResponseTime(channel.options);
  }

  return options;
}

function createLeaderElection(channel, options) {
  if (channel._leaderElector) {
    throw new Error('BroadcastChannel already has a leader-elector');
  }

  options = fillOptionsWithDefaults(options, channel);
  var elector = new LeaderElection(channel, options);

  channel._befC.push(function () {
    return elector.die();
  });

  channel._leaderElector = elector;
  return elector;
}

/***/ }),

/***/ "./node_modules/broadcast-channel/dist/es/method-chooser.js":
/*!******************************************************************!*\
  !*** ./node_modules/broadcast-channel/dist/es/method-chooser.js ***!
  \******************************************************************/
/*! exports provided: chooseMethod */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chooseMethod", function() { return chooseMethod; });
/* harmony import */ var _methods_native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./methods/native.js */ "./node_modules/broadcast-channel/dist/es/methods/native.js");
/* harmony import */ var _methods_indexed_db_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./methods/indexed-db.js */ "./node_modules/broadcast-channel/dist/es/methods/indexed-db.js");
/* harmony import */ var _methods_localstorage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./methods/localstorage.js */ "./node_modules/broadcast-channel/dist/es/methods/localstorage.js");
/* harmony import */ var _methods_simulate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./methods/simulate.js */ "./node_modules/broadcast-channel/dist/es/methods/simulate.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util */ "./node_modules/broadcast-channel/dist/es/util.js");




 // order is important

var METHODS = [_methods_native_js__WEBPACK_IMPORTED_MODULE_0__["default"], // fastest
_methods_indexed_db_js__WEBPACK_IMPORTED_MODULE_1__["default"], _methods_localstorage_js__WEBPACK_IMPORTED_MODULE_2__["default"]];
/**
 * The NodeMethod is loaded lazy
 * so it will not get bundled in browser-builds
 */

if (_util__WEBPACK_IMPORTED_MODULE_4__["isNode"]) {
  /**
   * we use the non-transpiled code for nodejs
   * because it runs faster
   */
  var NodeMethod = __webpack_require__(/*! ../../src/methods/node.js */ 0);
  /**
   * this will be false for webpackbuilds
   * which will shim the node-method with an empty object {}
   */


  if (typeof NodeMethod.canBeUsed === 'function') {
    METHODS.push(NodeMethod);
  }
}

function chooseMethod(options) {
  var chooseMethods = [].concat(options.methods, METHODS).filter(Boolean); // directly chosen

  if (options.type) {
    if (options.type === 'simulate') {
      // only use simulate-method if directly chosen
      return _methods_simulate_js__WEBPACK_IMPORTED_MODULE_3__["default"];
    }

    var ret = chooseMethods.find(function (m) {
      return m.type === options.type;
    });
    if (!ret) throw new Error('method-type ' + options.type + ' not found');else return ret;
  }
  /**
   * if no webworker support is needed,
   * remove idb from the list so that localstorage is been chosen
   */


  if (!options.webWorkerSupport && !_util__WEBPACK_IMPORTED_MODULE_4__["isNode"]) {
    chooseMethods = chooseMethods.filter(function (m) {
      return m.type !== 'idb';
    });
  }

  var useMethod = chooseMethods.find(function (method) {
    return method.canBeUsed();
  });
  if (!useMethod) throw new Error('No useable methode found:' + JSON.stringify(METHODS.map(function (m) {
    return m.type;
  })));else return useMethod;
}

/***/ }),

/***/ "./node_modules/broadcast-channel/dist/es/methods/indexed-db.js":
/*!**********************************************************************!*\
  !*** ./node_modules/broadcast-channel/dist/es/methods/indexed-db.js ***!
  \**********************************************************************/
/*! exports provided: microSeconds, type, getIdb, createDatabase, writeMessage, getAllMessages, getMessagesHigherThen, removeMessageById, getOldMessages, cleanOldMessages, create, close, postMessage, onMessage, canBeUsed, averageResponseTime, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "microSeconds", function() { return microSeconds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "type", function() { return type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIdb", function() { return getIdb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDatabase", function() { return createDatabase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "writeMessage", function() { return writeMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllMessages", function() { return getAllMessages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMessagesHigherThen", function() { return getMessagesHigherThen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeMessageById", function() { return removeMessageById; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOldMessages", function() { return getOldMessages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cleanOldMessages", function() { return cleanOldMessages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "close", function() { return close; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postMessage", function() { return postMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onMessage", function() { return onMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canBeUsed", function() { return canBeUsed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "averageResponseTime", function() { return averageResponseTime; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ "./node_modules/broadcast-channel/dist/es/util.js");
/* harmony import */ var _oblivious_set__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../oblivious-set */ "./node_modules/broadcast-channel/dist/es/oblivious-set.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../options */ "./node_modules/broadcast-channel/dist/es/options.js");
/**
 * this method uses indexeddb to store the messages
 * There is currently no observerAPI for idb
 * @link https://github.com/w3c/IndexedDB/issues/51
 */

var microSeconds = _util_js__WEBPACK_IMPORTED_MODULE_0__["microSeconds"];


var DB_PREFIX = 'pubkey.broadcast-channel-0-';
var OBJECT_STORE_ID = 'messages';
var type = 'idb';
function getIdb() {
  if (typeof indexedDB !== 'undefined') return indexedDB;

  if (typeof window !== 'undefined') {
    if (typeof window.mozIndexedDB !== 'undefined') return window.mozIndexedDB;
    if (typeof window.webkitIndexedDB !== 'undefined') return window.webkitIndexedDB;
    if (typeof window.msIndexedDB !== 'undefined') return window.msIndexedDB;
  }

  return false;
}
function createDatabase(channelName) {
  var IndexedDB = getIdb(); // create table

  var dbName = DB_PREFIX + channelName;
  var openRequest = IndexedDB.open(dbName, 1);

  openRequest.onupgradeneeded = function (ev) {
    var db = ev.target.result;
    db.createObjectStore(OBJECT_STORE_ID, {
      keyPath: 'id',
      autoIncrement: true
    });
  };

  var dbPromise = new Promise(function (res, rej) {
    openRequest.onerror = function (ev) {
      return rej(ev);
    };

    openRequest.onsuccess = function () {
      res(openRequest.result);
    };
  });
  return dbPromise;
}
/**
 * writes the new message to the database
 * so other readers can find it
 */

function writeMessage(db, readerUuid, messageJson) {
  var time = new Date().getTime();
  var writeObject = {
    uuid: readerUuid,
    time: time,
    data: messageJson
  };
  var transaction = db.transaction([OBJECT_STORE_ID], 'readwrite');
  return new Promise(function (res, rej) {
    transaction.oncomplete = function () {
      return res();
    };

    transaction.onerror = function (ev) {
      return rej(ev);
    };

    var objectStore = transaction.objectStore(OBJECT_STORE_ID);
    objectStore.add(writeObject);
  });
}
function getAllMessages(db) {
  var objectStore = db.transaction(OBJECT_STORE_ID).objectStore(OBJECT_STORE_ID);
  var ret = [];
  return new Promise(function (res) {
    objectStore.openCursor().onsuccess = function (ev) {
      var cursor = ev.target.result;

      if (cursor) {
        ret.push(cursor.value); //alert("Name for SSN " + cursor.key + " is " + cursor.value.name);

        cursor["continue"]();
      } else {
        res(ret);
      }
    };
  });
}
function getMessagesHigherThen(db, lastCursorId) {
  var objectStore = db.transaction(OBJECT_STORE_ID).objectStore(OBJECT_STORE_ID);
  var ret = [];
  var keyRangeValue = IDBKeyRange.bound(lastCursorId + 1, Infinity);
  return new Promise(function (res) {
    objectStore.openCursor(keyRangeValue).onsuccess = function (ev) {
      var cursor = ev.target.result;

      if (cursor) {
        ret.push(cursor.value);
        cursor["continue"]();
      } else {
        res(ret);
      }
    };
  });
}
function removeMessageById(db, id) {
  var request = db.transaction([OBJECT_STORE_ID], 'readwrite').objectStore(OBJECT_STORE_ID)["delete"](id);
  return new Promise(function (res) {
    request.onsuccess = function () {
      return res();
    };
  });
}
function getOldMessages(db, ttl) {
  var olderThen = new Date().getTime() - ttl;
  var objectStore = db.transaction(OBJECT_STORE_ID).objectStore(OBJECT_STORE_ID);
  var ret = [];
  return new Promise(function (res) {
    objectStore.openCursor().onsuccess = function (ev) {
      var cursor = ev.target.result;

      if (cursor) {
        var msgObk = cursor.value;

        if (msgObk.time < olderThen) {
          ret.push(msgObk); //alert("Name for SSN " + cursor.key + " is " + cursor.value.name);

          cursor["continue"]();
        } else {
          // no more old messages,
          res(ret);
          return;
        }
      } else {
        res(ret);
      }
    };
  });
}
function cleanOldMessages(db, ttl) {
  return getOldMessages(db, ttl).then(function (tooOld) {
    return Promise.all(tooOld.map(function (msgObj) {
      return removeMessageById(db, msgObj.id);
    }));
  });
}
function create(channelName, options) {
  options = Object(_options__WEBPACK_IMPORTED_MODULE_2__["fillOptionsWithDefaults"])(options);
  return createDatabase(channelName).then(function (db) {
    var state = {
      closed: false,
      lastCursorId: 0,
      channelName: channelName,
      options: options,
      uuid: Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["randomToken"])(),

      /**
       * emittedMessagesIds
       * contains all messages that have been emitted before
       * @type {ObliviousSet}
       */
      eMIs: new _oblivious_set__WEBPACK_IMPORTED_MODULE_1__["default"](options.idb.ttl * 2),
      // ensures we do not read messages in parrallel
      writeBlockPromise: Promise.resolve(),
      messagesCallback: null,
      readQueuePromises: [],
      db: db
    };
    /**
     * if service-workers are used,
     * we have no 'storage'-event if they post a message,
     * therefore we also have to set an interval
     */

    _readLoop(state);

    return state;
  });
}

function _readLoop(state) {
  if (state.closed) return;
  readNewMessages(state).then(function () {
    return Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["sleep"])(state.options.idb.fallbackInterval);
  }).then(function () {
    return _readLoop(state);
  });
}

function _filterMessage(msgObj, state) {
  if (msgObj.uuid === state.uuid) return false; // send by own

  if (state.eMIs.has(msgObj.id)) return false; // already emitted

  if (msgObj.data.time < state.messagesCallbackTime) return false; // older then onMessageCallback

  return true;
}
/**
 * reads all new messages from the database and emits them
 */


function readNewMessages(state) {
  // channel already closed
  if (state.closed) return Promise.resolve(); // if no one is listening, we do not need to scan for new messages

  if (!state.messagesCallback) return Promise.resolve();
  return getMessagesHigherThen(state.db, state.lastCursorId).then(function (newerMessages) {
    var useMessages = newerMessages
    /**
     * there is a bug in iOS where the msgObj can be undefined some times
     * so we filter them out
     * @link https://github.com/pubkey/broadcast-channel/issues/19
     */
    .filter(function (msgObj) {
      return !!msgObj;
    }).map(function (msgObj) {
      if (msgObj.id > state.lastCursorId) {
        state.lastCursorId = msgObj.id;
      }

      return msgObj;
    }).filter(function (msgObj) {
      return _filterMessage(msgObj, state);
    }).sort(function (msgObjA, msgObjB) {
      return msgObjA.time - msgObjB.time;
    }); // sort by time

    useMessages.forEach(function (msgObj) {
      if (state.messagesCallback) {
        state.eMIs.add(msgObj.id);
        state.messagesCallback(msgObj.data);
      }
    });
    return Promise.resolve();
  });
}

function close(channelState) {
  channelState.closed = true;
  channelState.db.close();
}
function postMessage(channelState, messageJson) {
  channelState.writeBlockPromise = channelState.writeBlockPromise.then(function () {
    return writeMessage(channelState.db, channelState.uuid, messageJson);
  }).then(function () {
    if (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["randomInt"])(0, 10) === 0) {
      /* await (do not await) */
      cleanOldMessages(channelState.db, channelState.options.idb.ttl);
    }
  });
  return channelState.writeBlockPromise;
}
function onMessage(channelState, fn, time) {
  channelState.messagesCallbackTime = time;
  channelState.messagesCallback = fn;
  readNewMessages(channelState);
}
function canBeUsed() {
  if (_util_js__WEBPACK_IMPORTED_MODULE_0__["isNode"]) return false;
  var idb = getIdb();
  if (!idb) return false;
  return true;
}
function averageResponseTime(options) {
  return options.idb.fallbackInterval * 2;
}
/* harmony default export */ __webpack_exports__["default"] = ({
  create: create,
  close: close,
  onMessage: onMessage,
  postMessage: postMessage,
  canBeUsed: canBeUsed,
  type: type,
  averageResponseTime: averageResponseTime,
  microSeconds: microSeconds
});

/***/ }),

/***/ "./node_modules/broadcast-channel/dist/es/methods/localstorage.js":
/*!************************************************************************!*\
  !*** ./node_modules/broadcast-channel/dist/es/methods/localstorage.js ***!
  \************************************************************************/
/*! exports provided: microSeconds, type, getLocalStorage, storageKey, postMessage, addStorageEventListener, removeStorageEventListener, create, close, onMessage, canBeUsed, averageResponseTime, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "microSeconds", function() { return microSeconds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "type", function() { return type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocalStorage", function() { return getLocalStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storageKey", function() { return storageKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postMessage", function() { return postMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addStorageEventListener", function() { return addStorageEventListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeStorageEventListener", function() { return removeStorageEventListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "close", function() { return close; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onMessage", function() { return onMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canBeUsed", function() { return canBeUsed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "averageResponseTime", function() { return averageResponseTime; });
/* harmony import */ var _oblivious_set__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../oblivious-set */ "./node_modules/broadcast-channel/dist/es/oblivious-set.js");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../options */ "./node_modules/broadcast-channel/dist/es/options.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util */ "./node_modules/broadcast-channel/dist/es/util.js");
/**
 * A localStorage-only method which uses localstorage and its 'storage'-event
 * This does not work inside of webworkers because they have no access to locastorage
 * This is basically implemented to support IE9 or your grandmothers toaster.
 * @link https://caniuse.com/#feat=namevalue-storage
 * @link https://caniuse.com/#feat=indexeddb
 */



var microSeconds = _util__WEBPACK_IMPORTED_MODULE_2__["microSeconds"];
var KEY_PREFIX = 'pubkey.broadcastChannel-';
var type = 'localstorage';
/**
 * copied from crosstab
 * @link https://github.com/tejacques/crosstab/blob/master/src/crosstab.js#L32
 */

function getLocalStorage() {
  var localStorage;
  if (typeof window === 'undefined') return null;

  try {
    localStorage = window.localStorage;
    localStorage = window['ie8-eventlistener/storage'] || window.localStorage;
  } catch (e) {// New versions of Firefox throw a Security exception
    // if cookies are disabled. See
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1028153
  }

  return localStorage;
}
function storageKey(channelName) {
  return KEY_PREFIX + channelName;
}
/**
* writes the new message to the storage
* and fires the storage-event so other readers can find it
*/

function postMessage(channelState, messageJson) {
  return new Promise(function (res) {
    Object(_util__WEBPACK_IMPORTED_MODULE_2__["sleep"])().then(function () {
      var key = storageKey(channelState.channelName);
      var writeObj = {
        token: Object(_util__WEBPACK_IMPORTED_MODULE_2__["randomToken"])(),
        time: new Date().getTime(),
        data: messageJson,
        uuid: channelState.uuid
      };
      var value = JSON.stringify(writeObj);
      getLocalStorage().setItem(key, value);
      /**
       * StorageEvent does not fire the 'storage' event
       * in the window that changes the state of the local storage.
       * So we fire it manually
       */

      var ev = document.createEvent('Event');
      ev.initEvent('storage', true, true);
      ev.key = key;
      ev.newValue = value;
      window.dispatchEvent(ev);
      res();
    });
  });
}
function addStorageEventListener(channelName, fn) {
  var key = storageKey(channelName);

  var listener = function listener(ev) {
    if (ev.key === key) {
      fn(JSON.parse(ev.newValue));
    }
  };

  window.addEventListener('storage', listener);
  return listener;
}
function removeStorageEventListener(listener) {
  window.removeEventListener('storage', listener);
}
function create(channelName, options) {
  options = Object(_options__WEBPACK_IMPORTED_MODULE_1__["fillOptionsWithDefaults"])(options);

  if (!canBeUsed()) {
    throw new Error('BroadcastChannel: localstorage cannot be used');
  }

  var uuid = Object(_util__WEBPACK_IMPORTED_MODULE_2__["randomToken"])();
  /**
   * eMIs
   * contains all messages that have been emitted before
   * @type {ObliviousSet}
   */

  var eMIs = new _oblivious_set__WEBPACK_IMPORTED_MODULE_0__["default"](options.localstorage.removeTimeout);
  var state = {
    channelName: channelName,
    uuid: uuid,
    eMIs: eMIs // emittedMessagesIds

  };
  state.listener = addStorageEventListener(channelName, function (msgObj) {
    if (!state.messagesCallback) return; // no listener

    if (msgObj.uuid === uuid) return; // own message

    if (!msgObj.token || eMIs.has(msgObj.token)) return; // already emitted

    if (msgObj.data.time && msgObj.data.time < state.messagesCallbackTime) return; // too old

    eMIs.add(msgObj.token);
    state.messagesCallback(msgObj.data);
  });
  return state;
}
function close(channelState) {
  removeStorageEventListener(channelState.listener);
}
function onMessage(channelState, fn, time) {
  channelState.messagesCallbackTime = time;
  channelState.messagesCallback = fn;
}
function canBeUsed() {
  if (_util__WEBPACK_IMPORTED_MODULE_2__["isNode"]) return false;
  var ls = getLocalStorage();
  if (!ls) return false;

  try {
    var key = '__broadcastchannel_check';
    ls.setItem(key, 'works');
    ls.removeItem(key);
  } catch (e) {
    // Safari 10 in private mode will not allow write access to local
    // storage and fail with a QuotaExceededError. See
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API#Private_Browsing_Incognito_modes
    return false;
  }

  return true;
}
function averageResponseTime() {
  var defaultTime = 120;
  var userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
    // safari is much slower so this time is higher
    return defaultTime * 2;
  }

  return defaultTime;
}
/* harmony default export */ __webpack_exports__["default"] = ({
  create: create,
  close: close,
  onMessage: onMessage,
  postMessage: postMessage,
  canBeUsed: canBeUsed,
  type: type,
  averageResponseTime: averageResponseTime,
  microSeconds: microSeconds
});

/***/ }),

/***/ "./node_modules/broadcast-channel/dist/es/methods/native.js":
/*!******************************************************************!*\
  !*** ./node_modules/broadcast-channel/dist/es/methods/native.js ***!
  \******************************************************************/
/*! exports provided: microSeconds, type, create, close, postMessage, onMessage, canBeUsed, averageResponseTime, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "microSeconds", function() { return microSeconds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "type", function() { return type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "close", function() { return close; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postMessage", function() { return postMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onMessage", function() { return onMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canBeUsed", function() { return canBeUsed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "averageResponseTime", function() { return averageResponseTime; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./node_modules/broadcast-channel/dist/es/util.js");

var microSeconds = _util__WEBPACK_IMPORTED_MODULE_0__["microSeconds"];
var type = 'native';
function create(channelName) {
  var state = {
    messagesCallback: null,
    bc: new BroadcastChannel(channelName),
    subFns: [] // subscriberFunctions

  };

  state.bc.onmessage = function (msg) {
    if (state.messagesCallback) {
      state.messagesCallback(msg.data);
    }
  };

  return state;
}
function close(channelState) {
  channelState.bc.close();
  channelState.subFns = [];
}
function postMessage(channelState, messageJson) {
  channelState.bc.postMessage(messageJson, false);
}
function onMessage(channelState, fn) {
  channelState.messagesCallback = fn;
}
function canBeUsed() {
  /**
   * in the electron-renderer, isNode will be true even if we are in browser-context
   * so we also check if window is undefined
   */
  if (_util__WEBPACK_IMPORTED_MODULE_0__["isNode"] && typeof window === 'undefined') return false;

  if (typeof BroadcastChannel === 'function') {
    if (BroadcastChannel._pubkey) {
      throw new Error('BroadcastChannel: Do not overwrite window.BroadcastChannel with this module, this is not a polyfill');
    }

    return true;
  } else return false;
}
function averageResponseTime() {
  return 150;
}
/* harmony default export */ __webpack_exports__["default"] = ({
  create: create,
  close: close,
  onMessage: onMessage,
  postMessage: postMessage,
  canBeUsed: canBeUsed,
  type: type,
  averageResponseTime: averageResponseTime,
  microSeconds: microSeconds
});

/***/ }),

/***/ "./node_modules/broadcast-channel/dist/es/methods/simulate.js":
/*!********************************************************************!*\
  !*** ./node_modules/broadcast-channel/dist/es/methods/simulate.js ***!
  \********************************************************************/
/*! exports provided: microSeconds, type, create, close, postMessage, onMessage, canBeUsed, averageResponseTime, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "microSeconds", function() { return microSeconds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "type", function() { return type; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "close", function() { return close; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postMessage", function() { return postMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onMessage", function() { return onMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canBeUsed", function() { return canBeUsed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "averageResponseTime", function() { return averageResponseTime; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ "./node_modules/broadcast-channel/dist/es/util.js");

var microSeconds = _util__WEBPACK_IMPORTED_MODULE_0__["microSeconds"];
var type = 'simulate';
var SIMULATE_CHANNELS = new Set();
function create(channelName) {
  var state = {
    name: channelName,
    messagesCallback: null
  };
  SIMULATE_CHANNELS.add(state);
  return state;
}
function close(channelState) {
  SIMULATE_CHANNELS["delete"](channelState);
}
function postMessage(channelState, messageJson) {
  return new Promise(function (res) {
    return setTimeout(function () {
      var channelArray = Array.from(SIMULATE_CHANNELS);
      channelArray.filter(function (channel) {
        return channel.name === channelState.name;
      }).filter(function (channel) {
        return channel !== channelState;
      }).filter(function (channel) {
        return !!channel.messagesCallback;
      }).forEach(function (channel) {
        return channel.messagesCallback(messageJson);
      });
      res();
    }, 5);
  });
}
function onMessage(channelState, fn) {
  channelState.messagesCallback = fn;
}
function canBeUsed() {
  return true;
}
function averageResponseTime() {
  return 5;
}
/* harmony default export */ __webpack_exports__["default"] = ({
  create: create,
  close: close,
  onMessage: onMessage,
  postMessage: postMessage,
  canBeUsed: canBeUsed,
  type: type,
  averageResponseTime: averageResponseTime,
  microSeconds: microSeconds
});

/***/ }),

/***/ "./node_modules/broadcast-channel/dist/es/oblivious-set.js":
/*!*****************************************************************!*\
  !*** ./node_modules/broadcast-channel/dist/es/oblivious-set.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * this is a set which automatically forgets
 * a given entry when a new entry is set and the ttl
 * of the old one is over
 * @constructor
 */
var ObliviousSet = function ObliviousSet(ttl) {
  var set = new Set();
  var timeMap = new Map();
  this.has = set.has.bind(set);

  this.add = function (value) {
    timeMap.set(value, now());
    set.add(value);

    _removeTooOldValues();
  };

  this.clear = function () {
    set.clear();
    timeMap.clear();
  };

  function _removeTooOldValues() {
    var olderThen = now() - ttl;
    var iterator = set[Symbol.iterator]();

    while (true) {
      var value = iterator.next().value;
      if (!value) return; // no more elements

      var time = timeMap.get(value);

      if (time < olderThen) {
        timeMap["delete"](value);
        set["delete"](value);
      } else {
        // we reached a value that is not old enough
        return;
      }
    }
  }
};

function now() {
  return new Date().getTime();
}

/* harmony default export */ __webpack_exports__["default"] = (ObliviousSet);

/***/ }),

/***/ "./node_modules/broadcast-channel/dist/es/options.js":
/*!***********************************************************!*\
  !*** ./node_modules/broadcast-channel/dist/es/options.js ***!
  \***********************************************************/
/*! exports provided: fillOptionsWithDefaults */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fillOptionsWithDefaults", function() { return fillOptionsWithDefaults; });
function fillOptionsWithDefaults() {
  var originalOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = JSON.parse(JSON.stringify(originalOptions)); // main

  if (typeof options.webWorkerSupport === 'undefined') options.webWorkerSupport = true; // indexed-db

  if (!options.idb) options.idb = {}; //  after this time the messages get deleted

  if (!options.idb.ttl) options.idb.ttl = 1000 * 45;
  if (!options.idb.fallbackInterval) options.idb.fallbackInterval = 150; // localstorage

  if (!options.localstorage) options.localstorage = {};
  if (!options.localstorage.removeTimeout) options.localstorage.removeTimeout = 1000 * 60; // custom methods

  if (originalOptions.methods) options.methods = originalOptions.methods; // node

  if (!options.node) options.node = {};
  if (!options.node.ttl) options.node.ttl = 1000 * 60 * 2; // 2 minutes;

  if (typeof options.node.useFastPath === 'undefined') options.node.useFastPath = true;
  return options;
}

/***/ }),

/***/ "./node_modules/broadcast-channel/dist/es/util.js":
/*!********************************************************!*\
  !*** ./node_modules/broadcast-channel/dist/es/util.js ***!
  \********************************************************/
/*! exports provided: isPromise, sleep, randomInt, randomToken, microSeconds, isNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPromise", function() { return isPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sleep", function() { return sleep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomInt", function() { return randomInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomToken", function() { return randomToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "microSeconds", function() { return microSeconds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNode", function() { return isNode; });
/**
 * returns true if the given object is a promise
 */
function isPromise(obj) {
  if (obj && typeof obj.then === 'function') {
    return true;
  } else {
    return false;
  }
}
function sleep(time) {
  if (!time) time = 0;
  return new Promise(function (res) {
    return setTimeout(res, time);
  });
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * https://stackoverflow.com/a/8084248
 */

function randomToken() {
  return Math.random().toString(36).substring(2);
}
var lastMs = 0;
var additional = 0;
/**
 * returns the current time in micro-seconds,
 * WARNING: This is a pseudo-function
 * Performance.now is not reliable in webworkers, so we just make sure to never return the same time.
 * This is enough in browsers, and this function will not be used in nodejs.
 * The main reason for this hack is to ensure that BroadcastChannel behaves equal to production when it is used in fast-running unit tests.
 */

function microSeconds() {
  var ms = new Date().getTime();

  if (ms === lastMs) {
    additional++;
    return ms * 1000 + additional;
  } else {
    lastMs = ms;
    additional = 0;
    return ms * 1000;
  }
}
/**
 * copied from the 'detect-node' npm module
 * We cannot use the module directly because it causes problems with rollup
 * @link https://github.com/iliakan/detect-node/blob/master/index.js
 */

var isNode = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/detect-node/browser.js":
/*!*********************************************!*\
  !*** ./node_modules/detect-node/browser.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;



/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/unload/dist/es/browser.js":
/*!************************************************!*\
  !*** ./node_modules/unload/dist/es/browser.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* global WorkerGlobalScope */
function add(fn) {
  if (typeof WorkerGlobalScope === 'function' && self instanceof WorkerGlobalScope) {// this is run inside of a webworker
  } else {
    /**
     * if we are on react-native, there is no window.addEventListener
     * @link https://github.com/pubkey/unload/issues/6
     */
    if (typeof window.addEventListener !== 'function') return;
    /**
     * for normal browser-windows, we use the beforeunload-event
     */

    window.addEventListener('beforeunload', function () {
      fn();
    }, true);
    /**
     * for iframes, we have to use the unload-event
     * @link https://stackoverflow.com/q/47533670/3443137
     */

    window.addEventListener('unload', function () {
      fn();
    }, true);
  }
  /**
   * TODO add fallback for safari-mobile
   * @link https://stackoverflow.com/a/26193516/3443137
   */

}

/* harmony default export */ __webpack_exports__["default"] = ({
  add: add
});

/***/ }),

/***/ "./node_modules/unload/dist/es/index.js":
/*!**********************************************!*\
  !*** ./node_modules/unload/dist/es/index.js ***!
  \**********************************************/
/*! exports provided: add, runAll, removeAll, getSize, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runAll", function() { return runAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAll", function() { return removeAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSize", function() { return getSize; });
/* harmony import */ var detect_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! detect-node */ "./node_modules/detect-node/browser.js");
/* harmony import */ var detect_node__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(detect_node__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _browser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./browser.js */ "./node_modules/unload/dist/es/browser.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node.js */ 1);
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_js__WEBPACK_IMPORTED_MODULE_2__);



var USE_METHOD = detect_node__WEBPACK_IMPORTED_MODULE_0___default.a ? _node_js__WEBPACK_IMPORTED_MODULE_2___default.a : _browser_js__WEBPACK_IMPORTED_MODULE_1__["default"];
var LISTENERS = new Set();
var startedListening = false;

function startListening() {
  if (startedListening) return;
  startedListening = true;
  USE_METHOD.add(runAll);
}

function add(fn) {
  startListening();
  if (typeof fn !== 'function') throw new Error('Listener is no function');
  LISTENERS.add(fn);
  var addReturn = {
    remove: function remove() {
      return LISTENERS["delete"](fn);
    },
    run: function run() {
      LISTENERS["delete"](fn);
      return fn();
    }
  };
  return addReturn;
}
function runAll() {
  var promises = [];
  LISTENERS.forEach(function (fn) {
    promises.push(fn());
    LISTENERS["delete"](fn);
  });
  return Promise.all(promises);
}
function removeAll() {
  LISTENERS.clear();
}
function getSize() {
  return LISTENERS.size;
}
/* harmony default export */ __webpack_exports__["default"] = ({
  add: add,
  runAll: runAll,
  removeAll: removeAll,
  getSize: getSize
});

/***/ }),

/***/ "./src/container/createContainerUI.js":
/*!********************************************!*\
  !*** ./src/container/createContainerUI.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var message_broadcaster__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! message-broadcaster */ "./src/message-broadcaster/index.js");
/* harmony import */ var _createPopup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createPopup */ "./src/container/createPopup.js");
/* harmony import */ var _popupStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./popupStore */ "./src/container/popupStore.js");
/* harmony import */ var _noopenerStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./noopenerStore */ "./src/container/noopenerStore.js");





/* harmony default export */ __webpack_exports__["default"] = (() => {
  let currentId = 0;

  const messageBroadcaster = Object(message_broadcaster__WEBPACK_IMPORTED_MODULE_0__["createMessageBroadcaster"])();

  window.addEventListener("load", async () => {
    for (const { id, layout, stockName } of Object(_popupStore__WEBPACK_IMPORTED_MODULE_2__["getPopupsFromStorage"])()) {
      // eslint-disable-next-line no-await-in-loop
      await Object(_createPopup__WEBPACK_IMPORTED_MODULE_1__["default"])(id, stockName, layout, Object(_noopenerStore__WEBPACK_IMPORTED_MODULE_3__["getIsNoopener"])());
      currentId = Number(id);
    }
  });

  const handleCreatePopup = stockName => {
    // Position the popup near the top of the current window with a generic height and width
    const initialLayout = {
      x: window.screenLeft,
      y: window.screenTop,
      width: 400,
      height: 400
    };
    // Newly created popup requested by user, so needs to be assigned an id
    currentId += 1;
    Object(_popupStore__WEBPACK_IMPORTED_MODULE_2__["addPopup"])(currentId, stockName);
    Object(_createPopup__WEBPACK_IMPORTED_MODULE_1__["default"])(currentId, stockName, initialLayout, Object(_noopenerStore__WEBPACK_IMPORTED_MODULE_3__["getIsNoopener"])());
  };

  const handleDismissPopups = () => {
    const message = Object(message_broadcaster__WEBPACK_IMPORTED_MODULE_0__["createDismissAllPopupsMessage"])();
    messageBroadcaster.postMessage(message);
  };

  document
    .getElementById("dismiss-all-popups")
    .addEventListener("click", () => {
      handleDismissPopups();
      // Pressing the button should remove the popups from the store
      Object(_popupStore__WEBPACK_IMPORTED_MODULE_2__["removeAllPopupsFromStorage"])();
    });

  // Closing the container page should dismiss the popups, but retain them in local storage
  window.addEventListener("beforeunload", handleDismissPopups);

  document.querySelectorAll(".open-popup-btn").forEach(el => {
    const stockName = el.getAttribute("data-stock");
    el.addEventListener("click", () => handleCreatePopup(stockName));
  });

  const checkboxEl = document.getElementById("noopener-checkbox");
  checkboxEl.checked = Object(_noopenerStore__WEBPACK_IMPORTED_MODULE_3__["getIsNoopener"])();
  checkboxEl.addEventListener("change", () => {
    Object(_noopenerStore__WEBPACK_IMPORTED_MODULE_3__["setIsNoopener"])(checkboxEl.checked);
  });

  Object(_popupStore__WEBPACK_IMPORTED_MODULE_2__["startListeningForLayoutChanges"])();
});


/***/ }),

/***/ "./src/container/createPopup.js":
/*!**************************************!*\
  !*** ./src/container/createPopup.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (async (id, stockName, layout, isNoopener) => {
  const windowFeatures = ["resizable"];

  if (isNoopener) {
    windowFeatures.push("noopener");
  }

  windowFeatures.push(
    `left=${layout.x}`,
    `top=${layout.y}`,
    `width=${layout.width}`,
    `height=${layout.height}`
  );

  window.open(
    `./popup-host.html?id=${id}&layout=${layout.x},${layout.y},${layout.width},${layout.height}&stockName=${stockName}`,
    id,
    windowFeatures.join(",")
  );
});


/***/ }),

/***/ "./src/container/index.js":
/*!********************************!*\
  !*** ./src/container/index.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _createContainerUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createContainerUI */ "./src/container/createContainerUI.js");


Object(_createContainerUI__WEBPACK_IMPORTED_MODULE_0__["default"])();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}


/***/ }),

/***/ "./src/container/noopenerStore.js":
/*!****************************************!*\
  !*** ./src/container/noopenerStore.js ***!
  \****************************************/
/*! exports provided: getIsNoopener, setIsNoopener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIsNoopener", function() { return getIsNoopener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setIsNoopener", function() { return setIsNoopener; });
const NOOPENER_STORAGE_KEY = "F3DC/isNoopener";

const getIsNoopener = () =>
  localStorage.getItem(NOOPENER_STORAGE_KEY) === "true";

const setIsNoopener = value =>
  localStorage.setItem(NOOPENER_STORAGE_KEY, value);


/***/ }),

/***/ "./src/container/popupStore.js":
/*!*************************************!*\
  !*** ./src/container/popupStore.js ***!
  \*************************************/
/*! exports provided: getPopupsFromStorage, removeAllPopupsFromStorage, addPopup, startListeningForLayoutChanges */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPopupsFromStorage", function() { return getPopupsFromStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAllPopupsFromStorage", function() { return removeAllPopupsFromStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addPopup", function() { return addPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startListeningForLayoutChanges", function() { return startListeningForLayoutChanges; });
/* harmony import */ var message_broadcaster__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! message-broadcaster */ "./src/message-broadcaster/index.js");


const LAYOUT_STORAGE_KEY = "F3DC/popups";

const getPopupsFromStorage = () =>
  JSON.parse(localStorage.getItem(LAYOUT_STORAGE_KEY)) || [];

// eslint-disable-next-line max-len
const removeAllPopupsFromStorage = () =>
  localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify([]));

const messageBroadcaster = Object(message_broadcaster__WEBPACK_IMPORTED_MODULE_0__["createMessageBroadcaster"])();

const addPopup = (id, stockName) => {
  const popups = getPopupsFromStorage();
  popups.push({ id, stockName });
  localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(popups));
};

const startListeningForLayoutChanges = () => {
  messageBroadcaster.onmessage = event => {
    if (event.type === message_broadcaster__WEBPACK_IMPORTED_MODULE_0__["MESSAGE_TYPES"].POPUP_LAYOUT_CHANGE) {
      const popup = event.payload;
      const popups = getPopupsFromStorage();
      const currentIndex = popups.findIndex(
        ({ id }) => id === Number(popup.id)
      );

      // Need to replace existing item in storage
      popups[currentIndex] = {
        ...popups[currentIndex],
        layout: popup.layout
      };

      localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(popups));
    }

    if (event.type === message_broadcaster__WEBPACK_IMPORTED_MODULE_0__["MESSAGE_TYPES"].POPUP_DISMISSED) {
      const { id: popupId } = event.payload;
      const popups = getPopupsFromStorage();
      const currentIndex = popups.findIndex(({ id }) => id === Number(popupId));

      if (currentIndex === -1) {
        return;
      }

      popups.splice(currentIndex, 1);

      localStorage.setItem(LAYOUT_STORAGE_KEY, JSON.stringify(popups));
    }
  };
};


/***/ }),

/***/ "./src/message-broadcaster/index.js":
/*!******************************************!*\
  !*** ./src/message-broadcaster/index.js ***!
  \******************************************/
/*! exports provided: MESSAGE_TYPES, createDismissAllPopupsMessage, createPopupLayoutChangeMessage, createPopupDismissedMessage, createCrosshairPositionChangeMessage, createMessageBroadcaster */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MESSAGE_TYPES", function() { return MESSAGE_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDismissAllPopupsMessage", function() { return createDismissAllPopupsMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPopupLayoutChangeMessage", function() { return createPopupLayoutChangeMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPopupDismissedMessage", function() { return createPopupDismissedMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCrosshairPositionChangeMessage", function() { return createCrosshairPositionChangeMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMessageBroadcaster", function() { return createMessageBroadcaster; });
/* harmony import */ var broadcast_channel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! broadcast-channel */ "./node_modules/broadcast-channel/dist/es/index.js");


const BROADCAST_CHANNEL_NAME = "F3DC";

const MESSAGE_TYPES = {
  POPUP_DISMISS_ALL: `${BROADCAST_CHANNEL_NAME}/POPUP_DISMISS_ALL`,
  POPUP_LAYOUT_CHANGE: `${BROADCAST_CHANNEL_NAME}/POPUP_LAYOUT_CHANGE`,
  POPUP_DISMISSED: `${BROADCAST_CHANNEL_NAME}/POPUP_DISMISSED`,
  CROSSHAIR_POSITION_CHANGE: `${BROADCAST_CHANNEL_NAME}/CROSSHAIR_POSITION_CHANGE`
};

const createDismissAllPopupsMessage = () => ({
  type: MESSAGE_TYPES.POPUP_DISMISS_ALL
});

const createPopupLayoutChangeMessage = (id, layout) => ({
  type: MESSAGE_TYPES.POPUP_LAYOUT_CHANGE,
  payload: {
    id,
    layout
  }
});

const createPopupDismissedMessage = id => ({
  type: MESSAGE_TYPES.POPUP_DISMISSED,
  payload: {
    id
  }
});

const createCrosshairPositionChangeMessage = position => ({
  type: MESSAGE_TYPES.CROSSHAIR_POSITION_CHANGE,
  payload: {
    position
  }
});

const createMessageBroadcaster = () =>
  new broadcast_channel__WEBPACK_IMPORTED_MODULE_0__["BroadcastChannel"](BROADCAST_CHANNEL_NAME, { webWorkerSupport: false });


/***/ }),

/***/ 0:
/*!*******************************************!*\
  !*** ../../src/methods/node.js (ignored) ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/*!***************************!*\
  !*** ./node.js (ignored) ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=container.js.map