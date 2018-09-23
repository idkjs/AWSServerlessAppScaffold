import { DynamoDB } from 'aws-sdk';
import { v4 } from 'uuid';

interface AWSErrorTyped {
    code: string            // a unique short code representing the error that was emitted.
    message: string         // a longer human readable error message
    retryable: boolean      // whether the error message is retryable.
    statusCode: number      // in the case of a request that reached the service, this value contains the response status code.
    time?: string            // the date time object when the error occurred.
    hostname?: string        // set when a networking error occurs to easily identify the endpoint of the request.
    region?: string          // set when a networking error occurs to easily identify the region of the request.
}

export interface NoSQLResult { statusCode: number, body: string, consumedCapacity?: DynamoDB.DocumentClient.ConsumedCapacity }
export interface NoSQLError { statusCode: number, message: string }

export interface NoSQLCallback {(NoSQLError, NoSQLResult): void };
export interface GetItemParams { (NoSQLError, NoSQLResult): void }

export class NoSQL {

    private documentClient = new DynamoDB.DocumentClient();

    constructor(private endpoint?: string) {}

    getItem(tableName: string, itemId: string, callback: NoSQLCallback): void {
        
        console.log(`Get Item from ${tableName} using endpoint ${this.endpoint}`);
        const params: DynamoDB.DocumentClient.GetItemInput = {TableName: tableName, Key: {"itemId": itemId}};
        this.documentClient.get(params).promise().then(value => {

            const item = value.Item;
            if (item) {

                const response: NoSQLResult = {statusCode: 200, body: JSON.stringify(value.Item), consumedCapacity: value.ConsumedCapacity}
                callback(null, response);

            } else {

                const err:NoSQLError = {statusCode: 404, message: 'Not Found' }
                const response: NoSQLResult = {statusCode: err.statusCode, body: JSON.stringify(err), consumedCapacity: value.ConsumedCapacity}
                callback(null, response);

            }

        }).catch(reason => {
            
            const awserror: AWSErrorTyped = reason;
            const err:NoSQLError = {statusCode: 500, message: awserror.message }
            callback(err, null);

        })
        
    }

    createItem(tableName: string, item: Object, callback: NoSQLCallback): void {

        console.log(`Post Item into ${tableName} using endpoint ${this.endpoint}`);

        const itemId = v4();
        const body = { itemId: itemId, ...item};
        const params: DynamoDB.DocumentClient.PutItemInput  = {TableName: tableName, Item:body};
        this.documentClient.put(params).promise().then(value => {

            const attributes = value.Attributes || body;
            const response: NoSQLResult = {statusCode: 201, body: JSON.stringify(attributes), consumedCapacity: value.ConsumedCapacity}
            callback(null, response);

        }).catch(reason => {
            
            const awserror: AWSErrorTyped = reason;
            const err:NoSQLError = {statusCode: 500, message: awserror.message }
            callback(err, null);

        })

    }

    updateItem(tableName: string, itemId: string, item: Object, callback: NoSQLCallback): void {

        console.log(`Update Item into ${tableName} using endpoint ${this.endpoint}`);

        const attributes = {}
        for(var attributename in item){

            const updateexpression = {Action: 'PUT', Value: item[attributename]}
            attributes[attributename] = updateexpression;

        }

        const params: DynamoDB.DocumentClient.UpdateItemInput  = {TableName: tableName, Key: {"itemId": itemId}, AttributeUpdates: attributes};
        this.documentClient.update(params).promise().then(value => {

            const response: NoSQLResult = {statusCode: 201, body: '', consumedCapacity: value.ConsumedCapacity}
            callback(null, response);

        }).catch(reason => {
            
            const awserror: AWSErrorTyped = reason;
            const err:NoSQLError = {statusCode: 500, message: awserror.message }
            callback(err, null);

        })

    }

    deleteItem(tableName: string, itemId: string, callback: NoSQLCallback): void {

        console.log(`Delete Item from ${tableName} using endpoint ${this.endpoint}`);

        const params: DynamoDB.DocumentClient.DeleteItemInput = {TableName: tableName, Key: {"itemId": itemId}}
        this.documentClient.delete(params).promise().then(value => {

            const response: NoSQLResult = {statusCode: 200, body: '', consumedCapacity: value.ConsumedCapacity}
            callback(null, response);

        }).catch(reason => {
            
            const awserror: AWSErrorTyped = reason;
            const err:NoSQLError = {statusCode: 500, message: awserror.message }
            callback(err, null);

        })

    }

}