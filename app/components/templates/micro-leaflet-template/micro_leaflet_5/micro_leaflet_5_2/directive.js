"use strict";
/**
 * author :陈雪冬
 * time: 2016年8月3日13:38:09
 * description:微传单五 反面
 */

define(["ionic"], function () {
    angular.module("MicroLeaflet5_2.directives", [])
        .directive("microLeaflet5by2", [
            "$window", "$timeout", "$rootScope", "microLeaflet5_2Service", "uploadImgService", "promptBarService", "maskService", "commonNetService", function ($window, $timeout, $rootScope, microLeaflet5_2Service, uploadImgService, promptBarService, maskService, commonNetService) {
                return {
                    restrict: 'EA',
                    templateUrl: "components/templates/micro-leaflet-template/micro_leaflet_5/micro_leaflet_5_2/template.html",
                    link: function (scope, iElement, iAttr) {

                        //status表明当前模板的状态：view（查看），preview（预览），edit（编辑）
                        function init(){
                            if (angular.equals(scope.templateModel, {}) || angular.isUndefined(scope.templateModel)) {
                                scope.sectionModel.templateModel = angular.copy(microLeaflet5_2Service.model);
                                scope.templateModel = scope.sectionModel.templateModel;
                            }
                            if( scope.status=="preview"){
                                microLeaflet5_2Service.setDownloadConfig(angular.copy(scope.templateModel));
                            }
                            scope.isEdit= scope.status=="edit"?true:false;

                            //背景图片
                            var docEl = document.documentElement;
                            iElement[0].getElementsByClassName("bgPan")[0].style.height = "" + docEl.clientHeight + "px";

                           

                        }
                        init();



                        //图片比例
                        scope.imgAspectRatio = [1];
                        scope.upLoadFinish = function (url) {
                            $timeout(function () {
                                scope.$apply(function () {
                                    scope.templateModel.imageUrl[scope.imgIndex] = url;
                                })
                            });
                        };
                        scope.updateImg = function (imgIndex) {
                            if (!scope.isEdit) {
                                return
                            }
                            scope.imgIndex = imgIndex;
                            uploadImgService.upLoadImg(microLeaflet5_2Service.getConfigByAspectRatio(scope.imgAspectRatio[imgIndex]), 1, scope.upLoadFinish);
                        };

                        scope.inputconfig = [
                             {
                                width: 360,
                                height: 40,
                                fontSize: 38
                            },
                            {
                                width: 430,
                                height: 720,
                                fontSize: 16
                            },
                            {
                                width: 200,
                                height: 140,
                                fontSize: 22
                            }
                        ];


                    }

                }
            }]
    )

});
