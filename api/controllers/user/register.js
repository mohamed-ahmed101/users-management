
const { userName, password, email, age } = require('../../customValidation/inputValidation');
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
    },
    notAvailable: {
      description: 'userName or Email already exist',
      message: "not aviiable",
      statusCode: 406
    }

  },


  fn: async function (inputs) {
    return await userManagement.register(inputs)
  }


};
