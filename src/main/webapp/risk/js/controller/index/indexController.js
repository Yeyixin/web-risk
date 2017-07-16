/**
 * Created by Administrator on 2017-07-07.
 */
//首页控制器
app.controller('indexController',['$scope', '$rootScope','$http',
    function($scope, $rootScope,$http){
    $scope.firstName = "John";
    $scope.lastName = "Doe";
        console.log($scope.lastName);
    }]);