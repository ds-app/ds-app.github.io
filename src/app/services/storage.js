require("app")
    .service("Storage", Storage);


/* @ngInject */
function Storage(Week, Time, Sample) {

    var storage = this,
        WORK_TYPE = Time.WORK_TYPE,
        works = _(Week.workWeek()).map(date => {
            return _.extend({}, Sample[date] || newWork(date), {
                workDate : date
            });
        }).map(work => {
            return _.extend(work, Time.getWorkingTime(work));
        }).value();


    storage.load = load;
    storage.update = update;


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

    function load() {
        return works;
    }
    
    function update(work) {
        return _.extend(work, Time.getWorkingTime(work));
    }

}