require("app")
    .directive("dsWorkBtn", WorkBtnDirective);



/* @ngInject */
function WorkBtnCtrl(Time) {

}


/* @ngInject */
function WorkBtnDirective() {
    return {
        restrict : "E",
        templateUrl : "views/workBtn.tpl.html",
        controller : WorkBtnCtrl
    }
}