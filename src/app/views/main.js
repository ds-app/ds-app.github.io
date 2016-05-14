require("app")
    .directive("dsMain", MainDirective);



/* @ngInject */
function MainCtrl(Time) {

}


/* @ngInject */
function MainDirective() {
    return {
        restrict : "E",
        templateUrl : "views/main.tpl.html",
        controller : MainCtrl
    }
}