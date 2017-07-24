"use strict";
/**
 * Created by MapleFater on 2016/7/18.
 */
angular.module("cambricon-forum").controller("registerController",
    ["$scope", "toastr", "$stateParams", "$auth", "$state", "$http",
        function ($scope, toastr, $stateParams, $auth, $state, $http) {
            $("#wrap").height(window.innerHeight);

            $scope.reset = $stateParams.reset;

            $scope.registerInfo = {};

            $scope.requestSmsCode = function () {
                /*Bmob.Sms.requestSmsCode({"mobilePhoneNumber": $scope.registerInfo.username} ).then(function(obj) {
                 toastr.info("验证码发送成功");
                 }, function(err){
                 toastr.error("验证码发送失败");
                 });*/
                $http.post(SERVER_URL + "/sendmsg",
                    {"username": $scope.registerInfo.username}).then(
                    function (response) {
                        toastr.info("发送成功");
                    }
                ).catch(function (error) {
                    if (error.data) {
                        toastr.error(error.data.err);
                    } else {
                        toastr.error("连接服务器失败!");
                    }
                });


            };

            $scope.mySubmit = function () {
                console.log($scope.registerInfo);
                if ($scope.reset) {
                    $scope.resetPassword();
                } else {
                    $scope.register();
                }

            };


            $scope.resetPassword = function () {
                $auth.signup($scope.registerInfo, {url: SERVER_URL + "/findpass"}).then(
                    function (response) {
                        if (response.data=="ok") {
                            toastr.info("修改成功,请登录");
                            $state.go("login");
                        }

                    }, function (error) {
                        if (error.data) {
                            toastr.error(error.data.err);
                        } else {
                            toastr.error("连接服务器失败!");
                        }
                    }
                );
            }

            $scope.register = function () {
                $auth.signup($scope.registerInfo, {url: SERVER_URL + "/users/signUp"}).then(
                    function (response) {
                        if (response.data.message != undefined) {
                            toastr.info("注册成功,请登录");
                            $state.go("login");
                        }

                    }, function (error) {
                        if (error.data) {
                            toastr.error(error.data.err);
                        } else {
                            toastr.error("连接服务器失败!");
                        }
                    }
                );

                /*Bmob.Sms.verifySmsCode($scope.registerInfo.username, $scope.registerInfo.code).then(function(obj) {
                 //todo:注册逻辑

                 }, function(err){
                 toastr.error("验证码错误");
                 });*/
            }
        }
    ]);