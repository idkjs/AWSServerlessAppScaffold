import { APIGatewayEvent, Callback, Context, Handler, APIGatewayProxyResult } from 'aws-lambda';
import { NoSQL, NoSQLResult, NoSQLError } from '../common/nosql'
import { ObjectUtils } from '../common/objectUtils';
// import * as url from 'Url';

const itemKeyname = 'empresaId';

function logResponse(context: Context, response: APIGatewayProxyResult): void {

    const logObject = {
        requestId: context.awsRequestId,
        response: response
    }

    console.log(logObject);

}

// @ts-ignore
export const handler: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
    
    const environment = process.env['DYNAMO_TABLE'];
    if (environment === undefined) {

        const response: APIGatewayProxyResult = { statusCode: 500, body: JSON.stringify({message: 'Backend Function not Configured'}) }
        logResponse(context, response);
        cb(null, response);

    } else {

        const method = event.httpMethod;

        switch (method) {

            case 'POST': {

                const tableName = environment.toString();
                if (!event.body) {

                    const resultCode = 400;
                    const resultBody = { statusCode: resultCode, message: 'Bad Request: Invalid body {empty}!' }
                    const response: APIGatewayProxyResult = { statusCode: resultCode, body: JSON.stringify(resultBody) }
                    logResponse(context, response);
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
                            returnedBody = utils.renameProperty(returnedBody, 'itemId', itemKeyname);

                            const baseUrl = process.env['BASE_URL'];
                            let url = baseUrl + event.path + "/" + itemId;

                            returned.statusCode = 201;
                            returned.body = JSON.stringify(returnedBody);
                            returned.headers = { Location: url }

                        } else {returned = {...data}}

                        logResponse(context, returned);
                        cb(null, returned);
                        
                    } else {
                        
                        const errMsg = { statusCode: 500, body: JSON.stringify(err) }
                        logResponse(context, errMsg);
                        const response: APIGatewayProxyResult = { statusCode: 500, body: JSON.stringify( {statusCode: 500, message: 'Internal Server Error!'}) }
                        logResponse(context, response);
                        cb(null, response);

                    }

                })

                break;

            }

            case 'GET': {

                const tableName = environment.toString();
                if (!event.pathParameters || !event.pathParameters[itemKeyname]) {

                    const resultCode = 400;
                    const resultBody = { statusCode: resultCode, message: 'Bad Request: Invalid resourceId {empty}!' }
                    const response: APIGatewayProxyResult = { statusCode: resultCode, body: JSON.stringify(resultBody) }
                    logResponse(context, response);
                    cb(null, response);
                    return;

                }

                const itemId = event.pathParameters[itemKeyname];
                const nosql = new NoSQL();
                nosql.getItem(tableName, itemId, function(err, data) {
        
                    if (!err) {

                        let utils = new ObjectUtils();
                        var returnedBody = JSON.parse(data.body);
                        returnedBody = utils.renameProperty(returnedBody, 'itemId', itemKeyname);
                        const response = { statusCode: 200, body: JSON.stringify(returnedBody) };
                        logResponse(context, data);
                        cb(null, response);
                        
                    } else {
                        
                        const errMsg = { statusCode: 500, body: JSON.stringify(err) }
                        logResponse(context, errMsg);
                        const response: APIGatewayProxyResult = { statusCode: 500, body: JSON.stringify( {statusCode: 500, message: 'Internal Server Error!'}) }
                        logResponse(context, response);
                        cb(null, response);

                    }
        
                });

                break;

            }

            default: {

                const responseBody = { statusCode: 405, message: 'Method Not Allowed' };
                const response: APIGatewayProxyResult = { statusCode: 405, body: JSON.stringify(responseBody) }
                logResponse(context, response);
                cb(null, response);

            }

        }
    
    }

}