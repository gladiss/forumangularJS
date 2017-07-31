"use strict";

angular.module("cambricon-forum").controller('loginPartialController',
    ["$scope", "$http", "toastr", "localStorageService", "$uibModal", "$state","$auth","$rootScope",
        function ($scope, $http, toastr, localStorageService, $uibModal, $state,$auth,$rootScope) {

            $scope.username=localStorageService.get("username");
            $scope.logedIn=$auth.isAuthenticated();


            $scope.logout=function () {

                $auth.logout();
                $rootScope.$broadcast('userStateChange');
                toastr.info("您已退出登录");
            }
        }]);
