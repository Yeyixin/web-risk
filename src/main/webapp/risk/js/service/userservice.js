/**
 * Created by Mr yu on 2017-07-08.
 */

service.service('userService', ['$rootScope','$q','$http', function($rootScope,$q,$http) {
    //请求参数处理------------------
    this.webroot = "/web-risk/";
    this.handleParams = function(params) {
        params = params ? params : {};
        return params;
    };

    //创建post请求-------------
    this.c_post = function(url,params) {
        var deferred = $q.defer();
        var url = this.webroot+url;
        var params = this.handleParams(params);
        var promise = $http.post(url, params);
        promise.then(
            // 通讯成功的处理
            function (answer) {
                //在这里可以对返回的数据集做一定的处理,再交由controller进行处理
                answer.status = true;
                deferred.resolve(answer.data);
            },
            // 通讯失败的处理
            function (error) {
                // 可以先对失败的数据集做处理，再交由controller进行处理
                error.status = false;
                deferred.reject(error);
            });
        //返回promise对象，交由controller继续处理成功、失败的业务回调
        return deferred.promise;
    };
    //创建get请求-------------
    this.c_get = function(url,params){
        var deferred = $q.defer();
        var url = this.webroot+url;
        var params = this.handleParams(params);
        var promise = $http.get(url, {
                params: params
            }
        );
        promise.then(
            // 通讯成功的处理
            function (answer) {
                //在这里可以对返回的数据集做一定的处理,再交由controller进行处理
                answer.status = true;
                deferred.resolve(answer.data);
            },
            // 通讯失败的处理
            function (error) {
                // 可以先对失败的数据集做处理，再交由controller进行处理
                error.status = false;
                deferred.reject(error);
            });
        //返回promise对象，交由controller继续处理成功、失败的业务回调
        return deferred.promise;
    };

    /*controller的接口*/

    /*查询所有用户信息*/
    this.getAll = function(params){
        var url = 'user/showUser';
        return this.c_get(url,params);
    };
    /*新增用户信息*/
    this.addUser = function(params){
        var url = 'user/addUser';
        return this.c_post(url,params);
    };
    /*批量删除*/
    this.delRows = function(params){
        var url = 'user/delUsers';
        return this.c_get(url,params);
    };
    /*删除一条数据*/
    this.delRow = function(params){
        var url = 'user/delUser';
        return this.c_post(url,params);
    };

    /*获取一条数据*/
    this.getUser = function(params){
        var url = 'user/getUser';
        return this.c_post(url,params);
    };

    /*更新一条数据*/
    this.updateUser = function(params){
        var url = 'user/updateUser';
        return this.c_post(url,params);
    };




}]);