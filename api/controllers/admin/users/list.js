const { userName, email } = require('../../../customValidation/inputValidation');
const { page, limit } = require('../../../customValidation/paginationValidation');


module.exports = {


  friendlyName: 'List',


  description: 'List user.',


  inputs: {
    email: { ...email, required: false },
    userName: { ...userName, required: false },
    limit,
    page

  },


  exits: {

  },


  fn: async function (inputs) {
    console.log(inputs);

    // All done.
    return {
      count: 1,
      page: 1,
      data: [{
        userName: "mohamed",
        age: 44
      }]
    };

  }


};
