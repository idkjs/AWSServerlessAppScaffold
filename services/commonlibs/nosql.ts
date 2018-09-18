import { DynamoDB } from 'aws-sdk'

export class NoSQL {

    private documentClient = new DynamoDB.DocumentClient();

    constructor(private endpoint: string, private tableName: string) {}

    getItem(itemId: string): any {
        
        const params = {Table: this.tableName, Key: itemId};
        console.log(params, this.endpoint);
        return {itemId: itemId, contents: 'mensagem'};
        
    }

}