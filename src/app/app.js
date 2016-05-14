module.exports = angular.module("DongsuApp", [
    'templates-html',
    'ngTouch',
    'rx'
]).config(/* @ngInject */ function ($compileProvider, $httpProvider) {
    $compileProvider.debugInfoEnabled(false);
    $httpProvider.useApplyAsync(true);
});