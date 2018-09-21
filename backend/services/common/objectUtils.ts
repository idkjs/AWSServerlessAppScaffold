export class ObjectUtils {

    renameProperty(object: Object, oldname: string, newname: string): Object {

        var value = object[oldname];
        var newObject = {...object};
        delete newObject[oldname];
        newObject[newname] = value;
        return newObject;

    }

}