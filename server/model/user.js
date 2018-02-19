var mongoose = require('mongoose');
var sequenceGenerator = require('mongoose-sequence-plugin');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    userId: {type:Number, required:true },
    firstName: String,
    lastName: String,
    email: {type:String, unique: true },
    mobile: {type:String, unique: true },
    password: String,
    type: String
});
userSchema.plugin(sequenceGenerator, {
    field: 'userId',
    startAt: 100,
    maxSaveRetries: 2
  });
var userModel = mongoose.model( 'user', userSchema);

exports.findUserByEmail = function(input, callback){
    userModel.findOne({'email': input}, function(err, result){
        if(err) { console.log(err); callback(true); return; }
        callback(false, result);
    });
};
exports.findUserByMobile = function(input, callback){
    userModel.findOne({'mobile': input}, function(err, result){
        if(err) { console.log(err); callback(true); return; }
        callback(false, result);
    });
};
exports.createUser = function (userObj,callback){
    var userdb = new userModel(userObj);
    console.log(userObj);
    userdb.save(function (err, User) {
        if (err) {
            console.log(err);
            callback(true, {msg:'Record could not be saved'});
            return;
        }
        callback(false, User);
    });
};