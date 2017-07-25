"use strict";
angular.module("cambricon-forum").controller("userInfoController",
    ["$scope","$stateParams", "$http","toastr","$state","localStorageService",function($scope,$stateParams,$http,toastr,$state,localStorageService){

        $("#userInfo").height( window.innerHeight);

        $scope.name =$stateParams.username;
        $scope.loginname = localStorageService.get("username");

      $scope.selectUserInfo =function(){
          $scope.user ={};
          $http.post(SERVER_URL+"/users/getUserInfo",{"username":$stateParams["username"]})
              .then(function(response){
                  $scope.user = response.data;
                  console.log($scope.user.user_img);

              })
              .catch(function(error){
                  toastr.error(error.data.err);
              });


      }

                 $scope.visible = true;
                $scope.toggle=function(){
                $scope.visible = !$scope.visible;
                $("#update").hide();
                }


        $scope.update= function(){
              $http.post(SERVER_URL+"/users/updateUserInfo",$scope.user)
                  .then(function(response){
                      if (response.data.message =="OK") {
                          toastr.info("用户信息修改成功");
                          $state.go("userInfo",{"username":$stateParams["username"]},{"reload":true});
                      }
                  }).catch(function(error){
                  if (error.data) {
                      toastr.error(error.data.err);
                  } else {
                      toastr.error("连接服务器失败!");
                  }
              });
        }

       $scope.cancle = function($state,$stateParams){
          $state.go("userInfo",{"username":$stateParams["username"]})
       }

            $scope.selectUserInfo();

    }]);


