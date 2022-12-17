var bcrypt = require('bcrypt');

module.exports = {


  friendlyName: 'validate password',


  description: '',


  inputs: {
    password: {
      type: 'string'
    },
    passwordHash: {
      type: 'string'
    }
  },


  exits: {
    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const match = await bcrypt.compare(inputs.password, inputs.passwordHash);
    return match ? true : false;
  }

};