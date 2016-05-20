require("app")
    .directive("dsMain", MainDirective);



/* @ngInject */
function MainCtrl(Storage) {

    var main = this;
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