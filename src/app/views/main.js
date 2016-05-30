require("app")
    .directive("dsMain", MainDirective);



/* @ngInject */
function MainCtrl($rootScope, Storage) {

    var main = this;
    
    main.data = Storage.load();
    main.today = today;
    
    ////////////////////////////
    
    function today() {
        main.flag = true;
        $rootScope.$emit("$today");
    }
}


/* @ngInject */
function MainDirective() {
    return {
        restrict : "E",
        templateUrl : "views/main.tpl.html",
        controller : MainCtrl,
        controllerAs : "main"
    }
}