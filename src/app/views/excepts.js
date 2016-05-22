require("app")
    .directive("dsExcepts", ExceptsDirective);



/* @ngInject */
function ExceptsCtrl($scope) {
    var excepts = this,
        work = $scope.work.work;

    excepts.getTotal = getTotal;

    ////////////////////

    function getTotal() {
        return _.sumBy(work.excepts, 'time');
    }
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