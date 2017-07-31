"use strict";

angular.module("cambricon-forum").controller('appController',
    ["$scope", "$http", "toastr", "localStorageService", "$uibModal", "$state","$auth",
        function ($scope, $http, toastr, localStorageService, $uibModal, $state,$auth) {

            var getLoginPartial = function(){
                var random = Math.random();
                return "loginPartial/loginPartial.template.html?r=" + random;
            };
            $scope.loginPartial = getLoginPartial();

            $scope.$on('userStateChange', function(){
                $scope.loginPartial = getLoginPartial();
            });




        }]);
