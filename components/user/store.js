const Model = require('./model');

function addUser(name){
    const myUser = new Model(name);
    return myUser.save();
};

async function listUsers(){
    const users = await Model.find();
   return users;
}

module.exports = {
    add: addUser,
    list: listUsers
}