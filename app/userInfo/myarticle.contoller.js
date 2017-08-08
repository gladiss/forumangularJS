"use strict";
angular.module("cambricon-forum").controller("userArticleController",
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

            for (var i=0;i<($scope.articles.length>10?10:$scope.articles.length);i++){
                $scope.shows[i]=$scope.articles[$scope.page*10+i];
            }
            console.log($scope.shows);

        };
        $scope.afterPage = function(){
            $scope.page = $scope.page+1;
            if($scope.page >= $scope.articles.length/10)
            {
                $scope.page = $scope.page-1;
            }
            else {
                var  i=0;
                var s= $scope.articles.length-$scope.page*10;
                if (s < 10&&$scope.s>0){

                  while (s>0)
                  {

                      $scope.shows[i] = $scope.articles[$scope.page*10+i];
                      i++;
                      s--;
                  }
                    var j=10-i;
                  while (j>0){
                      $scope.shows[j--]=undefined;

                  }

                }
                else {
                    for (var i=0;i<($scope.articles.length>10?10:$scope.articles.length);i++){
                        $scope.shows[i]=$scope.articles[$scope.page*10+i];
                    }
                }

            }

            console.log($scope.shows);


            }









        $scope.mytopiclist = function () {
            $http.post(SERVER_URL + "/forum/getForumByUser", {"username": $stateParams["username"]})
                .then(function (response) {
                    $scope.articles = response.data;

                    $scope.shows=[];

                    for (var i=0;i<($scope.articles.length>10?10:$scope.articles.length);i++){
                        $scope.shows[i]=$scope.articles[i];
                    }


                }).catch(function (error) {
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