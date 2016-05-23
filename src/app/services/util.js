require("app")
    .service("Util", Util);


/* @ngInject */
function Util() {
    var util = this;
    
    util.time = time;
    util.minute = minute;
    util.date = date;
    
    /////////////////////////
    
    
    function time(value, format) {
        return moment(0).utc().add(value, 'm').format(format || 'HH:mm');
    }
    
    function minute(value, format) {
        if (!value) {
            return;
        }
        return moment(value).format(format || 'HH:mm');
    }
    
    function date(value, format) {
        if (!value) {
            return;
        }
        return moment(value).format(format || 'MM/DD');
    }
    
}
