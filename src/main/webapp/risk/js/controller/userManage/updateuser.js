/**
 * Created by Administrator on 2017-07-10.
 */
app.controller('updateUserModalCtrl',['$scope', '$http', '$uibModal', '$uibModalInstance','userService','SweetAlert','id',
    function ($scope, $http, $uibModal,$uibModalInstance,userService,SweetAlert,id) {
        $scope.cancel=function () {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.disabled = true;
        $scope.title="更新人员";
        $scope.companys = {
            '公司-1': 1,
            '公司-2': 2,
            '公司-3': 3,
        };
        var params = {
            id:id
        };
        userService.getUser(params).then(
            function(result){
                if (result && result !== null) {
                    $scope.username = result.username===null?"":result.username;
                    $scope.userno = result.userno===null?"":result.userno;
                    $scope.sex = result.sex===null?"":result.sex;
                    $scope.age = result.age===null?"":result.age;
                    $scope.post = result.post===null?"":result.post;
                    $scope.tel = result.tel===null?"":result.tel;
                    $scope.idcard = result.idcard===null?"":result.idcard;
                    $scope.degrees = result.degrees===null?"":result.degrees;
                    $scope.describ = result.describ===null?"":result.describ;
                    $scope.address = result.address===null?"":result.address;
                } else {
                    SweetAlert.swal("数据加载失败", "", "error",function(){
                        $scope.cancel();
                    });
                }
            }
        );

        /*$scope.username=
        $scope.userno=
        $scope.sex=
        $scope.age=
        $scope.post=
        $scope.tel=
        $scope.idcard=
        $scope.degrees=
        $scope.describ=
        $scope.address=*/

       /* $scope.commit=function () {
            var params = {
                username:$scope.username,
                userno:$scope.userno,
                sex:$scope.sex,
                age:$scope.age,
                post:$scope.post,
                tel:$scope.tel,
                idcard:$scope.idcard,
                degrees:$scope.degrees,
                describ:$scope.describ,
                address:$scope.address
            };

            userService.updateUser(params).then(
                function(result){
                    SweetAlert.swal("操作成功", "", "success");
                    $scope.cancel();
                },function(){
                    SweetAlert.swal("操作失败", "", "error");
            });

        };*/

        $scope.submitForm=function () {
            if ($scope.submit_form.$valid) {
                var params = {
                    id:id,
                    username:$scope.username,
                    sex:$scope.sex,
                    age:$scope.age,
                    post:$scope.post,
                    tel:$scope.tel,
                    idcard:$scope.idcard,
                    degrees:$scope.degrees,
                    describ:$scope.describ,
                    address:$scope.address
                };
                userService.updateUser(params).then(
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