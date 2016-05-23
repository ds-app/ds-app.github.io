require("app")
    .directive("dsExcepts", ExceptsDirective);



/* @ngInject */
function ExceptsCtrl($scope, Util, Storage) {
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
        work.first = setTime(value, work.first);
        return Storage.update(work);
    }
    
    function setLast(value) {
        work.last = setTime(value, work.last);
        return Storage.update(work);
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