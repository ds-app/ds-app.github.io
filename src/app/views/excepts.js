require("app")
    .directive("dsExcepts", ExceptsDirective);



/* @ngInject */
function ExceptsCtrl(Storage) {
    var excepts = this;

    excepts.data = Storage.load()[0].excepts;
}


/* @ngInject */
function ExceptsDirective() {
    return {
        restrict : "E",
        templateUrl : "views/excepts.tpl.html",
        controller : ExceptsCtrl,
        controllerAs : "excepts"
    }
}