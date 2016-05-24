require("app")
    .directive("lapTime", LapTimeDirective);



/* @ngInject */
function LapTimeCtrl($scope, $element) {
    var ctrl = this,
        hours = $element.find(".lap_time_hours"),
        minute = $element.find(".lap_time_minute"),
        value = {
            hours: undefined,
            minute: undefined
        };
    
    ctrl.val = val;
    
    hours.on('change', apply);
    minute.on('change', apply);

    $scope.$watch('excepts.flip', (n) => {
        if (n) {
            val("");
        }
    });
    
    $scope.$watch(() => hours.val(), (n, o) => {
        if (n == o) return;
        value.hours = minmax(+n, 0, 24);
        adjust();
    });

    $scope.$watch(() => minute.val(), (n, o) => {
        if (n == o) return;
        value.minute = minmax(+n, 0, 59);
        adjust();
    });
    

    //////////////////////
    
    function apply() {
        $scope.$apply();
    }

    function isN(n) {
        return n == 0 || n > 0;
    }

    function minmax(value, min, max) {
        if (value < min) {
            return min;
        } else if (value > max) {
            return max;
        } else {
            return value;
        }
    }
    
    function adjust() {
        if (value.hours == 24 && value.minute > 0) {
            value.hours = 23;
        }
        
        hours.val(isN(value.hours) ? value.hours : "");
        minute.val(isN(value.minute) ? value.minute : "");
    }
    
    function val(newValue) {
        if (isN(newValue)) {
            value.hours = minmax(~~(newValue/60), 0, 24);
            value.minute = newValue%60;
            adjust();
        } else if (newValue == "") {
            value.hours = undefined;
            value.minute = undefined;
            adjust();
        } else if (value.hours != undefined && value.minute != undefined) {
            return (value.hours * 60) + (value.minute);
        }
    }
}

/* @ngInject */
function LapTimeDirective() {
    return {
        restrict: "E",
        templateUrl: "views/lapTime.tpl.html",
        controller: LapTimeCtrl,
        controllerAs: 'lap'
    };
}