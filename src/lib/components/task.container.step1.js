/**
 * Created by liang.wang on 15/11/28.
 */
$(document).ready(function () {
    application($);

    TT_Task = TT_Task || {};

    var timeHander = window.setInterval(function () {
        if (TT_Task && TT_Task.initTask) {
            TT_Task.initTask();
            timeHander && window.clearInterval(timeHander);
            console.log(TT_Task);
        }
    }, 1000);

    $('#taskTemplate').load(main.modules.tasks.template, function () {
        var data = {
            id: 11,
            index: 2
        };
        $("#taskAmount").append(template('taskAmountTaoBaoStep2Template', data));
    });

    TT_Task.keyWordIds = [
        {key: 'searchKeyId1', use: 0, index: 2},
        {key: 'searchKeyId2', use: 0, index: 3}
    ];

    TT_Task.removeSearchKey = function (id) {
        $("#" + id).remove();
        TT_Task.removekeyWordId(id);
    };

    TT_Task.getkeyWordId = function () {
        return DataUtil.getLimitId(TT_Task.keyWordIds);
    };

    TT_Task.removekeyWordId = function (searchKeyId) {
        DataUtil.removeLimitId(TT_Task.keyWordIds, searchKeyId);
    };

    $('#addKeyWord').on('click', function () {
        var data = TT_Task.getkeyWordId();
        if (data) {
            var data = {
                searchKeyId: data.key,
                index: data.index
            };
            if (data.index === 2) {
                $("#addKeyWordDiv").prepend(template('searchKeyTemplate', data));
            } else {
                $("#addKeyWordDiv").append(template('searchKeyTemplate', data));
            }
        }
    });

    TT_Task.merchants = [
        {key: 'merchantsId1', use: 0, index: 2},
        {key: 'merchantsId2', use: 0, index: 3}
    ];

    TT_Task.removeMerchantKey = function (id) {
        $("#" + id).remove();
        TT_Task.removeMerchantsId(id);
    };

    TT_Task.getMerchantsId = function () {
        return DataUtil.getLimitId(TT_Task.merchants);
    };

    TT_Task.removeMerchantsId = function (id) {
        DataUtil.removeLimitId(TT_Task.merchants, id);
    };

    $('#addMerchantbtn').on('click', function () {
        var data = TT_Task.getMerchantsId();
        if (data) {
            var data = {
                id: data.key,
                index: data.index
            };
            $("#addMerchantsdiv").append(template('addMerchanetTemplate', data));
        }
    });

    TT_Task.putTimes = [
        {key: 'putTimesId1', use: 0, index: 1},
        {key: 'putTimesId2', use: 0, index: 2},
        {key: 'putTimesId3', use: 0, index: 3}
    ];

    TT_Task.removeputTimesKey = function (id) {

        $("#" + id).remove();
        TT_Task.removeputTimessId(id);
    };

    TT_Task.getputTimessId = function () {
        return DataUtil.getLimitId(TT_Task.putTimes);
    };

    TT_Task.removeputTimessId = function (id) {
        DataUtil.removeLimitId(TT_Task.putTimes, id);
    };

    $('#addputTimesbtn').on('click', function () {
        var data = TT_Task.getputTimessId();
        if (data) {
            var data = {
                id: data.key,
                index: data.index
            };
            $("#addTimeDiv").append(template('addputTimesTemplate', data));
        }
    });

    FormUtil.toggle('announcementsDiv', 'announcements', 'hidden', 'announcementsTextarea');

});
