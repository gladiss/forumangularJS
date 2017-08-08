"use strict";
angular.module("cambricon-forum").controller("userReplyController",
    ["$scope", "$stateParams", "$http", "toastr", "$state", "localStorageService", function ($scope, $stateParams, $http, toastr, $state, localStorageService) {

        $("#userInfo").height(window.innerHeight*1.2);

        $scope.name = $stateParams.username;


        $scope.shows=[];
        $scope.page=0;

        $scope.beforePage = function(){
            $scope.page = $scope.page -1;
            if($scope.page<0){
                $scope.page = 0;
            }

            for (var i=0;i<($scope.replys.length>10?10:$scope.replys.length);i++){
                $scope.shows[i]=$scope.replys[$scope.page*10+i];
            }

            console.log($scope.shows);

        };
        $scope.afterPage = function(){
            $scope.page = $scope.page+1;
            if($scope.page >= $scope.replys.length.length/10)
            {
                $scope.page = $scope.page-1;
            }
            else {
                var  i=0;
                var s= $scope.replys.length-$scope.page*10;
                if (s < 10&&$scope.s>0){

                    while (s>0)
                    {

                        $scope.shows[i] = $scope.replys[$scope.page*10+i];
                        i++;
                        s--;
                    }
                    var j=10-i;
                    while (j>0){
                        $scope.shows[j--]=undefined;

                    }

                }
                else {
                    for (var i=0;i<($scope.replys.length>10?10:$scope.replys.length);i++){
                        $scope.shows[i]=$scope.replys[$scope.page*10+i];
                    }

                }

            }

            console.log($scope.shows);


        }







        $scope.toggleReply = function () {


            $http.post(SERVER_URL + "/comment/getCommentByUser", {"username": $stateParams["username"]})
                .then(function (response) {
                    $scope.replys = response.data;

                    $scope.shows=[];


                    for (var i=0;i<($scope.replys.length>10?10:$scope.replys.length);i++){
                        $scope.shows[i]=$scope.replys[$scope.page*10+i];
                    }


                })
                .catch(function (error) {
                    if (error.data) {
                        toastr.error(error.data);
                    } else {
                        toastr.error("连接服务器失败!");
                    }
                });




        };


        $scope.toggleReply();


    }
    ]);
