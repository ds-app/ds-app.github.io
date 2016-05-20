require("app")
    .directive("dsWeek", WeekDirective);



/* @ngInject */
function WeekCtrl(Week) {
    var week = this;

    console.log(Week.week());
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