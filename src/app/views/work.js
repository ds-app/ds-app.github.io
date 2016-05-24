require("app")
    .directive("dsWork", WorkDirective);



/* @ngInject */
function WorkCtrl(Time, Util) {
    var work = this,
        today = work.work.workDate == Time.getWorkDate();

    work.flip = !today;
    work.toggle = toggle;
    work.getDate = getDate;
    work.isToday = isToday;

    //////////////////////////////

    function toggle() {
        work.flip = !work.flip;
    }
    
    function getDate() {
        if (today) {
            return "Today";
        }
        return Util.date(work.work.workDate);
    }
    
    function isToday() {
        return today;
    }
}


/* @ngInject */
function WorkDirective() {
    return {
        restrict: "A",
        templateUrl : "views/work.tpl.html",
        scope : {
            work: "=dsWork"
        },
        replace: true,
        controller : WorkCtrl,
        controllerAs : "work",
        bindToController: true
    }
}