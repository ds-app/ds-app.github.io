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
    excepts.addLap = addLap;
    excepts.add = add;
    excepts.remove = remove;
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

    function addLap(lap) {
        excepts.lap = lap;
    }

    function add(id) {
        var time = excepts.lap.val();

        if (!time) {
            return;
        }

        work.excepts.push({
            label : id,
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