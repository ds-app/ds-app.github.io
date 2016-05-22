require("app")
    .directive("dsWork", WorkDirective);



/* @ngInject */
function WorkCtrl() {
    var work = this;
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