require("app")
    .filter("time", TimeFilter)
    .filter("minute", MinuteFilter)
    .filter("date", DateFilter);


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