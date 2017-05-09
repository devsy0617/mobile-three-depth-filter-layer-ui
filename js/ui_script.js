var filter = {};
var totalTagArr = [];

jQuery(function ($) {
    /* 레이어 열기 */
    filter.layerOpen = function () {
        $('.filter_layer').fadeIn(300);
    };

    /* 레이어 닫기 */
    filter.layerClose = function () {
        filter.dataInit(); // 데이터 초기화
        $('.filter_layer').fadeOut(300);
    };

    /* 레이어 초기화 */
    filter.layerInit = function () {
        filter.dataInit(); // 데이터 초기화
    };

    /* 데이터 초기화 */
    filter.dataInit = function () {
        var areaData = filter.TDL_AREA.getData();

        for (var i = 0; i < areaData.listCnt; i++) { // 시
            for (var j = 0; j < areaData.list[i].gugun.length; j++) { // 구군

                for (var z = 0; z < areaData.list[i].gugun[j].dong.length; z++) { // 동
                    areaData.list[i].gugun[j].dong[z].isActive = false;
                    areaData.list[i].gugun[j].dong[z].count = 0;
                }

                areaData.list[i].gugun[j].isActive = false;
                areaData.list[i].gugun[j].count = 0;
            }

            if (areaData.list[i].isActive == true) {
                areaData.list[i].isActive = false;
                areaData.list[i].count = 0;
            }

        }

        totalTagArr = []; // 검색 버튼 다시 눌렀을 때 초기화
    };

    /* UX / UI 단 초기화 */
    filter.drawListInit = function () {

    };

    /* 레이어 필터 선택결과 검색 */
    filter.layerSearch = function () {
        console.log(filter.TDL_AREA.getData());
        //console.log(filter.TDL_SUBWAY.getData());

        var areaData = filter.TDL_AREA.getData();

        for (var i = 0; i < areaData.listCnt; i++) { // 시
            if (areaData.list[i].count != 0) {
                for (var j = 0; j < areaData.list[i].gugun.length; j++) { // 구군
                    if (areaData.list[i].gugun[j].count != 0) {

                        for (var z = 0; z < areaData.list[i].gugun[j].dong.length; z++) { // 동
                            if (areaData.list[i].gugun[j].dong[z].isActive == true) {
                                totalTagArr.push(areaData.list[i].name + ' ' + areaData.list[i].gugun[j].name + ' ' + areaData.list[i].gugun[j].dong[z].name);
                            }
                        }

                    } else if (areaData.list[i].gugun[j].count == 0) { // 군만 선택 했을 때
                        if (areaData.list[i].gugun[j].isActive == true) {
                            totalTagArr.push(areaData.list[i].name + ' ' + areaData.list[i].gugun[j].name);
                        }
                    }
                }
            } else if (areaData.list[i].count == 0) { // 시만 선택 했을 때
                if (areaData.list[i].isActive == true) {
                    totalTagArr.push(areaData.list[i].name);
                }

            }
        }


        if (totalTagArr.length != 0) {
            for (var item in totalTagArr) {
                $('.result-filter-tag-area').append('<span>' + totalTagArr[item] + '</span>');
            }
        }

        totalTagArr.length = 0; // 검색 버튼 다시 눌렀을 때 초기화
        $('.filter_layer').fadeOut(300);
    };


    /* 레이어 필터 탭 변경 */
    filter.filterTabFunc = function (obj) {
        if (obj) {
            $('.filter_layer_tab_item').removeClass('active');
            $(obj).closest('.filter_layer_tab_item').addClass('active');

            $('.filter_layer_content_groups').hide().filter('[data-type="' + $(obj).attr('data-type') + '"]').show();
        }
    };

    /* 타입별 콘텐츠 생성 구현부 */
    filter.typeInit = function (type) {

        var vm = this;
        this.areaObj = {};
        var areaObj = this.areaObj;
        areaObj.type = type;
        areaObj.url = '';

        if (areaObj.type == 'area') {
            $.ajax({
                url: 'http://localhost:3000/area'
            }).done(function (data) {
                if (data.length > 0) {
                    areaObj.listCnt = parseInt(data.length, 10);
                    areaObj.list = data;
                }

                if (areaObj.listCnt > 0) {
                    for (var i = 0; i < areaObj.listCnt; i++) {
                        areaObj.list[i].key = 'root_' + i;
                        areaObj.list[i].count = 0;
                        areaObj.list[i].isActive = false;


                        if (areaObj.list[i].gugun) { // 구군 데이터가 있을 때 구군데이터 초기화
                            for (var j = 0; j < areaObj.list[i].gugun.length; j++) {
                                areaObj.list[i].gugun[j].key = 'root_' + i + ':gugun_' + j;
                                areaObj.list[i].gugun[j].count = 0;
                                areaObj.list[i].gugun[j].isActive = false;

                                for (var z = 0; z < areaObj.list[i].gugun[j].dong.length; z++) { // 동 초기화
                                    areaObj.list[i].gugun[j].dong[z].key = 'root_' + i + ':gugun_' + j + ':dong_' + z;
                                    areaObj.list[i].gugun[j].dong[z].count = 0;
                                    areaObj.list[i].gugun[j].dong[z].isActive = false;
                                }
                            }
                        }
                    }
                }
            });

        } else if (areaObj.type == 'subway') {
            $.ajax({
                url: 'http://localhost:3000/subway'
            }).done(function (data) {
                if (data.length > 0) {
                    areaObj.listCnt = parseInt(data.length, 10);
                    areaObj.list = data;
                }

                if (areaObj.listCnt > 0) {
                    for (var i = 0; i < areaObj.listCnt; i++) {
                        areaObj.list[i].key = 'root_' + i;
                        areaObj.list[i].count = 0;

                        if (areaObj.list[i].line) { // line 초기화
                            for (var j = 0; j < areaObj.list[i].line.length; j++) {
                                areaObj.list[i].line[j].key = 'root_' + i + ':line_' + j;
                                areaObj.list[i].line[j].count = 0;

                                for (var z = 0; z < areaObj.list[i].line[j].station.length; z++) { // 역 초기화
                                    areaObj.list[i].line[j].station[z].key = 'root_' + i + ':line_' + j + ':station_' + z;
                                    areaObj.list[i].line[j].station[z].count = 0;
                                }
                            }
                        }
                    }
                }
            });
        }


        // 자동 카운트 갱신
        function setUpdate(key, isIncrease) {
            var pathList = key.split(':'); // 선택한 root/gugun/dong 분리 리스트
            var currentObject = areaObj.list; // 전체 리스트

            if (pathList.length == 1) { // root
                var rootData = pathList[0].split('_');
                var rootIndex = rootData[1];

                var isRootActive = currentObject[rootIndex].isActive; // 전체 리스트의 몇번째(rootIndex) isActive
                currentObject[rootIndex].isActive = !isRootActive; // true or false
                return;

            } else if (pathList.length == 2) { //gugun
                var tmpArr = [];

                for (var i = 0; i < pathList.length; i++) {
                    var depthData = pathList[i].split('_');
                    tmpArr[i] = depthData[1];
                }

                var isRootActive = currentObject[tmpArr[0]].isActive;
                currentObject[tmpArr[0]].isActive = !isRootActive;

                var isTwoDepthActive = currentObject[tmpArr[0]].gugun[tmpArr[1]].isActive;
                currentObject[tmpArr[0]].gugun[tmpArr[1]].isActive = !isTwoDepthActive;

            } else if (pathList.length == 3) { //dong

                var tmpArr = [];

                for (var i = 0; i < pathList.length; i++) {
                    var depthData = pathList[i].split('_');
                    tmpArr[i] = depthData[1];
                }

                var isRootActive = currentObject[tmpArr[0]].isActive;
                currentObject[tmpArr[0]].isActive = !isRootActive;

                var isTwoDepthActive = currentObject[tmpArr[0]].gugun[tmpArr[1]].isActive;
                currentObject[tmpArr[0]].gugun[tmpArr[1]].isActive = !isTwoDepthActive;

                var isThreeDepthActive = currentObject[tmpArr[0]].gugun[tmpArr[1]].dong[tmpArr[2]].isActive;
                currentObject[tmpArr[0]].gugun[tmpArr[1]].dong[tmpArr[2]].isActive = !isThreeDepthActive;

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
        }


        // 데이터 확인용 함수
        function printList() {
            console.log(areaObj);
        }

        function getData() {
            return areaObj;
        }

        return {
            getData: getData,
            setUpdate: setUpdate,
            printList: printList
        }
    };


    // 시작할때 미리 로딩
    if ($('.filter_layer_content_groups').filter('[data-type="area"]').length) {
        filter.TDL_AREA = filter.typeInit('area');
    }
    ;

    if ($('.filter_layer_content_groups').filter('[data-type="subway"]').length) {
        filter.TDL_SUBWAY = filter.typeInit('subway');
    }
    ;
});