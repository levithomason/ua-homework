(function() {
    'use strict';

    angular.module('UAApp.Directives', []);

    var UADirectives = angular.module('UAApp.Directives');

    UADirectives
        .directive('input', function() {
            return {
                restrict: 'E',
                link: function(scope, elem, attrs) {
                    submitListener(elem);
                }
            };
        })
        .directive('textarea', function() {
            return {
                restrict: 'E',
                link: function(scope, elem, attrs) {
                    submitListener(elem);
                }
            };
        });

    function submitListener(elem) {
        elem.on('keydown', function(e) {
            if (e.which === 13 && e.metaKey) {
                elem.parents('form').find('[type="submit"]:not([disabled])').click();
            }
        });
    }

}());
