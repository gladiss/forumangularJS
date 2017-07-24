"use strict";
angular.module("cambricon-forum").controller('detailController',
    ["$scope", "$http", "toastr", "localStorageService", "$uibModal", "$stateParams",
        function ($scope, $http, toastr, localStorageService, $uibModal, $stateParams) {

            $scope.newComment={};

            $scope.topic = {};
            $scope.username = localStorageService.get("username");
            $scope.comment = [];



            $http.post(SERVER_URL + "/forum/getForumById", {"f_id": $stateParams["id"]})
                .then(function (response) {
                    $scope.topic = response.data.forum;
                    $scope.comment = response.data.comment;
                    $("#topic-content").html($scope.topic.content);

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


            }

        }]);

