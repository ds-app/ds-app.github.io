require("app")
    .filter("time", TimeFilter)
    .filter("minute", MinuteFilter)
    .filter("date", DateFilter);


/* @ngInject */
function TimeFilter() {
    return function (value) {
        return moment(0).utc().add(value, 'm').format('HH:mm');
    };
}


/* @ngInject */
function MinuteFilter() {
    return function (value) {
        if (!value) {
            return;
        }
        return moment(value).format('HH:mm');
    }
}


/* @ngInject */
function DateFilter() {
    return function (value) {
        if (!value) {
            return;
        }
        return moment(value).format('MM/DD');
    }
}