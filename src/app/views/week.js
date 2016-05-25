require("app")
    .directive("dsWeek", WeekDirective);



/* @ngInject */
function WeekCtrl(Labels) {
    var week = this;
    
    week.toggle = toggle;
    week.edit = false;
    week.labels = Labels;
    
    ////////////////////////////
    
    function toggle() {
        week.edit = !week.edit;
    }
    
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