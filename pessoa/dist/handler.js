'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Database_1 = require("./src/Database");
var db = new Database_1.Database('tableName');
console.log(db.getItem('testId'));
