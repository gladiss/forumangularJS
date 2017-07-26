"use strict";

angular.module("cambricon-forum").controller('homeController',
    ["$scope", "$http", "toastr", "localStorageService", "$uibModal","$state",
        function ($scope, $http, toastr, localStorageService, $uibModal,$state) {
            $scope.quill = new Quill('#topic-new-editor', {
                modules: {
                    toolbar: {
                        container: '#topic-new-toolbar'
                    }
                },
                theme:"snow"
            });
            $scope.newTopic={};
            $scope.nowTime=new Date().toISOString();

            $scope.topics=[];

            $scope.tmpTopics=[];

            $scope.getPartialTopics=function (offset) {
              $http.post(SERVER_URL+"/getIndex",{"offset":offset})
                  .then(function (response) {
                      $scope.tmpTopics=response.data;
                      if($scope.topics.length===0){
                          $scope.topics=$scope.tmpTopics;
                      }else{
                          Array.prototype.push.apply($scope.topics,$scope.tmpTopics);
                      }
                  }).catch(function (err) {
                  toastr.error(error.data.err);
              })
            };
            //first load
            $scope.getPartialTopics(null);



            $scope.loadMore=function () {
                if($scope.topics.length>0){
                    $scope.getPartialTopics($scope.topics[$scope.topics.length-1].updated_at);


                }

            };

            $scope.submitNewTopic=function(){

                $scope.newTopic.content=$scope.quill.root.innerHTML;
                $http.post(SERVER_URL+"/forum/createForum",$scope.newTopic)
                .then(function(response){
                    toastr.info("发表成功");
                    $state.go("detail",{"id":response.data.f_id});
                })
                .catch(function(error){
                    toastr.error(error.data.err);
                });


            };

            /**
             * @return {number}
             */
            $scope.getDateDiff=function (startDate,endDate)
            {
                var startTime = new Date(startDate).getTime();
                var endTime = new Date(endDate).getTime();
                return  parseInt(Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24));
            }
        }]);
