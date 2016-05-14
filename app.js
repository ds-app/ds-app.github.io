/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	module.exports = __webpack_require__(4);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	module.exports = angular.module("DongsuApp", ['templates-html', 'ngTouch', 'rx']).config( /* @ngInject */["$compileProvider", "$httpProvider", function ($compileProvider, $httpProvider) {
	    $compileProvider.debugInfoEnabled(false);
	    $httpProvider.useApplyAsync(true);
	}]);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	MainCtrl.$inject = ["Time"];
	__webpack_require__(1).directive("dsMain", MainDirective);

	/* @ngInject */
	function MainCtrl(Time) {}

	/* @ngInject */
	function MainDirective() {
	    return {
	        restrict: "E",
	        templateUrl: "views/main.tpl.html",
	        controller: MainCtrl
	    };
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	WorkBtnCtrl.$inject = ["Time"];
	__webpack_require__(1).directive("dsWorkBtn", WorkBtnDirective);

	/* @ngInject */
	function WorkBtnCtrl(Time) {}

	/* @ngInject */
	function WorkBtnDirective() {
	    return {
	        restrict: "E",
	        templateUrl: "views/workBtn.tpl.html",
	        controller: WorkBtnCtrl
	    };
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1).service("Time", TimeService);

	/* @ngInject */
	function TimeService() {

	    var svc = this;
	}

/***/ }
/******/ ]);