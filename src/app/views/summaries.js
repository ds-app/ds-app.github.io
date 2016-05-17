require("app")
    .directive("dsSummaries", SummariesDirective);



/* @ngInject */
function SummariesCtrl() {
    var summaries = this;
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