
const { userName, password, email, age } = require('../../customValidation/inputValidation')
module.exports = {


  friendlyName: 'Register',


  description: 'Register user.',


  inputs: {
    userName,
    email,
    password,
    age
  },


  exits: {

    notFound: {
      description: 'User not found with the email address provided or password do not match email provided',
      statusCode: 404
    }
  },


  fn: async function (inputs) {
    // All done.
    let data = await sails.helpers.inputValidation('userName')
    return {
      inputs,
      data

    };

  }


};
