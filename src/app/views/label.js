require("app")
    .directive("dsLabel", LabelDirective);



/* @ngInject */
function LabelCtrl($scope, $element, $attrs, Labels) {

    var ctrl = this,
        label = Labels[$scope.$eval($attrs["label"])];

    activate();

    ///////////////

    function activate() {
        ctrl.name = label.name;
        $element.css({
            "background-color": label.color || "#90AFAA"
        });
    }
}


/* @ngInject */
function LabelDirective() {
    return {
        template: '<span class="label">{{label.name}}</span>',
        replace: true,
        controller: LabelCtrl,
        controllerAs: "label"
    }
}