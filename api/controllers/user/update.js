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
    notFound: {
      description: 'User not found',
      statusCode: 404
    },
  },


  fn: async function (inputs) {
    return await userManagement.update(this.req.user.data, inputs);
  }


};
