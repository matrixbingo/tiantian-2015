/**
 * 当前版本
 * @type {string}
 */

var version = "0.1.1";

var main = main || {};

main.dev = 0; //默认上线模式 0：上线模式 1：开发模式

//main.pattern.phone = "/^(13[0-9]{9})|(15[89][0-9]{8})$/"

main.getRootUrl = function () {
    var pathName = window.location.pathname.substring(1);
    var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));

    return window.location.protocol + '//' + window.location.host + '/';
};

main.base_url = main.getRootUrl();
main.ajax_url = main.base_url;

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
    getCheckedShop: 'account/getCheckedShop',

    /** 获取绑定商铺 */
    bindShop: 'account/bindShop',
    /** 增加绑定商铺
     addbindShop: 'account/addbindShop',**/
    /** 获取账号信息 */
    getAccountInfo: 'account/getAccountInfo',
    /** 获取省份信息列表 */
    getProvinceList: 'area/getProvinceList',
    /** 根据省份获取城市信息列表 */
    getCityList: 'area/getCityList',
    /** 根据城市获取区县信息列表 */
    getTownList: 'area/getTownList'

};

main.herf = {
    index: "src/main/main.html",
    register: "src/main/register.html",
    resetPwd: "src/main/resetPwd.html",
    login: "src/main/login.html",
    task: "src/main/main/task.html",
    accountInfo: "src/main/main/accountInfo.html",
    specialTask: "src/main/main/release/specialTask.html"
};

main.accountInfo = {
    title: {
        platName: ['平台', 'title-width-10'],
        validCode: ['校验码', 'title-width-10'],
        shopName: ['店铺名称', 'title-width-10'],
        linkUrl: ['店铺商品校验链接', 'title-width-20'],
        wwId: ['店铺主旺旺ID', 'title-width-10'],
        provinceName: ['省份', 'title-width-10'],
        cityName: ['城市', 'title-width-10'],
        townName: ['区县', 'title-width-10']
    }
};

main.modules = {
    login: {
        navbar: 'components/main-navbar.html',
        subhead: 'components/main-subhead.html'
    },
    taskBase: {
        sidebar: 'components/main-sidebar.html',
        footer: 'components/task-footer.html',
        navbar: 'components/main-navbar.html',
        subhead: 'components/main-subhead.html'
    },
    tasks: {
        container: 'components/task-container.html',
        template: 'components/template/task-template.html',
        taskStap1: 'components/tasks/task-step1.html'
    },
    accountInfo: {
        container: 'components/account-container.html',
        content: 'components/account-content.html'
    }
};

main.navigation = {
    releaseTask: function () {
        $('#container').load(main.modules.tasks.container);
    },
    task: function () {
        $('#container').load(main.modules.tasks.container);
    },
    accountInfo: function () {
        $('#container').load(main.modules.accountInfo.container);
    },
    resetPwd: function () {
        main.toUrl(main.herf.resetPwd)
    }
};

main.validator = {
    options: {
        longin: {},
        task: {}
    },
    rules: {
        int6: [/^\d{6}$/, '请输入6位数字'],
        telephone: [/^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/, '请输入正确的手机号'],
        httpUrl: [/^http:\/\//, '请输入正确的链接地址'],
        money: [/ \d{1,10}(\.\d{1,2})?$/, '金额输入错误'],
        keyWord1: function(){
            return $.trim($('#keyWord1').val()).length > 0;
        },
        keyWord2: function(){
            return $.trim($('#keyWord2').val()).length > 0;
        },
        keyWord3: function(){
            return $.trim($('#keyWord3').val()).length > 0;
        }
    },
    fields: {
        login: {'telephone': '手机号:required;telephone;', 'password': '密码:required;length[6~20]'},
        task2: {
            '#commodityName': '商品名称:required', '#commodityHref': '商品链接:required;httpUrl;', '#commodityPhoto': '商品主图:required','#minPrice':'最小金额:required;integer[+]','#maxPrice':'最大金额:required;integer[+];match[gt, #minPrice]',
            '#commodityPrice':'商品单价:required;integer[+]','#orderHaveCommodityNum':'商品数量:required;integer[+]','#orderNum':'放单总数:required;integer[+]',
            '#orderNum0':'放单数:integer[+]','#orderNum1':'放单数:integer[+]','#orderNum2':'放单数:integer[+]','#orderNum3':'放单数:integer[+]',
            '#showorderNum0':'放单数:integer[+]','#showorderNum1':'放单数:integer[+]','#showorderNum2':'放单数:integer[+]','#showorderNum3':'放单数:integer[+]'

        },
        task3: {'#packageWeight': '包裹重量:required', '#dotNumber': '网点编号:required'}
    }
};

var TT_Task = TT_Task || {};








