require("app")
    .directive("dsMain", MainDirective);



/* @ngInject */
function MainCtrl(Time, Sample) {
    var main = this;

    main.sample = Sample.map(Time.getWorkingTime);
}


/* @ngInject */
function MainDirective() {
    return {
        restrict : "E",
        templateUrl : "views/main.tpl.html",
        controller : MainCtrl,
        controllerAs : "main"
    }
}