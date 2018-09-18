"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
class NoSQL {
    constructor(endpoint, tableName) {
        this.endpoint = endpoint;
        this.tableName = tableName;
        this.documentClient = new aws_sdk_1.DynamoDB.DocumentClient();
    }
    getItem(itemId) {
        const params = { Table: this.tableName, Key: itemId };
        console.log(params, this.endpoint);
        return { itemId: itemId, contents: 'mensagem' };
    }
}
exports.NoSQL = NoSQL;
