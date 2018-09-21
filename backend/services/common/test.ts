import { ObjectUtils } from './objectUtils';

var first = {id: '12345', name: 'Gustavo'}

var utils = new ObjectUtils();
var second = utils.renameProperty(first, 'id', 'empresaId');
console.log(second);