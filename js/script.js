$(function () {

    window.gymUtils = gymUtils = {
        common: {
            layer: $('.filter_layer'),
            tag: []
        },
        data: {},
        draw: {},
        func: {},
        view: {}
    };

    /**
     * data
     */
    gymUtils.data.dataInit = function (type) { // 데이터 세팅
        var resultUrl = 'http://localhost:3000/';
        type == 'area' ? resultUrl += 'area' : resultUrl += 'subway';

        $.ajax({
            url: resultUrl
        }).done(function (data) {
            if (data.length > 0) {
                if (type == 'area') {
                    gymUtils.data.area = gymUtils.func.customData('area', data);
                } else {
                    gymUtils.data.subway = gymUtils.func.customData('subway', data);
                }
            }
        });
    };


    /**
     * func
     */
    gymUtils.func.customData = function (type, data) { // set count , isActive, key

        if (data.length > 0) {

            if (type == 'area') {
                for (var i = 0; i < data.length; i++) {
                    var depth_1 = data[i];

                    depth_1.key = 'root_' + i;
                    depth_1.count = 0;
                    depth_1.isActive = false;

                    if (depth_1.gugun) { // 구군 데이터가 있을 때 구군데이터 초기화
                        for (var j = 0; j < depth_1.gugun.length; j++) {
                            var depth_2 = depth_1.gugun[j];

                            depth_2.key = 'root_' + i + ':gugun_' + j;
                            depth_2.count = 0;
                            depth_2.isActive = false;

                            for (var z = 0; z < depth_2.dong.length; z++) { // 동 초기화
                                var depth_3 = depth_2.dong[z];

                                depth_3.key = 'root_' + i + ':gugun_' + j + ':dong_' + z;
                                depth_3.count = 0;
                                depth_3.isActive = false;
                            }
                        }
                    }
                } // end for

            } else {

                for (var i = 0; i < data.length; i++) {
                    var depth_1 = data[i];

                    depth_1.key = 'root_' + i;
                    depth_1.count = 0;
                    depth_1.isActive = false;

                    if (depth_1.line) { // 라인 데이터가 있을 때 라인데이터 초기화
                        for (var j = 0; j < depth_1.line.length; j++) {
                            var depth_2 = depth_1.line[j];

                            depth_2.key = 'root_' + i + ':line' + j;
                            depth_2.count = 0;
                            depth_2.isActive = false;

                            for (var z = 0; z < depth_2.station.length; z++) { // 역 초기화
                                var depth_3 = depth_2.station[z];

                                depth_3.key = 'root_' + i + ':line_' + j + ':station_' + z;
                                depth_3.count = 0;
                                depth_3.isActive = false;
                            }
                        }
                    }
                } // end for
            }

            return data;
        }
    };


    gymUtils.func.setData = function (key, isIncrease, data, type) { // 데이터 업데이트 시켜주는 함수

        var pathList = key.split(':'); // 선택한 root/gugun/dong 분리 리스트
        var currentObject = data; // 전체 리스트

        var depth = {};
        var indexArr = [];

        for (var i = 0; i < pathList.length; i++) {
            var depthData = pathList[i].split('_');
            indexArr[i] = depthData[1];
        }

        if (type == 'area') {

            depth.one = currentObject[indexArr[0]];
            depth.two = currentObject[indexArr[0]].gugun[indexArr[1]];
            depth.three = currentObject[indexArr[0]].gugun[indexArr[1]].dong[indexArr[2]];

        } else {

            depth.one = currentObject[indexArr[0]];
            depth.two = currentObject[indexArr[0]].line[indexArr[1]];
            depth.three = currentObject[indexArr[0]].line[indexArr[1]].station[indexArr[2]];

        }


        if (pathList.length == 1) { // root

            depth.one.isActive = !depth.one.isActive;
            return;

        } else if (pathList.length == 2) { //gugun

            depth.one.isActive = !depth.one.isActive;
            depth.two.isActive = !depth.two.isActive;
            return;

        } else if (pathList.length == 3) { //dong

            depth.one.isActive = !depth.one.isActive;
            depth.two.isActive = !depth.two.isActive;
            depth.three.isActive = !depth.three.isActive

        }

        var updateList = pathList.slice(0, pathList.length - 1); // count 수정해줘야할 리스트

        for (var i in updateList) {

            var item = updateList[i];
            var data = item.split('_');
            var index = parseInt(data[1]);

            if (data[0] == 'root') {
                currentObject = currentObject[index];
            } else {
                currentObject = currentObject[data[0]][index];
            }

            if (isIncrease) { //선택 되면 증가
                currentObject.count++;
                currentObject.isActive = true;
            } else {
                currentObject.count--; //해제 하면 감소
                currentObject.isActive = false;
            }

        }
    };

    gymUtils.func.initData = function (type, data) {

        if (type == 'area') {

            for (var i = 0; i < data.length; i++) { // 시
                for (var j = 0; j < data[i].gugun.length; j++) { // 구군

                    for (var z = 0; z < data[i].gugun[j].dong.length; z++) { // 동
                        data[i].gugun[j].dong[z].isActive = false;
                        data[i].gugun[j].dong[z].count = 0;
                    }

                    data[i].gugun[j].isActive = false;
                    data[i].gugun[j].count = 0;
                }

                if (data[i].isActive == true) {
                    data[i].isActive = false;
                    data[i].count = 0;
                }
            }

        } else {

            for (var i = 0; i < data.length; i++) { // 시
                for (var j = 0; j < data[i].line.length; j++) { // 구군

                    for (var z = 0; z < data[i].line[j].station.length; z++) { // 동
                        data[i].line[j].station[z].isActive = false;
                        data[i].line[j].station[z].count = 0;
                    }

                    data[i].line[j].isActive = false;
                    data[i].line[j].count = 0;
                }

                if (data[i].isActive == true) {
                    data[i].isActive = false;
                    data[i].count = 0;
                }
            }
        }

        gymUtils.common.tag = []; // 검색 버튼 다시 눌렀을 때 초기화

    };


    /**
     * view
     */
    gymUtils.view.filterTabFunc = function (obj) { // 레이터 필터 탭 변경
        if (obj) {
            $('.filter_layer_tab_item').removeClass('active');
            $(obj).closest('.filter_layer_tab_item').addClass('active');

            $('.filter_layer_content_groups').hide().filter('[data-type="' + $(obj).attr('data-type') + '"]').show();
        }
    };

    gymUtils.view.layerOpen = function () {
        gymUtils.common.layer.fadeIn(300);
    };

    gymUtils.view.layerClose = function () {
        gymUtils.common.layer.fadeOut(300);
    };

    gymUtils.view.layerInit = function () {
        gymUtils.func.initData('area', gymUtils.data.area);
        gymUtils.func.initData('subway', gymUtils.data.subway);
    };


    gymUtils.data.dataInit('area');
    gymUtils.data.dataInit('subway');

});
