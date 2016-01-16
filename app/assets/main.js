/**
 * Created by chris on 16.01.2016.
 */
'use strict';

angular.module('myApp', [
    'myApp.mainView'
]);

angular.module('myApp.mainView', [])

    .controller('MainCtrl', function($scope, $http) {

        $scope.showModalNewGame = false;

        $scope.toggleModalNewGame = function(){
            $scope.showModalNewGame = !$scope.showModalNewGame;
        };

        $scope.clickField = function(x, y) {
            $http.get('/click' + addParam(1) + addParam(x) + addParam(y)).then(
                function(response) {
                    window.location.reload();
                }
            );
            console.log("Click Field: " + x + "," + y );
        };

        $scope.flagField = function(x, y) {
            $http.get('/click' + addParam(3) + addParam(x) + addParam(y)).then(
                function(response) {
                    window.location.reload();
                }
            );
            console.log("Flag Field: " + x + "," + y );
        };

        $scope.startNewGame = function(name, x, y, mines) {
            $http.get('/newGame' + addParam(name) + addParam(x) + addParam(y) + addParam(mines)).then(
                function(response) {
                    window.location.reload();
                }
            );
            console.log("Start New Game: " + name + " Size: " + x + " x " + y + " with Mines: " + mines);
        };

        function addParam(param) {
            return "/" + param;
        }
    })

    .directive('ngRightClick', function($parse) {
        return function(scope, element, attrs) {
            var fn = $parse(attrs.ngRightClick);
            element.bind('contextmenu', function(event) {
                scope.$apply(function() {
                    event.preventDefault();
                    fn(scope, {$event:event});
                });
            });
        };
    })

    .directive('modal', function () {
        return {
            template: '<div class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">{{ title }}</h4>' +
            '</div>' +
            '<div class="modal-body" ng-transclude></div>' +
            '</div>' +
            '</div>' +
            '</div>',
            restrict: 'E',
            transclude: true,
            replace:true,
            scope:true,
            link: function postLink(scope, element, attrs) {
                scope.title = attrs.title;

                scope.$watch(attrs.visible, function(value){
                    if(value == true)
                        $(element).modal('show');
                    else
                        $(element).modal('hide');
                });

                $(element).on('shown.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = true;
                    });
                });

                $(element).on('hidden.bs.modal', function(){
                    scope.$apply(function(){
                        scope.$parent[attrs.visible] = false;
                    });
                });
            }
        };
    });

;