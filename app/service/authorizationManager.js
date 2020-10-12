const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const request = require('request');
const AWS = require('aws-sdk');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

const authConf = require("../config/authConfig.js");

const poolData = {
    UserPoolId: authConf.poolData.USER_POOL_ID, // Your user pool id here
    ClientId: authConf.poolData.CLIENT_ID// Your client id here
};
const pool_region = authConf.poolData.POOL_REGION;

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// constructor
const Cognito = function (cognito) {
    this.email = cognito.email;
    this.password = cognito.password;
    this.confirmationCode = cognito.confirmationCode;
    this.accessToken = cognito.accessToken;
};

//Validate
Cognito.validate = (cognito, result) => {
    console.log("Doing validate: " + cognito.accessToken);

    if (!cognito.accessToken) {
        result("Invalid input", null)
    }

    cognito.accessToken = cognito.accessToken.split(" ")[1];

    console.log("Doing validate: (split) " + cognito.accessToken);

    request({
        url: authConf.poolData.JWKURL,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            pems = {};
            var keys = body['keys'];
            for (var i = 0; i < keys.length; i++) {
                //Convert each key to PEM
                var key_id = keys[i].kid;
                var modulus = keys[i].n;
                var exponent = keys[i].e;
                var key_type = keys[i].kty;
                var jwk = { kty: key_type, n: modulus, e: exponent };
                var pem = jwkToPem(jwk);
                pems[key_id] = pem;
            }
            var decodedJwt = jwt.decode(cognito.accessToken, { complete: true });
            if (!decodedJwt) {
                console.log("Invalid token (decode failed)");
                result("Invalid token (decode failed)", null);
                return;
            }

            var kid = decodedJwt.header.kid;
            var pem = pems[kid];
            if (!pem) {
                console.log('Invalid token (!pem)');
                result("Invalid token (!pem)", null);
                return;
            }

            jwt.verify(cognito.accessToken, pem, function (err, payload) {
                if (err) {
                    console.log("Invalid Token. " + err);
                    result(err, null);
                } else {
                    console.log("Valid Token. username:" + payload.username);
                    result(null, payload.username);
                }
            });
        } else {
            console.log("Error! Unable to download JWKs");
            result("Error! Unable to download JWKs", null);
        }
    });
};

module.exports = Cognito;