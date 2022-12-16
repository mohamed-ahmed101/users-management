const { userName, email, age } = require('../../customValidation/inputValidation')

module.exports = {


  friendlyName: 'Update',


  description: 'Update user.',


  inputs: {
    userName,
    email,
    age
  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return{inputs};

  }


};
