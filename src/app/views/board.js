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
    board.getRemainTime = getRemainTime;
    board.getWorkedGauge = getWorkedGauge;
    board.isFull = isFull;
    board.getTick = getTick;
    
    /////////////////
    
    function isFull() {
        return getWorkedRate() >= 100;
    }
    
    function getRemainTime() {
        return Math.max(getFullWorkingTime() - getTotalWorkedTime(), 0);
    }
    
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
        return Math.min(Math.floor(getTotalWorkedTime() * 100 / getFullWorkingTime()), 100);
    }

    function getWorkedGauge() {
        return {
            width: getWorkedRate() + '%'
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