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


(function(win){
    var arr = ['_contains', 'Trim', 'isNull', 'isDigit', 'isNumber', 'isCurrency', 'isInteger', 'remove', 'removeBinEnd','replaceAll', 'delSpeStr', 'toArray'];
    for(var i = 0; i < arr.length ;i++){
        if(String.prototype.hasOwnProperty(arr[i])){
            win.console.error('Utils.js ：String 对象已含有' + arr[i] + '  属性, 使用请重载，以免冲突 ');
        }
    };
})(window);

//是否包含
String.prototype._contains = function (a) {
    return !!(~this.indexOf(a));
};
//去空格
String.prototype.Trim = function() {
    if(this != null && typeof(this) != 'undefined' && this.length > 0) {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
};
//功能:判断元素的值是否为空
String.prototype.isNull = function() {
    return (this == null || this.Trim() == '' || typeof(this) == 'undefined' || this.length == 0);
};
// 检查是否由数字组成
String.prototype.isDigit = function() {
    var s = this.Trim();
    return (s.replace(/\d/g, "").length == 0);
};
// 检查是否为数字
String.prototype.isNumber = function() {
    var s = this.Trim();
    return (s.search(/^[+-]?[0-9.]*$/) >= 0);
};
// 检查是否为货币格式
String.prototype.isCurrency = function() {
    var s = this.Trim();
    return (s.search(/^[0-9]+([.]\d{1,2})?$/) >= 0);
};
// 检查是否由整数
String.prototype.isInteger = function(){
    var s = this.Trim();
    var p = /^[-\+]?\d+$/;
    return p.test(s);
};
//删除指定位置的字符,指定个数字符
String.prototype.remove = function(start, length){
    var l = this.slice(0, start);
    var r = this.slice(start+length);
    return l+r;
};
//删除第一个和最后一个字符
String.prototype.removeBinEnd = function(){
    var str  = this.remove(0, 1);
    str = str.remove(str.length - 1, 1);
    return str;
};
String.prototype.replaceAll = function(str1, str2){
    if (this.isNull()) {
        return this;
    }
    return this.split(str1).join(str2);
}
//删除指定字符串
String.prototype.delSpeStr = function(a){
    return this.replaceAll(a,"");
};
String.prototype.toArray = function(a){
    var arr = [];
    if(this._contains(a)){
        arr = this.split(a);
    }else{
        arr.push(this);
    }
    return arr;
};


main.alert = {};
main.log = {};

main.log = function(){
    if(localStorage){
        if(localStorage.getItem('debug')){
            main.debug = true;
        }else{
            main.debug = false;
        }
    }
    if(!main.debug){
        if(window.location.search.toLowerCase().indexOf('debug') > -1){
            localStorage.setItem('debug', true);
            main.debug = true;
        }
    }
    if(main.debug){
        for( var i = 0; i < arguments.length; i++ ){
            if(DataUtil.is.Object(arguments[i])){
                console.dir(arguments[i]);
                console.log('\n');
            }else{
                console.log(arguments[i] + '\n');
            }
        }
    }
}

main.error = function(){
    if(localStorage){
        if(localStorage.getItem('debug')){
            main.debug = true;
        }else{
            main.debug = false;
        }
    }
    if(!main.debug){
        if(window.location.search.toLowerCase().indexOf('debug') > -1){
            localStorage.setItem('debug', true);
            main.debug = true;
        }
    }
    if(main.debug){
        for( var i = 0; i < arguments.length; i++ ){
            if(DataUtil.is.Object(arguments[i])){
                console.dir(arguments[i]);
                console.error('\n');
            }else{
                console.error(arguments[i] + '\n');
            }
        }
    }
}


/**
 * 提示信息
 * @param content
 * @param param
 */
main.alert.message = function(content, param){
    setTimeout(function() {
        $.bootstrapGrowl(content, param);
    }, 1000);
}

main.alert.success = function(content){
    this.message(content,  { type: 'success' });
}

main.alert.error = function(content){
    this.message(content,  { type: 'danger' });
}

main.toUrl = function(url){
    window.location.href = main.base_url + url;
}

main.ajaxMsg = function(rep){
    if(rep && rep.code == 0){
        main.alert.success(rep.message);
        if(arguments[1]){
           // setTimeout(function(){
                window.location.href = main.base_url + arguments[1]
           // },3000);
        }
    }else if(rep && rep.code == 1){
        main.alert.error(rep.message);
    }
}

main.ajaxConfirm = function(){

}


main.getActionUrl = function (url) {
    return this.base_url + url;
}

/**
 * aja 依赖jquery 根据url发送ajax请求
 * @param url
 * @param data : 参数
 * @param callBack ：回调函数
 */
main.ajax = function (type, address, data, callBack) {
    var postfix = "";
    if (window.location.origin.indexOf("localhost") != -1) {
        type = 'GET';
        postfix = ".json";
    }
    var url = main.base_url + address + postfix;
    var json = JSON.stringify(data);
    main.log(type + " : " + url + " \n" + json);
    $.ajax(
        {
            type: type,
            url: url + "?uid=" + new Date(),
            data: json,
            dataType:"json",
            contentType:"application/json",
            timeout: 15000,
            //beforeSend : FormUtil.progressStart(),
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
                    console.error('complete 加载异常：' + url);
                    callBack(t);
                }
            }
        }
    )
};

main.post = function(address, data, callBack){
    main.ajax("POST", address, data, callBack);
}

main.get = function(address, data, callBack){
    main.ajax("GET", address, data, callBack);
}

/****************************  DataUtil bin  ****************************/
/**
 * 检测各种具体是对象类型
 */
DataUtil.is ={types : ["Array", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"]}
for(var i = 0, c; c = DataUtil.is.types[i ++ ]; ){
    DataUtil.is[c] = (function(type){
        return function(obj){
            return Object.prototype.toString.call(obj) == "[object " + type + "]";
        }
    })(c);
}

DataUtil.getVal = function(id){
    var val = $.trim($("#" + id).val());
    if(val){
        return val;
    }
    val = document.getElementsByName(id)[0].value;
    if(val){
        return val;
    }
    main.error(id + 'is no exsit!!');
    return "";
}

DataUtil.getRsJson = function(arr){
    var json = {};
    $.each(arr,function(i, o) {
        json[o] = DataUtil.getVal(o);
    })
    return json;
}
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
        if(checkVal){
            rarios.push('<input type=\"radio\" name=\"' + name + '\" value=\"' + value.id + '\"' + (value.id==checkVal?'checked>':'>'));
        }else{
            rarios.push('<input type=\"radio\" name=\"' + name + '\" value=\"' + value.id + '\"' + (n==0?'checked>':'>'));
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
FormUtil.getRadio = function(name){
    return $("input[name="+ name + "]:checked").val()
};
/**
 * 监听：赋值radio选中值给id的元素
 * @param name
 * @param id
 */
FormUtil.setValByRadio = function(name, id){
    $("input[name='" + name + "']").bind('click',function(){
        $('#' + id).val($("input[name="+ name + "]:checked").val());
    });
    return this;
};
/**
 * 根据id的值val设置勾选
 * @param id
 * @param name
 */
FormUtil.initRadioById = function(name, id){
    var val = document.getElementById(id).value;
    $("input[name='" + name + "']").each(function(){
        if(this.value == val){
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
FormUtil.initRadioByVal = function(name, val){
    $("input[name='" + name + "']").each(function(){
        if(this.value == val){
            this.checked = true;
        }
    });
    return this;
};

FormUtil.initRadios = function(json){
    $.each(json, function(i, v){
        FormUtil.initRadioByVal(i, v);
    });
}

FormUtil.getRadios2Json = function(names){
    var obj = {};
    if(names.indexOf(',') > -1){
        var arr = names.split(',');
        $.each(arr, function(i, v){
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
FormUtil.saveRadios2Local = function(names, localStorageCode){
    CacheUtils.setLocalStorageData(FormUtil.getRadios2Json(names), localStorageCode);
}

FormUtil.initRadios4Local = function(localStorageCode){
    FormUtil.initRadios(CacheUtils.getLocalStorageData(localStorageCode));
}

/****************************** Radio end ******************************/

/****************************** 根据传参批量设置 bin ******************************/
/**	type:
 hide - 隐藏
 show - 显示
 readOnly - 只读
 read - 可读
 disabled - 不可用
 able - 可用
 */
FormUtil.setAbles = function (ids, type){
    if(type == 'hide'){
        setHidShow(ids,'hide');
    }else if(type == 'show'){
        setHidShow(ids,'show');
    }else if(type == 'readOnly'){
        setReadOnly(ids,'readOnly');
    }else if(type == 'read'){
        setReadOnly(ids,'read')
    }else if(type == 'disabled'){
        setAbleDis(ids,'disabled');
    }else if(type == 'able'){
        setAbleDis(ids,'able');
    }else{
        console.log('FormUtil.setAbles 参数错误,批量设置，请输入正确的类型');
    }
}

//隐藏，显示
function setHidShow(ids,type){
    var key = ids.indexOf(',');
    if(type == 'hide'){
        if(key > -1){
            var arr = ids.split(',');
            for(i=0;i<arr.length;i++){
                document.getElementById(arr[i]).style.display = 'none';
            }
        }else{
            document.getElementById(ids).style.display = 'none';
        }
    }else if(type == 'show'){
        if(key > -1){
            var arr = ids.split(',');
            for(i=0;i<arr.length;i++){
                document.getElementById(arr[i]).style.display = '';
            }
        }else{
            document.getElementById(ids).style.display = '';
        }
    }
}
//隐藏，显示
function setReadOnly(ids,type){
    var key = ids.indexOf(',');
    if(type == 'readOnly'){
        if(key > -1){
            var arr = ids.split(',');
            for(i=0;i<arr.length;i++){
                document.getElementById(arr[i]).readOnly = true;
            }
        }else{
            document.getElementById(ids).readOnly = true;
        }
    }else if(type == 'read'){
        if(key > -1){
            var arr = ids.split(',');
            for(i=0;i<arr.length;i++){
                document.getElementById(arr[i]).readOnly = false;
            }
        }else{
            document.getElementById(ids).readOnly = false;
        }
    }
}
//可用不可用
function setAbleDis(ids,type){
    var key = ids.indexOf(',');
    //普通元素
    if(type == 'disabled'){
        if(key > -1){
            var arr = ids.split(',');
            for(i=0;i<arr.length;i++){
                if(FormUtil.setAbleDisEasyUI(arr[i], 'disable')){  //esayui元素
                    document.getElementById(arr[i]).disabled = true;
                }
            }
        }else{
            if(FormUtil.setAbleDisEasyUI(ids, 'disable')){  //esayui元素
                document.getElementById(ids).disabled = true;
            }
        }
    }else if(type == 'able'){
        if(key > -1){
            var arr = ids.split(',');
            for(i=0;i<arr.length;i++){
                if(FormUtil.setAbleDisEasyUI(arr[i], 'enable')){     //esayui元素
                    document.getElementById(arr[i]).disabled = false;
                }
            }
        }else{
            if(FormUtil.setAbleDisEasyUI(ids, 'enable')) {  //esayui元素
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
FormUtil.createTab = function(id, title, json){
    var rarios = [];
    rarios.push('<table class=\"table table-hover\">');
    rarios.push('<thead>');

    rarios.push('<tr>');
    for(var key in title){
        rarios.push('<th>' + title[key] + '</th>');
    }
    rarios.push('</tr>');

    $.each(json, function (i, value) {
        if(value){
            rarios.push('<tr>');
            for(var key in title){
                rarios.push('<th>' + value[key] + '</th>');
            }
            rarios.push('</tr>');
        }
    });
    rarios.push('</thead>');
    rarios.push('</table>');
    $("#" + id).empty().append(rarios.join(''));
}
/****************************** table end ***************************************/



