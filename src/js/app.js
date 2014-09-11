(function() {
    'use strict';

    angular.module('UAApp',[
        'UAApp.Controllers',

        'monospaced.elastic'
    ]);

    var UAApp = angular.module('UAApp');

    UAApp.config(['msdElasticConfig', function(config) {
        config.append = '\n\n';
    }]);

}());
