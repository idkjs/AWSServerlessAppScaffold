const config = require('./connection');

var postgressconfig = {
    database: config.db,
    port: 5432,
    host: config.url,
    user: config.user,
    password: config.pwd
};

var pg = require('pg');
var pool = new pg.Pool(postgressconfig)

pool.connect(function (err, client, done) {

    if (err) {

        console.log("not able to get connection " + err);

    }

    client.query({
        name: 'search_entidades',
        text: `SELECT row_to_json(t) FROM (select * from entidadegestorarpps) t`,
        values: [],
    }).then(result => {

        const rows = result.rows.map(value => {
            return value["row_to_json"]
        });
        const json = JSON.stringify(rows);
        var fs = require('fs');
        const filename = './entidadegestorarpps.json';
        fs.writeFile(filename, json, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved => " + filename);
        });

    }).catch(console.log("Erro =>" + err));

    done();

    client.query({
        name: 'search_servidor',
        text: `SELECT row_to_json(t) FROM (select * from servidor) t`,
        values: [],
    }).then(result => {

        const rows = result.rows.map(value => {
            return value["row_to_json"]
        });
        const json = JSON.stringify(rows);
        var fs = require('fs');
        const filename = './servidor.json';
        fs.writeFile(filename, json, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved => " + filename);
        });

    }).catch(console.log("Erro =>" + err));

});