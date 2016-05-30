require("app")
    .directive("dsExcepts", ExceptsDirective);



/* @ngInject */
function ExceptsCtrl($scope, Time, Util, Storage) {
    var excepts = this,
        work = $scope.$eval('works');

    excepts.getTotal = getTotal;
    excepts.setFirst = setFirst;
    excepts.setLast = setLast;
    excepts.addLap = addLap;
    excepts.add = add;
    excepts.remove = remove;
    excepts.labelFilter = labelFilter;
    excepts.flip = true;
    
    if ($scope.main.flag && $scope.work.isToday()) {
        excepts.flip = false;
        $scope.main.flag = false;
    }
    
    $scope.$watch('work.flip', n => n && close());
    $scope.$watch('week.edit', n => n && close());
    $scope.$watch(() => work.first, adjust);
    $scope.$watch(() => work.last, adjust);

    ////////////////////
    
    function adjust() {
        excepts.first = Util.minute(work.first);
        excepts.last = Util.minute(work.last);
    }

    function getTotal() {
        return _.sumBy(work.excepts, 'time');
    }
    
    function setTime(value) {
        
        if (!value) {
            return;
        }
        
        return Time.getTime(work.workDate, value).toISOString();
    }
    
    function setFirst(value) {
        work.first = setTime(value, work.first);
        return Storage.update(work);
    }
    
    function setLast(value) {
        work.last = setTime(value, work.last);
        return Storage.update(work);
    }
    
    function close() {
        excepts.modify = false;
        excepts.flip = true;
    }

    function addLap(lap) {
        excepts.lap = lap;
    }

    function add(label) {
        var time = excepts.lap.val();

        if (!time) {
            return;
        }

        work.excepts.push({
            label : _.findIndex(Storage.getLabels(), label),
            time : time
        });

        Storage.update(work);
        close();
    }

    function remove(except) {
        var index = _.findIndex(work.excepts, except),
            answer = confirm("Are you sure you want delete?");

        if (answer && index >= 0) {
            work.excepts.splice(index, 1);
            Storage.update(work);
        }
    }
    
    function labelFilter(item) {
        return !!item.name;
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