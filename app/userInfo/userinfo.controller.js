"use strict";
angular.module("cambricon-forum").controller("userInfoController",
    ["$scope", "$stateParams", "$http", "toastr", "$state", "localStorageService", function ($scope, $stateParams, $http, toastr, $state, localStorageService) {

        $("#userInfo").height(window.innerHeight);

        $scope.name = $stateParams.username;
        $scope.loginname = localStorageService.get("username");

        $scope.user = {};
        $scope.userinfo = function () {


            $http.post(SERVER_URL + "/users/getUserInfo", {"username": $stateParams["username"]})
                .then(function (response) {
                    $scope.user = response.data;
                })
                .catch(function (error) {
                    toastr.error(error.data.err);
                });
        };
        $scope.visible = true;
        $scope.toggle = function () {
            $scope.visible = !$scope.visible;
            $("#update").toggle();
        };

        $scope.update = function () {
            $http.post(SERVER_URL + "/users/updateUserInfo", $scope.user)
                .then(function (response) {
                    if (response.data.message == "OK") {
                        toastr.info("用户信息修改成功");
                        $scope.toggle();
                        $scope.userinfo();
                    }
                }).catch(function (error) {
                        $scope.userinfo();
                if (error.data) {
                    toastr.error(error.data.err);
                } else {
                    toastr.error("连接服务器失败!");
                }
            });
        };

        $scope.cancel = function () {
            $scope.toggle();
            $scope.selectUserInfo();
        };

        $scope.userinfo();

        $scope.postImg = function(){



            var reader= new FileReader();

            var file =document.getElementById("inp").files[0];//获得input选择的图片文件

            reader.readAsDataURL(file);// base64 编码


            reader.addEventListener("load", function(e) {

                document.getElementById("img").src  = e.target.result;
                $scope.user.user_img = e.target.result;

            });



        }

    }
    ]);