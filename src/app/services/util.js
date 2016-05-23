require("app")
    .service("Util", Util);


/* @ngInject */
function Util() {
    var util = this;
    
    util.time = time;
    util.minute = minute;
    util.date = date;
    
    /////////////////////////
    
    function lzp(value) {
        var str = "" + value;
        return ("00" + str).substr(Math.min(str.length, 2));
    }
    
    function time(value) {
        if (!value) {
            return;
        }
        var hours, minutes;
        
        hours = parseInt(value / 60);
        minutes = value - (hours * 60);
        
        return lzp(hours) + ":" + lzp(minutes);
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
