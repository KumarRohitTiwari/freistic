var env = process.env.NODE_ENV || 'local';

var configObj = {
	appversion:function () {
         return process.env.App_Ver;
     },
    local:{
        host : ""
    },
     dev : {
        host : ""
    },
    qa : {
        host : ""
    },
     prd : {
        host : ""
    },
     ppd : {
        host : ""
     },
    stg : {
        host : ""
    },
    endpoints:{},

    getEnvObject : function () {
        this[env]['appVersion'] = this.appversion();
        Object.assign(this[env],this.endpoints);
        return JSON.parse(JSON.stringify(this[env]));
    },
    getEnv : function () {
        return env;
    }
};

String.prototype.URLSurgeon = function (obj,host) {
	var keyList = Object.keys(obj);
	var str = this;
	for(var i=0;i<keyList.length;i++){
		str = str.replace("{" + keyList[i] +"}",obj[keyList[i]]);
	}
	return host + str;
};

module.exports = configObj;