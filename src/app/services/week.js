require("app")
    .service("Week", WeekService);



/* @ngInject */
function WeekService(Time) {

    var svc = this;

    svc.workWeek = workWeek;

    /////////////////

    function workWeek(offset) {

        offset = offset || 0;

        var m = moment(Time.getWorkDate());

        m.subtract(((m.day() + 6) % 7), 'd');
        m.add(offset * 7, 'd');

        return _(7).range().map(day => {
            return moment(m).add(day, 'd').format('YYYY-MM-DD');
        }).value();
    }
}