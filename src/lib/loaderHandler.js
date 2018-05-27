/**
 * wl
 */
(function () {
    var modules = {
        parser: {
            js: 'jquery.parser.js'
        },
        base: {
            js: 'utils/utils.js',
            css:'css/ttdiy.css',
            dependencies: ['main', 'cache', 'showLoading']
        },
        bootstrapGrowl:{
            js: 'bootstrap/jquery.bootstrap-growl.min.js'
        },
        bootstrapValidator:{
            js: 'bootstrapValidator/js/bootstrapValidator.min.js',
            css: 'bootstrapValidator/css/bootstrapValidator.css'
        },
        easyui:{
            js : 'jquery/jquery.min.easyui.js',
            css:['easyui/themes/bootstrap/easyui.css','easyui/themes/icon.css']
        },
        easyui14:{
            js : 'jquery-easyui-1.4/jquery.easyui.min.js',
            css:['jquery-easyui-1.4/easyui.css', 'jquery-easyui-1.4/icon.css']
        },
        angular:{
            js : 'angular/angular.js',
        },
        main: {
            js: 'utils/main.js',
        },
        cache: {
            js: 'utils/cacheUtils.js',
        },
        bootstrap:{
            js: 'bootstrap/js/bootstrap.min.js',
            css: 'bootstrap/css/bootstrap.css'
        },
        bootstrapDocs:{
            css: ['bootstrap/css/bootstrap-responsive.css', 'bootstrap/css/docs.css'],
            js : ['bootstrap/js/application.js']
        },
        md5: {
            js: 'libs/md5.js',
        },
        step: {
            js: 'step/step-jquery-dc.js',
            css:'step/css/step-dc-style1.css',
        },
        validator:{
            css:'validator/jquery.validator.css',
            js:'validator/jquery.validator.js' //validator/zh-CN.js
        },
        showLoading:{
            css:'showLoading/css/showLoading.css',
            js:'showLoading/js/jquery.showLoading.min.js'
        },
        taskContainer:{
            js:['components/task.container.js','components/task.container.step1.js']
        },
        artTemplate:{
            js:"artTemplate/template.js"
        },
        wdatePicker:{
            js:"My97DatePicker/WdatePicker.js"
        }
    };

    var locales = {
        'zh_CN': 'easyui-lang-zh_CN.js',
        'zh_TW': 'easyui-lang-zh_TW.js'
    };

    var queues = {};

    function loadSingleJs(url, callback) {
        var done = false;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.language = 'javascript';
        script.src = url;
        script.onload = script.onreadystatechange = function () {
            if (!done && (!script.readyState || script.readyState == 'loaded' || script.readyState == 'complete')) {
                done = true;
                script.onload = script.onreadystatechange = null;
                if (callback) {
                    callback.call(script);
                }
            }
        }
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    function loadJs(url, callback) {
        if (typeof url == 'string' && url.indexOf(',') == -1) {
            loadSingleJs(url, callback);
        } else if(typeof url == 'string'){
            var arr = url.split(',');
            for (var i = 0; i < arr.length; i++) {
                loadSingleJs(arr[i]);
            }
            if (callback) {
                callback();
            }
        }else{
            for (var i = 0; i < url.length; i++) {
                loadSingleJs(url[i]);
            }
            if (callback) {
                callback();
            }
        }
    }

    function runJs(url, callback) {
        loadJs(url, function () {
            document.getElementsByTagName("head")[0].removeChild(this);
            if (callback) {
                callback();
            }
        });
    }

    function loadSingleCss(url, callback) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.media = 'screen';
        link.href = url;
        document.getElementsByTagName('head')[0].appendChild(link);
        if (callback) {
            callback.call(link);
        }
    }

    function loadCss(url, callback) {
        if (typeof url == 'string' && url.indexOf(',') == -1) {
            loadSingleCss(url, callback);
        } else if(typeof url == 'string'){
            var arr = url.split(',');
            for (var i = 0; i < arr.length; i++) {
                loadSingleCss(arr[i]);
            }
            if (callback) {
                callback();
            }
        }else{
            for (var i = 0; i < url.length; i++) {
                loadSingleCss(url[i]);
            }
            if (callback) {
                callback();
            }
        }
    }

    function loadSingle(name, callback) {
        queues[name] = 'loading';

        var module = modules[name];
        var jsStatus = 'loading';
        var cssStatus = (loaderHandler.css && module['css']) ? 'loading' : 'loaded';

        if (loaderHandler.css && module['css']) {
            if (/^http/i.test(module['css'])) {
                var url = module['css'];
            } else if (Object.prototype.toString.call(module['css']) === '[object Array]'){
                var url = []; arr = module['css'];
                for (var i = 0; i < arr.length; i++) {
                    url.push(loaderHandler.base + arr[i]);
                }
            } else {
                var url = loaderHandler.base + module['css'];
            }
            loadCss(url, function () {
                cssStatus = 'loaded';
                if (jsStatus == 'loaded' && cssStatus == 'loaded') {
                    finish();
                }
            });
        }

        if (/^http/i.test(module['js'])) {
            var url = module['js'];
        } else if (Object.prototype.toString.call(module['js']) === '[object Array]'){
            var url = []; arr = module['js'];
            for (var i = 0; i < arr.length; i++) {
                url.push(loaderHandler.base + arr[i]);
            }
        } else {
            var url = loaderHandler.base + module['js'];
        }
        loadJs(url, function () {
            jsStatus = 'loaded';
            if (jsStatus == 'loaded' && cssStatus == 'loaded') {
                finish();
            }
        });

        function finish() {
            queues[name] = 'loaded';
            loaderHandler.onProgress(name);
            if (callback) {
                callback();
            }
        }
    }

    function loadModule(name, callback) {
        var mm = [];
        var doLoad = false;

        if (typeof name == 'string') {
            add(name);
        } else {
            for (var i = 0; i < name.length; i++) {
                add(name[i]);
            }
        }

        function add(name) {
            if (!modules[name]) return;
            var d = modules[name]['dependencies'];
            if (d) {
                for (var i = 0; i < d.length; i++) {
                    add(d[i]);
                }
            }
            mm.push(name);
        }

        function finish() {
            if (callback) {
                callback();
            }
            loaderHandler.onLoad(name);
        }

        var time = 0;

        function loadMm() {
            if (mm.length) {
                var m = mm[0];	// the first module
                if (!queues[m]) {
                    doLoad = true;
                    loadSingle(m, function () {
                        mm.shift();
                        loadMm();
                    });
                } else if (queues[m] == 'loaded') {
                    mm.shift();
                    loadMm();
                } else {
                    if (time < loaderHandler.timeout) {
                        time += 10;
                        setTimeout(arguments.callee, 10);
                    }
                }
            } else {
                if (loaderHandler.locale && doLoad == true && locales[loaderHandler.locale]) {
                    var url = loaderHandler.base + 'locale/' + locales[loaderHandler.locale];
                    runJs(url, function () {
                        finish();
                    });
                } else {
                    finish();
                }
            }
        }

        loadMm();
    }

    loaderHandler = {
        modules: modules,
        locales: locales,

        base: '.',
        theme: 'default',
        css: true,
        locale: null,
        timeout: 2000,

        load: function (name, callback) {
            if (/\.css$/i.test(name)) {
                if (/^http/i.test(name)) {
                    loadCss(name, callback);
                } else {
                    loadCss(loaderHandler.base + name, callback);
                }
            } else if (/\.js$/i.test(name)) {
                if (/^http/i.test(name)) {
                    loadJs(name, callback);
                } else {
                    loadJs(loaderHandler.base + name, callback);
                }
            } else {
                loadModule(name, callback);
            }
        },

        onProgress: function (name) {
        },
        onLoad: function (name) {
        }
    };

    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
        var src = scripts[i].src;
        if (!src) continue;
        var m = src.match(/loaderHandler\.js(\W|$)/i);
        if (m) {
            loaderHandler.base = src.substring(0, m.index);
        }
    }
    window.loads = loaderHandler.load;

    loaderHandler.loaders = {
        task : ['bootstrap', 'base', 'md5', 'step', 'bootstrapGrowl','validator', 'bootstrapDocs','artTemplate','wdatePicker'],
        login: ['bootstrap', 'base', 'md5','bootstrapGrowl', 'validator','bootstrapDocs'],
        bootstrapDocs : ['bootstrapDocs'],
        taskContainer:['taskContainer']

    }

    if (window.jQuery) {
        jQuery(function () {
            loaderHandler.load('parser', function () {
                jQuery.parser.parse();
            });
        });
    }
})();

