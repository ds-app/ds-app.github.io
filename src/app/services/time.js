require("app")
    .service("Time", TimeService);

var WORK_TYPE = {
        "DAY_OFF" : "NA",
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
    svc.getTime = getTime;

    svc.WORK_TYPE = WORK_TYPE;


    /////////////////////

    function getWorkDate(date) {
        var m = moment(date);
        return m.utcOffset(m.utcOffset() - startMinutes).format('YYYY-MM-DD');
    }
    
    function getTime(workDate, time) {
        var wd = moment(workDate),
            hm = moment.utc(time, "HH:mm"),
            h = hm.hours(),
            m = hm.minutes();
        
        if ((h*60 + m) < startMinutes) {
            wd.add(1, 'd');
        }
        
        return wd.hours(h).minutes(m);
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
            } else  {
                return time - 60;
            }
        } else {
            return Math.max(time, 0);
        }

    }

    function workingTime(digested, type) {
        if (type == WORK_TYPE.DAY_OFF) {
            return 0;
        } else  {
            return Math.max(Math.min(digested, 720), 0);
        }
    }

    function effectTime(digested, excepts) {
        return Math.max(digested - _.sumBy(excepts, except => except.time), 0);
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
                total : 0,
                working : 0,
                effective : 0,
                extra : 0
            }
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
            last = moment(workDate).endOf("date").add(startMinutes, "m")
        }

        // 총 시간
        // 총 근무시간 (법정 휴무, 휴일근로 제외, MAX 12h)
        // 총 실 근무시간 (법정 휴무, 제외시간) => 교통비, 휴일근로

        diff = last.diff(first, 'minutes');
        digested = digestTime(diff, work.type);
        working = workingTime(digested, work.type);
        effect = effectTime(digested, work.excepts);
        extra = (work.type == WORK_TYPE.DAY_OFF) ? dayOffTime(effect) : overtime(effect);

        return {
            total : diff,
            digested : digested,
            working : working,
            effective : effect,
            extra : extra
        };
    }
}