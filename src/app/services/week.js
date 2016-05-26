require("app")
    .service("Week", WeekService);



/* @ngInject */
function WeekService(Time) {

    var svc = this;

    svc.workWeek = workWeek;

    /////////////////

    function workWeek() {

        var m = moment(Time.getWorkDate());

        m.subtract(((m.day() + 6) % 7), 'd');
        m.subtract(7, 'd');

        return _(14).range().map(day => {
            return moment(m).add(day, 'd').format('YYYY-MM-DD');
        }).reverse().value();
    }
}