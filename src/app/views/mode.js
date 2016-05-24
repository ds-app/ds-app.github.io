require("app")
    .directive("dsMode", ModeDirective);



/* @ngInject */
function ModeCtrl(Time, Util) {
    var mode = this,
        today = mode.work.workDate == Time.getWorkDate();

    mode.isSelected = isSelected;
    mode.getDate = getDate;
    mode.isToday = isToday;
    mode.select = select;

    //////////////////////////////

    function isSelected(type) {
        return mode.work.type == type;
    }
    
    function getDate() {
        if (today) {
            return "Today";
        }
        return Util.date(mode.work.workDate);
    }

    function isToday() {
        return today;
    }
    
    function select(type) {
        return mode.work.type = type;
    }
}


/* @ngInject */
function ModeDirective() {
    return {
        restrict: "A",
        templateUrl : "views/mode.tpl.html",
        scope : {
            work: "=dsMode"
        },
        replace: true,
        controller : ModeCtrl,
        controllerAs : "mode",
        bindToController: true
    }
}