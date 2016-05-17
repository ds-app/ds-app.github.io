require("app")
    .filter("time", TimeFilter);


/* @ngInject */
function TimeFilter() {
    return function (value) {
        return moment(0).utc().add(value, 'm').format('HH:mm');
    };
}