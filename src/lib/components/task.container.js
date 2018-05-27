/**
 * Created by wl on 15/11/22.
 */

TT_Task.initTask = function () {
    $(document).ready(function () {
        //loads(loaderHandler.loaders.bootstrapDocs);

        StepTool.drawStep(1, stepListJson);

        var selectTb = function (obj) {
            FormUtil.createRadio('auditPage12', 'auditPage12', obj.tb);
            FormUtil.setAbles('step2,step3,step4,zdjd,cgjd', 'show');
        }

        var selectJd = function (obj) {
            FormUtil.createRadio('auditPage12', 'auditPage12', obj.jd);
            FormUtil.setAbles('zdjd,cgjd', 'hide');
            FormUtil.setAbles('step2,step3,step4', 'show');
        }

        var selectSp = function () {
            FormUtil.setAbles('step2,step3,step4', 'hide');
        }

        main.post(main.action.getCheckedShop, {}, function (rep) {
            CacheUtils.setLocalStorageData(CacheUtils.param.auditPage1.auditPage1_customerInfo, rep.singleResult);
            FormUtil.createRadio('auditPage12', 'auditPage12', rep.singleResult.tb);
        });

        TT_Task.initInstanceTask();

        $("input[name=merchantType]").on('click', function (e) {
            var obj = CacheUtils.getLocalStorageData(CacheUtils.param.auditPage1.auditPage1_customerInfo);
            switch (parseInt(e.target.value)) {
                case 1 :
                    selectTb(obj);
                    break;
                case 2 :
                    selectJd(obj);
                    break;
                case 3 :
                    selectSp();
                    break;
            }
        });
    });
};

TT_Task.initPage = function () {
    var type = CacheUtils.getLocalStorageData(CacheUtils.param.auditPage1.merchantType);
    if (type) {
        var obj = CacheUtils.getLocalStorageData(CacheUtils.param.auditPage1.auditPage1_customerInfo);
        switch (parseInt(type)) {
            case 1 :
                selectTb(obj);
                break;
            case 2 :
                selectJd(obj);
                break;
            case 3 :
                selectSp();
                break;
        }
        FormUtil.initRadios4Local(CacheUtils.param.auditPage1.radioNames);
    } else {
        main.post(main.action.getCheckedShop, {}, function (rep) {
            CacheUtils.setLocalStorageData(CacheUtils.param.auditPage1.auditPage1_customerInfo, rep.singleResult);
            FormUtil.createRadio('auditPage12', 'auditPage12', rep.singleResult.tb);
        });
    }
};

var savePageInfo = function () {
    CacheUtils.setLocalStorageData(FormUtil.getRadio('merchantType'), CacheUtils.param.auditPage1.merchantType);
    FormUtil.saveRadios2Local('merchantType,auditPage12,platType,dfType,ttplatType,qplatType', CacheUtils.param.auditPage1.radioNames);
};

TT_Task.step = function (index) {
    var steps = [
        {index: 1, id: "task1", css: 'hidden'},
        {index: 2, id: "task2", css: 'hidden'},
        {index: 3, id: "task3", css: 'hidden'},
        {index: 4, id: "task4", css: 'hidden'}
    ]
    FormUtil.toggleTab(steps, index);
};

TT_Task.prep = function (index) {
    TT_Task.step(index);
};

var instanceTask2 = null, instanceTask3 = null, instanceTask4 = null;

TT_Task.next = function (index) {
    switch (index - 1) {
        case 1 :
            TT_Task.check1();
            break;
        case 2 :
            TT_Task.check2(index);
            break;
        case 3 :
            TT_Task.check3(index);
            break;
    }
};

TT_Task.initInstanceTask = function () {
    instanceTask2 = main.getValidator('task2', {
        rules: main.validator.rules,
        timely: 2,
        theme: 'yellow_top',
        fields: main.validator.fields.task2
    });
    instanceTask3 = main.getValidator('task3', {
        rules: main.validator.rules,
        timely: 2,
        theme: 'yellow_top',
        fields: main.validator.fields.task3
    });
};
TT_Task.check1 = function () {
    TT_Task.step(2);
    TT_Task.initInstanceTask();
};
instanceTask2 = main.getValidator('task2', {
    rules: main.validator.rules,
    timely: 2,
    theme: 'yellow_top',
    fields: main.validator.fields.task2
});
TT_Task.check2 = function (index) {
    var tlt = FormUtil.template('commodityPhotoDiv', 'niceValidator', '请选择商品主图');
    var isValid = function () {
        var valid = false;
    debugger;
        if(DataUtil.getVal('commodityPhoto')){
            FormUtil.addClass('commodityPhotoDiv', 'hidden');
            valid = true;
        }else{
            FormUtil.removeClass('commodityPhotoDiv', 'hidden');
            valid = false;
        }
        return valid;
    };
    if (instanceTask2) {
        var isNext = false;
        instanceTask2.validator.isValid(function (e) {
            if (e && isValid()) {
                isNext = false;
            }
            if(isValid()){
                isNext = true;
            }
            if(isNext){
                TT_Task.step(index + 1);
            }
        });
    }
};
instanceTask3 = main.getValidator('task3', {
    rules: main.validator.rules,
    timely: 2,
    theme: 'yellow_top',
    fields: main.validator.fields.task3
});
TT_Task.check3 = function (index) {
    instanceTask3.validator.isValid(function (e) {
        if (e) {
            TT_Task.step(index + 1);
        }
    });
};

