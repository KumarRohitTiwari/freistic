const userDB = require('../model/user');

exports.createUser = function (req, res){
    var userObj = req.body;
    userDB.findUserByEmail(req.body.email, function (err, result) {
        if (result != null) {
            res.send({ "error": "User already exists for this Email Address." });
        } else {
            userDB.findUserByMobile(req.body.mobile, function (err, result) {
                if (result != null) {
                    res.send({ "error": "User already exists for this mobile number." });
                } else {
                    userDB.createUser(userObj, function(err, results) {
                        res.send(results);
                    });
                }
            });
        }
    });
};

exports.loginUser = function(req, res){
    var userObj = req.body;
    userDB.findUserByEmail(req.body.email, function (err, result) {
        if (result == null) {
            res.send({ "error": "User does not exist." });
        } else {
            if(req.body.password == result._doc.password){
                res.send(result._doc);
            }
            else{
                res.send({ "error": "Worng Password." });
            }
        }
    });
};