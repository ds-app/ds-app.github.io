require("app")
    .factory('Ticker', Ticker);



/* @ngInject */
function Ticker($rootScope, Storage, rx) {

    var isRecording = false,
        today = Storage.today(),
        Status = Storage.Status,
        ticker = getTicker(500),
        job;
    
    var svc = {
        tick : false,
        isRecording: () => isRecording,
        toggle : toggle
    };

    return svc;
    
    ////////////////////

    function getTicker(sec) {
        return rx
            .Observable
            .interval(sec)
            .map(() => moment().startOf('minute'));
    }

    function toggle() {
        if (isRecording) {
            return stop();
        } else {
            return record();
        }
    }

    function record() {
        job = ticker.subscribe({
            onNext: function (m) {
                $rootScope.$apply(() => {
                    isRecording = true;
                    if (!today.first) {
                        today.first = m.toISOString();
                    }
                    today.last = m.toISOString();
                    Storage.update(today);
                    Storage.status(Status.ON);
                    svc.tick = !svc.tick;
                });
            }
        });
    }

    function stop() {
        job && job.dispose();
        Storage.status(Status.OFF);
        isRecording = false;
        svc.tick = false;
    }
}