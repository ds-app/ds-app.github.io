require("app")
    .directive("dsLabel", LabelDirective);



/* @ngInject */
function LabelCtrl($scope, $element, $attrs) {

    var ctrl = this,
        label = $scope.$eval($attrs["label"]),
        mod = $attrs["modify"];

    ctrl.isEditable = isEditable;
    
    activate();

    ///////////////

    function activate() {
        ctrl.name = label.name;
        
        $element.css({
            "background-color": label.color || "#90AFAA"
        });
        
        $scope.$watch('label.name', n => {
            label.name = n;
        });
    }
    
    function isEditable() {
        return $scope.$eval(mod);
    }
}


/* @ngInject */
function LabelDirective() {
    return {
        template: '<span class="label"><input type="text" ng-model="label.name" ng-disabled="!label.isEditable()"/></span>',
        replace: true,
        controller: LabelCtrl,
        controllerAs: "label"
    }
}