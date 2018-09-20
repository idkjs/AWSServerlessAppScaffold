import { APIGatewayEvent, Callback, Context, Handler, APIGatewayProxyResult } from 'aws-lambda';
import { NoSQL } from '../common/nosql'

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

            case 'GET': {

                const tableName = environment.toString();
                if (!event.pathParameters || !event.pathParameters.empresaId) {

                    const resultCode = 400;
                    const resultBody = { statusCode: resultCode, message: 'Bad Request: Invalid resourceId {empty}!' }
                    const response: APIGatewayProxyResult = { statusCode: resultCode, body: JSON.stringify(resultBody) }
                    logResponse(context, response);
                    cb(null, response);
                    return;

                }

                const itemId = event.pathParameters.empresaId;
                const nosql = new NoSQL();
                nosql.getItem(tableName, itemId, function(err, data) {
        
                    if (!err) {

                        logResponse(context, data);
                        cb(null, data);
                        
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