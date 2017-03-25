/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

eval("module.exports = React;\n\n//////////////////\n// WEBPACK FOOTER\n// external \"React\"\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22React%22?");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"e\", function() { return INIT_PLE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"f\", function() { return UPDATE_BODY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return SIDE_VISIBLE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"b\", function() { return ADD_FILES; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"c\", function() { return REMOVE_FILES; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"d\", function() { return CHANGE_ACTIVE_FILE; });\nvar INIT_PLE = 'INIT_PLE';\nvar UPDATE_BODY = 'UPDATE_BODY';\nvar SIDE_VISIBLE = 'SIDE_VISIBLE';\nvar ADD_FILES = 'ADD_FILES';\nvar REMOVE_FILES = 'REMOVE_FILES';\nvar CHANGE_ACTIVE_FILE = 'CHANGE_ACTIVE_FILE';\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/actions/types.js\n// module id = 1\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/actions/types.js?");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

eval("module.exports = ReactRedux;\n\n//////////////////\n// WEBPACK FOOTER\n// external \"ReactRedux\"\n// module id = 2\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22ReactRedux%22?");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

eval("module.exports = Redux;\n\n//////////////////\n// WEBPACK FOOTER\n// external \"Redux\"\n// module id = 3\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22Redux%22?");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types__ = __webpack_require__(1);\n/* harmony export (immutable) */ __webpack_exports__[\"b\"] = visible;\n/* unused harmony export addFiles */\n/* unused harmony export removeFiles */\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = changeActiveFile;\n\n\nfunction visible(sw) {\n\treturn {\n\t\ttype: __WEBPACK_IMPORTED_MODULE_0__types__[\"a\" /* SIDE_VISIBLE */],\n\t\tvalue: sw\n\t};\n}\n\nfunction addFiles(files) {\n\treturn {\n\t\ttype: __WEBPACK_IMPORTED_MODULE_0__types__[\"b\" /* ADD_FILES */],\n\t\tfiles: files\n\t};\n}\n\nfunction removeFiles(idx) {\n\treturn {\n\t\ttype: __WEBPACK_IMPORTED_MODULE_0__types__[\"c\" /* REMOVE_FILES */],\n\t\tidx: idx\n\t};\n}\n\nfunction changeActiveFile(n, key, first) {\n\treturn {\n\t\ttype: __WEBPACK_IMPORTED_MODULE_0__types__[\"d\" /* CHANGE_ACTIVE_FILE */],\n\t\tnum: n,\n\t\tkeyName: key,\n\t\tfirstNum: first\n\t};\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/actions/side.js\n// module id = 4\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/actions/side.js?");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* unused harmony export getRandomRange */\n/* unused harmony export isTouchDevice */\n/* unused harmony export makeProps */\n/**\n * Random item in range\n *\n * @param {int} min\n * @param {int} max\n * @returns {number}\n */\nfunction getRandomRange(min, max) {\n  max += 1;\n  return Math.floor(Math.random() * (max - min) + min);\n}\n\n/**\n * is touch device\n *\n * @returns {boolean}\n */\nfunction isTouchDevice() {\n  return 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;\n}\n\n/**\n * Make props\n *\n * @param {Object} props\n * @param {Object} addProps\n */\nfunction makeProps(props, addProps) {\n  var { root, dispatch } = props;\n  return Object.assign({}, {\n    root,\n    dispatch\n  }, addProps);\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/lib/Util.js\n// module id = 5\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/lib/Util.js?");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Layout__ = __webpack_require__(14);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Gridster__ = __webpack_require__(13);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Side__ = __webpack_require__(15);\n\n\n\n\nfunction API(root) {\n\n\tthis.layout = new __WEBPACK_IMPORTED_MODULE_0__Layout__[\"a\" /* default */](root);\n\tthis.gridster = new __WEBPACK_IMPORTED_MODULE_1__Gridster__[\"a\" /* default */](root);\n\tthis.side = new __WEBPACK_IMPORTED_MODULE_2__Side__[\"a\" /* default */](root);\n}\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (API);\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/API/index.js\n// module id = 6\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/API/index.js?");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(2);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_core__ = __webpack_require__(24);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Body__ = __webpack_require__(17);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Side__ = __webpack_require__(22);\n\n\n\n\n\n\n\n\nvar Container = class Container extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {\n\n\tcomponentDidMount() {\n\t\tvar { PLE, dispatch } = this.props;\n\t\tdispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__actions_core__[\"a\" /* initPLE */])(PLE));\n\t}\n\n\t/**\n  * Visible side panel\n  */\n\tvisibleSide() {\n\t\tvar { tree, ple } = this.props;\n\n\t\tif (!ple) return;\n\n\t\tif (tree.side.layout.visible) {\n\t\t\tple.el.classList.add('side-active');\n\t\t} else {\n\t\t\tple.el.classList.remove('side-active');\n\t\t}\n\t}\n\n\trender() {\n\t\tvar { ple } = this.props;\n\n\t\t// check PLE object\n\t\tif (!ple) return null;\n\n\t\t// set visible side\n\t\tthis.visibleSide();\n\n\t\treturn __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t'div',\n\t\t\t{ className: 'ple-wrap' },\n\t\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__Side__[\"a\" /* default */], null)\n\t\t);\n\t}\n\n};\n\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__[\"connect\"])(state => {\n\treturn Object.assign({}, state, {});\n})(Container));\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/Container/index.js\n// module id = 7\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/Container/index.js?");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(28);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);\n\n\nvar $window = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window);\nvar EVENT_NAME = 'PLE';\n\n/* harmony default export */ __webpack_exports__[\"a\"] = ({\n\n\tnames: {\n\t\t17: 'ctrl',\n\t\t91: 'cmd',\n\t\t93: 'cmd',\n\t\t16: 'shift'\n\t},\n\n\tcode: null,\n\tkeyName: null,\n\n\tapply(code) {\n\t\tthis.code = code;\n\t\tthis.keyName = this.names[this.code] || null;\n\t},\n\n\tkeyDown(e) {\n\t\t// apply keyCode\n\t\tthis.apply(e.keyCode);\n\n\t\t// set events\n\t\t$window.on(`keyup.${EVENT_NAME}`, this.keyUp.bind(this));\n\t\t$window.off(`keydown.${EVENT_NAME}`);\n\t},\n\n\tkeyUp(e) {\n\t\tif (this.code !== e.keyCode) return;\n\n\t\t// apply keyCode\n\t\tthis.apply(null);\n\n\t\t// set events\n\t\t$window.on(`keydown.${EVENT_NAME}`, this.keyDown.bind(this));\n\t\t$window.off(`keyup.${EVENT_NAME}`);\n\t},\n\n\tinit() {\n\t\t$window.on(`keydown.${EVENT_NAME}`, this.keyDown.bind(this));\n\t}\n\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/lib/Keyboard.js\n// module id = 8\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/lib/Keyboard.js?");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/**\n * deep-assign\n *\n * https://github.com/sindresorhus/deep-assign/blob/master/index.js\n */\n\nfunction isObj(x) {\n\tvar type = typeof x;\n\treturn x !== null && (type === 'object' || type === 'function');\n}\n\nvar hasOwnProperty = Object.prototype.hasOwnProperty;\nvar propIsEnumerable = Object.prototype.propertyIsEnumerable;\n\nfunction toObject(val) {\n\tif (val === null || val === undefined) {\n\t\tthrow new TypeError('Cannot convert undefined or null to object');\n\t}\n\n\treturn Object(val);\n}\n\nfunction assignKey(to, from, key) {\n\tvar val = from[key];\n\n\tif (val === undefined || val === null) {\n\t\treturn;\n\t}\n\n\tif (hasOwnProperty.call(to, key)) {\n\t\tif (to[key] === undefined || to[key] === null) {\n\t\t\tthrow new TypeError('Cannot convert undefined or null to object (' + key + ')');\n\t\t}\n\t}\n\n\tif (!hasOwnProperty.call(to, key) || !isObj(val)) {\n\t\tto[key] = val;\n\t} else {\n\t\tto[key] = assign(Object(to[key]), from[key]);\n\t}\n}\n\nfunction assign(to, from) {\n\tif (to === from) {\n\t\treturn to;\n\t}\n\n\tfrom = Object(from);\n\n\tfor (var key in from) {\n\t\tif (hasOwnProperty.call(from, key)) {\n\t\t\tassignKey(to, from, key);\n\t\t}\n\t}\n\n\tif (Object.getOwnPropertySymbols) {\n\t\tvar symbols = Object.getOwnPropertySymbols(from);\n\n\t\tfor (var i = 0; i < symbols.length; i++) {\n\t\t\tif (propIsEnumerable.call(from, symbols[i])) {\n\t\t\t\tassignKey(to, from, symbols[i]);\n\t\t\t}\n\t\t}\n\t}\n\n\treturn to;\n}\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (function (target) {\n\ttarget = toObject(target);\n\n\tfor (var s = 1; s < arguments.length; s++) {\n\t\tassign(target, arguments[s]);\n\t}\n\n\treturn target;\n});;\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/lib/deep-assign.js\n// module id = 9\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/lib/deep-assign.js?");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony default export */ __webpack_exports__[\"a\"] = ({\n\tsideActive: true,\n\tbody: {\n\t\tsettings: {\n\t\t\twidth: 100,\n\t\t\theight: 100,\n\t\t\tmaxColumn: 5,\n\t\t\tmaxScale: 2,\n\t\t\touterMargin: 10,\n\t\t\tinnerMargin: 10\n\t\t},\n\t\tblockColor: '#ff0000'\n\t},\n\tside: {\n\t\tuploadScript: '',\n\t\tremoveScript: '',\n\t\tvisible: true,\n\t\titems: []\n\t}\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/lib/defaultPreference.js\n// module id = 10\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/lib/defaultPreference.js?");

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(3);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ple__ = __webpack_require__(26);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__body__ = __webpack_require__(25);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__side__ = __webpack_require__(27);\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__[\"combineReducers\"])({\n\ttree: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__[\"combineReducers\"])({\n\t\tside: __WEBPACK_IMPORTED_MODULE_3__side__[\"a\" /* default */],\n\t\tbody: __WEBPACK_IMPORTED_MODULE_2__body__[\"a\" /* default */]\n\t}),\n\tple: __WEBPACK_IMPORTED_MODULE_1__ple__[\"a\" /* default */]\n}));\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/reducers/index.js\n// module id = 11\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/reducers/index.js?");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

eval("module.exports = ReactDOM;\n\n//////////////////\n// WEBPACK FOOTER\n// external \"ReactDOM\"\n// module id = 12\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22ReactDOM%22?");

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (function () {});\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/API/Gridster.js\n// module id = 13\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/API/Gridster.js?");

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_side__ = __webpack_require__(4);\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = Layout;\n\n\nfunction Layout(root) {\n\t/**\n  * Toggle side\n  *\n  * @param {Boolean} sw\n  */\n\tthis.toggleSide = sw => {\n\t\tvar { getState, dispatch } = root.store;\n\n\t\tif (!getState() || !getState().tree) {\n\t\t\talert('error');\n\t\t\treturn;\n\t\t}\n\n\t\tvar currentSw = getState().tree.side.layout.visible;\n\t\tvar targetSw = typeof sw === 'undefined' ? !currentSw : sw;\n\n\t\tdispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__actions_side__[\"b\" /* visible */])(targetSw));\n\t};\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/API/Layout.js\n// module id = 14\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/API/Layout.js?");

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_side__ = __webpack_require__(4);\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = Side;\n\n\nfunction Side(root) {\n\n\t// set dispatch\n\tvar dispatch = root.store.dispatch;\n\n\t/**\n  * Add items\n  *\n  * @param {Array} items\n  */\n\tthis.addItems = items => {\n\t\tconsole.log(items);\n\t};\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/API/Side.js\n// module id = 15\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/API/Side.js?");

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(12);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux__ = __webpack_require__(3);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux__ = __webpack_require__(2);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_redux__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__API__ = __webpack_require__(6);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lib_deep_assign__ = __webpack_require__(9);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_defaultPreference__ = __webpack_require__(10);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_Util__ = __webpack_require__(5);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lib_Keyboard__ = __webpack_require__(8);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__reducers__ = __webpack_require__(11);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Container__ = __webpack_require__(7);\n\n\n\n\n\n\n\n\n\n\n\n\n\n/**\n * Photo layout editor\n *\n * @param {Object} el\n * @param {Object} options\n */\nwindow.PLE = function (el, options) {\n\t// set preference\n\tthis.preference = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__lib_deep_assign__[\"a\" /* default */])(__WEBPACK_IMPORTED_MODULE_6__lib_defaultPreference__[\"a\" /* default */], options);\n\n\t// set elements\n\tthis.el = el;\n\n\t// set store\n\tthis.store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_redux__[\"createStore\"])(__WEBPACK_IMPORTED_MODULE_9__reducers__[\"a\" /* default */]);\n\n\t// init keyboard event\n\tthis.keyboard = __WEBPACK_IMPORTED_MODULE_8__lib_Keyboard__[\"a\" /* default */];\n\tthis.keyboard.init();\n\n\t// check touch device\n\tif (__WEBPACK_IMPORTED_MODULE_7__lib_Util__[\"default\"].isTouchDevice()) {\n\t\tdocument.querySelector('html').classList.add('ple-touch');\n\t}\n\n\t// set API\n\tthis.api = new __WEBPACK_IMPORTED_MODULE_4__API__[\"a\" /* default */](this);\n\n\t__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_dom__[\"render\"])(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t__WEBPACK_IMPORTED_MODULE_3_react_redux__[\"Provider\"],\n\t\t{ store: this.store },\n\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__Container__[\"a\" /* default */], { PLE: this })\n\t), el);\n\n\t// TODO : init keyboard event\n\t// TODO : init Export\n\t// TODO : init API\n\t// TODO : play gridster\n\t// TODO : `this.store.body.dispatch(foo())` 형태로 외부 리듀스에 접근할 수 있다.\n\t// TODO : dispatch(foo()) 형식으로 action으로 호출\n};\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/App.js\n// module id = 16\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/App.js?");

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(2);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_body__ = __webpack_require__(23);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_Util__ = __webpack_require__(5);\n\n\n\n\n\n// import Toolbar from './Toolbar';\n// import Gridster from './Gridster';\n\n\nvar Body = class Body extends __WEBPACK_IMPORTED_MODULE_0_react__[\"Component\"] {\n\n\tconstructor(props) {\n\t\tsuper(props);\n\t}\n\n\tcomponentDidMount() {\n\t\tvar { root, dispatch } = this.props;\n\n\t\t// update initial settings\n\t\tdispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__actions_body__[\"a\" /* updateBody */])(root.preference.body));\n\t}\n\n\tcomponentWillUpdate() {}\n\n\tcomponentDidUpdate(props, state) {}\n\n\trender() {\n\t\tvar { root, dispatch, env } = this.props;\n\t\tvar params = __WEBPACK_IMPORTED_MODULE_3__lib_Util__[\"default\"].makeProps(this.props, { env });\n\n\t\treturn __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t'div',\n\t\t\t{ className: 'ple-container' },\n\t\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'ple-body' },\n\t\t\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'ple-container__wrap', ref: 'body' })\n\t\t\t)\n\t\t);\n\t}\n\n};\n\n\n/* unused harmony default export */ var _unused_webpack_default_export = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__[\"connect\"])(state => {\n\treturn Object.assign({}, state, {});\n})(Body));\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/Container/Body/index.js\n// module id = 17\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/Container/Body/index.js?");

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return Item; });\n\n\nvar Item = class Item extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {\n\n\trender() {\n\t\tvar { image, onClick, active } = this.props;\n\n\t\treturn __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t'li',\n\t\t\tnull,\n\t\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('button', {\n\t\t\t\ttype: 'button',\n\t\t\t\t'data-image': image,\n\t\t\t\tstyle: { backgroundImage: `url('${image}')` },\n\t\t\t\tclassName: active ? 'active' : '',\n\t\t\t\tonClick: onClick })\n\t\t);\n\t}\n};\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/Container/Side/Items/Item.js\n// module id = 18\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/Container/Side/Items/Item.js?");

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Item__ = __webpack_require__(18);\n/* unused harmony export default */\n\n\n\n\nvar SideItems = class SideItems extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {\n\n\tconstructor(props) {\n\t\tsuper(props);\n\t}\n\n\tcomponentDidMount() {\n\t\t//console.log(this.props);\n\t}\n\n\trender() {\n\n\t\tvar { files, select } = this.props;\n\t\tvar compItems = files.map((o, k) => {\n\t\t\treturn __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__Item__[\"a\" /* default */], {\n\t\t\t\tkey: o.id,\n\t\t\t\timage: o.image,\n\t\t\t\tactive: o.active,\n\t\t\t\tonClick: () => select(o.id) });\n\t\t});\n\n\t\treturn __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t'div',\n\t\t\t{ className: 'items' },\n\t\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'wrap' },\n\t\t\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t\t\t'ul',\n\t\t\t\t\tnull,\n\t\t\t\t\tcompItems\n\t\t\t\t)\n\t\t\t)\n\t\t);\n\t}\n\n};\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/Container/Side/Items/index.js\n// module id = 19\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/Container/Side/Items/index.js?");

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return SideNavigation; });\n\n\nvar SideNavigation = class SideNavigation extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {\n\n\tconstructor(props) {\n\t\tsuper(props);\n\n\t\tthis.state = {\n\t\t\ttimestamp: Date.now()\n\t\t};\n\t}\n\n\t/**\n  * Upload images\n  *\n  * @param {Event} e\n  */\n\tupload(e) {\n\t\tthis.props.upload(e.target.files);\n\n\t\tthis.setState({\n\t\t\ttimestamp: Date.now()\n\t\t});\n\t}\n\n\trender() {\n\n\t\tvar { remove, toggleSelect, attach } = this.props;\n\t\tvar { timestamp } = this.state;\n\n\t\treturn __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t\"nav\",\n\t\t\t{ className: \"navigation\" },\n\t\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t\t\"div\",\n\t\t\t\t{ className: \"wrap\" },\n\t\t\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t\t\t\"button\",\n\t\t\t\t\t{ type: \"button\", title: \"attach images\", onClick: attach },\n\t\t\t\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t\t\t\t\"i\",\n\t\t\t\t\t\t{ className: \"sp-ico ico-reply abs\" },\n\t\t\t\t\t\t\"Moving the image to grid block\"\n\t\t\t\t\t)\n\t\t\t\t),\n\t\t\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t\t\t\"button\",\n\t\t\t\t\t{ type: \"button\", title: \"toggle select\", onClick: toggleSelect },\n\t\t\t\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t\t\t\t\"i\",\n\t\t\t\t\t\t{ className: \"sp-ico ico-select abs\" },\n\t\t\t\t\t\t\"Toggle all select\"\n\t\t\t\t\t)\n\t\t\t\t),\n\t\t\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t\t\t\"span\",\n\t\t\t\t\t{ title: \"upload images\", key: timestamp },\n\t\t\t\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\"input\", { type: \"file\", ref: \"inputFile\", onChange: this.upload.bind(this), multiple: true }),\n\t\t\t\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t\t\t\t\"i\",\n\t\t\t\t\t\t{ className: \"sp-ico ico-upload abs\" },\n\t\t\t\t\t\t\"upload images\"\n\t\t\t\t\t)\n\t\t\t\t),\n\t\t\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t\t\t\"button\",\n\t\t\t\t\t{ type: \"button\", title: \"remove images\", onClick: remove },\n\t\t\t\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t\t\t\t\"i\",\n\t\t\t\t\t\t{ className: \"sp-ico ico-trash abs\" },\n\t\t\t\t\t\t\"remove images\"\n\t\t\t\t\t)\n\t\t\t\t)\n\t\t\t)\n\t\t);\n\t}\n\n};\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/Container/Side/Navigation/index.js\n// module id = 20\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/Container/Side/Navigation/index.js?");

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return ToggleButton; });\n\n\nvar ToggleButton = class ToggleButton extends __WEBPACK_IMPORTED_MODULE_0_react__[\"Component\"] {\n\n\trender() {\n\n\t\tvar { show, onClick } = this.props;\n\n\t\treturn __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t\"button\",\n\t\t\t{\n\t\t\t\ttype: \"button\",\n\t\t\t\tonClick: onClick,\n\t\t\t\tclassName: \"toggle\" },\n\t\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t\t\"span\",\n\t\t\t\tnull,\n\t\t\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t\t\t\"i\",\n\t\t\t\t\t{ className: 'sp-ico abs' + (show ? ' ico-arrow-right' : ' ico-arrow-left') },\n\t\t\t\t\t\"Toggle sidebar\"\n\t\t\t\t)\n\t\t\t)\n\t\t);\n\t}\n\n};\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/Container/Side/ToggleButton/index.js\n// module id = 21\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/Container/Side/ToggleButton/index.js?");

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(2);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(29);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions_side__ = __webpack_require__(4);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ToggleButton__ = __webpack_require__(21);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Navigation__ = __webpack_require__(20);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Items__ = __webpack_require__(19);\n\n\n\n\n\n\n\n\n\n\nvar firstSelectIdx = null;\n\nvar Side = class Side extends __WEBPACK_IMPORTED_MODULE_0_react___default.a.Component {\n\n\tconstructor(props) {\n\t\tsuper(props);\n\t}\n\n\tcomponentDidMount() {\n\t\tvar { ple } = this.props;\n\t\tSide.getItems(ple.preference.side.items).then();\n\t}\n\n\t/**\n  * Get items\n  *\n  * @param {Array|String} items\n  */\n\tstatic async getItems(items) {\n\t\tif (typeof items === 'string') {\n\t\t\ttry {\n\t\t\t\tvar res = await __WEBPACK_IMPORTED_MODULE_2_axios___default.a.get(items);\n\t\t\t\tple.api.side.addItems(res.data);\n\t\t\t} catch (e) {}\n\t\t} else if (items instanceof Array) {\n\t\t\tple.api.side.addItems(items);\n\t\t}\n\t}\n\n\t/**\n  * On select item\n  *\n  * @param {Number} n\n  */\n\tonSelectItem(n) {\n\t\tvar { root, dispatch, files } = this.props;\n\t\tvar { keyName } = root.keyboard;\n\n\t\tif (keyName !== 'shift') {\n\t\t\tvar currentItem = null;\n\t\t\tfiles.forEach(o => {\n\t\t\t\tif (o.id === n) {\n\t\t\t\t\tcurrentItem = o;\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t});\n\t\t\tfirstSelectIdx = currentItem.active === true ? null : n;\n\t\t}\n\t\tdispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__actions_side__[\"a\" /* changeActiveFile */])(n, keyName, firstSelectIdx));\n\t}\n\n\t/**\n  * Toggle select all items\n  */\n\t_toggleSelect() {\n\t\tvar { files, dispatch } = this.props;\n\n\t\tvar active = false;\n\t\tfiles.forEach(o => {\n\t\t\tif (o.active) active = true;\n\t\t});\n\t\tif (active) {\n\t\t\tdispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__actions_side__[\"a\" /* changeActiveFile */])(null, 'none', null));\n\t\t} else {\n\t\t\tdispatch(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__actions_side__[\"a\" /* changeActiveFile */])(null, 'all', null));\n\t\t}\n\t}\n\n\trender() {\n\t\tvar { tree, ple } = this.props;\n\n\t\treturn __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t'aside',\n\t\t\t{ className: 'ple-side' },\n\t\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: `wrap ${tree.side.layout.visible ? 'show' : ''}` },\n\t\t\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__ToggleButton__[\"a\" /* default */], {\n\t\t\t\t\tshow: tree.side.layout.visible,\n\t\t\t\t\tonClick: () => ple.api.layout.toggleSide() }),\n\t\t\t\t__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__Navigation__[\"a\" /* default */], {\n\t\t\t\t\tattach: () => {\n\t\t\t\t\t\tconsole.log('attach files');\n\t\t\t\t\t},\n\t\t\t\t\ttoggleSelect: this._toggleSelect.bind(this),\n\t\t\t\t\tupload: () => {\n\t\t\t\t\t\tconsole.log('on upload');\n\t\t\t\t\t},\n\t\t\t\t\tremove: () => {\n\t\t\t\t\t\tconsole.log('on remove');\n\t\t\t\t\t} })\n\t\t\t)\n\t\t);\n\t}\n};\n\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_react_redux__[\"connect\"])(state => {\n\treturn Object.assign({}, state, {});\n})(Side));\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/Container/Side/index.js\n// module id = 22\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/Container/Side/index.js?");

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types__ = __webpack_require__(1);\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = updateBody;\n\n\nfunction updateBody(values) {\n\treturn {\n\t\ttype: __WEBPACK_IMPORTED_MODULE_0__types__[\"f\" /* UPDATE_BODY */],\n\t\tvalues: values\n\t};\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/actions/body.js\n// module id = 23\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/actions/body.js?");

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__types__ = __webpack_require__(1);\n/* harmony export (immutable) */ __webpack_exports__[\"a\"] = initPLE;\n\n\nfunction initPLE(ple) {\n\treturn {\n\t\ttype: __WEBPACK_IMPORTED_MODULE_0__types__[\"e\" /* INIT_PLE */],\n\t\tvalue: ple\n\t};\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/actions/core.js\n// module id = 24\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/actions/core.js?");

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(3);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_types__ = __webpack_require__(1);\n\n\n\nvar initialEnv = {\n\tsettings: {\n\t\twidth: 100,\n\t\theight: 100,\n\t\tmaxColumn: 5,\n\t\tmaxScale: 2,\n\t\touterMargin: 10,\n\t\tinnerMargin: 10\n\t},\n\tblockColor: '#ff0000'\n};\n\nfunction env(state = initialEnv, action) {\n\tswitch (action.type) {\n\t\tcase __WEBPACK_IMPORTED_MODULE_1__actions_types__[\"f\" /* UPDATE_BODY */]:\n\t\t\treturn Object.assign({}, state, action.values);\n\t\t\tbreak;\n\n\t\tdefault:\n\t\t\treturn state;\n\t}\n}\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__[\"combineReducers\"])({\n\tenv\n}));\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/reducers/body.js\n// module id = 25\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/reducers/body.js?");

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_types__ = __webpack_require__(1);\n\n\nfunction PLE(state = null, action) {\n\tswitch (action.type) {\n\t\tcase __WEBPACK_IMPORTED_MODULE_0__actions_types__[\"e\" /* INIT_PLE */]:\n\t\t\treturn action.value;\n\t\t\tbreak;\n\n\t\tdefault:\n\t\t\treturn state;\n\t}\n}\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (PLE);\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/reducers/ple.js\n// module id = 26\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/reducers/ple.js?");

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(3);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_types__ = __webpack_require__(1);\n\n\n\nvar initialLayout = {\n\tvisible: false\n};\nvar nextFileId = 0;\n\n/**\n * Change active\n *\n * @param {Object} item\n * @param {Number} n\n * @param {String} key press key name and select type\n * @param {Number} first\n */\nfunction changeActive(item, n, key, first) {\n\t// TODO : 키보드 누른 상태에서 선택하면 선택되는 아이템에 대해서 결정하기\n\tswitch (key) {\n\t\tcase 'all':\n\t\t\treturn Object.assign({}, item, { active: true });\n\t\tcase 'none':\n\t\t\treturn Object.assign({}, item, { active: false });\n\t\tcase 'cmd':\n\t\tcase 'ctrl':\n\t\t\tif (item.id === n) {\n\t\t\t\treturn Object.assign({}, item, { active: !item.active });\n\t\t\t} else {\n\t\t\t\treturn item;\n\t\t\t}\n\t\tcase 'shift':\n\t\t\tfirst = first || 0;\n\t\t\tif (first < n) {\n\t\t\t\tif (item.id >= first && item.id <= n) {\n\t\t\t\t\treturn Object.assign({}, item, { active: true });\n\t\t\t\t} else {\n\t\t\t\t\treturn Object.assign({}, item, { active: false });\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tif (item.id <= first && item.id >= n) {\n\t\t\t\t\treturn Object.assign({}, item, { active: true });\n\t\t\t\t} else {\n\t\t\t\t\treturn Object.assign({}, item, { active: false });\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn item;\n\t}\n\n\tif (item.id === n) {\n\t\treturn Object.assign({}, item, { active: !item.active });\n\t} else {\n\t\treturn Object.assign({}, item, { active: false });\n\t}\n}\n\nfunction layout(state = initialLayout, action) {\n\tswitch (action.type) {\n\t\tcase __WEBPACK_IMPORTED_MODULE_1__actions_types__[\"a\" /* SIDE_VISIBLE */]:\n\t\t\treturn Object.assign({}, state, {\n\t\t\t\tvisible: action.value\n\t\t\t});\n\t\t\tbreak;\n\t\tcase __WEBPACK_IMPORTED_MODULE_1__actions_types__[\"e\" /* INIT_PLE */]:\n\t\t\treturn Object.assign({}, state, {\n\t\t\t\tvisible: action.value.preference.side.visible\n\t\t\t});\n\t\t\tbreak;\n\t\tdefault:\n\t\t\treturn state;\n\t}\n}\n\nfunction files(state = [], action) {\n\tswitch (action.type) {\n\t\tcase __WEBPACK_IMPORTED_MODULE_1__actions_types__[\"b\" /* ADD_FILES */]:\n\t\t\treturn [...state, ...action.files.map(o => {\n\t\t\t\treturn {\n\t\t\t\t\tid: nextFileId++,\n\t\t\t\t\timage: o,\n\t\t\t\t\tactive: false\n\t\t\t\t};\n\t\t\t})];\n\n\t\tcase __WEBPACK_IMPORTED_MODULE_1__actions_types__[\"c\" /* REMOVE_FILES */]:\n\t\t\treturn state;\n\n\t\tcase __WEBPACK_IMPORTED_MODULE_1__actions_types__[\"d\" /* CHANGE_ACTIVE_FILE */]:\n\t\t\treturn state.map(s => changeActive(s, action.num, action.keyName, action.firstNum));\n\n\t\tdefault:\n\t\t\treturn state;\n\t}\n}\n\nvar ple = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__[\"combineReducers\"])({\n\tlayout,\n\tfiles\n});\n\n/* harmony default export */ __webpack_exports__[\"a\"] = (ple);\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/js/reducers/side.js\n// module id = 27\n// module chunks = 0\n\n//# sourceURL=webpack:///./src/js/reducers/side.js?");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

eval("module.exports = $;\n\n//////////////////\n// WEBPACK FOOTER\n// external \"$\"\n// module id = 28\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22$%22?");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

eval("module.exports = axios;\n\n//////////////////\n// WEBPACK FOOTER\n// external \"axios\"\n// module id = 29\n// module chunks = 0\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ })
/******/ ]);