export class Database {

    constructor(private tableName: string) {}

    getItem(itemId: string): Object {
        
        return {id: itemId};

    }

    uploadItem(item: Object): Boolean {

        return false;

    }

}