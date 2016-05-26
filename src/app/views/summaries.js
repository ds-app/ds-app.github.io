require("app")
    .directive("dsSummaries", SummariesDirective);


var INFO = [{
    title: "출근",
    offset: 0
},{
    title: "전반 종료",
    offset: 8 * 30
},{
    title: "후반 시작",
    offset: 9 * 30
},{
    title: "중요 시점",
    offset: 16 * 30
},{
    title: "후반 종료",
    offset: 18 * 30
},{
    title: "추가 2시간",
    offset: 22 * 30,
    except: true
},{
    title: "추가 4시간",
    offset: 26 * 30,
    except: true
},{
    title: "추가 6시간",
    offset: 30 * 30,
    except: true
}];

var HOLI_INFO = [{
    title: "근무 4시간",
    offset: 8 * 30,
    except: true
},{
    title: "근무 6시간",
    offset: 12 * 30,
    except: true
},{
    title: "근무 8시간",
    offset: 16 * 30,
    except: true
}];


/* @ngInject */
function SummariesCtrl($scope, Storage, Time) {
    var summaries = this,
        today = Storage.today(),
        WORK_TYPE = Time.WORK_TYPE;
    
    summaries.flip = true;
    summaries.list = getInfo();
    
    $scope.$watch(() => today.type, () => {
        summaries.list = getInfo();
    });
    
    /////////////////////////////////
    
    function getInfo() {
        
        var base = (today.type == WORK_TYPE.HOLIDAY) ? HOLI_INFO : INFO;
        
        return _.map(base, info => {
            return {
                title: info.title,
                time: () => {
                    var m = moment(today.first).add(info.offset, 'm');
                    
                    if (info.except) {
                        m.add(getExceptTime(), 'm');
                    }
                    
                    return m.toISOString();
                }
            };
        });
    }
    
    function getExceptTime() {
        return _.sumBy(today.excepts, 'time');
    }
}


/* @ngInject */
function SummariesDirective() {
    return {
        restrict : "E",
        templateUrl : "views/summaries.tpl.html",
        controller : SummariesCtrl,
        controllerAs : "summaries"
    }
}