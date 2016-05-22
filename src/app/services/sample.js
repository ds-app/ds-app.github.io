require("app").value("Sample", {
    "2016-05-19": {
        "first": "2016-05-18T21:00:31.000Z",
        "last": "2016-05-19T17:38:31.000Z",
        "excepts": [{label: 0, time: 25}, {label: 1, time: 73}],
        "type": "8h"
    },
    "2016-05-20": {
        "first": "2016-05-20T00:00:23.000Z",
        "last": "2016-05-20T12:22:31.000Z",
        "excepts": [{label: 0, time: 25}, {label: 1, time: 53}],
        "type": "8h"
    }
}).value("Labels", {
    "0" : {
        name: "기타"
    },
    "1" : {
        name: "헬스",
        color: "#C05B4B"
    }
});