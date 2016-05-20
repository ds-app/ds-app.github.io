require("app")
    .service("Week", WeekService);



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