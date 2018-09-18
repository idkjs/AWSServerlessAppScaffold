import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

export const handler: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
    console.log(event);
    console.log(context);
    console.log(cb);
    cb(null, null);
}