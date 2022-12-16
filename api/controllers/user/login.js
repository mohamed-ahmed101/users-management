const { userName, password } = require('../../customValidation/inputValidation');
const jwToken = require('../../services/jwToken');

module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {
    userName,
    password
  },


  exits: {
  },


  fn: async function (inputs) {

    //TODO: check user email and password
    return {
      token: jwToken.sign(inputs)
    }

  }


};
