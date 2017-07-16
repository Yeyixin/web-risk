/**
 * Created by Administrator on 2017-07-10.
 */
app.controller('addUserModalCtrl',['$scope', '$http', '$uibModal', '$uibModalInstance','userService','SweetAlert',
    function ($scope, $http, $uibModal,$uibModalInstance,userService,SweetAlert) {
        $scope.cancel=function () {
            $uibModalInstance.dismiss('cancel');

        };
        $scope.title="添加人员";
        $scope.disabled = false;
        $scope.companys = {
            '公司-1': 1,
            '公司-2': 2,
            '公司-3': 3,
        };

        $scope.mycity = '北京';
        $scope.Cities = [{ id: 1, name: '北京' }, { id: 2, name: '上海' }, { id: 3, name: '广州' }];

        $scope.companyNo = 1;
        $scope.sex  = 0;
        $scope.submitForm=function () {
            if ($scope.submit_form.$valid) {
                var params = {
                    username:$scope.username,
                    userno:$scope.userno,
                    companyNo:$scope.companyId,
                    sex:$scope.sex,
                    age:$scope.age,
                    post:$scope.post,
                    tel:$scope.tel,
                    idcard:$scope.idcard,
                    degrees:$scope.degrees,
                    describ:$scope.describ,
                    address:$scope.address
                };
                userService.addUser(params).then(
                    function(result){
                        $scope.result=result;
                        SweetAlert.swal("操作成功", "", "success");
                    },function(){
                        SweetAlert.swal("操作失败", "", "error");
                    });
                $scope.cancel();
            } else {
                SweetAlert.swal("操作失败", "", "error");
            }

        };

        

    }]);