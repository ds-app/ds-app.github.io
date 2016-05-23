require("app")
    .directive("dsWeek", WeekDirective);



/* @ngInject */
function WeekCtrl() {
    var week = this;
}


/* @ngInject */
function WeekDirective() {
    return {
        restrict : "E",
        templateUrl : "views/week.tpl.html",
        controller : WeekCtrl,
        controllerAs : "week"
    }
}