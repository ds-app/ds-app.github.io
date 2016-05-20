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
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	module.exports = __webpack_require__(11);


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

	__webpack_require__(1).filter("time", TimeFilter);

	/* @ngInject */
	function TimeFilter() {
	    return function (value) {
	        return moment(0).utc().add(value, 'm').format('HH:mm');
	    };
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1).service("Time", TimeService);

	var WORK_TYPE = {
	    "HOLIDAY": "0h",
	    "HALF": "4h",
	    "FULL": "8h"
	};

	/* @ngInject */
	function TimeService() {

	    var svc = this,
	        startMinutes = 5 * 60;

	    svc.getWorkDate = getWorkDate;
	    svc.getWorkingTime = getWorkingTime;

	    /////////////////////

	    function getWorkDate(date) {
	        var m = moment(date);
	        return m.utcOffset(m.utcOffset() - startMinutes).format('YYYY-MM-DD');
	    }

	    function digestTime(time, type) {

	        if (type == WORK_TYPE.FULL) {
	            if (time < 0) {
	                return 0;
	            } else if (time < 240) {
	                return time;
	            } else if (time < 270) {
	                return 240;
	            } else if (time < 480) {
	                return time - 30;
	            } else {
	                return time - 60;
	            }
	        } else {
	            return time;
	        }
	    }

	    function workingTime(digested, type) {
	        if (type == WORK_TYPE.FULL || type == WORK_TYPE.HALF) {
	            return Math.min(digested, 720);
	        } else if (type == WORK_TYPE.HOLIDAY) {
	            return 0;
	        }
	    }

	    function effectTime(digested, excepts) {
	        return digested - _.sumBy(excepts, function (except) {
	            return except.time;
	        });
	    }

	    function overtime(effective) {

	        var over = effective - 480;

	        if (over < 120) {
	            return 0;
	        } else if (over < 240) {
	            return 2;
	        } else if (over < 360) {
	            return 4;
	        } else {
	            return 6;
	        }
	    }

	    function holidayTime(effective) {

	        if (effective < 240) {
	            return 0;
	        } else if (effective < 360) {
	            return 4;
	        } else if (effective < 480) {
	            return 6;
	        } else {
	            return 8;
	        }
	    }

	    function getWorkingTime(work) {
	        var first = moment(work.first),
	            last = moment(work.last),
	            workDate = getWorkDate(first),
	            lastWorkDate = getWorkDate(last),
	            diff,
	            digested,
	            working,
	            effect,
	            extra;

	        if (workDate > lastWorkDate) {
	            return 0;
	        } else if (workDate < lastWorkDate) {
	            last = moment(workDate).endOf("date").add(startMinutes, "m");
	        }

	        // 총 시간
	        // 총 근무시간 (법정 휴무, 휴일근로 제외, MAX 12h)
	        // 총 실 근무시간 (법정 휴무, 제외시간) => 교통비, 휴일근로

	        diff = last.diff(first, 'minutes');
	        digested = digestTime(diff, work.type);
	        working = workingTime(digested, work.type);
	        effect = effectTime(digested, work.excepts);
	        extra = work.type == WORK_TYPE.HOLIDAY ? holidayTime(effect) : overtime(effect);

	        return {
	            date: workDate,
	            type: work.type,
	            total: diff,
	            working: working,
	            effective: effect,
	            extra: extra
	        };
	    }
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	WeekService.$inject = ["Time"];__webpack_require__(1).service("Week", WeekService);

	/* @ngInject */
	function WeekService(Time) {

	    var svc = this;

	    svc.week = week;

	    /////////////////

	    function week() {

	        var today = moment(Time.getWorkDate()),
	            offset = (today.day() + 6) % 7,
	            first = today.subtract(offset, 'd');

	        return first.format('YYYY-MM-DD');

	        // 금 5
	        // 월 1
	    }
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1).directive("dsBoard", BoardDirective);

	/* @ngInject */
	function BoardCtrl() {
	    var board = this;
	}

	/* @ngInject */
	function BoardDirective() {
	    return {
	        restrict: "E",
	        templateUrl: "views/board.tpl.html",
	        controller: BoardCtrl,
	        controllerAs: "board"
	    };
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	ExceptsCtrl.$inject = ["Sample"];__webpack_require__(1).directive("dsExcepts", ExceptsDirective);

	/* @ngInject */
	function ExceptsCtrl(Sample) {
	    var excepts = this;

	    excepts.data = Sample[0].excepts;
	}

	/* @ngInject */
	function ExceptsDirective() {
	    return {
	        restrict: "E",
	        templateUrl: "views/excepts.tpl.html",
	        controller: ExceptsCtrl,
	        controllerAs: "excepts"
	    };
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	MainCtrl.$inject = ["Time", "Sample"];__webpack_require__(1).directive("dsMain", MainDirective);

	/* @ngInject */
	function MainCtrl(Time, Sample) {
	    var main = this;

	    main.sample = Sample.map(Time.getWorkingTime);
	}

	/* @ngInject */
	function MainDirective() {
	    return {
	        restrict: "E",
	        templateUrl: "views/main.tpl.html",
	        controller: MainCtrl,
	        controllerAs: "main"
	    };
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1).value("Sample", [{
	    "workDate": "2016-05-11",
	    "first": "2016-05-10T21:00:31.000Z",
	    "last": "2016-05-11T18:00:31.000Z",
	    "excepts": [{ label: 0, time: 25 }, { label: 1, time: 73 }],
	    "type": "8h"
	}, {
	    "workDate": "2016-05-12",
	    "first": "2016-05-12T00:00:23.000Z",
	    "last": "2016-05-12T12:00:31.000Z",
	    "excepts": [{ label: 0, time: 25 }, { label: 1, time: 53 }],
	    "type": "8h"
	}]);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1).directive("dsSummaries", SummariesDirective);

	/* @ngInject */
	function SummariesCtrl() {
	    var summaries = this;
	}

	/* @ngInject */
	function SummariesDirective() {
	    return {
	        restrict: "E",
	        templateUrl: "views/summaries.tpl.html",
	        controller: SummariesCtrl,
	        controllerAs: "summaries"
	    };
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	WeekCtrl.$inject = ["Week"];__webpack_require__(1).directive("dsWeek", WeekDirective);

	/* @ngInject */
	function WeekCtrl(Week) {
	    var week = this;

	    console.log(Week.week());
	}

	/* @ngInject */
	function WeekDirective() {
	    return {
	        restrict: "E",
	        templateUrl: "views/week.tpl.html",
	        controller: WeekCtrl,
	        controllerAs: "week"
	    };
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	WorkBtnCtrl.$inject = ["Time"];__webpack_require__(1).directive("dsWorkBtn", WorkBtnDirective);

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

/***/ }
/******/ ]);