require("app")
    .service("Time", TimeService);

var WORK_TYPE = {
        "HOLIDAY" : "0h",
        "HALF" : "4h",
        "FULL" : "8h"
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
            } else  {
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
        return digested - _.sumBy(excepts, except => except.time);
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
            last = moment(workDate).endOf("date").add(startMinutes, "m")
        }

        // 총 시간
        // 총 근무시간 (법정 휴무, 휴일근로 제외, MAX 12h)
        // 총 실 근무시간 (법정 휴무, 제외시간) => 교통비, 휴일근로

        diff = last.diff(first, 'minutes');
        digested = digestTime(diff, work.type);
        working = workingTime(digested, work.type);
        effect = effectTime(digested, work.excepts);
        extra = (work.type == WORK_TYPE.HOLIDAY) ? holidayTime(effect) : overtime(effect);

        return {
            date : workDate,
            type : work.type,
            total : diff,
            working : working,
            effective : effect,
            extra : extra
        };
    }
}