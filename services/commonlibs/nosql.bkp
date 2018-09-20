import { DynamoDB } from 'aws-sdk';

interface AWSErrorTyped {
    code: string            // a unique short code representing the error that was emitted.
    message: string         // a longer human readable error message
    retryable: boolean      // whether the error message is retryable.
    statusCode: number      // in the case of a request that reached the service, this value contains the response status code.
    time?: string            // the date time object when the error occurred.
    hostname?: string        // set when a networking error occurs to easily identify the endpoint of the request.
    region?: string          // set when a networking error occurs to easily identify the region of the request.
}

interface NoSQLResult { statusCode: number, body: any }
interface NoSQLError { statusCode: number, message: string }

// @ts-ignore
export interface GetItemParams { (NoSQLError, NoSQLResult): void }

export class NoSQL {

    private documentClient = new DynamoDB.DocumentClient();

    constructor(private endpoint?: string) {}

    getItem(tableName: string, itemId: string, callback: GetItemParams): void {
        
        console.log(`Get Item from ${tableName} using endpoint ${this.endpoint}`);
        const params: DynamoDB.DocumentClient.GetItemInput = {TableName: tableName, Key: {"id": itemId}};
        this.documentClient.get(params).promise().then(value => {

            const item = value.Item;
            if (item) {

                const response: NoSQLResult = {statusCode: 200, body: JSON.stringify(value.Item)}
                callback(null, response);

            } else {

                const err:NoSQLError = {statusCode: 404, message: 'Not Found' }
                const response: NoSQLResult = {statusCode: err.statusCode, body: JSON.stringify(err)}
                callback(null, response);

            }

        }).catch(reason => {
            
            const awserror: AWSErrorTyped = reason;
            const err:NoSQLError = {statusCode: 500, message: awserror.message }
            callback(err, null);

        })
        
    }

}