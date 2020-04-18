var CosAuth = require('./cos-auth.min'); 

var Bucket = 'kt-1301681474';
var Region = 'ap-shanghai';
var ForcePathStyle = false; // 是否使用后缀式，涉及签名计算和域名白名单配置，后缀式说明看上文

var uploadFile = function () {

    // 请求用到的参数
  var prefix = 'https://' + Bucket + '.cos.' + Region + '.myqcloud.com/';
    if (ForcePathStyle) {
        prefix = 'https://cos.' + Region + '.myqcloud.com/' + Bucket + '/'; 
    }

    var camSafeUrlEncode = function (str) {
        return encodeURIComponent(str)
            .replace(/!/g, '%21')
            .replace(/'/g, '%27')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')
            .replace(/\*/g, '%2A');
    };

    // 获取临时密钥
    var stsCache;
    var getCredentials = function (callback) {
        if (stsCache && Date.now() / 1000 + 30 < stsCache.expiredTime) {
            callback(data.credentials);
            return;
        }
        wx.request({
            method: 'GET',
            url: 'http://192.144.169.239:8000/sts',		// 重要！服务端签名，后续调整正式服务端确定后再修改。
            dataType: 'json',
            success: function (result) {
                var data = result.data;
                var credentials = data.credentials;
                if (credentials) {
                    stsCache = data
                } else {
                    wx.showModal({title: '临时密钥获取失败', content: JSON.stringify(data), showCancel: false});
                }
                callback(stsCache && stsCache.credentials);
            },
            error: function (err) {
                wx.showModal({title: '临时密钥获取失败', content: JSON.stringify(err), showCancel: false});
            }
        });
    };

    // 计算签名
    var getAuthorization = function (options, callback) {
        getCredentials(function (credentials) {
            callback({
                XCosSecurityToken: credentials.sessionToken,
                Authorization: CosAuth({
                    SecretId: credentials.tmpSecretId,
                    SecretKey: credentials.tmpSecretKey,
                    Method: options.Method,
                    Pathname: options.Pathname,
                })
            });
        });
    };

    // 上传文件
    var uploadFile = function (filePath) {
        var Key = 'app/other/10.' + filePath.substr(filePath.lastIndexOf('/') + 1); // 重要！指定上传的目录和文件名，注意：1、不同模块的图片上传到相应目录（比如other，具体看对照表）；2、待实现：文件名（filePath.substr(filePath.lastIndexOf('/') + 1)）需要替换成“编码.32位UUID”格式，编码标识移动端类型：10：微信小程序，20：安卓，30：苹果；3、如果一次上传多个图片，需要批量上传，待实现，注意看腾讯相应的demo；4、上传成功后，把完整的图片文件URL作为数据的一部分提交到后端接口（存数据库）。
      console.log('log:' + filePath);
        var signPathname = '/'; 
        if (ForcePathStyle) {
            signPathname = '/' + Bucket + '/';  
        }
        getAuthorization({Method: 'POST', Pathname: signPathname}, function (AuthData) {
            var requestTask = wx.uploadFile({
                url: prefix,
                name: 'file',
                filePath: filePath,
                formData: {
                    'key': Key,
                    'success_action_status': 200,
                    'Signature': AuthData.Authorization,
                    'x-cos-security-token': AuthData.XCosSecurityToken,
                    'Content-Type': '',
                },
                success: function (res) {
                    var url = prefix + camSafeUrlEncode(Key).replace(/%2F/g, '/');
                    console.log(res.statusCode);
                    console.log(url);
                    if (/^2\d\d$/.test('' + res.statusCode)) {
                        wx.showModal({title: '上传成功', content: url, showCancel: false});
                    } else {
                        wx.showModal({title: '上传失败', content: JSON.stringify(res), showCancel: false});
                    }
                },
                fail: function (res) {
                    wx.showModal({title: '上传失败', content: JSON.stringify(res), showCancel: false});
                }
            });
            requestTask.onProgressUpdate(function (res) {
                console.log('进度:', res);
            });
        });
    };

    // 选择文件
    wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original'], // 可以指定是原图还是压缩图，这里默认用原图
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
            uploadFile(res.tempFiles[0].path);
        }
    })
};

module.exports = {
  uploadFile: uploadFile
}
