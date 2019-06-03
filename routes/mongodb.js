var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost/sidia', ['store']);

// SELECT * FROM mytable;
router.get('/select', function (req, res, next) {
    db.store.find(function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

// SELECT * FROM mytable WHERE id = ?;
router.get('/select/:id', function (req, res, next) {
    db.store.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

// SELECT * FROM mytable WHERE <col> LIKE <value>;
router.get('/select/:col/:value', function (req, res, next) {
    var query = {};
    query[req.params.col] = {
        '$regex': req.params.value,
        '$options': 'i'
    };

    db.store.find(query, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

// INSERT INTO mytable VALUES(NULL, ?, ..., ?);
router.post('/insert', function (req, res, next) {
    var elt = req.body;

    db.store.save(elt, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

// DELETE FROM mytable WHERE id = ?;
router.delete('/delete/:id', function (req, res, next) {
    db.store.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

// REPLACE INTO mytable VALUES(:id, ?, ..., ?);
router.post('/update/:id', function (req, res, next) {
    var id = req.params.id;
    var elt = req.body;
    delete elt._id;

    db.store.update(
        { _id: mongojs.ObjectId(id) },
        elt,
        {},
        function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
});

module.exports = router;