const { userName, password } = require('../../customValidation/inputValidation');
const adminManagement = require('../../services/adminManagement');

module.exports = {


  friendlyName: 'Login',


  description: 'Login admin.',


  inputs: {
    userName,
    password
  },


  exits: {
    notFound: {
      description: 'User not found with the email address provided or password do not match email provided',
      statusCode: 404
    },
    notAuthorized: {
      description: 'User not found with the email address provided or password do not match email provided',
      statusCode: 401
    },
    notVaildPassword: {
      description: 'User not found with the email address provided or password do not match email provided',
      statusCode: 400
    },

  },

  fn: async function (inputs) {
    return await adminManagement.login(inputs);
  }

};
