"use strict";

angular.module("cambricon-forum").controller('homeController',
    ["$scope", "$http", "toastr", "localStorageService", "$uibModal","$state",
        function ($scope, $http, toastr, localStorageService, $uibModal,$state) {

            $scope.infoSideBarTemplate="infoSideBar/infoSideBar.template.html";

            $scope.nowTime=new Date().toISOString();
            $scope.username = localStorageService.get("username");
            $scope.topics=[];

            $scope.tmpTopics=[];

            $scope.getPartialTopics=function (offset) {
              $http.post(SERVER_URL+"/getIndex",{"offset":offset})
                  .then(function (response) {
                      $scope.tmpTopics=response.data;
                      Array.prototype.push.apply($scope.topics,$scope.tmpTopics);
                      /*if($scope.topics.length===0){
                          $scope.topics=$scope.tmpTopics;
                      }else{
                          Array.prototype.push.apply($scope.topics,$scope.tmpTopics);
                      }*/
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



            /**
             * @return {number}
             */
            $scope.getDateDiff=function (startDate,endDate)
            {
                var startTime = new Date(startDate).getTime();
                var endTime = new Date(endDate).getTime();
                return  parseInt(Math.abs((startTime - endTime)) / (1000 * 60 * 60 * 24));
            };

            $scope.openTopicEditor=function (topic) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/topicEditor/topicEditor.template.html',
                    controller: 'topicEditorController',
                    size: "lg",
                    resolve: {
                        items: function () {
                            return topic;
                        }
                    }
                });

                modalInstance.result.then(function (item) {
                    if(item==="delete" || item==="modify"){
                        $state.go("home",null,{"reload":true});
                    }
                    //toastr.info("请不要忘记保存修改!");
                }, function () {
                    //alert('Modal dismissed at: ' + new Date());
                });
            }
        }]);
