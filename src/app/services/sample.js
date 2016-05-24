require("app").value("Sample", {
    "2016-05-23": {
        "first": "2016-05-22T21:00:31.000Z",
        "last": "2016-05-23T17:38:31.000Z",
        "excepts": [{label: 0, time: 25}, {label: 1, time: 73}],
        "type": "8h"
    },
    "2016-05-24": {
        "first": "2016-05-24T00:00:23.000Z",
        "last": "2016-05-24T12:22:31.000Z",
        "excepts": [{label: 0, time: 25}, {label: 1, time: 53}],
        "type": "8h"
    },
    "2016-05-25": {
        "first": "2016-05-25T01:00:23.000Z",
        "last": "2016-05-25T07:22:31.000Z",
        "excepts": [{label: 0, time: 48}, {label: 1, time: 23}],
        "type": "4h"
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