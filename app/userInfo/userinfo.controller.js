"use strict";
angular.module("cambricon-forum").controller("userInfoController",
    ["$scope", "$stateParams", "$http", "toastr", "$state", "localStorageService", function ($scope, $stateParams, $http, toastr, $state, localStorageService) {

        $("#userInfo").height(window.innerHeight*2);

        $scope.name = $stateParams.username;
        $scope.loginname = localStorageService.get("username");

        $scope.user = {};
        $scope.userinfo = function(){
            $("#myinfo").show();
            $("#myreply").hide();
            $("#myarticle").hide();
            $("#myfile").hide();
            $("#file").removeClass("fontcolor");
            $("#reply").removeClass("fontcolor");
            $("#subject").removeClass("fontcolor");
            $("#person").addClass("fontcolor");
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
                        $scope.selectUserInfo();
                    }
                }).catch(function (error) {
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


        $scope.toggleArticle = function () {
            $("#myarticle").show();
            $("#reply").removeClass("fontcolor");
            $("#person").removeClass("fontcolor");
            $("#file").removeClass("fontcolor");
            $("#subject").addClass("fontcolor");
            $("#myreply").hide();
            $("#myinfo").hide();
            $("#myfile").hide();
            $scope.mytopiclist();

        };
        $scope.toggleReply =function(){
            $("#person").removeClass("fontcolor");
            $("#subject").removeClass("fontcolor");
            $("#file").removeClass("fontcolor");
            $("#reply").addClass("fontcolor");
            $("#myreply").show();
            $("#myarticle").hide();
            $("#myinfo").hide();
            $("#myfile").hide();
            $http.post(SERVER_URL + "/comment/getCommentByUser", {"username": $stateParams["username"]})
                .then(function (response) {
                    $scope.replys = response.data;
                })
                .catch(function (error) {
                    if (error.data) {
                        toastr.error(error.data);
                    } else {
                        toastr.error("连接服务器失败!");
                    }
                });
        };
        $scope.toggleFile =function(){
            $("#person").removeClass("fontcolor");
            $("#subject").removeClass("fontcolor");
            $("#reply").removeClass("fontcolor");
            $("#file").addClass("fontcolor")
            $("#myreply").hide();
            $("#myarticle").hide();
            $("#myinfo").hide();
            $("#myfile").show();
            $http.post(SERVER_URL + "/file/getFileByUser", {"username": $stateParams["username"]})
                .then(function (response) {
                    $scope.files = response.data;
                })
                .catch(function (error) {
                    if (error.data) {
                        toastr.error(error.data);
                    } else {
                        toastr.error("连接服务器失败!");
                    }
                });
        };

        $scope.mytopiclist = function () {
            $http.post(SERVER_URL + "/forum/getForumByUser", {"username": $stateParams["username"]})
                .then(function (response) {
                    $scope.articles = response.data;
                })
                .catch(function (error) {
                    if (error.data) {
                        toastr.error(error.data.err);
                    } else {
                        toastr.error("连接服务器失败!");
                    }
                });


        };
        $scope.mytopiclist();
    }
    ]);