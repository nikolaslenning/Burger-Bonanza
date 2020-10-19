var express = require("express");
var burger = require("../models/burger");
var router = express.Router();

router.get("/", function (req, res) {
    burger.all(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burger", function (req, res) {
    burger.create([
        "burger_name"
    ], [
        req.body.name

    ], function (result) {

        res.json({ id: result.insertId });
    });
});

router.put("/api/burger/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    burger.update({
        devoured: 1
    }, condition, function (result) {
        if (result.changedRows === 0) {
          
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;