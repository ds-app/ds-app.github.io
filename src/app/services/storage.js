require("app")
    .service("Storage", Storage);


var PREFIX = 'DONSU@2.0-',
    WORKS_KEY = PREFIX + 'WORKS',
    LABELS_KEY = PREFIX + 'LABELS',
    STATUS_KEY = PREFIX + 'STATUS',
    DEFAULT_LABELS = [
        {
            name: "기타"
        },
        {
            name: "헬스",
            color: "#C05B4B"
        },
        {
            name: "",
            color: "#97A82D"
        },
        {
            name: "",
            color: "#F68923"
        }
    ],
    Status = {
        'ON' : 'ON',
        'OFF' : 'OFF'
    };


/* @ngInject */
function Storage($localStorage, Week, Time) {

    var storage = this,
        WORK_TYPE = Time.WORK_TYPE,
        works = getWorks(),
        labels = JSON.parse($localStorage.getItem(LABELS_KEY)) || DEFAULT_LABELS;
        /* TODO */

    storage.load = load;
    storage.today = today;
    storage.update = update;
    storage.getLabels = getLabels;
    storage.storeLabels = storeLabels;
    storage.Status = Status;
    storage.status = status;
    
    


    //////////////////////
    
    
    function status(value) {
        if (value) {
            $localStorage.setItem(STATUS_KEY, value);
        } else {
            return $localStorage.getItem(STATUS_KEY) || Status.OFF;
        }
    }

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
    
    function getWorks() {
        
        var locals = JSON.parse($localStorage.getItem(WORKS_KEY) || '{}');
        
        return _(Week.workWeek()).map(date => {
            return _.extend({}, locals[date] || newWork(date), {
                workDate : date
            });
        }).map(work => {
            return _.extend(work, Time.getWorkingTime(work));
        }).value();
    }
    
    function getLabels() {
        return labels;
    }
    
    function today() {
        return _.find(works, work => work.workDate == Time.getWorkDate());
    }

    function load() {
        return works;
    }
    
    function storeLabels() {
        var data = _.map(labels, label => _.pick(label, ["name", "color"]));
        
        $localStorage.setItem(LABELS_KEY, JSON.stringify(data));
    }
    
    function storeWorks() {
        var data = _(works).keyBy('workDate').mapValues(work => {
            return _.pick(work, ["first", "last", "excepts", "type"]);
        }).value();
        
        $localStorage.setItem(WORKS_KEY, JSON.stringify(data));
    }
    
    function update(work) {
        var updated = _.extend(work, Time.getWorkingTime(work));
        
        storeWorks();
        
        return updated;
    }

}