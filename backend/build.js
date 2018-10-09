var fs = require('fs');
var path = require('path');
let gulp = require('gulp');
let tsc = require('gulp-typescript');
var replace = require('gulp-replace');
var zip = require('gulp-zip');
var hash = require('gulp-hash-filename');
var AWS = require('aws-sdk');

let message0 = 'Build done!';
console.time(message0)

function exitHandler(options, exitCode) {
    console.timeEnd(message0);
    if (exitCode || exitCode === 0) console.log('line');
    if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

let config = require('./build-config.json');

var log = console.log;

console.log = function () {
    var first_parameter = arguments[0].toString();
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

    let linesize = 90
    if (first_parameter === 'line') {
        first_parameter = "|" + "=".repeat(linesize -2) + "|"
    } else {
        let size = first_parameter.length;
        first_parameter = "| " + first_parameter + " ".repeat(linesize - size -3) + '|'
    }
    log.apply(console, [formatConsoleDate(new Date()) + first_parameter].concat(other_parameters));
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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

function copyResource(resourceName, todir, toname) {

    var destPath = path.join(todir, toname);
    fs.createReadStream(resourceName).pipe(fs.createWriteStream(destPath));

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

    let projectfile = path.join(process.cwd(), 'services', dirname, '/tsconfig.json');
    let project = require(projectfile);
    let taskname = 'compile' + dirname;
    let zipname = path.basename(dirname) + '.zip';

    gulp.task(taskname, function() {

        let files = project.files;

        var absolute = []
        files.forEach(filename => {absolute.push(path.join(process.cwd(), 'services', dirname, filename))})
        var lastmodification = lastModifiedTime(absolute);

        return gulp.src(absolute)
                    .pipe(tsc(project.compilerOptions))
                    .pipe(replace('../common', '.'))
                    .pipe(zip(zipname, {modifiedTime: lastmodification}))
                    .pipe(hash())
                    .pipe(gulp.dest(destiny));

    });

    return taskname;

}

function findCompiledFiles(dirname, services) {

    var result = [];
    services.forEach(serviceName => {

        var found = fs.readdirSync(dirname).filter(fn => fn.startsWith(serviceName) && fn.endsWith('.zip'))
        result.push({serviceName: serviceName, buildName: found[0]})

    })

    return result;

}

function generateStackResource(templateName, filename) {

    let resource = {
        Type: "AWS::CloudFormation::Stack",
        Properties: {
            TimeoutInMinutes: 60,
            TemplateURL: {
                "Fn::Join": ["", ["https://s3.amazonaws.com/", { "Ref": "BucketName" }, '/', templateName, ".json"]]
            },
            Parameters: {
                AppName: { "Ref": "AppName" },
                FunctionBucket: { "Ref": "BucketName" },
                FunctionKey: filename,
                AppBaseUrl: 'https://www.exemplo.com',
                AppRestAPI: { "Fn::GetAtt" : [ "AppApi", "Outputs.AppRestAPIReference" ] },
                AppRestAPIRootResource: { "Fn::GetAtt" : [ "AppApi", "Outputs.AppRestAPIRootResource" ] }

            }
            
        }
    };

    return resource;

}

function generateMasterStack(resources) {

    var master = {

        AWSTemplateFormatVersion: "2010-09-09",
        Description: "Master Stack for Application",
        Parameters: {

            AppName: {
                Type: "String",
                Description: "The Name of the Application",
                AllowedPattern: "(?!-)[a-zA-Z0-9-.]{1,63}(?<!-)",
                ConstraintDescription: "must be a url compatible."
            },
    
            BucketName: {
                Type: "String",
                Description: "The Name of the Bucket were templates and resources are located!",
                AllowedPattern: "(?!-)[a-zA-Z0-9-.]{1,63}(?<!-)",
                ConstraintDescription: "must be a url compatible."
            }
    
        },

        Resources: {

            AuthPool: {
                Type: "AWS::CloudFormation::Stack",
                Properties: {
                    TimeoutInMinutes: 60,
                    TemplateURL: {
                        "Fn::Join": ["", ["https://s3.amazonaws.com/", { "Ref": "BucketName" }, "/authentication.json"]]
                    },
                    Parameters: {
                        AppName: { "Ref": "AppName" }
                    }
                    
                }
            },

            AppApi: {
                Type: "AWS::CloudFormation::Stack",
                Properties: {
                    TimeoutInMinutes: 60,
                    TemplateURL: {
                        "Fn::Join": ["", ["https://s3.amazonaws.com/", { "Ref": "BucketName" }, "/apidefinition.json"]]
                    },
                    Parameters: {
                        AppName: { "Ref": "AppName" }
                    }
                    
                }
            },

            AppApiDeployment: {
                DependsOn : [],
                Type: "AWS::CloudFormation::Stack",
                Properties: {
                    TimeoutInMinutes: 60,
                    TemplateURL: {
                        "Fn::Join": ["", ["https://s3.amazonaws.com/", { "Ref": "BucketName" }, "/apideployment.json"]]
                    },
                    Parameters: {
                        AppRestApiId: { "Fn::GetAtt" : [ "AppApi", "Outputs.AppRestAPIReference" ] },
                        StageName: 'automated'
                    }
                    
                }
            }

        },

        Outputs: {

            AppApi: {
                Value: { "Fn::GetAtt" : [ "AppApi", "Outputs.AppRestAPIReference" ] },
                Description: "Application RestAPI definition"
            },
    
            AppApiRootResource: {
                Value: { "Fn::GetAtt" : [ "AppApi", "Outputs.AppRestAPIRootResource" ] },
                Description: "Application RestAPI definition"
            }
    
        }

    }

    resources.forEach(resource => {

        resourceName = 'Microservice' + capitalizeFirstLetter(resource.serviceName);
        resourceStack = generateStackResource(resource.serviceName, resource.buildName)
        master.Resources[resourceName] = resourceStack;
        master.Resources.AppApiDeployment.DependsOn.push(resourceName);

    });

    return master;

}

function uploadtoS3(localdir, s3bucket, s3region, awsProfile) {

    var credentials = new AWS.SharedIniFileCredentials({profile: awsProfile});
    AWS.config.update({region: s3region, credentials: credentials});
    let s3 = new AWS.S3({ apiVersion: '2006-03-01', params: {Bucket: s3bucket} })

    let files = fs.readdirSync(localdir);
    files.forEach(filename => {

        let filePath = path.join(localdir, filename);

        let filecontent = new Buffer.from(fs.readFileSync(filePath), 'binary');
        s3.upload({Key: filename, Body: filecontent, ACL: 'authenticated-read' }, function (resp) {
              if (resp) {console.log(resp);} else {console.log(filename + ' uploaded to S3! (' + filecontent.length + ') bytes');}
        });

        // fs.readFileSync(filePath, function (err, data) {

        //     if (err) { throw err; }
        //     var base64data = new Buffer.from(data, 'binary');
        //     if (base64data.length === 0) { throw new Error('File With Zero Size!'); }

        //     s3.upload({
        //       Key: filename,
        //       Body: base64data,
        //       ACL: 'authenticated-read'
        //     },function (resp) {
        //         if (resp) {console.log(resp);} else {console.log(filename + ' uploaded to S3! (' + base64data.length + ') bytes');}
        //     });
          
        // });

    })

}

console.log('line');
console.log('Services Build Started');
console.log('line');
console.log(' ')

console.log('Cleaning output dir...')

let tempfolder = config.outfolder;
cleanDir(tempfolder);
createDir(tempfolder);

let services = config.services;
let gulptasks = []
services.forEach(serviceName => {
    
    let resourceName = path.join('.', 'services', serviceName, 'resources.json')
    copyResource(resourceName, tempfolder, serviceName + '.json');

    // let schemaname = path.join('.', 'services', serviceName, 'schema.graphql')
    // if (fs.existsSync(schemaname)) {copyResource(schemaname, tempfolder, serviceName + '-schema.graphql')}

    let servicepath = path.join('.', 'services', serviceName)

    var files=fs.readdirSync(servicepath);
    for(var i=0; i<files.length; i++){

        var filename = path.join(servicepath,files[i]);
        if (filename.indexOf('.velocity') > 0 || filename.indexOf('schema.graphql') > 0) {
            copyResource(filename, tempfolder, serviceName + '-' + files[i])
        }

    };

    gulptasks.push(compileTask(serviceName, tempfolder))

});

var message2 = 'Compilation Done! ' + gulptasks.length + ' microservices compiled!'
console.time(message2)

gulp.task('compileAll', gulptasks, function(done) {

    console.timeEnd(message2);

    var message3 = 'Stack Generation Done! ' + services.length + ' microservices stacks created!'
    console.time(message3)

    resources = ['apidefinition.json', 'apideployment.json','authentication.json']
    resources.forEach(resourceName => {copyResource('./resources/' + resourceName, tempfolder, resourceName);})
    let builds = findCompiledFiles(tempfolder, services);
    let template = generateMasterStack(builds);
    let masterfile = path.join(tempfolder, 'master.json');
    fs.writeFile(masterfile, JSON.stringify(template, null, 2) , 'utf-8', (err) => {if (err) console.log(err)});
    console.timeEnd(message3);

    setTimeout(() => {uploadtoS3(tempfolder, config.bucketname, config.bucketregion, config.awsprofile);}, 500);
    done();

})

gulp.start('compileAll');