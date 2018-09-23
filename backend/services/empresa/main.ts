import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { CRUDHandler } from '../common/nosqlCrud';

const itemKeyname = 'empresaId';

export const handler: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {

    let crud = new CRUDHandler(itemKeyname);
    crud.handler(event, context, cb);

}