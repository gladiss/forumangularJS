"use strict";
/**
 * Created by MapleFater on 2016/7/13.
 */
angular.module("cambricon-forum",
    ['ngAnimate', 'ngTouch', 'ngResource', 'ui.router', "ngSanitize", 'toastr', 'satellizer', 'ui.bootstrap',"ngFileUpload", 'angular-loading-bar', 'LocalStorageModule', 'angular-carousel', 'monospaced.qrcode', 'colorpicker.module']);


//app.directive

angular.module("cambricon-forum").directive('onScrollToBottom', ["$document",function ($document) {
    //This function will fire an event when the container/document is scrolled to the bottom of the page
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var doc = angular.element($document)[0].body;

            $document.bind("scroll", function () {

                //console.log('in scroll');
                //console.log("scrollTop + offsetHeight:" + (doc.scrollTop + doc.offsetHeight));
                //console.log("scrollHeight: " + doc.scrollHeight);

                if (doc.scrollTop + window.innerHeight >= doc.scrollHeight) {
                    //run the event that was passed through
                    scope.$apply(attrs.onScrollToBottom);
                }
            });
        }
    };
}]);

//CONST
var SERVER_URL = "http://118.89.103.204:3000";
var ONLINE_MODE = true;