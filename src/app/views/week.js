require("app")
    .directive("dsWeek", WeekDirective);



/* @ngInject */
function WeekCtrl(Storage) {

    var week = this;

    week.thisWeek = Storage.load();
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