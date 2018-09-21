import { v4 } from 'uuid';

class Test {

    constructor() {

        let itemId = v4()
        console.log(itemId);
    }

}

let clazz = new Test();