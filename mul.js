function reserve(booking) {

    function getJWS(sPayload) {
        var oHeader = {
            alg: "HS256"
        };
        var sHeader = JSON.stringify(oHeader);
        return KJUR.jws.JWS.sign("HS256", sHeader, sPayload, prvKey);
    }

    function make(obj) {
        obj.password = getJWS(obj.password);
        obj.start_index = parseInt(obj.start_index, 10);
        obj.end_index = parseInt(obj.end_index, 10);

        return obj;
    }

    var $injector = angular.injector(['embt.meeting']),
        ctrl = angular.element('body').controller(),
        prvKey = ctrl.prvKey;
    
    $injector.invoke(function (socket, localStorageService) {
        socket.emit('booking', make(booking), function (err, reservation) {
            if (err) {
                console.log('danger', err.msg || '오류가 발생하였습니다.', booking.reserve_date);
            } else {
                var user = {
                    name: reservation.user_name,
                    phone: reservation.phone
                };
                localStorageService.set('user', user);
                console.log('success', '예약이 되었습니다.');
            }
        });
    });

}


function getMaker(option) {
    return function (date) {
        var startOfDate = new Date(date);
        startOfDate.setHours(0,0,0,0);
        reserve(angular.extend({
            "reserve_date":startOfDate.toISOString() 
        }, option));
    };
}


function getMonthlyMaker(option) {
    var maker = getMaker(option);
    
    return function (year, month) {
        var last = new Date(year, month, 0),
            lastDate = last.getDate(),
            date,
            day,
            i;
        
        month = last.getMonth();
        
        for (i = 1; i <= lastDate; i++) {
            date = new Date(year, month, i);
            day = date.getDay();
            
            if (day > 0 && day < 6) {
                maker(date);
            }
        }
    }
}


var daily = getMaker({
    "user_name":"사용자명",
    "phone":"전번",
    "room_id":"E21_09",
    "description":"목적",
    "start_index":22, // 11시 부터
    "end_index":27, // 14시 전 까지
    "password":"0000"
});


var monthly = getMonthlyMaker({
    "user_name":"사용자명",
    "phone":"전번",
    "room_id":"E21_09",
    "description":"목적",
    "start_index":22, // 11시 부터
    "end_index":27, // 14시 전 까지
    "password":"0000"
});


// daily("2016-08-23");
// monthly(2016, 6);