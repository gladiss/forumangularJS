"use strict";
angular.module("cambricon-forum").controller('shareController',
    ["$scope", "$http", "toastr", "localStorageService", "$uibModal", "$stateParams", "$state","Upload",
        function ($scope, $http, toastr, localStorageService, $uibModal, $stateParams, $state,Upload) {
            $scope.serverurl=SERVER_URL;
            $scope.downloads=[];
            $scope.getDownloadList = function () {
                $http.post(SERVER_URL + "/file/getFileList", {})
                    .then(function (response) {
                            $scope.downloads=response.data;
                    })
                    .catch(function (error) {
                        toastr.error(error.data.err);
                    });

            };

            $scope.getDownloadList();


            $scope.newFile={};

            $scope.upload = function (file) {
                $scope.newFile.file=file;


                Upload.upload({
                    url: SERVER_URL+'/file/upload',
                    data: $scope.newFile
                }).then(function (resp) {
                    toastr.info("上传成功");
                    $scope.getDownloadList();
                    //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                }, function (resp) {
                    //console.log('Error status: ' + resp.status);
                }, function (evt) {
                    //var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });



            };


        }]);

