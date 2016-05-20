require("app")
    .service("Storage", Storage);


/* @ngInject */
function Storage(Week, Time, Sample) {

    var storage = this;


    storage.load = load;


    //////////////////////

    function newWork(date) {
        var day = moment(date).day();

        if (day == 0 || day == 6) {
            return {
                "excepts": [],
                "type": "0h"
            };
        } else {
            return {
                "excepts": [],
                "type": "8h"
            };
        }
    }

    function load() {
        return _(Week.workWeek()).map(date => {
            return _.extend({}, Sample[date] || newWork(date), {
                workDate : date
            });
        }).map(work => {
            return _.extend(work, Time.getWorkingTime(work));
        }).value();
    }

}