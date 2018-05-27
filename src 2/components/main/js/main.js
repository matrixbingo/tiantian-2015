/**
 * 当前版本
 * @type {string}
 */
var version = "0.0.1";

var main = main || {};

var debug = true;

//main.pattern.phone = "/^(13[0-9]{9})|(15[89][0-9]{8})$/"

main.getRootUrl = function () {
    var pathName = window.location.pathname.substring(1);
    var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
    return window.location.protocol + '//' + window.location.host + '/';
}

main.base_url = main.getRootUrl();

main.action = {
    /** 登录 */
    userLogin: 'account/userLogin',
    /** 获取网页验证码 */
    getPageValidCode: 'account/getPageValidCode',
    /** 注册 */
    registAccount: 'account/registAccount',
    /** 忘记密码 */
    resetAccountPwd: 'account/resetAccountPwd',
    /** 获取手机验证码 */
    getPhoneValidCode: 'account/getPhoneValidCode',
    /** 获取手机验证码 */
    updateAccountPwd: 'account/updateAccountPwd',
    /** 获取当前用户对应的天猫，和京东等商家信息 */
    getCustomerShopInfo: 'account/getCustomerShopInfo',

    /** 绑定商铺 */
    bindShop: 'account/bindShop',
    /** 获取账号信息 */
    getAccountInfo: 'account/getAccountInfo',
    /** 获取省份信息列表 */
    getProvinceList: 'account/getProvinceList',
    /** 根据省份获取城市信息列表 */
    getCityList: 'account/getCityList',
    /** 根据城市获取区县信息列表 */
    getTownList: 'account/getTownList'

}

main.herf = {
    index: "src/components/main/docs/task.html",
    register: "src/components/main/docs/register.html",
    resetPwd: "src/components/main/docs/resetPwd.html",
    login: "src/components/main/login/login.html",
    task: "src/components/main/docs/task.html",
    accountInfo: "src/components/main/docs/accountInfo.html",
    specialTask: "src/components/main/docs/release/specialTask.html"
}

main.accountInfo = {
    title : {
        platId : '平台',
        validCode : '校验码',
        shopName : '店铺名称',
        linkUrl : '店铺商品校验链接',

        wwId : '店铺主旺旺ID',
        province : '省份',
        city:'城市',
        town:'区县'
    }
}

main.navigation = {
    releaseTask : function(){
        main.toUrl(main.herf.specialTask)
    },
    task : function(){
        main.toUrl(main.herf.task)
    },
    accountInfo : function(){
        main.toUrl(main.herf.accountInfo)
    },
    resetPwd : function(){
        main.toUrl(main.herf.resetPwd)
    }
}



