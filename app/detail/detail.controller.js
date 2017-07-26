"use strict";
angular.module("cambricon-forum").controller('detailController',
    ["$scope", "$http", "toastr", "localStorageService", "$uibModal", "$stateParams","$state",
        function ($scope, $http, toastr, localStorageService, $uibModal, $stateParams,$state) {

            $scope.newComment={};


            $scope.nowTime=new Date().toISOString();
            $scope.topic = {};
            $scope.username = localStorageService.get("username");
            $scope.comments = [];


            $http.post(SERVER_URL + "/forum/getForumById", {"f_id": $stateParams["id"]})
                .then(function (response) {
                    $scope.topic = response.data.forum;
                    $scope.comments = response.data.comment;


                    $scope.newComment.f_id=$scope.topic.f_id;

                })
                .catch(function (error) {
                    toastr.error(error.data.err);
                });



            $scope.quill = new Quill('#topic-new-editor', {
                modules: {
                    toolbar: {
                        container: '#topic-new-toolbar'
                    }
                },
                theme:"snow"
            });


            $scope.submitNewComment=function(){

                $scope.newComment.content=$scope.quill.root.innerHTML;
                $http.post(SERVER_URL+"/comment/createComment",$scope.newComment)
                    .then(function(response){
                        toastr.info("发表成功");
                        $state.go("detail",{"id":$scope.newComment.f_id},{reload:true});
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

