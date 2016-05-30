require("app")
    .directive("dsWeek", WeekDirective);



/* @ngInject */
function WeekCtrl($rootScope, Storage) {
    var week = this;
    
    week.toggle = toggle;
    week.edit = false;
    week.labels = Storage.getLabels();
    week.more = more;
    week.flip = true;

    $rootScope.$on("$today", (e) => {
        week.edit = false;
    });
    
    ////////////////////////////
    
    function toggle() {
        week.edit = !week.edit;
    }
    
    function more(item, index) {
        if (week.flip && index >= 7) {
            return false;
        }
        return true;
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