var filter = {};


jQuery(function ($) {
    /* 레이어 열기 */
    filter.layerOpen = function () {
        $('.filter_layer').fadeIn(300);
    };

    /* 레이어 닫기 */
    filter.layerClose = function () {
        $('.filter_layer').fadeOut(300);
    };

    /* 레이어 초기화 */
    filter.layerInit = function () {

    };

    /* 레이어 필터 선택결과 검색 */
    filter.layerSearch = function () {

    };

    /* 타입별 콘텐츠 생성 구현부 */
    filter.typeInit = function (type) {

        var areaObj = {};
        areaObj.type = type;
        areaObj.url = '';

        if (areaObj.type == 'area') {
            areaObj.url = 'http://localhost:3000/area';
        } else if (areaObj.type == 'subway') {
            areaObj.url = 'http://localhost:3000/subway';
        }

        $.ajax({
            url: areaObj.url
        }).done(function (data) {
            if (data.length > 0) {
                console.log(data);

                areaObj.listCnt = parseInt( data.length, 10 );
                areaObj.list = data;
            }

            if( areaObj.listCnt > 0 ) {
                areaObj.listHtml = '<ul class="filter_layer_content_items">';

                areaObj.topObj = $('.filter_layer_content_groups').filter('[data-type="' + areaObj.type + '"]');
                areaObj.obj = areaObj.topObj.find('.filter_layer_content_group').filter('[data-depth="1"]');

                for (var i = 0; i < areaObj.listCnt; i++) {
                    areaObj.text = '';

                    if (areaObj.type == 'area') {
                        areaObj.text = areaObj.list[i].name;
                    } else if (areaObj.type == 'subway') {
                        areaObj.text = areaObj.list[i].name;
                    }

                    if (areaObj.text) {
                        areaObj.listHtml += '' +
                            '<li class="filter_layer_content_item" data-idx="' + areaObj.list[i].id + '"><a href="#" class="filter_layer_content_item_anchor" data-idx="' + areaObj.list[i].id + '" data-parent-id="' + areaObj.list[i].parent_id + '" onclick="filter.areaFunc(\'' + areaObj.list[i].idx + '\', \'1\', \'' + areaObj.type + '\', \'' + areaObj.list[i].parent_id + '\');return false;">' + areaObj.text + '</a></li>' +
                            '';
                    }
                } // for End

                areaObj.listHtml+= '</ul">';

                areaObj.obj.html( areaObj.listHtml );

                if( areaObj.type == 'area' ) {
                    areaObj.obj.find('.filter_layer_content_item').eq(0).find('.filter_layer_content_item_anchor').trigger('click');
                } else if( areaObj.type == 'subway' ) {
                    areaObj.obj.find('.filter_layer_content_item').eq(0).find('.filter_layer_content_item_anchor').trigger('click');
                }
            }
        });
    };


    filter.areaFunc = function () {

    };

    /* 레이어 필터 탭 변경 */
    filter.filterTabFunc = function (obj) {
        if (obj) {
            $('.filter_layer_tab_item').removeClass('active');
            $(obj).closest('.filter_layer_tab_item').addClass('active');

            $('.filter_layer_content_groups').hide().filter('[data-type="' + $(obj).attr('data-type') + '"]').show();
        }
    };


    // 시작할때 미리 로딩
    if ($('.filter_layer_content_groups').filter('[data-type="area"]').length) {
        filter.typeInit('area');
    }
    ;

    if ($('.filter_layer_content_groups').filter('[data-type="subway"]').length) {
        filter.typeInit('subway');
    }
    ;
});