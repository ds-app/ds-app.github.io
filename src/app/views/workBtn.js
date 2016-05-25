require("app")
    .directive("dsWorkBtn", WorkBtnDirective);



/* @ngInject */
function WorkBtnCtrl(Ticker) {
    var ctrl = this;
    
    ctrl.isRecording = Ticker.isRecording;
    ctrl.toggle = Ticker.toggle;
    ctrl.getTick = getTick;
    
    ////////////////////////


    function getTick() {
        return Ticker.tick;
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