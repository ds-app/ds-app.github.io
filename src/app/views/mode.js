require("app")
    .directive("dsMode", ModeDirective);



/* @ngInject */
function ModeCtrl($scope, Time, Util, Storage) {
    var mode = this,
        works = $scope.$eval('works'),
        today = works.workDate == Time.getWorkDate();

    mode.work = works;
    mode.isSelected = isSelected;
    mode.getDate = getDate;
    mode.isToday = isToday;
    mode.select = select;

    //////////////////////////////

    function isSelected(type) {
        return works.type == type;
    }
    
    function getDate() {
        if (today) {
            return "Today";
        }
        return Util.date(works.workDate);
    }

    function isToday() {
        return today;
    }
    
    function select(type) {
        works.type = type;
        Storage.update(works);
    }
}


/* @ngInject */
function ModeDirective() {
    return {
        restrict: "A",
        templateUrl : "views/mode.tpl.html",
        replace: true,
        controller : ModeCtrl,
        controllerAs : "mode"
    }
}