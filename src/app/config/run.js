require("app")
    .run(Init);


/* @ngInject */
function Init(Storage, Ticker) {
    
    var Status = Storage.Status,
        status = Storage.status();

    if (status == Status.ON && !Ticker.isRecording()
        || status == Status.OFF && Ticker.isRecording()) {
        Ticker.toggle();
    }
    
}