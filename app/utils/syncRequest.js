var request = require("sync-request");

const headerConfig = require("../config/headerConfig.json");

const SyncRequest = function(syncRequest) {
};

SyncRequest.getMicroservicesSync = function getMicroservicesSync(urlPath){
    var res = request('GET', urlPath, {
        headers: {
            headerConfig
        },
    });
    return res;
}

module.exports = SyncRequest;
