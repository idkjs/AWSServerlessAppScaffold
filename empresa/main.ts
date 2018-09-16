'use strict'

import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk'

import * as uuid from 'uuid';

const dynamoDb = new DynamoDB.DocumentClient();
const tableName = process.env.DynamoTable;

function getItem(id: string): Promise<DynamoDB.DocumentClient.GetItemOutput> {

  const params: DynamoDB.DocumentClient.GetItemInput = { TableName: tableName, Key: {id: id}};
  return dynamoDb.get(params).promise();

}

function uploadItem(item: Object): Promise<DynamoDB.DocumentClient.PutItemOutput> {

  const params:DynamoDB.DocumentClient.PutItemInput = { TableName: tableName, Item: item};
  return dynamoDb.put(params).promise();

}

function deleteItem(id: string): Promise<DynamoDB.DocumentClient.DeleteItemOutput> {

  const params: DynamoDB.DocumentClient.DeleteItemInput = { TableName: tableName, Key: {id: id}};
  return dynamoDb.delete(params).promise();

}

function hasValidObjectKey(object: Object, id: string): Boolean {

  if (!object.hasOwnProperty('id')) {return false;}
  if (id !== object['id']) {return false;}
  return true;

}

export const handler: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  
  const method = event.httpMethod;
  const id = event.path.substr(1);

  switch (method) {

    case 'GET': {

      getItem(id).then(data => {

        const response = { statusCode: 200, body: JSON.stringify(data.Item)};
        cb(null, response);

      }).catch(err => {

        cb(err, null);

      });

      break;

    }

    case 'POST': {

      const hostname = event.headers['Host'];
      const hostpath = event.requestContext.stage;
      const generatedid = uuid.v1();
      const location = 'https://' + hostname + '/' + hostpath + '/' + generatedid;

      const uploaded = JSON.parse(event.body);
      const empresa = {id: generatedid, ...uploaded}
      
      uploadItem(empresa).then(data => {

        const response = { statusCode: 201, body: JSON.stringify(empresa), headers: { Location: location}};
        cb(null, response);

      }).catch(err => {

        cb(err, null);
        
      });

      break;

    }

    case 'PUT': {

      const updated = JSON.parse(event.body);
      if (hasValidObjectKey(updated, id)) {

        uploadItem(updated).then(data => {

          const response = { statusCode: 200, body: null};
          cb(null, response);
  
        }).catch(err => {
  
          cb(err, null);
  
        });

      } else {

        const response = { statusCode: 405, message: 'Invalid Object Body! Invalid Id!'};
        cb(null, response)

      }
      
      break;

    }

    case 'DELETE': {

      deleteItem(id).then(data => {

        const response = { statusCode: 200, body: null};
        cb(null, response);

      }).catch(err => {

        cb(err, null);

      });

      break;

    }

    case 'PATCH': {

      const returned = {id: '12345', name: 'Testtando'}
      const response = { statusCode: 200, body: JSON.stringify(returned)};
      cb(null, response);
      break;
    }

    default: {

      const response = { statusCode: 405, body: JSON.stringify({message: 'Method Not Allowed!'})};
      cb(null, response);

    }
  }
  
}
