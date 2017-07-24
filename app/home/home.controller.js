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


            }
        }]);
