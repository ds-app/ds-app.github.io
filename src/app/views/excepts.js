require("app")
    .directive("dsExcepts", ExceptsDirective);



/* @ngInject */
function ExceptsCtrl($scope, Util) {
    var excepts = this,
        work = $scope.work.work;

    excepts.first = Util.minute(work.first);
    excepts.last = Util.minute(work.last);
    excepts.getTotal = getTotal;
    excepts.setFirst = setFirst;
    excepts.setLast = setLast;

    ////////////////////

    function getTotal() {
        return _.sumBy(work.excepts, 'time');
    }
    
    function setTime(value, time) {
        var hm = moment(value, "HH:mm"),
            m = moment(time);

        m.hours(hm.hours());
        m.minutes(hm.minutes());

        return m.toISOString();
    }
    
    function setFirst(value) {
        return excepts.first = Util.minute(work.first = setTime(value, work.first));
    }
    
    function setLast(value) {
        return excepts.last = Util.minute(work.last = setTime(value, work.last));
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