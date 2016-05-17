require("app")
    .directive("dsBoard", BoardDirective);



/* @ngInject */
function BoardCtrl() {
    var board = this;
}


/* @ngInject */
function BoardDirective() {
    return {
        restrict : "E",
        templateUrl : "views/board.tpl.html",
        controller : BoardCtrl,
        controllerAs : "board"
    }
}