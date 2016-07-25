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

    return $injector.invoke(function ($q, socket, localStorageService) {
        return $q(function (res) {
            socket.emit('booking', make(booking), function (err, reservation) {
                if (err) {
                    console.log('danger', err.msg || '오류가 발생하였습니다.', booking.reserve_date);
                    return res({
                        date: booking.reserve_date,
                        status: "Error"
                    });
                } else {
                    var user = {
                        name: reservation.user_name,
                        phone: reservation.phone
                    };
                    localStorageService.set('user', user);
                    console.log('success', '예약이 되었습니다.');
                    return res({
                        date: booking.reserve_date,
                        status: "Reserved"
                    });
                }
            });
        });
    });
}


function getMaker(option) {
    return function (date) {
        var startOfDate = new Date(date);
        startOfDate.setHours(0,0,0,0);
        return reserve(angular.extend({
            "reserve_date":startOfDate.toISOString()
        }, option));
    };
}


function getMonthlyMaker(option) {
    var maker = getMaker(option),
        q = angular.injector(['embt.meeting']).invoke(function ($q) { return $q; });

    return function (year, month) {
        var last = new Date(year, month, 0),
            lastDate = last.getDate(),
            results = [],
            date,
            day,
            i;

        month = last.getMonth();

        for (i = 1; i <= lastDate; i++) {
            date = new Date(year, month, i);
            day = date.getDay();

            if (day > 0 && day < 6) {
                results.push(maker(date));
            }
        }

        return q.all(results);
    }
}


function ui() {
    var $el = angular.element,
        btn = $el('<div id="batBtn">몽땅 예약</div>');

    if ($el('#batBtn').is("#batBtn")) {
        return;
    }

    btn.css({
        position: "fixed",
        bottom: "50px",
        right: "30px",
        background: "burlywood",
        padding: "10px",
        borderRadius: "5px",
        color: "white",
        fontWeight: "bold",
        fontSize: "1.5em",
        cursor: "pointer"
    });

    btn.on('click', box);

    $el('body').append(btn);
}


function box() {
    
    var $el = angular.element,
        popup = $el('' +
        '<div class="modal fade in" style="display:block;">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-body">' +
        '<p><label for="batUser">사용자</label> &nbsp; <input id="batUser" placeholder="이름"  type="text"/></p>' +
        '<p><label for="batPhone">연락처</label> &nbsp; <input id="batPhone" placeholder="010-0000-9999" type="text"/></p>' +
        '<p><label for="batRoom">회의실</label> &nbsp; <input id="batRoom" placeholder="E21_09" type="text"/></p>' +
        '<p><label for="batSubject">타이틀</label> &nbsp; <input id="batSubject" placeholder="회의 주제를 입력하세요." type="text"/></p>' +
        '<p><label for="batStart">시작시</label> &nbsp; <input id="batStart" placeholder="07:00 - 30분 단위" type="text"/></p>' +
        '<p><label for="batEnd">종료시</label> &nbsp; <input id="batEnd" placeholder="24:00 - 30분 단위" type="text"/></p>' +
        '<p><label for="batDate">예약일</label> &nbsp; <input id="batDate" placeholder="2016-07 or 2016-07-24" type="text"/></p>' +
        '<p><label for="batPassword">취소키</label> &nbsp; <input id="batPassword" placeholder="취소 비밀번호" type="text"/></p>' +
        '<p><input id="batReserve" type="button" value="예약"/> &nbsp; <input id="batClose" type="button" value="닫기"/></p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        ''),
        overlay = $el('<div class="fade modal-backdrop in"></div>'),
        historicUser,
        historicFloor,
        today = new Date();
    
    if (!!localStorage) {
        historicUser = JSON.parse(localStorage.getItem("embt.meeting.user"));
        historicFloor = localStorage.getItem("embt.meeting.floor");
        
        popup.find("#batUser").val(historicUser.name);
        popup.find("#batPhone").val(historicUser.phone);
        popup.find("#batRoom").val(historicFloor + "_");
        
    }
    
    popup.find("#batDate").val(""+today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate());
    
    popup.on("click", "#batReserve", action);
    popup.on("click", "#batClose", closer);
    popup.find("input[type=text]").css({ width: "80%" });


    $el('body').append(overlay).append(popup);

    return closer;


    ////////////////

    function getSlot(time) {
        var token = time.match(/^([0-9]{2}):([0-9]{2})$/);
        return parseInt(token[1]) * 2 + (token[2] == "30" ? 1 : 0);
    }

    function value() {

        var user = popup.find("#batUser").val(),
            phone = popup.find("#batPhone").val(),
            room = popup.find("#batRoom").val(),
            subject = popup.find("#batSubject").val(),
            start = popup.find("#batStart").val(),
            end = popup.find("#batEnd").val(),
            pw = popup.find("#batPassword").val();

        if (!user) {
            throw { msg : "사용자를 넣어주세요" };
        }

        if (!phone) {
            throw { msg : "연락처를 넣어주세요" };
        }

        if (!room || !/^[E|W][0-9]{2}_[0-9]{2}$/.test(room)) {
            throw { msg : "회의실은 E,W(층수)_(회의실번호) 입니다.\n예) E21_09" };
        }

        if (!subject) {
            throw { msg : "타이틀을 넣어주세요" };
        }

        if (!start || !/^(0[7-9]|1[0-9]|2[0-3]):(00|30)$/.test(start)) {
            throw { msg : "시작 시간은 [00:00] 형식의 30분단위로 넣어주세요\n(시작 07:00, 최소시작 23:30)" };
        }

        if (!end || !/^(07:30|(0[8-9]|1[0-9]|2[0-3]):(00|30)|24:00)$/.test(end)) {
            throw { msg : "종료 시간은 [00:00] 형식의 30분단위로 넣어주세요\n(최소종료 07:30, 종료 24:00)" };
        }

        if (getSlot(start) >= getSlot(end)) {
            throw { msg : "종료시간은 시작시간보다 빠르면 안돼요" };
        }

        if (!pw) {
            throw { msg : "비밀키를 넣어주세요" };
        }

        return {
            "user_name": user,
            "phone": phone,
            "room_id": room,
            "description": subject,
            "start_index": getSlot(start),
            "end_index": getSlot(end)-1,
            "password": pw
        };
    }

    function action() {

        var option,
            date,
            token;

        try {
            option = value();
            date = popup.find("#batDate").val();

            if (!date || !/^201[6-9]-(0[1-9]|1[0-2])(-[0-3][0-9])?$/.test(date)) {
                throw { msg : "예약일 혹은 예약월을 적어주세요.\n예) 2016-07 (월별), 2016-07-21 (일별)" };
            }

            token = date.match(/^([0-9]{4})-([0-9]{2})$/);

            if (token) {
                return getMonthlyMaker(option)(parseInt(token[1]), parseInt(token[2]));
            }

            return getMaker(option)(date);

        } catch (e) {
            alert(e.msg);
        }

        console.log(option);
    }

    function closer() {
        popup.remove();
        overlay.remove();
    }
}


ui();