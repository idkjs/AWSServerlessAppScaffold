"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { DynamoDB } from 'aws-sdk'
exports.handler = function (event, context, cb) {
    console.log(event);
    console.log(context);
    console.log(cb);
    cb(null, null);
};
