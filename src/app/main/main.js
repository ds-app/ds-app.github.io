require("app")
    .directive("dsMain", MainDirective);



/* @ngInject */
function MainCtrl(Time) {

}


/* @ngInject */
function MainDirective() {
    return {
        restrict : "E",
        templateUrl : "main/main.tpl.html",
        controller : MainCtrl
    }
}