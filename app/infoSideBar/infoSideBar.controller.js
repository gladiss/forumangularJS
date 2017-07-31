"use strict";

angular.module("cambricon-forum").controller('infoSideBarController',
    ["$scope", "$http", "toastr", "localStorageService", "$uibModal", "$state", "$auth",
        function ($scope, $http, toastr, localStorageService, $uibModal, $state, $auth) {
            $scope.user = {};
            $scope.selectUserInfo = function () {

                $http.post(SERVER_URL + "/users/getUserInfo", {"username": $scope.username})
                    .then(function (response) {
                        $scope.user = response.data;

                    })
                    .catch(function (error) {
                        toastr.error(error.data.err);
                    });


            };


            $scope.refreshUserInfo=function () {
                if ($scope.logedIn) {
                    $scope.selectUserInfo();
                }
            };

            $scope.refreshUserInfo();

            $scope.getUserState=function () {
                $scope.username = localStorageService.get("username");
                $scope.logedIn = $auth.isAuthenticated();
                $scope.refreshUserInfo();

            };

            $scope.$on('userStateChange', function () {
                $scope.getUserState();
            });


            $scope.getUserState();





        }]);
