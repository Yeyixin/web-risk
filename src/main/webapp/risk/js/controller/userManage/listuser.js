/**
 * Created by My yu on 2017-07-10.
 */

//用户信息管理控制器
app.controller('userController',['$scope', '$http','$filter','$state','$stateParams','$uibModal','userService','SweetAlert',
    function($scope, $http,$filter,$state,$stateParams,$uibModal,userService,SweetAlert){
        /*初始化数据*/

        $scope.root={};
        $scope.rowlist = [];
        $scope.pagination = {
            totalCount: 0,
            totalPage: 0,
            pageSize: 10,
            currentPage: 1,
            PageSizeList: [5, 10, 30]
        };

        //改变每页显示数量
        $scope.changePageSize = function(_pageSize){
            $scope.pagination.pageSize = _pageSize;
            $scope.pagination.currentPage = 1;
            $scope.queryList();
        };


        $scope.queryList = function() {
            var params = {
                username:$scope.userName,
                userno:$scope.userNo,
                pageNo: $scope.pagination.currentPage,
                pageSize: $scope.pagination.pageSize
            };
            userService.getAll(params).then(
                function(result){
                    $scope.pagination.totalCount=result.totalCount;
                    $scope.pagination.totalPage = result.totalPage;
                    $scope.pagination.pageSize = result.pageSize;
                    $scope.pagination.currentPage = result.pageNo;
                    $scope.root.data = result.data;
                },function(){
                    //alertService.newAlert('加载信息失败！','danger');
            });
        };
        

        $scope.queryList();

        //添加人员
        $scope.addUser=function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'adduser.html',
                controller: 'addUserModalCtrl'
            });
            modalInstance.result.then(function (result) {},function (reason) {
                $scope.queryList();
            });
        };
        //批量删除
        $scope.delRows = function(){
            if($scope.checked.length<0||$scope.checked.length===0){
                SweetAlert.swal("至少选择一条记录，再做删除","","warning");
            }else{
                var params = {
                    ids:$scope.checked
                };
                userService.delRows(params).then(
                    function(result){
                        if(result){
                            $scope.queryList();
                            SweetAlert.swal("操作成功", "", "success");
                        }else{
                            SweetAlert.swal("操作失败", "", "error");
                        }
                });
            }
        };
        //删除
        $scope.delRow = function(id){
            var params = {
                id:id
            };
            userService.delRow(params).then(
                function(result){
                    if(result){
                        $scope.queryList();
                        SweetAlert.swal("操作成功", "", "success");
                    }else{
                        SweetAlert.swal("操作失败", "", "error");
                    }
                });
        };

        //编辑
        $scope.editRow = function(id){
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'adduser.html',
                controller: 'updateUserModalCtrl',
                resolve: {
                    id: id
                }
            });
            modalInstance.result.then(function (result) {},function (reason) {
                $scope.queryList();
            });

        };

        //详情
        $scope.showRow = function(id){
            console.log("人员详情:"+id);
        };

        //多选

        $scope.m = [];
        $scope.checked = [];
        $scope.selectOne = function (select) {
            angular.forEach($scope.m , function (i, id) {
                var index = $scope.checked.indexOf(id);
                if(i && index === -1) {
                    $scope.checked.push(id);
                } else if (!i && index !== -1){
                    $scope.checked.splice(index, 1);
                }
            });
            if ($scope.root.data.length === $scope.checked.length) {
                $scope.select_all = true;
            } else {
                $scope.select_all = false;
            }
        };




    }]);
