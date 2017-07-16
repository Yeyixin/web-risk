/**
 * Created by Administrator on 2017-07-15.
 */
app.directive('myDirective', function () {
    return {
        restrict: 'EAC',
        template: function (elem, attr) {
            return "<a href='" + attr.value + "'>" + attr.text + "</a>";
        }
    };
});