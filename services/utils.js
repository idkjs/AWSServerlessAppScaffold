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

function compile(dirname, destiny) {

    let projectfile = process.cwd() + dirname + '/tsconfig.json';

    let project = require(projectfile);

    let gulp = require('gulp');
    let tsc = require('gulp-typescript');

    let task = gulp.task('compile-' + dirname, function() {

        let files = project.files;

        console.log('Curretn Dir =>' + projectfile);
        var absolute = []
        files.forEach(filename => {absolute.push(process.cwd() + dirname + '/' + filename);})
        absolute.forEach(filename => {console.log('File =>' + filename);})

        return gulp.src(absolute).pipe(tsc(project.compilerOptions)).pipe(gulp.dest(destiny));

    });

    gulp.start('compile');

}

function moveReference(filename) {

}

module.exports.cleanDir = cleanDir;
module.exports.createDir = createDir;
module.exports.moveFiles = moveFiles;
module.exports.compile = compile;
module.exports.moveReference = moveReference;

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