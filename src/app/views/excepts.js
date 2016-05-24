require("app")
    .directive("dsExcepts", ExceptsDirective);



/* @ngInject */
function ExceptsCtrl($scope, Util, Storage, Labels) {
    var excepts = this,
        work = $scope.work.work;

    excepts.first = Util.minute(work.first);
    excepts.last = Util.minute(work.last);
    excepts.getTotal = getTotal;
    excepts.setFirst = setFirst;
    excepts.setLast = setLast;
    excepts.add = add;
    excepts.labels = getLabels();
    excepts.flip = true;
    
    $scope.$watch('work.flip', close);
    $scope.$watch('week.edit', close);

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
    
    function close(n) {
        if (!n) {
            excepts.modify = false;
            excepts.flip = true;
        }
    }
    
    function getLabels() {
        return _.keys(Labels);
    }
    
    function add(id) {
        
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