var gymUtils;

$(function () {

    (typeof global == 'undefined' ? window : global).gymUtils = gymUtils = {
        common : {
            layer : $('.filter_layer')
        },
        data : {},
        draw : {},
        func : {},
        view : {}
    };

    /* data */
    gymUtils.data.area = function () {

    };

    gymUtils.data.subway = function () {

    };

    /* view */
    gymUtils.view.typeInit = function () {

    };

    gymUtils.view.layerOpen = function () {
        gymUtils.common.layer.fadeIn(300);
    };

    gymUtils.view.layerClose = function () {
        gymUtils.common.layer.fadeOut(300);
    };

    gymUtils.view.layerInit = function () {

    };

});
