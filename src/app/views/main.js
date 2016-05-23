require("app")
    .directive("dsMain", MainDirective);



/* @ngInject */
function MainCtrl(Storage) {

    var main = this;
    
    main.data = Storage.load();
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