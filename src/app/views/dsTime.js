require("app")
    .directive("dsTimeValue", TimeValueDirective);


/* @ngInject */
function TimeValueCtrl($scope, $element, $attrs) {
    var tv = $attrs["dsTimeValue"];
    
    $scope.$watch(tv, (n, o) => {
        $element.val(n);
    });
}

/* @ngInject */
function TimeValueDirective() {
    return {
        restrict: "A",
        controller: TimeValueCtrl
    };
}
