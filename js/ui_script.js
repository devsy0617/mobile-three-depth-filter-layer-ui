var filter = {};

/* 레이어 열기 */
filter.layerOpen = function () {
    $('.filter_layer').fadeIn( 300 );
};

/* 레이어 닫기 */
filter.layerClose = function () {
    $('.filter_layer').fadeOut( 300 );
};

/* 레이어 초기화 */
filter.layerInit = function() {
    
};

/* 레이어 필터 선택결과 검색 */
filter.layerSearch = function () {

};

/* 레이어 필터 탭 변경 */
filter.filterTabFunc = function (obj) {
    if (obj) {
        $('.filter_layer_tab_item').removeClass('active');
        $(obj).closest('.filter_layer_tab_item').addClass('active');

        $('.filter_layer_content_groups').hide().filter('[data-type="' + $(obj).attr('data-type') + '"]').show();
    }
};