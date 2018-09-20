'use strict'

var fs = require('fs');
var path = require('path');

function cleanDir(dirname) {

    try { var files = fs.readdirSync(dirname); }
    catch(e) { return; }

    if (files.length > 0)

      for (var i = 0; i < files.length; i++) {
        var filePath = dirname + '/' + files[i];
        
        if (fs.statSync(filePath).isFile())
            fs.unlinkSync(filePath);
        else
            cleanDir(filePath);
      }

    fs.rmdirSync(dirname);

 }

function createDir(dirname) {

    try { fs.mkdirSync(dirname) }
    catch (err) { if (err.code !== 'EEXIST') throw err}

}

function moveFiles(files, destinyDir) { 

    files.forEach(frompath => {
        
        let topath = destinyDir + '/' + path.basename(frompath);
        fs.createReadStream('./' + frompath).pipe(fs.createWriteStream(topath));
        
    });

}

module.exports.cleanDir = cleanDir;
module.exports.createDir = createDir;
module.exports.moveFiles = moveFiles;

// class Utils {

//     constructor() {}

//     cleanDir(dirname) {

//         try { var files = fs.readdirSync(dirname); }
//         catch(e) { return; }
    
//         if (files.length > 0)
    
//           for (var i = 0; i < files.length; i++) {
//             var filePath = dirPath + '/' + files[i];
            
//             if (fs.statSync(filePath).isFile())
//               fs.unlinkSync(filePath);
//             else
//               rmDir(filePath);
//           }
    
//         fs.rmdirSync(dirname);
    
//      }
    
//     createDir(dirname) {
    
//         try { fs.mkdirSync(dirname) }
//         catch (err) { if (err.code !== 'EEXIST') throw err}
    
//     }
    
//     moveFiles(files, destinyDir) { }

// }

// module.exports = Utils