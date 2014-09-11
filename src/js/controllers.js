(function() {
    'use strict';

    angular.module('UAApp.Controllers', []);

    var UAControllers = angular.module('UAApp.Controllers');

    UAControllers
        .controller('UAMainController', ['$scope', function($scope) {
            $scope.initialized = false;

            $scope.init = function() {
                $scope.initMessage();
                $scope.initialized = true;
            };

            $scope.initMessage = function() {
                $scope.message = {
                    title: '',
                    body: '',
                    is_scheduled: false,
                    target_android: true,
                    target_ios: true
                };
            };

        }]);

}());
