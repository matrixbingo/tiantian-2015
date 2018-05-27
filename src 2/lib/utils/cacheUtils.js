var CacheUtils = CacheUtils || {};

CacheUtils.param = {
    auditPage1: {
        auditPage1_customerInfo: "auditPage1_customerInfo",
        radioNames: 'auditPage1_radioNames',
        merchantType: 'merchantType'
    },
    auditPage2: 'auditPage2',
    auditPage3: 'auditPage3',
    auditPage4: 'auditPage4'
};


/**
 * 取的缓存中的数据
 */
CacheUtils.getLocalStorageData = function (storageCode) {
    if (localStorage) {
        var result = {};
        var data = localStorage.getItem(storageCode);
        if (data) {
            result = JSON.parse(data);
        }
        if (result) {
            return result;
        }
    }
    return null;
};

/**
 * 重新设置缓存中的数据
 * @param storageData
 */
CacheUtils.setLocalStorageData = function (storageData, storageCode) {
    if (localStorage) {
        localStorage.removeItem(storageCode);
        localStorage.setItem(storageCode, JSON.stringify(storageData));
    }
};
