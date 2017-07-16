/**
 * Created by Administrator on 2017-07-15.
 */

app.config(function($httpProvider,$stateProvider, $urlRouterProvider, $locationProvider, $uiViewScrollProvider) {
    $stateProvider.state('userlist', {
        url: '/userlist',
        templateUrl: 'views/userManage/list.html',
        controller: 'userController'

    })

});
