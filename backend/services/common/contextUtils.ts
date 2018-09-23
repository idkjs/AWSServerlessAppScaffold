import { Context, APIGatewayProxyResult } from 'aws-lambda';

export class ContextUtils {

    logResponse(context: Context, response: APIGatewayProxyResult): void {

        const logObject = {
            requestId: context.awsRequestId,
            response: response
        }
    
        console.log(logObject);
    
    }

}