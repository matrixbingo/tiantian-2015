/**
 * 对日期操作的公共方法
 */
var DateUtil = DateUtil || {};
/**
 * 对数据操作的公共方法
 */
var DataUtil = DataUtil || {};
/**
 * 对页面元素操作的公共方法
 */
var FormUtil = FormUtil || {};


(function (win) {
    var arr = ['_contains', 'Trim', 'isNull', 'isDigit', 'isNumber', 'isCurrency', 'isInteger', 'remove', 'removeBinEnd', 'replaceAll', 'delSpeStr', 'toArray'];
    for (var i = 0; i < arr.length; i++) {
        if (String.prototype.hasOwnProperty(arr[i])) {
            win.console.error('Utils.js ：String 对象已含有' + arr[i] + '  属性, 使用请重载，以免冲突 ');
        }
    }
    ;
})(window);

//是否包含
String.prototype._contains = function (a) {
    return !!(~this.indexOf(a));
};
//去空格
String.prototype.Trim = function () {
    if (this != null && typeof(this) != 'undefined' && this.length > 0) {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
};
//功能:判断元素的值是否为空
String.prototype.isNull = function () {
    return (this == null || this.Trim() == '' || typeof(this) == 'undefined' || this.length == 0);
};
// 检查是否由数字组成
String.prototype.isDigit = function () {
    var s = this.Trim();
    return (s.replace(/\d/g, "").length == 0);
};
// 检查是否为数字
String.prototype.isNumber = function () {
    var s = this.Trim();
    return (s.search(/^[+-]?[0-9.]*$/) >= 0);
};
// 检查是否为货币格式
String.prototype.isCurrency = function () {
    var s = this.Trim();
    return (s.search(/^[0-9]+([.]\d{1,2})?$/) >= 0);
};
// 检查是否由整数
String.prototype.isInteger = function () {
    var s = this.Trim();
    var p = /^[-\+]?\d+$/;
    return p.test(s);
};
//删除指定位置的字符,指定个数字符
String.prototype.remove = function (start, length) {
    var l = this.slice(0, start);
    var r = this.slice(start + length);
    return l + r;
};
//删除第一个和最后一个字符
String.prototype.removeBinEnd = function () {
    var str = this.remove(0, 1);
    str = str.remove(str.length - 1, 1);
    return str;
};
String.prototype.replaceAll = function (str1, str2) {
    if (this.isNull()) {
        return this;
    }
    return this.split(str1).join(str2);
}
//删除指定字符串
String.prototype.delSpeStr = function (a) {
    return this.replaceAll(a, "");
};
String.prototype.toArray = function (a) {
    var arr = [];
    if (this._contains(a)) {
        arr = this.split(a);
    } else {
        arr.push(this);
    }
    return arr;
};


(function (win) {
    var arr = ['_toString', '_remove', '_removeByIndex', '_indexOf', '_max', '_min', '_push', '_distinct', '_sortASC'];
    for (var i = 0; i < arr.length; i++) {
        if (Array.prototype.hasOwnProperty(arr[i])) {
            win.error('Utils.js ：Array 对象已含有' + arr[i] + '  属性, 使用请重载，以免冲突 ');
        }
    };

    Array.prototype._toString = function (a) {
        if (a) {
            return this.join(a);
        } else {
            return this.join('');
        }
    };
//奇偶分组
    Array.prototype.oddEve = function () {
        var odd = [], eve = [];
        //递归分组
        var pop = function (arr, a, b) {
            arr.length && a.push(arr.shift());
            arr.length && b.push(arr.shift());
            arr.length && pop(arr, a, b);
        }
        pop(arr, odd, eve);

        return {
            odd: odd,
            eve: eve
        };
    };
//删除指定元素
    Array.prototype._remove = function (obj) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === obj) {
                this.splice(i--, 1);
            }
        }
        return this;
    };
//删除指定索引
    Array.prototype._removeByIndex = function (index) {
        this.splice(index, 1);
        return this;
    };

    Array.prototype._indexOf = function (obj) {
        for (var i = 0, len = this.length; i < len; i++) {
            if (this[i] === obj) {
                return i;
            }
        }
        ;
        return -1;
    };
//添加越界处理
    Array.prototype._max = function () {
        var max = -Infinity;
        var QUANTUM = 32768;
        var submin;
        for (var i = 0, len = this.length; i < len; i += QUANTUM) {
            submin = Math.max.apply(null, this.slice(i, Math.min(i + QUANTUM, len)));
            max = Math.max(submin, max);
        }
        return max;
    };

//添加越界处理
    Array.prototype._min = function () {
        var min = Infinity;
        var QUANTUM = 32768;
        var submin;
        for (var i = 0, len = this.length; i < len; i += QUANTUM) {
            submin = Math.min.apply(null, this.slice(i, Math.min(i + QUANTUM, len)));
            min = Math.min(submin, min);
        }
        return min;
    };
//把数组arr加到当前数组后
    Array.prototype._push = function (arr) {
        Array.prototype.push.apply(this, arr);
        return this;
    };
//数组去重复
    Array.prototype._distinct = function () {
        var temp = {};
        for (var i = 0; i < this.length; i++)
            temp[this[i]] = true;

        var r = [];
        for (var k in temp)
            r.push(k);
        return r;
    };

//正序排序
    Array.prototype._sortASC = function () {
        var merge = function (left, right) {
            var result = [];
            while (left.length > 0 && right.length > 0) {
                if (left[0] < right[0])
                    result.push(left.shift());
                else
                    result.push(right.shift());
            }
            return result.concat(left).concat(right);
        };

        var mergeSort = function (items) {
            if (items.length == 1) {
                return items;
            }
            var middle = Math.floor(items.length / 2);
            var left = items.slice(0, middle);
            var right = items.slice(middle);
            return merge(mergeSort(left), mergeSort(right));
        }

        return mergeSort(this);
    };

})(window);


/**
 * 提示信息
 * @param content
 * @param param
 */
main.alert = {
    message: function (content, param) {
        $.bootstrapGrowl(content, param);
    },
    success: function (content) {
        main.alert.message(content, {type: 'success'});
    },
    error: function (content) {
        main.alert.message(content, {type: 'danger'});
    },
    showSuccess: function (content) {
        FormUtil.showOverlay('show');
        main.alert.message(content, {type: 'success'});
        setTimeout(function () {
            FormUtil.showOverlay('hide');
        }, 3000);
    },
    showError: function (content) {
        FormUtil.showOverlay('show');
        main.alert.message(content, {type: 'danger'});
        setTimeout(function () {
            FormUtil.showOverlay('hide');
        }, 3000);
    }
};

main.log = function () {
    if (main.dev) {
        for (var i = 0; i < arguments.length; i++) {
            if (DataUtil.is.Object(arguments[i])) {
                console.dir(arguments[i]);
                console.log('\n');
            } else {
                console.log(arguments[i] + '\n');
            }
        }
    }
}

main.error = function () {
    if (localStorage) {
        if (localStorage.getItem('debug')) {
            main.dev = true;
        } else {
            main.dev = false;
        }
    }
    if (!main.dev) {
        if (window.location.search.toLowerCase().indexOf('debug') > -1) {
            localStorage.setItem('debug', true);
            main.dev = true;
        }
    }
    if (main.dev) {
        for (var i = 0; i < arguments.length; i++) {
            if (DataUtil.is.Object(arguments[i])) {
                console.dir(arguments[i]);
                console.error('\n');
            } else {
                console.error(arguments[i] + '\n');
            }
        }
    }
}

main.toUrl = function (url) {
    window.location.href = main.base_url + url;
}

main.ajaxMsg = function (rep, url) {
    if (rep && rep.code == 0) {
        if (rep.message) {
            main.alert.showSuccess(rep.message);
        }
        if (url) {
            setTimeout(function () {
                window.location.href = main.base_url + url;
            }, 3000);
        }
    } else if (rep && rep.code == 1) {
        if (rep.message) {
            main.alert.showSuccess(rep.message);
        }
    }
}

main.ajaxConfirm = function () {

};

main.getActionUrl = function (url) {
    return this.ajax_url + url;
};

/**
 * aja 依赖jquery 根据url发送ajax请求
 * @param url
 * @param data : 参数
 * @param callBack ：回调函数
 */

main.getAjaxUrl = function (type, address) {
    var postfix = "";
    if (window.location.origin.toLowerCase().indexOf("localhost") != -1) {
        type = 'GET';
        postfix = ".json";
    }

    if (window.location.search.toLowerCase().indexOf('dev') > -1) {
        var params = DataUtil.urlGet();
        main.dev = params['dev'];
        localStorage.setItem('dev', main.dev);
        if (main.dev == 1) {
            main.ajax_url = main.base_url + 'mock/';
        } else {
            main.ajax_url = main.base_url;
        }
    } else {
        var dev = localStorage.getItem('dev');
        if (dev) {
            main.dev = dev;
            if (main.dev == 1) {
                main.ajax_url = main.base_url + 'mock/';
            } else {
                main.ajax_url = main.base_url;
            }
        }
    }
    return {url: main.ajax_url + address + postfix, type: type};
};

main.progressStart = function () {
    $('body').showLoading();
};
main.progressClose = function () {
    $('body').hideLoading();
};
main.ajax = function (type, address, data, callBack) {
    var d = this.getAjaxUrl(type, address);
    var url = d.url, type = d.type;
    var json = JSON.stringify(data);
    main.log(type + " : " + url + " \n" + json);
    $.ajax(
        {
            type: type,
            url: url + "?uid=" + new Date(),
            data: json,
            dataType: "json",
            contentType: "application/json",
            timeout: 15000,
            beforeSend: main.progressStart(),
            error: function (e) {
                console.error('error 加载异常：' + url);
                console.error(e);
            },
            success: function (result) {
                try {
                    main.log("result ===>", result);
                    callBack(result);
                } catch (e) {
                    console.error('success 加载异常：' + url);
                }
            },
            complete: function (e, t) {
                if (t && t == "timeout") {
                    console.error('complete 请求超时：' + url);
                    callBack(t);
                }
            }
        }
    )
};

main.post = function (address, data, callBack) {
    try {
        // main.progressStart();
        main.ajax("POST", address, data, callBack);
    } catch (e) {
    } finally {
        main.progressClose();
    }
};

main.get = function (address, data, callBack) {
    try {
        // main.progressStart();
        main.ajax("GET", address, data, callBack);
    } catch (e) {
    } finally {
        main.progressClose();
    }
};

main.getValidator = function (target, options, clickId, callback) {
    var $form = $('#' + target);
    var validator = $form.validator(options);
    if (clickId) {
        validator.on("click", "#" + clickId, function (e) {
            $jq(e.delegateTarget).trigger("validate");
        }).bind('valid.form', function (e) {
            callback(e);
        });
    }
    ;
    return {
        instance: $form.data('validator'),
        validate: function () {
            $form.trigger("validate")
        },
        validator: validator
    };
};

/****************************  DataUtil bin  ****************************/
/**
 * 检测各种具体是对象类型
 */
DataUtil.is = {types: ["Array", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"]}
for (var i = 0, c; c = DataUtil.is.types[i++];) {
    DataUtil.is[c] = (function (type) {
        return function (obj) {
            return Object.prototype.toString.call(obj) == "[object " + type + "]";
        }
    })(c);
}

DataUtil.getVal = function (nd) {
    var obj = $("#" + nd);
    try {
        if (obj && obj.length > 0) {
            return gitSwitch(obj[0]);
        } else {
            return gitSwitch(document.getElementsByName(nd)[0]);
        }
    } catch (e) {
        main.error(nd + 'is no exsit!!');
    }
    function gitSwitch(obj) {
        switch (obj.type.toLowerCase()) {
            case 'checkbox' :
                return FormUtil.getChecked(nd);
                break;
            case 'radio' :
                return FormUtil.getRadio(nd);
                break;
            case 'text' :
                return $.trim(obj.value);
                break;
            case 'password' :
                return $.trim(obj.value);
                break;
            case 'select-one' :
                return FormUtil.getselected(obj);
                break;
            case 'select-multiple':
                return FormUtil.getselected(obj);
                break;
        }
    }

    return "";
}

DataUtil.getValGroup = function (name) {

}

DataUtil.getRsJson = function (arr) {
    var type = Object.prototype.toString.call(arr);
    var getRsJsonByIds = function (arr) {
        var json = {};
        $.each(arr, function (i, o) {
            json[o] = DataUtil.getVal(o);
        })
        return json;
    };
    var getRsJsonByGroup = function (obj) {
        var json = {}, key;
        var items = $("[data-group]");
        for (var _key in obj) {
            key = _key;
            var arr = obj[key], _arr = [], len = arr.length;
            if (len > 1) {
                for (var i = 0; i < len; i++) {
                    var name = arr[i], rs = {};
                    $.each(items, function (j, item) {
                        if (name == item.getAttribute('data-group')) {
                            var id = item.getAttribute('data-id'), result = {};
                            result[id] = DataUtil.getVal(item.getAttribute('id'));
                            rs = $.extend(rs, result);
                        }
                    });
                    _arr.push(rs);
                }
                json[_key] = _arr;
            } else if (len == 1) {
                $.each(arr, function (i, name) {
                    var rs = {};
                    $.each(items, function (j, item) {
                        if (name == item.getAttribute('data-group')) {
                            var id = item.getAttribute('data-id'), result = {};
                            result[id] = DataUtil.getVal(item.getAttribute('id'));
                            rs = $.extend(rs, result);
                        }
                    });
                    json[key] = $.extend(json[key], rs);
                });
            }
        }
        return json;
    };
    var getRsJsonByCheckBox = function (obj) {
        var ids = [], objs = [];
        for (var id in obj) {
            if (FormUtil.isChecked(id)) {
                var _type = Object.prototype.toString.call(obj[id]);
                if (_type === "[object Object]") {
                    var items = obj[id];
                    for (var key in items) {
                        if (key === 'group') {
                            objs.push(getRsJsonByGroup(items.group));
                        } else if (key === 'ids') {
                            objs.push(getRsJsonByIds(items.ids));
                        } else if (key === 'checkbox') {

                        }
                    }
                }
                if (_type === "[object Object]" && obj[id]['checkbox']) {
                    var items = obj[id]['checkbox'];
                    for (var key in items) {
                        var _obj = {};
                        if (key === 'group') {
                            _obj[id] = {};
                            _obj[id][key] = items[key];
                            objs.push(getRsJsonByCheckBox(_obj));
                        } else {
                            _obj[key] = items[key];
                            objs.push(getRsJsonByCheckBox(_obj));
                        }
                    }
                } else if (_type === "[object Array]") {
                    ids._push(obj[id]);
                }
            }
        }
        if (!$.isEmptyObject(ids)) {
            objs.push(getRsJsonByIds(ids));
        }
        return DataUtil.mergeObs(objs);
    };
    var result = [];
    if (type === "[object Array]") {
        result.push(getRsJsonByIds(arr));
    } else if (type === "[object Object]") {
        for (var item in arr) {
            if (item.toLowerCase() === "checkbox") {
                result.push(getRsJsonByCheckBox(arr[item]));
            } else if (item.toLowerCase() === "ids") {
                result.push(getRsJsonByIds(arr[item]));
            } else if (item.toLowerCase() === "group") {
                result.push(getRsJsonByGroup(arr[item]));
            }
        }
    }
    return DataUtil.mergeObs(result);
}
/**
 * 合并数组对象
 * @param objs
 * @returns {{}}
 */
DataUtil.mergeObs = function (objs) {
    var rs = {};
    if (!$.isEmptyObject(objs)) {
        $.each(objs, function (i, item) {
            rs = $.extend(rs, item);
        })
    }
    return rs;
}

DataUtil.setVal = function (nd, val) {
    var obj = $("#" + nd);
    try {
        if (obj && obj.length > 0) {
            gitSwitch(obj[0]);
        } else {
            gitSwitch(document.getElementsByName(nd)[0]);
        }
    } catch (e) {
        main.error(nd + 'is no exsit!!');
    }

    function gitSwitch(obj) {
        switch (obj.type.toLowerCase()) {
            case 'checkbox' : FormUtil.setCheckBox(nd, val);
                break;
            case 'radio' : FormUtil.initRadioByVal(nd, val)
                break;
            case 'text' : obj.value = val;
                break;
            case 'password' : obj.value = val;
                break;
            case 'select-one' :
                FormUtil.setSelect(obj, val);
                break;
            case 'select-multiple':
                ''
                break;
        }
    }
};

DataUtil.setVals = function (data) {
    debugger;
    $.each(data, function (i, o) {
        debugger;
        DataUtil.setVal(i, o);
    })
}

/**
 * 获取URL参数
 */

DataUtil.urlGet = function () {
    var aQuery = window.location.href.split("?");
    var aGET = {};
    if (aQuery.length > 1) {
        var aBuf = aQuery[1].split("&");
        for (var i = 0, iLoop = aBuf.length; i < iLoop; i++) {
            var aTmp = aBuf[i].split("=");
            aGET[aTmp[0]] = aTmp[1];
        }
    }
    return aGET;
}

/**
 * 产生随机数
 * @param index
 */
DataUtil.mathRand = function (index) {
    var num = "";
    for (var i = 0; i < index; i++) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}


DataUtil.getLimitId = function (data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].use === 0) {
            data[i].use = 1;
            return data[i];
        }
    }
    return null;
}

DataUtil.removeLimitId = function (data, id) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].key == id) {
            data[i].use = 0;
        }
    }
}


/****************************  DataUtil end  ****************************/
/****************************** Radio bin ******************************/
/**
 * 创建Radio bootstrap
 * @param id
 * @param name
 * @param json
 */
FormUtil.createRadio = function (id, name, json, checkVal) {
    var rarios = [];
    $.each(json, function (n, value) {
        rarios.push('<label class=\"radio\">');
        if (checkVal) {
            rarios.push('<input type=\"radio\" name=\"' + name + '\" value=\"' + value.id + '\"' + (value.id == checkVal ? 'checked>' : '>'));
        } else {
            rarios.push('<input type=\"radio\" name=\"' + name + '\" value=\"' + value.id + '\"' + (n == 0 ? 'checked>' : '>'));
        }
        rarios.push(value.name);
        rarios.push('</label>');
    });

    $("#" + id).empty().append(rarios.join(''));
}

/**
 * 获取radio选中值
 * @param name
 * @returns {FormUtil}
 */
FormUtil.getRadio = function (name) {
    return $("input[name=" + name + "]:checked").val()
};
/**
 * 监听：赋值radio选中值给id的元素
 * @param name
 * @param id
 */
FormUtil.setValByRadio = function (name, id) {
    $("input[name='" + name + "']").bind('click', function () {
        $('#' + id).val($("input[name=" + name + "]:checked").val());
    });
    return this;
};
/**
 * 根据id的值val设置勾选
 * @param id
 * @param name
 */
FormUtil.initRadioById = function (name, id) {
    var val = document.getElementById(id).value;
    $("input[name='" + name + "']").each(function () {
        if (this.value == val) {
            this.checked = true;
        }
    });
    return this;
};

/**
 * 根据id的值val设置勾选
 * @param id
 * @param name
 */
FormUtil.initRadioByVal = function (name, val) {
    $("input[name='" + name + "']").each(function () {
        if (this.value == val) {
            this.checked = true;
        }
    });
    return this;
};

FormUtil.initRadios = function (json) {
    $.each(json, function (i, v) {
        FormUtil.initRadioByVal(i, v);
    });
}

FormUtil.getRadios2Json = function (names) {
    var obj = {};
    if (names.indexOf(',') > -1) {
        var arr = names.split(',');
        $.each(arr, function (i, v) {
            obj[v] = FormUtil.getRadio(v);
        })
    }
    return obj;
}
/**
 * 取radio存到localStorage
 * @param names
 * @param localStorageCode
 */
FormUtil.saveRadios2Local = function (names, localStorageCode) {
    CacheUtils.setLocalStorageData(FormUtil.getRadios2Json(names), localStorageCode);
}

FormUtil.initRadios4Local = function (localStorageCode) {
    FormUtil.initRadios(CacheUtils.getLocalStorageData(localStorageCode));
}

/****************************** form end ***************************************/

/**
 * 设置一个遮罩层
 */
FormUtil.showOverlay = function (type) {
    if (!$('#FormUtil_showOverlay')[0]) {
        var obj = $('<div id=\"FormUtil_showOverlay\"></div>').appendTo('body').css({
            'position': 'fixed',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%',
            'z-index': '9002',
            'background': '#000',
            'opacity': '0.5',
            'display': 'none'
        });
    }
    ;

    switch (type) {
        case 'show' :
            $('#FormUtil_showOverlay').css('display', 'block');
            break;
        case 'hide' :
            $('#FormUtil_showOverlay').css('display', 'none');
            break;
    }
    ;
};

/**
 * 验证码倒计时
 * @param id
 */
FormUtil.setInterval = function (id) {
    var InterValObj; //timer变量，控制时间
    var count = 10; //间隔函数，1秒执行
    var curCount;//当前剩余秒数
    var id = "#" + id;

    function sendMessage() {
        curCount = count;
        //设置button效果，开始计时
        $(id).attr("disabled", "true");
        $(id).val(curCount + "秒后可重新发送");
        InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
    }

    //timer处理函数
    function SetRemainTime() {
        if (curCount == 0) {
            window.clearInterval(InterValObj);//停止计时器
            $(id).removeAttr("disabled");//启用按钮
            $(id).val("重新发送验证码");
        } else {
            curCount--;
            $(id).val(curCount + "秒后可重新发送");
        }
    }

    sendMessage(id);
}

/****************************** 根据传参批量设置 bin ******************************/
/**    type:
 hide - 隐藏
 show - 显示
 readOnly - 只读
 read - 可读
 disabled - 不可用
 able - 可用
 */
FormUtil.setAbles = function (ids, type) {
    if (type == 'hide') {
        setHidShow(ids, 'hide');
    } else if (type == 'show') {
        setHidShow(ids, 'show');
    } else if (type == 'readOnly') {
        setReadOnly(ids, 'readOnly');
    } else if (type == 'read') {
        setReadOnly(ids, 'read')
    } else if (type == 'disabled') {
        setAbleDis(ids, 'disabled');
    } else if (type == 'able') {
        setAbleDis(ids, 'able');
    } else {
        console.log('FormUtil.setAbles 参数错误,批量设置，请输入正确的类型');
    }
}

//隐藏，显示
function setHidShow(ids, type) {
    var key = ids.indexOf(',');
    if (type == 'hide') {
        if (key > -1) {
            var arr = ids.split(',');
            for (i = 0; i < arr.length; i++) {
                document.getElementById(arr[i]).style.display = 'none';
            }
        } else {
            document.getElementById(ids).style.display = 'none';
        }
    } else if (type == 'show') {
        if (key > -1) {
            var arr = ids.split(',');
            for (i = 0; i < arr.length; i++) {
                document.getElementById(arr[i]).style.display = '';
            }
        } else {
            document.getElementById(ids).style.display = '';
        }
    }
}
//隐藏，显示
function setReadOnly(ids, type) {
    var key = ids.indexOf(',');
    if (type == 'readOnly') {
        if (key > -1) {
            var arr = ids.split(',');
            for (i = 0; i < arr.length; i++) {
                document.getElementById(arr[i]).readOnly = true;
            }
        } else {
            document.getElementById(ids).readOnly = true;
        }
    } else if (type == 'read') {
        if (key > -1) {
            var arr = ids.split(',');
            for (i = 0; i < arr.length; i++) {
                document.getElementById(arr[i]).readOnly = false;
            }
        } else {
            document.getElementById(ids).readOnly = false;
        }
    }
}
//可用不可用
function setAbleDis(ids, type) {
    var key = ids.indexOf(',');
    //普通元素
    if (type == 'disabled') {
        if (key > -1) {
            var arr = ids.split(',');
            for (i = 0; i < arr.length; i++) {
                if (FormUtil.setAbleDisEasyUI(arr[i], 'disable')) {  //esayui元素
                    document.getElementById(arr[i]).disabled = true;
                }
            }
        } else {
            if (FormUtil.setAbleDisEasyUI(ids, 'disable')) {  //esayui元素
                document.getElementById(ids).disabled = true;
            }
        }
    } else if (type == 'able') {
        if (key > -1) {
            var arr = ids.split(',');
            for (i = 0; i < arr.length; i++) {
                if (FormUtil.setAbleDisEasyUI(arr[i], 'enable')) {     //esayui元素
                    document.getElementById(arr[i]).disabled = false;
                }
            }
        } else {
            if (FormUtil.setAbleDisEasyUI(ids, 'enable')) {  //esayui元素
                document.getElementById(ids).disabled = false;
            }
        }
    }
}
/****************************** 根据传参批量设置 end ******************************/

/****************************** table bin ***************************************/
/**
 * 创建tab bootstrap
 */
FormUtil.createTab = function (id, title, json) {
    debugger;
    var rarios = [], content;
    rarios.push('<table class=\"table table-hover\">');
    rarios.push('<thead>');

    rarios.push('<tr>');
    for (var key in title) {
        rarios.push('<th class="' + title[key][1] + '">' + title[key][0] + '</th>');
    }
    rarios.push('</tr>');

    $.each(json, function (i, value) {
        if (value) {
            rarios.push('<tr class="tr-table-content">');
            for (var key in title) {
                content = value[key];
                if (content.toLowerCase().indexOf('http') === -1) {
                    rarios.push('<td>' + content + '</td>');
                } else {
                    rarios.push('<td><a href="' + content + '">' + content.substring(0, 20) + '...</a></td>');
                }

            }
            rarios.push('</tr>');
        }
    });
    rarios.push('</thead>');
    rarios.push('</table>');
    $("#" + id).empty().append(rarios.join(''));
};
/****************************** table end ***************************************/


/****************************** checkbox bin ******************************/
FormUtil.setCheckBox = function (name, val) {
    $("input[name='" + name + "']").each(function () {
        if (this.value == val) {
            this.checked = true;
        }
    });
};
/**
 * 单个初始化
 * @param id
 * @param ipt_id
 */
FormUtil.initCheckbox = function (id, ipt_id) {
    var iptVal = document.getElementById(ipt_id).value;
    var obj = document.getElementById(id);
    if (iptVal == obj.value) {
        obj.checked = true;
    } else {
        obj.checked = false;
    }
};

//checkbox设置input
function setCheckBoxVal(id, ipt_id, checked, unchecked) {
    var obj = document.getElementById(id);
    if (obj.checked) {
        document.getElementById(ipt_id).value = checked;
    } else {
        document.getElementById(ipt_id).value = unchecked;
    }
}
/**
 * 获取得到的所有checkbox值
 * @param checkbox_name
 * @returns {Array}
 */
FormUtil.getChecked = function (checkbox_name) {
    var arr = [];
    var obj = document.getElementsByName(checkbox_name);
    for (var i = 0; i < obj.length; i++) {
        obj[i].checked && arr.push(obj[i]["id"]);
    }
    return arr;
}

/**
 * @param checkbox_name
 * @returns 例如得到 ‘grouponActivityDto.needGroupon=1&grouponActivityDto.needGroupon=1&’
 */
FormUtil.getCheckBoxStrByName = function (checkbox_name) {
    var arr = '';
    var obj = document.getElementsByName(checkbox_name);
    for (var i = 0; i < obj.length; i++) {
        var val = 0;
        if (obj[i].checked) {
            val = 1;
        }
        if (i < obj.length - 1) {
            arr += obj[i].id + '=' + val + '&';
        } else {
            arr += obj[i].id + '=' + val;
        }
    }
    return arr;
}

/**
 * 批量赋值
 * @param Json
 */
FormUtil.vals = function (Json) {
    try {
        for (var id in Json) {
            var obj = $('#' + id);
            var clas = obj.attr('class');
            if (clas.indexOf('textbox') > -1) {
                obj.textbox('setValue', Json[id]);
            } else if (clas.indexOf('datebox') > -1) {
                obj.datebox('setValue', Json[id]);
            } else if (clas.indexOf('numberbox') > -1) {
                obj.numberbox('setValue', Json[id]);
            } else if (clas.indexOf('combobox') > -1) {
                obj.combobox('setValue', Json[id]);
            } else {
                obj.val(Json[id]);
            }
        }
    } catch (e) {
        console.error('FormUtil.vals 方法异常：' + JSON.stringify(Json));
    }
}

FormUtil.isChecked = function (id) {
    return $("#" + id).prop("checked");
}

FormUtil.hasClass = function (id, className) {
    return $("#" + id).hasClass(className);
}

FormUtil.addClass = function (id, className) {
    var obj = $("#" + id);
    if (!obj.hasClass(className)) {
        obj.addClass(className);
    }
}

FormUtil.removeClass = function (id, className) {
    $("#" + id).removeClass(className);
}

FormUtil.toggle = function (clickId, checkBoxId, className, itemId) {
    $("#" + clickId).click(function () {
        if (FormUtil.isChecked(checkBoxId)) {
            FormUtil.removeClass(itemId, className);
        } else {
            FormUtil.addClass(itemId, className);
        }
    });
}

/**
 * 页面切换
 * @param steps :  var steps = [
 {index:1, id:"step1", css:'hidden'},
 {index:2, id:"step2", css:'hidden'},
 {index:3, id:"step3", css:'hidden'},
 {index:4, id:"step4", css:'hidden'}
 ]
 * @param index
 */
FormUtil.toggleTab = function (steps, index) {
    for (var i = 0; i < steps.length; i++) {
        var obj = steps[i];
        if (obj.index == index && FormUtil.hasClass(obj.id, obj.css)) {
            FormUtil.removeClass(obj.id, obj.css);
        } else if (obj.index != index) {
            FormUtil.addClass(obj.id, obj.css);
        }
    }
};

/****************************** checkbox end ******************************/

/****************************** select bin ******************************/

FormUtil.getselected = function (oSelectBox) {
    if (oSelectBox.type == "select-one") {
        var iChoice = oSelectBox.selectedIndex;
        return oSelectBox.options[iChoice].value;
    } else {
        var arr = [];
        for (var i = 0; i < oSelectBox.options.length; i++)
            if (oSelectBox.options[i].selected) {
                arr.push(oSelectBox.options[i].value);
            }
        return arr;
    }
};

FormUtil.setSelect = function(obj, val){
    if (obj.type.toLowerCase() === "select-one") {
        for (var i = 0; i < obj.options.length; i++){
            if (obj.options[i].value == val) {
                obj.options[i].selected = true;
            }
        }
    }
};

/****************************** select end ******************************/
/**
 * 依赖template
 */
FormUtil.template = function (target, tid, data) {
    return {
        add: function () {
            $("#" + target).append(template(tid, data));
        },
        remove: function () {
            $("#" + target).empty()
        }
    }
};

/**
 * json 转格式
 * {
        title: "title",
        contactType: "contactType",
        globalAreaCode: "globalAreaCode",
        name: "name",
        mobile: "mobile",
        email: "email"
    }
 */
DataUtil.transformJson = function (objs, json) {
    var rs = [];
    if (Object.prototype.toString.call(objs) === "[object Array]") {
        for (var i = 0; i < objs.length; i++) {
            var item = objs[i], arr = {};
            $.each(json, function (i, v) {
                arr[v] = item[i];
            });
            rs.push(arr);
        }
        return rs;
    } else if (Object.prototype.toString.call(objs) === "[object Object]") {
        var arr = {};
        $.each(json, function (i, v) {
            arr[v] = objs[i];
        });
        return arr;
    }
};
