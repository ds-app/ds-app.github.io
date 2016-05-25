require("app")
    .directive("dsBoard", BoardDirective);



/* @ngInject */
function BoardCtrl(Time, Storage, Ticker) {
    var board = this,
        week = Storage.load(),
        WORK_TYPE = Time.WORK_TYPE;
    
    board.today = Storage.today();
    board.getFullWorkingTime = getFullWorkingTime;
    board.getTotalWorkedTime = getTotalWorkedTime;
    board.getWorkedGauge = getWorkedGauge;
    board.getRemainGauge = getRemainGauge;
    board.getTick = getTick;
    
    /////////////////
    
    function getFullWorkingTime() {
        return _(week).map(work => work.type).map(type => {
            switch (type) {
                case WORK_TYPE.FULL:
                    return 8 * 60;
                case WORK_TYPE.HALF:
                    return 4 * 60;
                default:
                    return 0;
            }
        }).sum();
    }
    
    function getTotalWorkedTime() {
        return _(week).map(work => work.working).sum();
    }
    
    function getWorkedRate() {
        return Math.floor(getTotalWorkedTime() * 100 / getFullWorkingTime());
    }
    
    function getRemainRate() {
        return 100 - getWorkedRate();
    }

    function getWorkedGauge() {
        return {
            width: getWorkedRate() + '%'
        };
    }

    function getRemainGauge() {
        return {
            width: getRemainRate() + '%'
        };
    }
    
    function getTick() {
        return Ticker.tick;
    }
}


/* @ngInject */
function BoardDirective() {
    return {
        restrict : "E",
        templateUrl : "views/board.tpl.html",
        controller : BoardCtrl,
        controllerAs : "board"
    }
}