"use strict"; 

module.exports = class Environment {
    variables() {
     return {dynamoTable: process.env.DYNAMO_TABLE};
   }
}