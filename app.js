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
	__webpack_require__(19);
	__webpack_require__(20);
	module.exports = __webpack_require__(21);


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
	DateFilter.$inject = ["Util"];__webpack_require__(1).filter("time", TimeFilter).filter("minute", MinuteFilter).filter("date", DateFilter).filter("timeholder", TimeHolder);

	/* @ngInject */
	function TimeFilter(Util) {
	    return function (value) {
	        return Util.time(value) || "00:00";
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

	/* @ngInject */
	function TimeHolder() {
	    return function (value) {
	        return value || "00:00";
	    };
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1).service('$localStorage', function () {
	    return localStorage;
	});

/***/ },
/* 4 */
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
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Storage.$inject = ["$localStorage", "Week", "Time"];__webpack_require__(1).service("Storage", Storage);

	var PREFIX = 'DONSU@2.0-',
	    WORKS_KEY = PREFIX + 'WORKS',
	    LABELS_KEY = PREFIX + 'LABELS',
	    STATUS_KEY = PREFIX + 'STATUS',
	    DEFAULT_LABELS = [{
	    name: "기타"
	}, {
	    name: "헬스",
	    color: "#C05B4B"
	}, {
	    name: "",
	    color: "#97A82D"
	}, {
	    name: "",
	    color: "#F68923"
	}],
	    Status = {
	    'ON': 'ON',
	    'OFF': 'OFF'
	};

	/* @ngInject */
	function Storage($localStorage, Week, Time) {

	    var storage = this,
	        WORK_TYPE = Time.WORK_TYPE,
	        works = getWorks(),
	        labels = JSON.parse($localStorage.getItem(LABELS_KEY)) || DEFAULT_LABELS,

	    /* TODO */
	    status = $localStorage.getItem(STATUS_KEY) || Status.OFF;

	    storage.load = load;
	    storage.today = today;
	    storage.update = update;
	    storage.getLabels = getLabels;
	    storage.storeLabels = storeLabels;

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

	    function getWorks() {

	        var locals = JSON.parse($localStorage.getItem(WORKS_KEY) || '{}');

	        return _(Week.workWeek()).map(function (date) {
	            return _.extend({}, locals[date] || newWork(date), {
	                workDate: date
	            });
	        }).map(function (work) {
	            return _.extend(work, Time.getWorkingTime(work));
	        }).value();
	    }

	    function getLabels() {
	        return labels;
	    }

	    function today() {
	        return _.find(works, function (work) {
	            return work.workDate == Time.getWorkDate();
	        });
	    }

	    function load() {
	        return works;
	    }

	    function storeLabels() {
	        var data = _.map(labels, function (label) {
	            return _.pick(label, ["name", "color"]);
	        });

	        $localStorage.setItem(LABELS_KEY, JSON.stringify(data));
	    }

	    function storeWorks() {
	        var data = _(works).keyBy('workDate').mapValues(function (work) {
	            return _.pick(work, ["first", "last", "excepts", "type"]);
	        }).value();

	        $localStorage.setItem(WORKS_KEY, JSON.stringify(data));
	    }

	    function update(work) {
	        var updated = _.extend(work, Time.getWorkingTime(work));

	        storeWorks();

	        return updated;
	    }
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Ticker.$inject = ["$rootScope", "Storage", "rx"];__webpack_require__(1).factory('Ticker', Ticker);

	/* @ngInject */
	function Ticker($rootScope, Storage, rx) {

	    var _isRecording = false,
	        today = Storage.today(),
	        ticker = getTicker(500),
	        job;

	    var svc = {
	        tick: false,
	        isRecording: function isRecording() {
	            return _isRecording;
	        },
	        toggle: toggle
	    };

	    return svc;

	    ////////////////////

	    function getTicker(sec) {
	        return rx.Observable.interval(sec).map(function () {
	            return moment().startOf('minute');
	        });
	    }

	    function toggle() {
	        if (_isRecording) {
	            return stop();
	        } else {
	            return record();
	        }
	    }

	    function record() {
	        job = ticker.subscribe({
	            onNext: function onNext(m) {
	                $rootScope.$apply(function () {
	                    _isRecording = true;
	                    if (!today.first) {
	                        today.first = m.toISOString();
	                    }
	                    today.last = m.toISOString();
	                    Storage.update(today);
	                    svc.tick = !svc.tick;
	                });
	            }
	        });
	    }

	    function stop() {
	        job && job.dispose();
	        _isRecording = false;
	        svc.tick = false;
	    }
	}

/***/ },
/* 7 */
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
	            return Math.max(time, 0);
	        }
	    }

	    function workingTime(digested, type) {
	        if (type == WORK_TYPE.DAY_OFF) {
	            return 0;
	        } else {
	            return Math.max(Math.min(digested, 720), 0);
	        }
	    }

	    function effectTime(digested, excepts) {
	        return Math.max(digested - _.sumBy(excepts, function (except) {
	            return except.time;
	        }), 0);
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
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	BoardCtrl.$inject = ["Time", "Storage", "Ticker"];__webpack_require__(1).directive("dsBoard", BoardDirective);

	/* @ngInject */
	function BoardCtrl(Time, Storage, Ticker) {
	    var board = this,
	        week = Storage.load(),
	        WORK_TYPE = Time.WORK_TYPE;

	    board.today = Storage.today();
	    board.getFullWorkingTime = getFullWorkingTime;
	    board.getTotalWorkedTime = getTotalWorkedTime;
	    board.getWorkedGauge = getWorkedGauge;
	    board.getRemainGauge = getRemainGauge;
	    board.getTick = getTick;

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

	    function getTick() {
	        return Ticker.tick;
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
/* 11 */
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
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	ExceptsCtrl.$inject = ["$scope", "Util", "Storage"];__webpack_require__(1).directive("dsExcepts", ExceptsDirective);

	/* @ngInject */
	function ExceptsCtrl($scope, Util, Storage) {
	    var excepts = this,
	        work = $scope.$eval('works');

	    //excepts.first = Util.minute(work.first);
	    //excepts.last = Util.minute(work.last);
	    excepts.getTotal = getTotal;
	    excepts.setFirst = setFirst;
	    excepts.setLast = setLast;
	    excepts.addLap = addLap;
	    excepts.add = add;
	    excepts.remove = remove;
	    excepts.flip = true;
	    excepts.labelFilter = labelFilter;

	    $scope.$watch('work.flip', close);
	    $scope.$watch('week.edit', close);
	    $scope.$watch(function () {
	        return work.first;
	    }, adjust);
	    $scope.$watch(function () {
	        return work.last;
	    }, adjust);

	    ////////////////////

	    function adjust() {
	        excepts.first = Util.minute(work.first);
	        excepts.last = Util.minute(work.last);
	    }

	    function getTotal() {
	        return _.sumBy(work.excepts, 'time');
	    }

	    function setTime(value, time) {

	        if (!value) {
	            return;
	        }

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
	        if (!n) {
	            excepts.modify = false;
	            excepts.flip = true;
	        }
	    }

	    function addLap(lap) {
	        excepts.lap = lap;
	    }

	    function add(label) {
	        var time = excepts.lap.val();

	        if (!time) {
	            return;
	        }

	        work.excepts.push({
	            label: _.findIndex(Storage.getLabels(), label),
	            time: time
	        });

	        Storage.update(work);
	        close();
	    }

	    function remove(except) {
	        var index = _.findIndex(work.excepts, except),
	            answer = confirm("Are you sure you want delete?");

	        if (answer && index >= 0) {
	            work.excepts.splice(index, 1);
	            Storage.update(work);
	        }
	    }

	    function labelFilter(item) {
	        return !!item.name;
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	LabelCtrl.$inject = ["$scope", "$element", "$attrs", "Storage"];__webpack_require__(1).directive("dsLabel", LabelDirective);

	/* @ngInject */
	function LabelCtrl($scope, $element, $attrs, Storage) {

	    var ctrl = this,
	        label = $scope.$eval($attrs["label"]),
	        mod = $attrs["modify"];

	    ctrl.isEditable = isEditable;

	    activate();

	    ///////////////

	    function activate() {
	        ctrl.name = label.name;

	        $element.css({
	            "background-color": label.color || "#90AFAA"
	        });

	        $scope.$watch('label.name', function (n) {
	            label.name = n;
	            Storage.storeLabels();
	        });
	    }

	    function isEditable() {
	        return $scope.$eval(mod);
	    }
	}

	/* @ngInject */
	function LabelDirective() {
	    return {
	        template: '<span class="label"><input type="text" ng-model="label.name" ng-disabled="!label.isEditable()"/></span>',
	        replace: true,
	        controller: LabelCtrl,
	        controllerAs: "label"
	    };
	}

/***/ },
/* 15 */
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

	    hours.on('change', apply);
	    minute.on('change', apply);

	    $scope.$watch('excepts.flip', function (n) {
	        if (n) {
	            val("");
	        }
	    });

	    $scope.$watch(function () {
	        return hours.val();
	    }, function (n) {
	        if (n == "") return;
	        value.hours = minmax(+n, 0, 24);
	        adjust();
	    });

	    $scope.$watch(function () {
	        return minute.val();
	    }, function (n) {
	        if (n == "") return;
	        value.minute = minmax(+n, 0, 59);
	        adjust();
	    });

	    ctrl.onLoad({
	        $lap: ctrl
	    });

	    //////////////////////

	    function apply() {
	        $scope.$apply();
	    }

	    function isN(n) {
	        return n == 0 || n > 0;
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

	    function adjust() {
	        if (value.hours == 24 && value.minute > 0) {
	            value.hours = 23;
	        }

	        hours.val(isN(value.hours) ? value.hours : "");
	        minute.val(isN(value.minute) ? value.minute : "");
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
	        } else if (value.hours != undefined || value.minute != undefined) {
	            return (value.hours || 0) * 60 + (value.minute || 0);
	        }
	    }
	}

	/* @ngInject */
	function LapTimeDirective() {
	    return {
	        restrict: "E",
	        templateUrl: "views/lapTime.tpl.html",
	        scope: {
	            onLoad: "&"
	        },
	        controller: LapTimeCtrl,
	        controllerAs: 'lap',
	        bindToController: true
	    };
	}

/***/ },
/* 16 */
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	ModeCtrl.$inject = ["$scope", "Time", "Util"];__webpack_require__(1).directive("dsMode", ModeDirective);

	/* @ngInject */
	function ModeCtrl($scope, Time, Util) {
	    var mode = this,
	        works = $scope.$eval('works'),
	        today = works.workDate == Time.getWorkDate();

	    mode.work = works;
	    mode.isSelected = isSelected;
	    mode.getDate = getDate;
	    mode.isToday = isToday;
	    mode.select = select;

	    //////////////////////////////

	    function isSelected(type) {
	        return works.type == type;
	    }

	    function getDate() {
	        if (today) {
	            return "Today";
	        }
	        return Util.date(works.workDate);
	    }

	    function isToday() {
	        return today;
	    }

	    function select(type) {
	        return works.type = type;
	    }
	}

	/* @ngInject */
	function ModeDirective() {
	    return {
	        restrict: "A",
	        templateUrl: "views/mode.tpl.html",
	        replace: true,
	        controller: ModeCtrl,
	        controllerAs: "mode"
	    };
	}

/***/ },
/* 18 */
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	WeekCtrl.$inject = ["Storage"];__webpack_require__(1).directive("dsWeek", WeekDirective);

	/* @ngInject */
	function WeekCtrl(Storage) {
	    var week = this;

	    week.toggle = toggle;
	    week.edit = false;
	    week.labels = Storage.getLabels();

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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	WorkCtrl.$inject = ["$scope", "Time", "Util"];__webpack_require__(1).directive("dsWork", WorkDirective);

	/* @ngInject */
	function WorkCtrl($scope, Time, Util) {
	    var work = this,
	        works = $scope.$eval('works'),
	        today = works.workDate == Time.getWorkDate();

	    work.work = works;
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
	        return Util.date(works.workDate);
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
	        replace: true,
	        controller: WorkCtrl,
	        controllerAs: "work"
	    };
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	WorkBtnCtrl.$inject = ["Ticker"];__webpack_require__(1).directive("dsWorkBtn", WorkBtnDirective);

	/* @ngInject */
	function WorkBtnCtrl(Ticker) {
	    var ctrl = this;

	    ctrl.isRecording = Ticker.isRecording;
	    ctrl.toggle = Ticker.toggle;
	    ctrl.getTick = getTick;

	    ////////////////////////

	    function getTick() {
	        return Ticker.tick;
	    }
	}

	/* @ngInject */
	function WorkBtnDirective() {
	    return {
	        restrict: "E",
	        templateUrl: "views/workBtn.tpl.html",
	        controller: WorkBtnCtrl,
	        controllerAs: "btns"
	    };
	}

/***/ }
/******/ ]);