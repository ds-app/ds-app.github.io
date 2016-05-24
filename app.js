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
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	module.exports = __webpack_require__(19);


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

	TimeFilter.$inject = ["Util"];
	MinuteFilter.$inject = ["Util"];
	DateFilter.$inject = ["Util"];__webpack_require__(1).filter("time", TimeFilter).filter("minute", MinuteFilter).filter("date", DateFilter);

	/* @ngInject */
	function TimeFilter(Util) {
	    return function (value) {
	        return Util.time(value);
	    };
	}

	/* @ngInject */
	function MinuteFilter(Util) {
	    return function (value) {
	        return Util.minute(value);
	    };
	}

	/* @ngInject */
	function DateFilter(Util) {
	    return function (value) {
	        return Util.date(value);
	    };
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1).value("Sample", {
	    "2016-05-23": {
	        "first": "2016-05-22T21:00:31.000Z",
	        "last": "2016-05-23T17:38:31.000Z",
	        "excepts": [{ label: 0, time: 25 }, { label: 1, time: 73 }],
	        "type": "8h"
	    },
	    "2016-05-24": {
	        "first": "2016-05-24T00:00:23.000Z",
	        "last": "2016-05-24T12:22:31.000Z",
	        "excepts": [{ label: 0, time: 25 }, { label: 1, time: 53 }],
	        "type": "8h"
	    },
	    "2016-05-25": {
	        "first": "2016-05-25T01:00:23.000Z",
	        "last": "2016-05-25T07:22:31.000Z",
	        "excepts": [{ label: 0, time: 48 }, { label: 1, time: 23 }],
	        "type": "4h"
	    }
	}).value("Labels", {
	    "0": {
	        name: "기타"
	    },
	    "1": {
	        name: "헬스",
	        color: "#C05B4B"
	    }
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Storage.$inject = ["Week", "Time", "Sample"];__webpack_require__(1).service("Storage", Storage);

	/* @ngInject */
	function Storage(Week, Time, Sample) {

	    var storage = this,
	        WORK_TYPE = Time.WORK_TYPE,
	        works = _(Week.workWeek()).map(function (date) {
	        return _.extend({}, Sample[date] || newWork(date), {
	            workDate: date
	        });
	    }).map(function (work) {
	        return _.extend(work, Time.getWorkingTime(work));
	    }).value();

	    storage.load = load;
	    storage.update = update;

	    //////////////////////

	    function newWork(date) {
	        var day = moment(date).day();

	        if (day == 0 || day == 6) {
	            return {
	                "excepts": [],
	                "type": WORK_TYPE.DAY_OFF
	            };
	        } else {
	            return {
	                "excepts": [],
	                "type": WORK_TYPE.FULL
	            };
	        }
	    }

	    function load() {
	        return works;
	    }

	    function update(work) {
	        return _.extend(work, Time.getWorkingTime(work));
	    }
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1).service("Time", TimeService);

	var WORK_TYPE = {
	    "DAY_OFF": "NA",
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

	    svc.WORK_TYPE = WORK_TYPE;

	    /////////////////////

	    function getWorkDate(date) {
	        var m = moment(date);
	        return m.utcOffset(m.utcOffset() - startMinutes).format('YYYY-MM-DD');
	    }

	    function digestTime(time, type) {

	        if (type != WORK_TYPE.DAY_OFF) {
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
	        if (type == WORK_TYPE.DAY_OFF) {
	            return 0;
	        } else {
	            return Math.min(digested, 720);
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

	    function dayOffTime(effective) {

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

	        if (!work.first || !work.last) {
	            return {
	                total: 0,
	                working: 0,
	                effective: 0,
	                extra: 0
	            };
	        }

	        return calWorkingTime(work);
	    }

	    function calWorkingTime(work) {
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
	        extra = work.type == WORK_TYPE.DAY_OFF ? dayOffTime(effect) : overtime(effect);

	        return {
	            total: diff,
	            digested: digested,
	            working: working,
	            effective: effect,
	            extra: extra
	        };
	    }
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1).service("Util", Util);

	/* @ngInject */
	function Util() {
	    var util = this;

	    util.time = time;
	    util.minute = minute;
	    util.date = date;

	    /////////////////////////

	    function lzp(value) {
	        var str = "" + value;
	        return ("00" + str).substr(Math.min(str.length, 2));
	    }

	    function time(value) {
	        if (!value) {
	            return;
	        }
	        var hours, minutes;

	        hours = parseInt(value / 60);
	        minutes = value - hours * 60;

	        return lzp(hours) + ":" + lzp(minutes);
	    }

	    function minute(value, format) {
	        if (!value) {
	            return;
	        }
	        return moment(value).format(format || 'HH:mm');
	    }

	    function date(value, format) {
	        if (!value) {
	            return;
	        }
	        return moment(value).format(format || 'MM/DD');
	    }
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	WeekService.$inject = ["Time"];__webpack_require__(1).service("Week", WeekService);

	/* @ngInject */
	function WeekService(Time) {

	    var svc = this;

	    svc.workWeek = workWeek;

	    /////////////////

	    function workWeek(offset) {

	        offset = offset || 0;

	        var m = moment(Time.getWorkDate());

	        m.subtract((m.day() + 6) % 7, 'd');
	        m.add(offset * 7, 'd');

	        return _(7).range().map(function (day) {
	            return moment(m).add(day, 'd').format('YYYY-MM-DD');
	        }).reverse().value();
	    }
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	BoardCtrl.$inject = ["Time", "Storage"];__webpack_require__(1).directive("dsBoard", BoardDirective);

	/* @ngInject */
	function BoardCtrl(Time, Storage) {
	    var board = this,
	        week = Storage.load(),
	        WORK_TYPE = Time.WORK_TYPE;

	    board.today = pickToday();
	    board.getFullWorkingTime = getFullWorkingTime;
	    board.getTotalWorkedTime = getTotalWorkedTime;
	    board.getWorkedGauge = getWorkedGauge;
	    board.getRemainGauge = getRemainGauge;

	    /////////////////

	    function getFullWorkingTime() {
	        return _(week).map(function (work) {
	            return work.type;
	        }).map(function (type) {
	            switch (type) {
	                case WORK_TYPE.FULL:
	                    return 8 * 60;
	                case WORK_TYPE.HALF:
	                    return 4 * 60;
	                default:
	                    return 0;
	            }
	        }).sum();
	    }

	    function getTotalWorkedTime() {
	        return _(week).map(function (work) {
	            return work.working;
	        }).sum();
	    }

	    function getWorkedRate() {
	        return Math.floor(getTotalWorkedTime() * 100 / getFullWorkingTime());
	    }

	    function getRemainRate() {
	        return 100 - getWorkedRate();
	    }

	    function getWorkedGauge() {
	        return {
	            width: getWorkedRate() + '%'
	        };
	    }

	    function getRemainGauge() {
	        return {
	            width: getRemainRate() + '%'
	        };
	    }

	    function pickToday() {
	        return _.find(week, function (work) {
	            return work.workDate == Time.getWorkDate();
	        });
	    }
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	ChangeCtrl.$inject = ["$scope", "$element", "$attrs"];__webpack_require__(1).directive("dsChange", ChangeDirective);

	/* @ngInject */
	function ChangeCtrl($scope, $element, $attrs) {

	    var handler = $attrs["dsChange"];

	    $scope.$watch(function () {
	        return $element.val();
	    }, function (n, o) {
	        if (n !== o) {
	            $scope.$eval(handler, {
	                $value: n
	            });
	        }
	    });

	    $element.on("change", function () {
	        $scope.$apply();
	    });
	}

	/* @ngInject */
	function ChangeDirective() {
	    return {
	        restrict: "A",
	        controller: ChangeCtrl
	    };
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	TimeValueCtrl.$inject = ["$scope", "$element", "$attrs"];__webpack_require__(1).directive("dsTimeValue", TimeValueDirective);

	/* @ngInject */
	function TimeValueCtrl($scope, $element, $attrs) {
	    var tv = $attrs["dsTimeValue"];

	    $scope.$watch(tv, function (n, o) {
	        $element.val(n);
	    });
	}

	/* @ngInject */
	function TimeValueDirective() {
	    return {
	        restrict: "A",
	        controller: TimeValueCtrl
	    };
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	ExceptsCtrl.$inject = ["$scope", "Util", "Storage"];__webpack_require__(1).directive("dsExcepts", ExceptsDirective);

	/* @ngInject */
	function ExceptsCtrl($scope, Util, Storage) {
	    var excepts = this,
	        work = $scope.work.work;

	    excepts.first = Util.minute(work.first);
	    excepts.last = Util.minute(work.last);
	    excepts.getTotal = getTotal;
	    excepts.setFirst = setFirst;
	    excepts.setLast = setLast;

	    $scope.$watch('work.flip', close);

	    $scope.$watch('week.edit', close);

	    ////////////////////

	    function getTotal() {
	        return _.sumBy(work.excepts, 'time');
	    }

	    function setTime(value, time) {
	        var hm = moment(value, "HH:mm"),
	            m = moment(time);

	        m.hours(hm.hours());
	        m.minutes(hm.minutes());

	        return m.toISOString();
	    }

	    function setFirst(value) {
	        work.first = setTime(value, work.first);
	        return Storage.update(work);
	    }

	    function setLast(value) {
	        work.last = setTime(value, work.last);
	        return Storage.update(work);
	    }

	    function close(n) {
	        if (!n && excepts.modify) {
	            excepts.modify = false;
	        }
	    }
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	LabelCtrl.$inject = ["$scope", "$element", "$attrs", "Labels"];__webpack_require__(1).directive("dsLabel", LabelDirective);

	/* @ngInject */
	function LabelCtrl($scope, $element, $attrs, Labels) {

	    var ctrl = this,
	        label = Labels[$scope.$eval($attrs["label"])];

	    activate();

	    ///////////////

	    function activate() {
	        ctrl.name = label.name;
	        $element.css({
	            "background-color": label.color || "#90AFAA"
	        });
	    }
	}

	/* @ngInject */
	function LabelDirective() {
	    return {
	        template: '<span class="label">{{label.name}}</span>',
	        replace: true,
	        controller: LabelCtrl,
	        controllerAs: "label"
	    };
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	LapTimeCtrl.$inject = ["$scope", "$element"];__webpack_require__(1).directive("lapTime", LapTimeDirective);

	/* @ngInject */
	function LapTimeCtrl($scope, $element) {
	    var ctrl = this,
	        hours = $element.find(".lap_time_hours"),
	        minute = $element.find(".lap_time_minute"),
	        value = {
	        hours: undefined,
	        minute: undefined
	    };

	    ctrl.val = val;

	    hours.on('click', apply);
	    hours.on('keyup', apply);
	    minute.on('click', apply);
	    minute.on('keyup', apply);

	    $scope.$watch(function () {
	        return hours.val();
	    }, function (n, o) {
	        if (n == o) return;
	        value.hours = +n;
	        adjust();
	    });

	    $scope.$watch(function () {
	        return minute.val();
	    }, function (n, o) {
	        if (n == o) return;
	        value.minute = +n;
	        adjust();
	    });

	    //////////////////////

	    function apply() {
	        $scope.$apply();
	    }

	    function isN(n) {
	        return n == 0 || n > 0;
	    }

	    function lzp(value) {
	        var str = "" + value;
	        return ("00" + str).substr(Math.min(str.length, 2));
	    }

	    function adjust() {
	        if (value.hours == 24 && value.minute > 0) {
	            value.hours = 23;
	        }

	        hours.val(isN(value.hours) ? lzp(value.hours) : "");
	        minute.val(isN(value.minute) ? lzp(value.minute) : "");
	    }

	    function minmax(value, min, max) {
	        if (value < min) {
	            return min;
	        } else if (value > max) {
	            return max;
	        } else {
	            return value;
	        }
	    }

	    function val(newValue) {
	        if (isN(newValue)) {
	            value.hours = minmax(~ ~(newValue / 60), 0, 24);
	            value.minute = newValue % 60;
	            adjust();
	        } else if (newValue == "") {
	            value.hours = undefined;
	            value.minute = undefined;
	            adjust();
	        } else if (value.hours != undefined && value.minute != undefined) {
	            return value.hours * 60 + value.minute;
	        }
	    }
	}

	/* @ngInject */
	function LapTimeDirective() {
	    return {
	        restrict: "E",
	        templateUrl: "views/lapTime.tpl.html",
	        controller: LapTimeCtrl,
	        controllerAs: 'lap'
	    };
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	MainCtrl.$inject = ["Storage"];__webpack_require__(1).directive("dsMain", MainDirective);

	/* @ngInject */
	function MainCtrl(Storage) {

	    var main = this;

	    main.data = Storage.load();
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	ModeCtrl.$inject = ["Time", "Util"];__webpack_require__(1).directive("dsMode", ModeDirective);

	/* @ngInject */
	function ModeCtrl(Time, Util) {
	    var mode = this,
	        today = mode.work.workDate == Time.getWorkDate();

	    mode.isSelected = isSelected;
	    mode.getDate = getDate;
	    mode.isToday = isToday;
	    mode.select = select;

	    //////////////////////////////

	    function isSelected(type) {
	        return mode.work.type == type;
	    }

	    function getDate() {
	        if (today) {
	            return "Today";
	        }
	        return Util.date(mode.work.workDate);
	    }

	    function isToday() {
	        return today;
	    }

	    function select(type) {
	        return mode.work.type = type;
	    }
	}

	/* @ngInject */
	function ModeDirective() {
	    return {
	        restrict: "A",
	        templateUrl: "views/mode.tpl.html",
	        scope: {
	            work: "=dsMode"
	        },
	        replace: true,
	        controller: ModeCtrl,
	        controllerAs: "mode",
	        bindToController: true
	    };
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1).directive("dsSummaries", SummariesDirective);

	/* @ngInject */
	function SummariesCtrl() {
	    var summaries = this;

	    summaries.flip = true;
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1).directive("dsWeek", WeekDirective);

	/* @ngInject */
	function WeekCtrl() {
	    var week = this;

	    week.toggle = toggle;
	    week.edit = false;

	    ////////////////////////////

	    function toggle() {
	        week.edit = !week.edit;
	    }
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	WorkCtrl.$inject = ["Time", "Util"];__webpack_require__(1).directive("dsWork", WorkDirective);

	/* @ngInject */
	function WorkCtrl(Time, Util) {
	    var work = this,
	        today = work.work.workDate == Time.getWorkDate();

	    work.flip = !today;
	    work.toggle = toggle;
	    work.getDate = getDate;
	    work.isToday = isToday;

	    //////////////////////////////

	    function toggle() {
	        work.flip = !work.flip;
	    }

	    function getDate() {
	        if (today) {
	            return "Today";
	        }
	        return Util.date(work.work.workDate);
	    }

	    function isToday() {
	        return today;
	    }
	}

	/* @ngInject */
	function WorkDirective() {
	    return {
	        restrict: "A",
	        templateUrl: "views/work.tpl.html",
	        scope: {
	            work: "=dsWork"
	        },
	        replace: true,
	        controller: WorkCtrl,
	        controllerAs: "work",
	        bindToController: true
	    };
	}

/***/ },
/* 19 */
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