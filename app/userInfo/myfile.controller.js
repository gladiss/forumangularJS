"use strict";
angular.module("cambricon-forum").controller("userFileController",
    ["$scope", "$stateParams", "$http", "toastr", "$state", "localStorageService", function ($scope, $stateParams, $http, toastr, $state, localStorageService) {

        $("#userInfo").height(window.innerHeight);

        $scope.name = $stateParams.username;



        $scope.shows=[];
        $scope.page=0;

        $scope.beforePage = function(){
            $scope.page = $scope.page -1;
            if($scope.page<0){
                $scope.page = 0;
            }

            for (var i=0;i<( $scope.files.length>10?10: $scope.files.length);i++){
                $scope.shows[i]= $scope.files[$scope.page*10+i];
            }

            console.log($scope.shows);

        };
        $scope.afterPage = function(){
            $scope.page = $scope.page+1;
            if($scope.page >=  $scope.files.length.length/10)
            {
                $scope.page = $scope.page-1;
            }
            else {
                var  i=0;
                var s=  $scope.files.length-$scope.page*10;
                if (s < 10&&$scope.s>0){

                    while (s>0)
                    {

                        $scope.shows[i] =  $scope.files[$scope.page*10+i];
                        i++;
                        s--;
                    }
                    var j=10-i;
                    while (j>0){
                        $scope.shows[j--]=undefined;

                    }

                }
                else {
                    for (var i=0;i<( $scope.files.length>10?10: $scope.files.length);i++){
                        $scope.shows[i]= $scope.files[$scope.page*10+i];
                    }

                }

            }

            console.log($scope.shows);


        }



        $scope.toggleFile = function () {


            $http.post(SERVER_URL + "/file/getFileByUser", {"username": $stateParams["username"]})
                .then(function (response) {
                    $scope.files = response.data;
                    for (var i=0;i<( $scope.files.length>10?10: $scope.files.length);i++){
                        $scope.shows[i]= $scope.files[$scope.page*10+i];
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


        $scope.toggleFile();

    }
    ]);