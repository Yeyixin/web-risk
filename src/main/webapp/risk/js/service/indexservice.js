/**
 * Created by Administrator on 2017-07-08.
 */

service.service('indexService', ['$rootScope','$q','$http', function($rootScope,$q,$http) {
    //请求参数处理------------------
    this.handleParams = function(params) {
        params = params ? params : {};
        return params;
    };

    this.c_get = function(url,params){
        var deferred = $q.defer();
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

    this.getTopArticle = function(params){
        var url = '/web-risk/index/getUser';
        return this.c_get(url,params);
    };




}]);