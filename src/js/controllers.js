(function() {
    'use strict';

    angular.module('UAApp.Controllers', []);

    var UAControllers = angular.module('UAApp.Controllers');

    UAControllers
        .controller('UAMainController', ['$scope', function($scope) {
            $scope.initialized = false;

            $scope.init = function() {
                $scope.MAX_BYTES = 256;
                $scope.initMessage();
                $scope.mockMessageData();
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

                $scope.message.bytesRemaining = function() {
                    return $scope.MAX_BYTES - $scope.lengthInUtf8Bytes($scope.message.body);
                };
            };

            $scope.submitMessage = function() {
                if ($scope.message.is_scheduled) {
                    $scope.scheduledMessages.unshift($scope.message);
                }

                if (!$scope.message.is_scheduled) {
                    $scope.sentMessages.unshift($scope.message);
                }
                $scope.initMessage();
            };

            $scope.saveMessageDraft = function() {
                $scope.draftMessages.unshift($scope.message);
                $scope.initMessage();
            };

            $scope.editDraft = function(index) {
                $scope.message = $scope.draftMessages[index];
                $scope.draftMessages.splice(index);
            };

            $scope.mockMessageData = function() {
                $scope.sentMessages = [
                    {
                        title: 'RSPV for tech meetups',
                        body: 'See what is going on in the Portland tech community.',
                        is_scheduled: false,
                        target_android: true,
                        target_ios: true
                    },
                    {
                        title: 'Example Scheduled Message',
                        body: 'This message was scheduled, not instant.',
                        is_scheduled: true,
                        date: '8/9/14',
                        time: '9am',
                        target_android: true,
                        target_ios: false
                    }
                ];

                $scope.draftMessages = [
                    {
                        title: 'Click to Edit',
                        body: 'Try adding a location...',
                        is_scheduled: false,
                        target_android: false,
                        target_ios: true
                    }
                ];

                $scope.scheduledMessages = [
                    {
                        title: 'I will be sent later',
                        body: 'Checkout the badge in the upper right.',
                        is_scheduled: true,
                        date: '9/13/14',
                        time: '9am',
                        location: 'Portland, OR',
                        target_android: true,
                        target_ios: true
                    }
                ];
            };

            // UTF-8 byte size calc
            // http://stackoverflow.com/questions/5515869/string-length-in-bytes-in-javascript
            $scope.lengthInUtf8Bytes = function(str) {
                if (str) {
                    var m = encodeURIComponent(str).match(/%[89ABab]/g);
                    return str.length + (m ? m.length : 0);
                }

                return 0;
            };

        }]);
}());
