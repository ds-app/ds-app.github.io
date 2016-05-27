require("app")
    .directive("dsWorkBtn", WorkBtnDirective);



/* @ngInject */
function WorkBtnCtrl(Ticker) {
    var ctrl = this;
    
    ctrl.isRecording = Ticker.isRecording;
    ctrl.toggle = Ticker.toggle;
    ctrl.isRecording = isRecording;
    
    ////////////////////////


    function isRecording() {
        return Ticker.isRecording();
    }
}


/* @ngInject */
function WorkBtnDirective() {
    return {
        restrict : "E",
        templateUrl : "views/workBtn.tpl.html",
        controller : WorkBtnCtrl,
        controllerAs : "btns"
    }
}