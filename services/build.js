let utils = require('./commonlibs/utils');
let config = require('./build-config.json');

console.log('|===============================================|');
console.log('| Services Build Started                        |');
console.log('|===============================================|');
console.log(' ')
console.log(' ')



console.log('cleaning temp dir...')

let tempfolder = config.tempfolder;
utils.cleanDir(tempfolder);
utils.createDir(tempfolder);

let services = config.services;
services.forEach(location => {

    console.log(`Building microservice ${location}...`);
    let project = require('./' + location + '/tsconfig.json');

    utils.createDir(tempfolder + '/' + location);
    let files = project.files;
    let completepath = [location + '/tsconfig.json', location + '/package.json'];
    files.forEach(filename => { completepath.push(location + '/' + filename) })
    utils.moveFiles(completepath, tempfolder + '/' + location)
    throw "File refrences must be chaged in temporary dir!!!";

})