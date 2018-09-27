'use strict';

var faker = require('faker/locale/pt_BR');               // https://github.com/marak/Faker.js/
var schemaorg = require('./schemas-org.json')     // http://schema.link.fish/downloads/all.json

function printHelp() {

    console.log('');
    console.log('Utils for AWSServerless App Scaffold');
    console.log('');
    console.log('-gE#: Generate # objects of type Empresa;');
    console.log('-gP#: Generate # objects of type Pessoa;');
    console.log('-gD#: Generate # objects of type Document;');
    console.log('-gU#: Generate # objects of type User;');
    console.log('-o%:  Send srcript output to file with name %;');
    console.log('');
    console.log('-h:  Show this message and exit!');
    console.log('');
    console.log('');

}

function checkParameters() {

    let messages = [
        'Número de Empresas não informado ou inválido!',
        'Número de Pessoas não informado ou inválido!',
        'Número de Documentos não informado ou inválido!',
        'Número de Usuários não informado ou inválido!',
    ]

    let valid = true;
    [numberofEmpresas, numberofPessoas, numberofDocuments, numberofUsers].forEach(function( value, index, array) {

        if (isNaN(value)) {
            console.log(messages[index])
            valid = false;
        }

    });

    return valid;

}

// faker.setLocale("pt_BR");
let numberofEmpresas = 0;
let numberofPessoas = 0;
let numberofDocuments = 0;
let numberofUsers = 0;
let outputfile = '';

process.argv.forEach(function (val, index, array) {

    if (val.toString().indexOf('-h') > -1) {
        printHelp();
        process.exit();
    }

    if (val.toString().indexOf('-gE') > -1) {numberofEmpresas = parseInt(val.toString().substr(val.toString().indexOf('-gE') + 3, val.toString().lenght))}
    if (val.toString().indexOf('-gP') > -1) {numberofPessoas = parseInt(val.toString().substr(val.toString().indexOf('-gP') + 3, val.toString().lenght))}
    if (val.toString().indexOf('-gD') > -1) {numberofDocuments = parseInt(val.toString().substr(val.toString().indexOf('-gD') + 3, val.toString().lenght))}
    if (val.toString().indexOf('-gU') > -1) {numberofUsers = parseInt(val.toString().substr(val.toString().indexOf('-gU') + 3, val.toString().lenght))}
    if (val.toString().indexOf('-o') > -1) {outputfile = val.toString().substr(val.toString().indexOf('-o') + 2, val.toString().lenght)}

});

if (!checkParameters()) {process.exit();}

console.log(numberofEmpresas);
console.log(numberofPessoas);
console.log(numberofDocuments);
console.log(numberofUsers);

let schemaTypes = schemaorg.types;
let keys = [];
for (var k in schemaTypes) keys.push(k);
console.log(keys);