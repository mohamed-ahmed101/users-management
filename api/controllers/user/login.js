const { userName, password } = require('../../customValidation/inputValidation');
module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {
    userName,
    password
  },


  exits: {
    notVaildPassword: {
      description: 'incorrect password',
      statusCode: 400
    }
  },


  fn: async function (inputs) {
    return await userManagement.login(inputs);
  }
};
