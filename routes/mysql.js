var express = require('express');
var router = express.Router();

var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'sidia',
    password: 'sidia',
    database: 'mydb'
});

connection.connect();

// SELECT * FROM mytable;
router.get('/select', function (req, res, next) {
    connection.query('SELECT * FROM mytable', function (err, rows, fields) {
        if (err) {
            res.send(err);
        } else {
            res.json(rows);
        }
    });
});

// SELECT * FROM mytable WHERE id = ?;
router.get('/select/:id', function (req, res, next) {
    var id = req.params.id;

    connection.query('SELECT * FROM mytable WHERE _id = ' + id, function (err, rows, fields) {
        if (err) {
            res.send(err);
        } else {
            res.json(rows[0]);
        }
    });
});

// SELECT * FROM mytable WHERE <col> LIKE <value>;
router.get('/select/:col/:value', function (req, res, next) {
    var query = 'SELECT * FROM mytable WHERE ' + req.params.col  + ' LIKE "%' + req.params.value + '%"';

    connection.query(query, function (err, rows, fields) {
        if (err) {
            res.send(err);
        } else {
            res.json(rows);
        }
    });
});

// INSERT INTO mytable VALUES(NULL, ?, ..., ?);
router.post('/insert', function (req, res, next) {
    var elt = req.body;
    delete elt._id;

    var values = '';

    // filter values from javascript object
    for (var property in elt) {
        if (elt.hasOwnProperty(property)) {
            values += '"' + elt[property] + '",';
        }
    }
    values = values.substr(0, values.length - 1);

    connection.query(
        'INSERT INTO mytable VALUE(NULL,' + values + ')',
        function (err, rows, fields) {
            if (err) {
                res.send(err);
            } else {
                res.json(rows);
            }
        });
});

// DELETE FROM mytable WHERE id = ?;
router.delete('/delete/:id', function (req, res, next) {
    var id = req.params.id;

    connection.query('DELETE FROM mytable WHERE _id = ' + id, function (err, rows, fields) {
        if (err) {
            res.send(err);
        } else {
            res.json(rows);
        }
    });
});

// REPLACE INTO mytable VALUES(:id, ?, ..., ?);
router.post('/update/:id', function (req, res, next) {
    var id = req.params.id;

    var elt = req.body;
    delete elt._id;

    var values = '';

    // filter values from javascript object
    for (var property in elt) {
        if (elt.hasOwnProperty(property)) {
            values += '"' + elt[property] + '",';
        }
    }
    values = values.substr(0, values.length - 1);

    connection.query(
        'REPLACE INTO mytable VALUE(' + id + ',' + values + ')',
        function (err, rows, fields) {
            if (err) {
                res.send(err);
            } else {
                res.json(rows);
            }
        });
});

module.exports = router;
