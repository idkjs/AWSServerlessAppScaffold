import { APIGatewayEvent, Callback, Context, Handler, APIGatewayProxyResult } from 'aws-lambda';
import { NoSQL, NoSQLResult, NoSQLError } from './nosql'
import { ObjectUtils } from './objectUtils';
import { ContextUtils } from './contextUtils';

export class CRUDHandler {

    itemKeyname: string;

    constructor(keyname: string) {

        this.itemKeyname = keyname;

    }

    handler: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
    
        const itemKey = this.itemKeyname;
        const contextUtils = new ContextUtils()
    
        const environment = process.env['DYNAMO_TABLE'];
        if (environment === undefined) {
    
            const response: APIGatewayProxyResult = { statusCode: 500, body: JSON.stringify({message: 'Backend Function not Configured'}) }
            contextUtils.logResponse(context, response);
            cb(null, response);
    
        } else {
    
            const method = event.httpMethod;
            const tableName = environment.toString();

            switch (method) {
    
                case 'POST': {
    
                    if (!event.body) {
    
                        const resultCode = 400;
                        const resultBody = { statusCode: resultCode, message: 'Bad Request: Invalid body {empty}!' }
                        const response: APIGatewayProxyResult = { statusCode: resultCode, body: JSON.stringify(resultBody) }
                        contextUtils.logResponse(context, response);
                        cb(null, response);
                        return;
    
                    }
    
                    const body = JSON.parse(event.body);
                    const nosql = new NoSQL();
                    nosql.createItem(tableName, body, function(err: NoSQLError, data: NoSQLResult) {
    
                        if (!err) {
    
                            var returned:APIGatewayProxyResult = {statusCode: 200, body: ''};
                            if (data.statusCode === 201) {
    
                                let utils = new ObjectUtils();
                                var returnedBody = JSON.parse(data.body);
    
                                let itemId = returnedBody['itemId'];
                                returnedBody = utils.renameProperty(returnedBody, 'itemId', itemKey);
    
                                const baseUrl = process.env['BASE_URL'];
                                let url = baseUrl + event.path + "/" + itemId;
    
                                returned.statusCode = 201;
                                returned.body = JSON.stringify(returnedBody);
                                returned.headers = { Location: url }
    
                            } else {returned = {statusCode: data.statusCode, body: JSON.stringify(data.body)}}
    
                            contextUtils.logResponse(context, returned);
                            cb(null, returned);
                            
                        } else {
                            
                            const errMsg = { statusCode: 500, body: JSON.stringify(err) }
                            contextUtils.logResponse(context, errMsg);
                            const response: APIGatewayProxyResult = { statusCode: 500, body: JSON.stringify( {statusCode: 500, message: 'Internal Server Error!'}) }
                            contextUtils.logResponse(context, response);
                            cb(null, response);
    
                        }
    
                    })
    
                    break;
    
                }
    
                case 'GET': {
    
                    if (!event.pathParameters || !event.pathParameters[itemKey]) {
    
                        const resultCode = 400;
                        const resultBody = { statusCode: resultCode, message: 'Bad Request: Invalid resourceId {empty}!' }
                        const response: APIGatewayProxyResult = { statusCode: resultCode, body: JSON.stringify(resultBody) }
                        contextUtils.logResponse(context, response);
                        cb(null, response);
                        return;
    
                    }
    
                    const itemId = event.pathParameters[itemKey];
                    const nosql = new NoSQL();
                    nosql.getItem(tableName, itemId, function(err, data) {
            
                        if (!err) {
    
                            let utils = new ObjectUtils();
                            var returnedBody = JSON.parse(data.body);
                            returnedBody = utils.renameProperty(returnedBody, 'itemId', itemKey);
                            const response = { statusCode: 200, body: JSON.stringify(returnedBody) };
                            contextUtils.logResponse(context, data);
                            cb(null, response);
                            
                        } else {
                            
                            const errMsg = { statusCode: 500, body: JSON.stringify(err) }
                            contextUtils.logResponse(context, errMsg);
                            const response: APIGatewayProxyResult = { statusCode: 500, body: JSON.stringify( {statusCode: 500, message: 'Internal Server Error!'}) }
                            contextUtils.logResponse(context, response);
                            cb(null, response);
    
                        }
            
                    });
    
                    break;
    
                }

                case 'PUT': {
    
                    if (!event.pathParameters || !event.pathParameters[itemKey]) {
    
                        const resultCode = 400;
                        const resultBody = { statusCode: resultCode, message: 'Bad Request: Invalid resourceId {empty}!' }
                        const response: APIGatewayProxyResult = { statusCode: resultCode, body: JSON.stringify(resultBody) }
                        contextUtils.logResponse(context, response);
                        cb(null, response);
                        return;
    
                    }

                    if (!event.body) {
    
                        const resultCode = 400;
                        const resultBody = { statusCode: resultCode, message: 'Bad Request: Invalid body {empty}!' }
                        const response: APIGatewayProxyResult = { statusCode: resultCode, body: JSON.stringify(resultBody) }
                        contextUtils.logResponse(context, response);
                        cb(null, response);
                        return;
    
                    }
    
                    const itemId = event.pathParameters[itemKey];
                    var body = JSON.parse(event.body);
                    if (body[itemKey]  && itemId !== body[itemKey]) {

                        const resultCode = 400;
                        const resultBody = { statusCode: resultCode, message: 'Bad Request: Invalid itemId inside body!' }
                        const response: APIGatewayProxyResult = { statusCode: resultCode, body: JSON.stringify(resultBody) }
                        contextUtils.logResponse(context, response);
                        cb(null, response);
                        return;

                    }

                    delete body[itemKey]
                    const nosql = new NoSQL();
                    nosql.updateItem(tableName, itemId, body, function(err, data) {
            
                        if (!err) {
    
                            const response = { statusCode: 200, body: '' };
                            contextUtils.logResponse(context, data);
                            cb(null, response);
                            
                        } else {
                            
                            const errMsg = { statusCode: 500, body: JSON.stringify(err) }
                            contextUtils.logResponse(context, errMsg);
                            const response: APIGatewayProxyResult = { statusCode: 500, body: JSON.stringify( {statusCode: 500, message: 'Internal Server Error!'}) }
                            contextUtils.logResponse(context, response);
                            cb(null, response);
    
                        }
            
                    });
    
                    break;
                }

                case 'DELETE': {
    
                    if (!event.pathParameters || !event.pathParameters[itemKey]) {
    
                        const resultCode = 400;
                        const resultBody = { statusCode: resultCode, message: 'Bad Request: Invalid resourceId {empty}!' }
                        const response: APIGatewayProxyResult = { statusCode: resultCode, body: JSON.stringify(resultBody) }
                        contextUtils.logResponse(context, response);
                        cb(null, response);
                        return;
    
                    }
    
                    const itemId = event.pathParameters[itemKey];
                    const nosql = new NoSQL();
                    nosql.deleteItem(tableName, itemId, function(err, data) {
            
                        if (!err) {
    
                            const response = { statusCode: 200, body: '' };
                            contextUtils.logResponse(context, data);
                            cb(null, response);
                            
                        } else {
                            
                            const errMsg = { statusCode: 500, body: JSON.stringify(err) }
                            contextUtils.logResponse(context, errMsg);
                            const response: APIGatewayProxyResult = { statusCode: 500, body: JSON.stringify( {statusCode: 500, message: 'Internal Server Error!'}) }
                            contextUtils.logResponse(context, response);
                            cb(null, response);
    
                        }
            
                    });
    
                    break;
    
                }

                default: {
    
                    const responseBody = { statusCode: 405, message: 'Method Not Allowed' };
                    const response: APIGatewayProxyResult = { statusCode: 405, body: JSON.stringify(responseBody) }
                    contextUtils.logResponse(context, response);
                    cb(null, response);
    
                }
    
            }
        
        }
    
    }

}
