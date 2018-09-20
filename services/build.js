var fs = require('fs');
var path = require('path');
let gulp = require('gulp');
let tsc = require('gulp-typescript');
let runsequence = require('gulp-run-sequence');
var replace = require('gulp-replace');
var zip = require('gulp-zip');
var assets = require('gulp-asset-hash');
var hash = require('gulp-hash-filename');

let config = require('./build-config.json');

var log = console.log;

console.log = function () {
    var first_parameter = arguments[0];
    var other_parameters = Array.prototype.slice.call(arguments, 1);

    function formatConsoleDate (date) {
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var milliseconds = date.getMilliseconds();

        return '[' +
               ((hour < 10) ? '0' + hour: hour) +
               ':' +
               ((minutes < 10) ? '0' + minutes: minutes) +
               ':' +
               ((seconds < 10) ? '0' + seconds: seconds) +
               '.' +
               ('00' + milliseconds).slice(-3) +
               '] ';
    }

    log.apply(console, [formatConsoleDate(new Date()) + first_parameter].concat(other_parameters));
};

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

function lastModifiedTime(files) {

    var modified = [];
    files.forEach(filename => {
        var stats = fs.statSync(filename);
        modified.push(stats.mtime);
    })

    var sorted = modified.sort( (a, b) => { a.getSeconds - b.getSeconds })
    return sorted[0];

}

function compileTask(dirname, destiny) {

    console.log('Compiling '+ dirname + '...');

    let projectfile = process.cwd() + dirname + '/tsconfig.json';
    let project = require(projectfile);
    let taskname = 'compile' + dirname

    gulp.task(taskname, function() {

        let files = project.files;

        var absolute = []
        files.forEach(filename => {absolute.push(process.cwd() + dirname + '/' + filename);})
        var lastmodification = lastModifiedTime(absolute);

        return gulp.src(absolute)
                    .pipe(tsc(project.compilerOptions))
                    .pipe(replace('../common', '.'))
                    .pipe(zip(dirname + '.zip', {modifiedTime: lastmodification}))
                    // .pipe(assets.hash())
                    .pipe(hash())
                    .pipe(gulp.dest(destiny));

    });

    return taskname;

}

console.log('|===============================================|');
console.log('| Services Build Started                        |');
console.log('|===============================================|');
console.log(' ')
console.log(' ')


console.log('Cleaning output dir...')

let tempfolder = config.outfolder;
cleanDir(tempfolder);
createDir(tempfolder);

let services = config.services;
let gulptasks = []
services.forEach(location => {
    
    gulptasks.push(compileTask('/' + location, tempfolder))

});

let message = 'Compilation Done! ' + gulptasks.length + ' microservices compiled!'

console.time(message)
gulp.task('compileAll', gulptasks, function(done) {

    console.timeEnd(message);
    done();

})

gulp.start('compileAll');