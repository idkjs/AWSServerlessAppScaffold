"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Database = /** @class */ (function () {
    function Database(tableName) {
        this.tableName = tableName;
    }
    Database.prototype.getItem = function (itemId) {
        return { id: itemId };
    };
    Database.prototype.uploadItem = function (item) {
        return false;
    };
    return Database;
}());
exports.Database = Database;
