const axios = require('axios');
const qs = require('querystring');
const headerConfig = require("../config/headerConfig.json");

module.exports.axiosPost = function (req, res, url, data, cb) {
    console.log("TO POST URL : " + url);
    console.log("REQUEST URL : " + req.url);
    const opt = {
        headers: headerConfig,
        url: url,
        data: data,
        method: 'post',
    }
    axios(opt).then(response => {
        body = response.data;
        res.send(body);
        console.log('call service response', response);
        res.end();
    }).catch(err => {
        console.log('call service error', err);
        res.status(400).send({
            message: err
        });
        res.end();
    });
}

module.exports.axiosGet = function (req, res, url, data, cb) {
    console.log("TO POST URL : " + url);
    console.log("REQUEST URL : " + req.url);
    const opt = {
        // headers: headerConfig,
        url: url,
        data: data, //qs.stringify(data),
        method: 'get',
    }
    axios(opt).then(response => {
        body = response.data;
        res.send(body);
        console.log('call service response: ', response);
        res.end();
    }).catch(err => {
        console.log('call service error:', err);
        res.status(400).send({
            message: err
        });
        res.end();
    });
}

module.exports.axiosService = function (req, res, opt) {
    console.log('REQUEST URL: ' + req.url);
    console.log('call service URL: ' + opt.url);
    // opt.headers = headerConfig;
    axios(opt).then((response) => {
        body = response.data;
        console.log('call service success: ' + JSON.stringify(body));
        res.send(body);
        res.end();

    }).catch(err => {
        console.error('call service error: ', err.message);
        res.status(400).send({ code: 400, message: err.message });
        res.end();
    })
}