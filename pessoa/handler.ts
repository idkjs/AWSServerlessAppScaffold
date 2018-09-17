'use strict';

import { Database } from './src/Database';

const db = new Database('tableName');
console.log(db.getItem('testId'));