var Request = require("request");

const headerConfig = require("../config/headerConfig.json");
const jsonRet = require("../modelEntity/jsonReturnEntity.js");
var urlEncoder = require("url");

exports.postMicroservices = (gateWayRequest, result, urlPath) => {
    console.log("TO POST URL : " + urlPath);
    console.log("REQUEST URL : " + gateWayRequest.url);

    Request.post({
        headers: { headerConfig },
        url: urlPath,
        form: gateWayRequest.body
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // const responseData = new jsonRet({
            //     api_name: urlEncoder.parse(urlPath).pathname,
            //     correlationId: 0,
            //     data: JSON.parse(body)
            // });
            result.send(body);
            // console.log(JSON.parse(body));
        } else {
            const responseData = new jsonRet({
                api_name: urlEncoder.parse(urlPath).pathname,
                correlationId: 0,
                data: "Error : " + JSON.parse(response.body).message
            });
            result.status(400).send({
                responseData
            });
            console.log(JSON.parse(response.body).message);
        }
    });
};

exports.getMicroservices = (gateWayRequest, result, urlPath) => {
    console.log("TO GET URL : " + urlPath);
    console.log("REQUEST URL : " + gateWayRequest.url);

    Request.get({
        headers: { headerConfig },
        url: urlPath
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('successfully called rbac', response);
            const responseData = new jsonRet({
                api_name: urlEncoder.parse(urlPath).pathname,
                code: 200,
                data: JSON.parse(body)
            });

            result.status(200).send({ ...responseData });
            console.log("DATA : " + body);
        } else if (response && response.statusCode !== 200) {
            console.log('error code when call rbac', response);
            const responseData = new jsonRet({
                api_name: urlEncoder.parse(urlPath).pathname,
                code: response.statusCode,
                data: "Error : " + response.body
                // data: "Error : " + JSON.parse(response.body).message
            });
            result.status(response.statusCode).send({
                responseData
            });
            console.log(JSON.parse(response.body).message);
        } else if (!response) {
            console.log('no response from rbac');
            const responseData = new jsonRet({
                api_name: urlEncoder.parse(urlPath).pathname,
                correlationId: 0,
                data: "Error calling microservice"
            });
            result.status(500).send({
                responseData
            });
        }
    });
};

exports.putMicroservices = (gateWayRequest, result, urlPath) => {
    console.log("TO PUT URL : " + urlPath);
    console.log("REQUEST URL : " + urlPath);


    Request.put({
        headers: { headerConfig },
        url: urlPath,
        form: gateWayRequest.body
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const responseData = new jsonRet({
                api_name: urlEncoder.parse(urlPath).pathname,
                correlationId: 0,
                data: JSON.parse(body)
            });

            result.status(200).send({ ...responseData });
            console.log("UPDATED DATA : " + JSON.parse(body));
        } else {
            const responseData = new jsonRet({
                api_name: urlEncoder.parse(urlPath).pathname,
                correlationId: 0,
                data: "Error : " + JSON.parse(response.body).message
            });
            result.status(400).send({
                responseData
            });
            console.log(JSON.parse(response.body).message);
        }
    });
};