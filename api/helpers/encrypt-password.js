var bcrypt = require('bcrypt');

module.exports = {


  friendlyName: 'Encrypt password',


  description: '',


  inputs: {
    password: {
      type: 'string'
    }
  },


  exits: {
    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    return await bcrypt.hash(inputs.password, 10)
  }
};

