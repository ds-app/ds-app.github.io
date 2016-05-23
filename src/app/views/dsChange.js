require("app")
    .directive("dsChange", ChangeDirective);



/* @ngInject */
function ChangeCtrl ($scope, $element, $attrs) {
    
    var handler = $attrs["dsChange"];
    
    $scope.$watch(() => {
        return $element.val();
    }, (n, o) => {
        if (n !== o) {
            $scope.$eval(handler, {
                $value: n
            });
        }
    });
    
    $element.on("change", () => {
        $scope.$apply();
    });
}

/* @ngInject */
function ChangeDirective() {
    return {
        restrict : "A",
        controller: ChangeCtrl
    }
}