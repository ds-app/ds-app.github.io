require("app")
    .directive("dsWork", WorkDirective);



/* @ngInject */
function WorkCtrl($scope, Time, Util) {
    var work = this,
        works = $scope.$eval('works'),
        today = works.workDate == Time.getWorkDate();

    work.work = works;
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
        return Util.date(works.workDate);
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
        replace: true,
        controller : WorkCtrl,
        controllerAs : "work"
    }
}